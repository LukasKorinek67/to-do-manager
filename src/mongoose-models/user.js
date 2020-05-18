const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Task = require("./task")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("heslo")) {
                throw new Error("Heslo nemůže obsahovat slovo heslo!")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

// propojení s uživatelovými TO-DOs
userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "owner"
})

// metoda k vracení uživatele bez hesla a tokenů
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

// generování tokenu po přihlášení
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// přihlášení
userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username })
    if (!user) {
        throw new Error("Nesprávné údaje")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Nesprávné údaje")
    }

    return user
}

// Zahashování hesla před uložením
userSchema.pre("save", async function (next) {
    const user = this

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Vymazání TO-DOs vymazaného uživatele
userSchema.pre("remove", async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User