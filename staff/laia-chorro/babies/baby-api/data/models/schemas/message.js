'use strict'

const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const Message = new Schema({
    user: { type: ObjectId, ref: 'User' },

    created_at: { type: Date, default: Date.now },

    text: { type: String, maxlength: 100 }
})

// Sets the created_at parameter equal to the current time
Message.pre('save', (next) => {
    let now = new Date()

    if (!this.created_at) { this.created_at = now }

    next()
})

module.exports = Message