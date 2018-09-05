const mongoose = require('mongoose')
const { User, Video, Dataset } = require('./schemas')

module.exports = {
    Video: mongoose.model('Video', Video),
    Dataset: mongoose.model('Dataset', Dataset),
    User: mongoose.model('User', User)
}