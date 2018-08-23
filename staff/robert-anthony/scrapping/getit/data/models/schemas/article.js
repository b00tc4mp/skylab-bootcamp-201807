'use strict'

const { Schema } = require('mongoose')

module.exports = new Schema({
  imge: {
    type: String,
  },

  headline: String,

  author: String,

  contant: String
})