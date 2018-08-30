const mongoose = require('mongoose')
const { Nutrition } = require('./schemas')

module.exports = mongoose.model('Nutrition', Nutrition)