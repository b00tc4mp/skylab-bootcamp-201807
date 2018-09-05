const mongoose = require('mongoose')
const { User, Video } = require('./schemas')

module.exports = {
    Video: mongoose.model('Video', Video),
    User: mongoose.model('User', User)
}