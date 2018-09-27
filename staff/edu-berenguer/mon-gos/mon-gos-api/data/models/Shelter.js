const mongoose = require('mongoose')
const { Shelter } = require('./schemas')

module.exports = mongoose.model('Shelter', Shelter)