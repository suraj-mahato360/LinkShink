const User = require("../Models/user")
const { v4: uuidv4 } = require("uuid");
const { getUser, setUser } = require("../service/auth")

async function handleUserSignUp (req, res) {
        const { name, email, password } = req.body
        const user = await User.create({
                name,
                email,
                password,
        })
        const token = setUser(user)
        res.cookie("uid", token)
        return res.redirect("/")
}

async function handleUserLogin (req, res) {
        const { email, password } = req.body
        const user = User.findOne({email, password})
        console.log(user)
        if (!user) return res.render("login", {
                error: "Email or password is invalid"
        })

        const token = setUser(user)
        res.cookie("uid", token)

        // for statefull auth

        // const sessionId = uuidv4()
        // setUser(sessionId, user)
        // res.cookie("uid", sessionId)

        return res.redirect("/")
}

module.exports = {
        handleUserSignUp,
        handleUserLogin,
}