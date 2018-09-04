const mongoose = require('mongoose')
const { User } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User)
}