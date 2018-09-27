'use strict'

const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

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