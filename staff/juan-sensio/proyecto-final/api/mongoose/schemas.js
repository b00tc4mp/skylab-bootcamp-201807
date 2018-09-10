const { Schema } = require('mongoose')

const Video = new Schema({
    name: {
        type: String,
        required: true
    }
})

const Dataset = new Schema({
    name: {
        type: String,
        required: true
    }
})

const Result = new Schema({
    name: {
        type: String,
        required: true
    }
})

const Model = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    source: {
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
    videos: [],
    datasets: [],
    results: [],
    models: []
})

module.exports = {
    Video,
    Dataset,
    Result,
    Model,
    User
}