const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

module.exports = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    notebooktitle: {
        type: String,
        required: true
    },
    videotitle: {
        type: String,
        required: true
    },
    videoid: {
        type: String,
        required: true
    },
    videourl:{
        type: String,
        required: true
    },
    videothumbnail:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
