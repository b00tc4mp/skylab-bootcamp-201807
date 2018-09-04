'use strict'

const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

function validatePassword(password) {
    if (password.length < 5) throw Error('password length is too short')
}

module.exports = new Schema({
    legal: false,

    name: {
        type: String,
    },

    web: String,

    boss: String,

    phone: String,

    email: {
        type: String,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unique: true
    },

    philosophy: {
        type: String,
    },

    password: {
        type: String,
        required: true,
        validate: validatePassword,
        trim: true
    },

    favs: [{
        type: ObjectId,
        ref: 'Hostess'
    }],

    selected: [{
        type: ObjectId,
        ref: 'Hostess'
    }]

})