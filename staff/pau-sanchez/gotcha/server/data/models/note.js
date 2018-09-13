const mongoose = require('mongoose')
const { Note } = require('./schemas')

module.exports = mongoose.model('Note', Note)