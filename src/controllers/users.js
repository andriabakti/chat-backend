const bcrypt = require('bcryptjs')
const helpers = require('../helpers/helpers')
const usersModel = require('../models/users')
const jwt = require('jsonwebtoken')

module.exports = {
    register: (req, res) => {
        const {email, password, username} = req.body
        // Validasi
        const data = {
            email,
            password,
            username,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(data.password, salt, function(err, hash) {
                data.password = hash
                usersModel.register(data)
                .then((result) => {
                    helpers.response(res, result, 200, null)
                })
                .catch((err) => {
                    console.log(err)
                })
            })
        })
    },
    login: (req, res) => {
        const {email, password} = req.body
        usersModel.getUserbyEmail(email)
        .then((result) => {
            // Validasi
            if (result.length < 1) return helpers.response(res, {message: 'Email not found !!'}, 401, null)
            const user = result[0]
            const hash = user.password
            bcrypt.compare(password, hash).then((resCompare) => {
                if(!resCompare) return helpers.response(res, {message: 'Password is wrong !!'}, 401, null)
                const payload = {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                }
                jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '12h' }, (err, token) => {
                    user.token = token
                    delete user.password
                    delete user.createdAt
                    delete user.updatedAt
                    helpers.response(res, user, 200)
                })
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}