'use strict'

const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String
    },

    dni:{
        type: String,
        required: true
    },

    age: {
        type: Number
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
        ref: 'patients'
    }
})