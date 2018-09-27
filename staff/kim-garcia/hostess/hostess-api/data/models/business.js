const mongoose = require('mongoose')
const { Business } = require('./schemas')

module.exports = mongoose.model('Business', Business)