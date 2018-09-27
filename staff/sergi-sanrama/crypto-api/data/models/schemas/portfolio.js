const {Schema} = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
    },

    value: Number,
    
    date: Date,

    coinId: String

})