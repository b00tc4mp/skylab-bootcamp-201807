const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

module.exports = new Schema({

    location: String,

    date: String,

    hours: String,

    salary: String,

    title: String,

    goal: String,

    briefing: String,

    contactName: String, 

    contactPhone: String,

    business: {
        type: ObjectId,
        ref: 'Business'
    },

    candidates: [{
        type: ObjectId,
        ref: 'Hostess'
    }],

    approved: [{
        type: ObjectId,
        ref: 'Hostess'
    }],

    confirmed: [{
        type: ObjectId,
        ref: 'Hostess'
    }],

})
