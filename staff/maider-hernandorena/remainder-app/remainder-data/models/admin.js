'use strict'

const mongoose = require('mongoose')
const { Admin } = require('./schemas')

module.exports = mongoose.model('Admin', Admin)