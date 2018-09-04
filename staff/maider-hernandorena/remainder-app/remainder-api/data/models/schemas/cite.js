'use strict'

const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String
    },

    date: {
        type: Date,
        required: true
    },

    doctor: {
        type: ObjectId,
        ref: 'Doctor',
        required: true
    },

    patient: {
        type: ObjectId,
        ref: 'Patient',
        required: true
    }
})