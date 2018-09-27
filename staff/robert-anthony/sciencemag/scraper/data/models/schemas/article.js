'use strict'

const { Schema } = require('mongoose')

module.exports = new Schema({
  src:  String,

  headline: String,

  author: String,

  date:Date,

  content: String
})