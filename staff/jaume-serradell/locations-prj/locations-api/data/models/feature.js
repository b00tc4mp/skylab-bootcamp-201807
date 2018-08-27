const mongoose = require('mongoose')
const { Feature } = require('./schemas')

module.exports = mongoose.model('Feature', Feature)