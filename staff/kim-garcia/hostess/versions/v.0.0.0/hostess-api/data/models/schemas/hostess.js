const { Schema } = require('mongoose')

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

    photo: {
        type: String,
    },

    name: {
        type: String,
    },

    birth: {
        type: Date,
    },

    origin: String,

    gender: {
        type: String,
        enum: ['W', 'M'],
    },

    phone: {
        type: String,
        trim: true
    },

    languages: [String],

    jobType: {
        type: String,
        enum: ['info', 'image', 'sells', 'animation']
    },

    skills: [String],

    height: {
        type: Number,
        min: 120,
        max: 250
    },

    myself: {
        type: String,
        maxlength: 300,
        lowercase: true,
    },

})