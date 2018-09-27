const mongoose = require('mongoose')
const { Hostess } = require('./schemas')

module.exports = mongoose.model('Hostess', Hostess)