const mongoose = require('mongoose')
const { Review } = require('./schemas')

module.exports = mongoose.model('Review', Review)