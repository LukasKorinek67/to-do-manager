const express = require("express")
require("./database/mongoose")
const userRouter = require("./routes/user")
const taskRouter = require("./routes/task")

const cookieParser = require("cookie-parser")

const app = express()
const port = process.env.PORT

const path = require("path")
const publicPath = path.join(__dirname, "..", "client", "build")

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.json())
app.use("/api", userRouter)
app.use("/api", taskRouter)

app.use(express.static(publicPath))

app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath + "index.html"));
  });

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})