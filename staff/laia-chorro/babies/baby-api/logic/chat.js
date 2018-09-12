'use strict'

const { validate } = require('./validate.js')
const { LogicError } = require('./LogicError.js')
const { Chat, Message } = require('../data/models/index.js')

const chatLogic = {
    /**
     * Create a new chat from user interested in a product
     * 
     * 
     * @param {string} userId 
     * @param {string} productId
     */
    addChat(userId, productId) {
        return Promise.resolve()
            .then(() => {
                validate._objectId('user', userId)
                validate._objectId('product', productId)

                return User.findById(userId)
            })
            .then(user => {
                if (!user) throw new LogicError(`user with id: ${userId} does not exist`)

                return Product.findById(productId).select('user')
            })
            .then(productOwner =>
                User.findById(productOwner)
                    .then(user => {
                        if (!user) throw new LogicError(`user with id: ${productOwner} does not exist`)

                        return Chat.create({ users: [userId, productOwner], product: productId })
                    })
            )
            .then(chat => chat.id)
    },

    getChat(userId, chatId) {
        return Promise.resolve()
            .then(() => {
                validate._objectId('user', userId)
                validate._objectId('chat', chatId)

                return User.findById(userId)
            })
            .then(user => {
                if (!user) throw new LogicError(`user with id: ${userId} does not exist`)

                return Chat.findById(chatId)
            })
            .then(chat => {
                if (!chat.users.some(user => user.toString() === userId)) throw new LogicError(`user with id: ${userId} does not participate on chat with id: ${chatId}`)

                // TODO improve

                delete chat._id

                return chat
            })
    },

    listChats(userId) {
        return Promise.resolve()
            .then(() => {
                validate._objectId('user', userId)

                return User.findById(userId)
            })
            .then(user => {
                if (!user) throw new LogicError(`user with id: ${userId} does not exist`)

                return Chat.find({ users: userId })
            })
            .then(chats => chats.map(chat => {
                delete chat._id

                return chat
            }))
    },

    addMessageToChat(userId, chatId, text) {
        return Promise.resolve()
            .then(() => {
                validate._objectId('user', userId)

                return User.findById(userId)
            })
            .then(user => {
                if (!user) throw new LogicError(`user with id: ${userId} does not exist`)

                return Chat.findById(chatId)
            })
            .then(chat => {
                if (!chat.users.some(user => user.toString() === userId)) throw new LogicError(`user with id: ${userId} does not participate on chat with id: ${chatId}`)

                const message = new Message({ user: userId, text })

                chat.messages.push(message)

                return chat.save()
            })
            .then(() => true)
    }
}

module.exports = chatLogic