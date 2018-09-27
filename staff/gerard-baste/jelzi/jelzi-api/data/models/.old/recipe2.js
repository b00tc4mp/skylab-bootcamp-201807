const mongoose = require('mongoose')
const { Recipe } = require('./schemas')

module.exports = mongoose.model('Recipe', Recipe)