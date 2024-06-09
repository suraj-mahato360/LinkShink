const jwt = require("jsonwebtoken")

function setUser(user) {
        return jwt.sign({
                _id: user._id,
                email: user.email,
        }, process.env.JWT_SCERET)
}

function getUser(token) {
        if (!token) return null
        try {
                return jwt.verify(token, process.env.JWT_SCERET)

        } catch (error) {
                return null
        }
}


module.exports = {
        setUser,
        getUser,
}




//  for statefull auth use below code


// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//         sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//         return sessionIdToUserMap.get(id);
// }

// module.exports = {
//         setUser,
//         getUser,
// }