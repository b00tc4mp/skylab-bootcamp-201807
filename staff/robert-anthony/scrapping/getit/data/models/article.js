const mongoose = require('mongoose')
const { Article } = require('./schemas')

module.exports = mongoose.model('Article', Article)