const { Schema } = require('mongoose')

module.exports = new Schema({
    parking: {
        type: Boolean,
        default: false
    },

    chargeZone: {
        type: Boolean,
        default: false
    },

    elevator: {
        type: Boolean,
        default: false
    },

    office: {
        type: Boolean,
        default: false
    },

    kitchen: {
        type: Boolean,
        default: false
    },

    bathroom: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },

    rooms: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },

    furniture: {
        type: Boolean,
        default: false
    }
})