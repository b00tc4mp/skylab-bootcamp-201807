const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

module.exports = new Schema({
    notebook: {
        type: ObjectId,
        ref: 'Notebook',
        required: true
    },
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
    }
})