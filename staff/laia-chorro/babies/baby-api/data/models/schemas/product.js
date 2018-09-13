'use strict'

const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

//TODO: "sale_conditions":{"fix_price":false,"exchange_allowed":false,"shipping_allowed":false}

const Product = new Schema({

    user: { type: ObjectId, ref: 'User', required: true },

    title: { type: String, required: true, maxlength: 50 },

    description: { type: String, required: true, maxlength: 650 },

    price: { type: Number, required: true, min: 0, max: 30000 },

    state: { type: String, enum: ['sold', 'reserved', 'pending', 'expired', 'removed'], default: 'pending' },

    cathegory: { type: String, required: true, default: 'general' },

    // Indexes this schema in 2dsphere format (critical for running proximity searches)
    location: { type: [Number], required: true, default: [-3.703790, 40.416775], index: '2dsphere' }, // [Long, Lat]

    photos: { type: [String], required: true },

    num_favs: { type: Number, default: 0, min: 0, max: 30000 },

    num_views: { type: Number, default: 0, min: 0, max: 30000 },

    created_at: { type: Date, default: Date.now },

    updated_at: { type: Date, default: Date.now }
})

Product.index({title: 'text', description: 'text'});

// Sets the created_at parameter equal to the current time
Product.pre('save', (next) => {
    let now = new Date()

    this.updated_at = now

    if (!this.created_at) { this.created_at = now }

    next()
})

module.exports = Product