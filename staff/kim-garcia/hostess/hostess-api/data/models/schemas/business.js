'use strict'

const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

function validatePassword(password) {
    if (password.length < 3) throw Error('use 3 characters or more for your password')
}

module.exports = new Schema({

    email: {
        type: String,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unique: true
    },

    password: {
        type: String,
        required: true,
        validate: validatePassword,
        trim: true
    },

    name: String,

    web: String,

    boss: String,

    phone: String,

    philosophy: String,

    events: [{
        type: ObjectId,
        ref: 'Events'
    }],

    businessCard: String

})