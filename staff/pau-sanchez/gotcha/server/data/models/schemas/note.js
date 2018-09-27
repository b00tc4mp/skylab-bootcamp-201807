const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

module.exports = new Schema({
    seconds: {
        type: Number,
        required: true
    },
    notetitle: {
        type: String,
        required: true,
        maxlength: 1000
    },

    notetext: {
        type: String,
        required: false
    },
    notebook: {
        type: ObjectId,
        ref: 'Notebook',
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
})