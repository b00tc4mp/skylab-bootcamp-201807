const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

module.exports = new Schema({
    title: {
        type: String,
        required: true
    },

    subtitle: {
        type: String,
    },

    photo: {
        type: String,
        requiered: true
    },

    description: {
        type: String,
        maxlength: 1000
    },

    categories: [{
        type: String,
        enum: [
            'Events',
            'Films',
            'Shootings',
            'Movies',
            'Spots',
            'Balcony', 
            'Bathroom',
            'Kitchen',
            'Dinning Room',
            'Office',
            'Views City',
            'Classic Style',
            'Forest Views',
            'Modern Style',
            'Parking',
            'Garden',
            'Pool',
            'Elevator',
            'Sea Views',
            'Living Room',
            'Industrial',
            'Wood Floor',
            'Terrace'
        ],
        required: true
    }],

    type: {
        type: String,
        enum: [
            'Penthouse',
            'Houses',
            'Events Spaces',
            'Singular Spaces',
            'Loft',
            'Flats'
        ],
        required: true
    },

    owner: {
        type: ObjectId,
        ref: 'Owner',
        required: true
    }
})