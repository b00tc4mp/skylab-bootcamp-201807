const mongoose = require('mongoose')
const {Portfolio} = require('./schemas')

module.exports = mongoose.model('Portfolio', Portfolio)