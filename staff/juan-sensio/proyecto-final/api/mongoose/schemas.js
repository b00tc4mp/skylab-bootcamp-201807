const { Schema } = require('mongoose')

const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    // videos: [Videos]
})

module.exports = { User }