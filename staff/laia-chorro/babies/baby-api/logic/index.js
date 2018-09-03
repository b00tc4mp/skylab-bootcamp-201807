const { user } = require('./user.js')
const { LogicError } = require('./LogicError.js')
const { validate } = require('./validate.js')
const { product } = require('./product.js')
const { logicCloudinary } = require('./cloudinary.js')

module.exports = { 
    logicUser: user, 
    logicProduct: product,
    LogicError,
    validate,
    logicCloudinary
}