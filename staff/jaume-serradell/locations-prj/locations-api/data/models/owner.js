const mongoose = require('mongoose')
const { Owner } = require('./schemas')

module.exports = mongoose.model('Owner', Owner)