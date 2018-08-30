const { Schema } = require('mongoose')

module.exports = new Schema({
    
    titleDish: {
        type:String,
        required:true
    },

    recipeId: {
        type: String,
        required: true,
    },

    order: {
        type: Number,
    }

})