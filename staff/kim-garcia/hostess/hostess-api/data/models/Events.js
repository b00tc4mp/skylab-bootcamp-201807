const mongoose = require('mongoose')
const { Events } = require('./schemas')

module.exports = mongoose.model('Events', Events)