const mongoose = require('mongoose')
const { Menu } = require('./schemas')

module.exports = mongoose.model('Menu', Menu)