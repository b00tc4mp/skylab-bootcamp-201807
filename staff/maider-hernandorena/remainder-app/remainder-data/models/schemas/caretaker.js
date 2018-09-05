'use strict'

const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

module.exports = new Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    surname: {
        type: String
    },

    gender: {
        type: String,
        enum: ['female', 'male', 'other']
    },

    phone: {
        type: Number,
        match: /^[0-9]+$/,
        maxlength: 9
    },

    patients: {
        type: ObjectId,
        ref: 'Patient'
    }
})