'use strict'

const { Schema } = require('mongoose')

module.exports = new Schema({
    code: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})