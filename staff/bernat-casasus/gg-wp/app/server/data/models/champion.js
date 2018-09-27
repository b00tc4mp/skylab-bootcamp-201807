const mongoose = require('mongoose')
const Champion = require('./schemas/champion')

module.exports = mongoose.model('Champion', Champion)