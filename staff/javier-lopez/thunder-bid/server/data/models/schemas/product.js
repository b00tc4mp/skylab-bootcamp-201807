'use strict'

const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const bid = require('./bid')

module.exports = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    initialDate: {
        type: Date,
        required: true
    },

    finalDate: Date,

    initialPrice: {
        type: Number,
        required: true
    },

    closed: Boolean,

    image: String,
  
    category: {
        type: String,
        enum: ['Marvel', 'Music', 'Games', 'Technology', 'Movies']
    },

    bids: [bid]
})