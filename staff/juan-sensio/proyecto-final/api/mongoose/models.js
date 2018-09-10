const mongoose = require('mongoose')
const {
    User,
    Video,
    Dataset,
    Result,
    Model
} = require('./schemas')

module.exports = {
    Video: mongoose.model('Video', Video),
    Dataset: mongoose.model('Dataset', Dataset),
    Result: mongoose.model('Result', Result),
    Model: mongoose.model('Model', Model),
    User: mongoose.model('User', User)
}