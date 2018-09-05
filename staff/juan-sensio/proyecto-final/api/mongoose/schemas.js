const { Schema } = require('mongoose')

const Video = new Schema({
    name: {
        type: String,
        required: true
    }
})

const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    videos: []
})



module.exports = { Video, User }