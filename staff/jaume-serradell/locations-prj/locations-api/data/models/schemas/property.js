const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const Feature = require('./Feature')

module.exports = new Schema({
    title: {
        type: String,
        required: true
    },

    subtitle: {
        type: String
    },

    photo: {
        type: String
    },

    description: {
        type: String,
        required: true,
        maxlength: 1000
    },

    dimentions: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ['Apartment', 'Event Spaces', 'House', 'Loft', 'Penthouse', 'Showrooms'],
        required: true
    },

    event: {
        type: String,
        enum: ['Movies', 'Showrooms', 'Spots', 'Shootings'],
        required: true
    },

    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    features: [Feature]
})