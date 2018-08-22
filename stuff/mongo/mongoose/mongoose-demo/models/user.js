'use strict'

const mongoose = require('mongoose')
const User = require('./schemas/user')

module.exports = mongoose.model('User', User)