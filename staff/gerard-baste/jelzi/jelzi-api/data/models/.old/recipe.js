
const { Schema, Schema: { ObjectId } } = require('mongoose')
const Nutrition = require('./nutrition')

module.exports = new Schema({
    recipeName: {
        type: String,
        required: true,
    },

    recipeImage:{
        type: String,
        required: true,
    },

    recipeUrl:{
        type: String,
        required: true,
    },

    recipeYield:{
        type: Number,
        required: true,
    },

    recipeIngredients:{
        type:Array,
        required: true,
    },

    recipeTime:{
        type:Number,
        required: true,
    },

    recipeCalories:{
        type:Number,
        required: true,
    },

    user:{
        type: ObjectId,
        ref: 'User',
        required: true,
    },

    nutritions: [Nutrition]
})