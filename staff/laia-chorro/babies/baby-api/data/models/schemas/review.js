'use strict'

const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const Review = new Schema({
    score: { type: Number, min: 1, max: 5 },

    user_from: { type: ObjectId },

    product: { type: ObjectId, ref: 'Product' },

    created_at: { type: Date, default: Date.now },

    description: { type: String, maxlength: 650 }
})

// Sets the created_at parameter equal to the current time
Review.pre('save', (next) => {
    let now = new Date()

    if (!this.created_at) { this.created_at = now }

    next()
})

module.exports = Review