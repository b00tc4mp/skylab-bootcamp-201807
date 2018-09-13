const mongoose = require('mongoose')
const { Notebook } = require('./schemas')

module.exports = mongoose.model('Notebook', Notebook)