const express = require("express")
const User = require("../mongoose-models/user")
const auth = require("../middleware/auth")
const router = new express.Router()

router.post("/users", async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.cookie("auth_token", token)
        res.cookie("username", user.username)
        res.cookie("loggedIn", true)
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie("auth_token", token)
        res.cookie("username", user.username)
        res.cookie("loggedIn", true)
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.clearCookie("auth_token")
        res.clearCookie("username")
        res.clearCookie("loggedIn")
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user)
})

router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["username", "password"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: "Neplatné úpravy!" })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.cookie("username", req.user.username)
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete("/users/me", auth, async (req, res) => {
    try {
        await req.user.remove()
        res.clearCookie("auth_token")
        res.clearCookie("username")
        res.clearCookie("loggedIn")
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router