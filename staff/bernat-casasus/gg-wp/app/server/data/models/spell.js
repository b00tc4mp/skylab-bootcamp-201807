const mongoose = require('mongoose')
const Spell = require('./schemas/spell')

module.exports = mongoose.model('Spell', Spell)