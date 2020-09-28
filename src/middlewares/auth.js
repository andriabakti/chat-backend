const jwt = require("jsonwebtoken")
const helpers = require('../helpers/helpers')

module.exports = {
    verifyAccess: (req, res, next) => {
        let token = req.headers.authorization
        token = token.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            const message = {message: 'Token is invalid'}
            if(err) return helpers.response(res, message, 403)
            next()
        })
    }
}