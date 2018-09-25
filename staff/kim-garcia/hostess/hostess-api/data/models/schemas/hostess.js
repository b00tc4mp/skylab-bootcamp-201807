'use strict'

const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

function validatePassword(password) {
    if (password.length < 5) throw Error('password lenght is too short')
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
        trim: true,
    }, 

    photo: String,

    name: String,

    birth: Date,

    origin: String,

    phone: {
        type: String,
        trim: true
    },

    gender: {
        type: String,
        enum: ['W', 'M'],
    },

    languages: [String],

    jobType: {
        type: String,
        enum: ['info', 'image', 'sells', 'animation']
    },

    myself: {
        type: String,
        maxlength: 300,
    },

    requests: [{
        type: ObjectId,
        ref: 'Business'
    }],

    accepted: [{
        type: ObjectId,
        ref: 'Business'
    }],

    toConfirm: [{
        type: ObjectId,
        ref: 'Events'
    }],

    toAssist: [{
        type: ObjectId,
        ref: 'Events'
    }],
    
})