const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const Review = require('./review')

function validatePassword(password) {
    if (password.length < 6) throw Error('password length is too short')
    if (/\s/.test(password)) throw Error('password cannot contain any space')
}

const User = new Schema({

    email: {
        type: String,
        required: true,
        trim: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unique: true
    },

    password: { type: String, trim: true, required: true, validate: validatePassword },

    name: { type: String },

    surname: { type: String },

    photo: { type: String },

    birth: { type: Date },

    gender: { type: String, enum: ['female', 'male', 'other'] },

    // Indexes this schema in 2dsphere format (critical for running proximity searches)
    location: { type: [Number], default: [-3.703790, 40.416775], index: '2dsphere' }, // [Long, Lat]

    created_at: { type: Date, default: Date.now },

    updated_at: { type: Date, default: Date.now },

    favs: [{ type: ObjectId, ref: 'Product' }],

    products: [{ type: ObjectId, ref: 'Product' }],

    reviews: [Review],

    feedbacks: [{ type: ObjectId, ref: 'Product' }],
})

// Indexes this schema in 2dsphere format (critical for running proximity searches)
//User.index({location: '2dsphere'})

// Sets the created_at parameter equal to the current time
User.pre('save', (next) => {
    let now = new Date()

    this.updated_at = now

    if (!this.created_at) { this.created_at = now }

    next()
})

module.exports = User