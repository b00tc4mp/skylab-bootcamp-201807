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
            'Balcony', 
            'Bathroom',
            'Kitchen',
            'Dinning room',
            'Office',
            'Adult Bedroom',
            'Child\'s bedroom',
            'Abandoned Style',
            'Clasic Style',
            'Industrial Style',
            'Modernist Style',
            'Modern Style',
            'Events',
            'Parking',
            'Garden',
            'Office',
            'Pool',
            'Films',
            'Meeting Room',
            'Living room',
            'Shootings',
            'Ceramic floor / Stoneware',
            'Industrial floor',
            'Wood floor',
            'Terrace / Exterior Zone',
            'Forest Views',
            'Views City',
            'Sea views',
            'Movies',
            'Spots'
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