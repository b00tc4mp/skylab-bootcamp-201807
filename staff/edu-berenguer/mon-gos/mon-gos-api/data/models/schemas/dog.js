'use strict'

const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        enum: ['female', 'male'],
        required: true
    },

    age: {
        type: Number,
        required: false
    },

    weight: {
        type: Number,
        required: false
    },

    photo:{
        type: String,
        required: true
    },

    description:{
        type: String,
        maxlength: 1000,
        required: true
    },

    adopted:{ 
        type: Boolean, 
        default: false 
    },

    shelter: {
        type: ObjectId,
        ref: 'shelter',
        required: true
    }
})