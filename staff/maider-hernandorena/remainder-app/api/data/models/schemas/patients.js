'use strict'

const { Schema } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        enum: ['female', 'male', 'other'],
        required: true
    },

    address: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        match: /^[0-9]+$/,
        maxlength: 9,
        required: true
    },

    illness: {
        type: String
    },

    pills: {
        type: String
    }, 

    cites: {
        type: Date
    }
})