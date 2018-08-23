'use strict'

const { Schema } = require('mongoose')

module.exports = new Schema({
  src: {
    type: String,
  },

  headline: String,

  author: String,

  content: String
})