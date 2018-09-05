'use strict'

const { Schema } = require('mongoose')

module.exports = new Schema({
    pill: {
        type: String,
        required: true
    },

    quantity: {
        type: String,
        required: true
    },

    frequency: {
        type: String,
        required: true
    },

    text: {
        type: String,
        maxlength: 1000
    }
})