'use strict'

const mongoose = require('mongoose')
const { Patient } = require('./schemas')

module.exports = mongoose.model('Patient', Patient)