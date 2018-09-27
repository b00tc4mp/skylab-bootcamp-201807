const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

module.exports = new Schema({

    location: String,

    date: {
        type: Date,
        default: Date.now
    },

    photos: String,

    title: String,

    description: String,

    business: {
        type: ObjectId,
        ref: 'Business'
    },

    hostesses: [{
        type: ObjectId,
        ref: 'Hostess'
    }]

})
