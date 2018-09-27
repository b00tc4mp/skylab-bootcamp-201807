const mongoose = require('mongoose')
const { Contact } = require('./schemas')

module.exports = mongoose.model('Contact', Contact)