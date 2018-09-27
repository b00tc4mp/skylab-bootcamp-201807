const mongoose = require('mongoose')
const { Property } = require('./schemas')

module.exports = mongoose.model('Property', Property)