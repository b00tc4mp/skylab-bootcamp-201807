
const { Schema } = require('mongoose')

module.exports = new Schema({
    
    id: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    key: {
        type: String,
        required: true,
    },

    icon: {
        type: String,
        required: true,
    }

})