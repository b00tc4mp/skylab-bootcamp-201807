'use strict'

const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

module.exports = new Schema({
    date: {
        type: Date,
        required: true
    },

    text: {
        type: String,
        required: true,
        maxlength: 1000
    },

    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
})