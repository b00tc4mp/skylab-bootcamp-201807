const { Schema } = require('mongoose')
const  Dish  = require ('./dish.js')

module.exports = new Schema({

    title: {
        type: String,
        required: true
    },

    dishes: [Dish]

})