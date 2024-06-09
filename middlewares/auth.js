const { getUser } = require("../service/auth")

function checkForAuthentication(req, res, next) {
        const tokenCookie = req.cookies?.uid
        // req.user = null

        if (!tokenCookie) return next()
        const token = tokenCookie
        const user = getUser(token)

        req.user = user
        return next()
}

module.exports = {
        checkForAuthentication,
}


// For Stateless Auth

// async function restrictToLoggedUserOnly (req, res, next) {
//        const userUid = req.cookies?.uid;
//        if (!userUid) return res.redirect("/login")

//         const user = getUser(userUid)
//         if (!user) return res.redirect("/login");

//         req.user = user
//         next()
// }

// async function checkAuth (req, res, next) {
//         const userUid = req.cookies?.uid;
//         const user = getUser(userUid)

//         req.user = user
//         next()
// }

// module.exports = {restrictToLoggedUserOnly,
//         checkAuth,
// }