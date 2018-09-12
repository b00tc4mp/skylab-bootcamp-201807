'use strict'

const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const Message = require('./message')

const Chat = new Schema({
    users: [{ type: ObjectId, ref: 'User' }],

    product: { type: ObjectId, ref: 'Product' },

    created_at: { type: Date, default: Date.now },
    
    messages: [Message]
})

// Sets the created_at parameter equal to the current time
Chat.pre('save', (next) => {
    let now = new Date()

    if (!this.created_at) { this.created_at = now }

    next()
})

module.exports = Chat