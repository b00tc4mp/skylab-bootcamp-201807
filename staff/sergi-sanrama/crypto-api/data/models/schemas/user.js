const {Schema} = require('mongoose')
const Portfolio = require('./portfolio')


function validatePassword(password) {
    if (password.length < 4) throw Error('password length is too short, minimum 4 characters')
}

module.exports = new Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        validate: validatePassword
    },

    photo: {
        type: String,
    },

    portfolio: [Portfolio]
})