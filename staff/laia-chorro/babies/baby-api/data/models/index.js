const mongoose = require('mongoose')

const { User, Product, Review, Chat, Message } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Product: mongoose.model('Product', Product),
    Review: mongoose.model('Review', Review),
    Chat: mongoose.model('Chat', Chat),
    Message: mongoose.model('Message', Message)
}