'use strict'

const mongoose = require('mongoose')
const { Patients } = require('./schemas')

module.exports = mongoose.model('patients', Patients)