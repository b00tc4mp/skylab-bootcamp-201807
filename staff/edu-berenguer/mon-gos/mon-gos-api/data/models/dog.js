const mongoose = require('mongoose')
const { Dog } = require('./schemas')

module.exports = mongoose.model('Dog', Dog)