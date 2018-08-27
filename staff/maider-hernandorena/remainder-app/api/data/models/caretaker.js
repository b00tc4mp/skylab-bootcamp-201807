'use strict'

const mongoose = require('mongoose')
const { Caretaker } = require('./schemas')

module.exports = mongoose.model('Caretaker', Caretaker)