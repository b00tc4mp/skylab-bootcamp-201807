const mongoose = require('mongoose')
const { Dish } = require('./schemas')

module.exports = mongoose.model('Dish', Dish)