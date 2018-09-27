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

    sort: {
        type: Number,
    }

})