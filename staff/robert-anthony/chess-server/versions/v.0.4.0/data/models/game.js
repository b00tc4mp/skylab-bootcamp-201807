const mongoose = require('mongoose')
const { Game } = require('./schemas')

module.exports = mongoose.model('Game', Game)