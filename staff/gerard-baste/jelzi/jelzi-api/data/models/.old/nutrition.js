const { Schema } = require('mongoose')

module.exports = new Schema({
    label: {
        type:String,
        required:true
    },

    quantity: {
        type:Number,
        required:true
    },

    unit: {
        type:String,
        required:true
    },
})