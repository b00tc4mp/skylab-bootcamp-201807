'use strict'

const validate = require('./validate.js')
const LogicError = require('./LogicError.js')
const { Chat, Message, User, Product } = require('../data/models/index.js')

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
            .then(({user}) => 
                User.findById(user)
                    .then(user => {
                        if (!user) throw new LogicError(`user with id: ${user} does not exist`)
    
                        return Chat.create({ users: [userId, user.id], product: productId })
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
                    .populate({
                        path: 'product'
                        , select: 'title photos price description'
                        , options: { lean: true}
                        , populate: {
                            path: 'user'
                            , select: 'name'
                            , options: { lean: true}
                        }
                    }).
                    lean()
            })
            .then(chat => {
                if (!chat.users.some(user => user.toString() === userId)) throw new LogicError(`user with id: ${userId} does not participate on chat with id: ${chatId}`)

                // TODO improve
                chat.id = chat._id.toString()
                delete chat._id

                return chat
            })
    },

    listChatsByUserId(userId) {
        return Promise.resolve()
            .then(() => {
                validate._objectId('user', userId)

                return User.findById(userId)
            })
            .then(user => {
                if (!user) throw new LogicError(`user with id: ${userId} does not exist`)

                return Chat.find({ users: userId })
                    .populate({
                        path: 'product'
                        , select: 'title photos price description'
                        , options: { lean: true}
                        , populate: {
                            path: 'user'
                            , select: 'name'
                            , options: { lean: true}
                        }
                    }).
                    lean()
            })
            .then(chats => chats.map(chat => {

                chat.id = chat._id.toString()
                delete chat._id

                return chat
            }))
    },

    listChatsByProductId(productId) {
        return Promise.resolve()
            .then(() => {
                validate._objectId('product', productId)

                return Product.findById(productId)
            })
            .then(product => {
                if (!product) throw new LogicError(`product with id: ${productId} does not exist`)

                return Chat.find({ product: productId })
            })
            .then(chats => chats.map(chat => {
                chat.id = chat._id.toString()
                delete chat._id

                return chat
            }))
    },

    listChatByUserAndProdId(userId, productId) {
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
            .then(({user}) => {
                if (!user) throw new LogicError(`user with id: ${userId} does not exist`)

                return Chat.findOne({ users: userId, product: productId })
                        .populate({
                            path: 'product'
                            , select: 'title photos price description'
                            , options: { lean: true}
                            , populate: {
                                path: 'user'
                                , select: 'name '
                                , options: { lean: true}
                            }
                        }).
                        lean()
            })
            .then(chat => {
                chat.id = chat._id.toString()
                delete chat._id

                return chat
            })
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