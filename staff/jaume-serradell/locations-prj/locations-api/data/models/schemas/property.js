const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

module.exports = new Schema({
    title: {
        type: String,
        required: true
    },

    subtitle: {
        type: String
    },

    photo: {
        type: String,
        requiered: true
    },

    description: {
        type: String,
        required: true,
        maxlength: 1000
    },

    dimentions: {
        type: Number,
        required: true
    },

    categories: [{
        type: String,
        enum: ['Balcony', 'Bathroom', 'Kitchen', 'Dinning room', 'Office', 'Adult Bedroom', 'Child\'s bedroom', 'Abandoned Style'],
        required: true
    }],

    type: {
        type: String,
        enum: ['Penthouse', 'Houses', 'Events Spaces', 'Singular Spaces', 'Loft', 'Flats'],
        required: true
    },

    owner: {
        type: ObjectId,
        ref: 'Owner',
        required: true
    }
})