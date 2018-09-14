
const { Schema } = require('mongoose')

module.exports = new Schema(

    {
        key: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        }
    }

)