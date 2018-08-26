'use strict'

const { Schema } = require('mongoose')
const patients = require('./patients')

module.exports = new Schema({
    code: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    patients: [patients]
})