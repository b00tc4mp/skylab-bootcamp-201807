'use strict'

const mongoose = require('mongoose')
const { Treatment } = require('./schemas')

module.exports = mongoose.model('Treatment', Treatment)