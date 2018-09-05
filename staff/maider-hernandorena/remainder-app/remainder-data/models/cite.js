'use strict'

const mongoose = require('mongoose')
const { Cite } = require('./schemas')

module.exports = mongoose.model('Cite', Cite)