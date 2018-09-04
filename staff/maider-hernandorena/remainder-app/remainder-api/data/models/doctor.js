'use strict'

const mongoose = require('mongoose')
const { Doctor } = require('./schemas')

module.exports = mongoose.model('Doctor', Doctor)