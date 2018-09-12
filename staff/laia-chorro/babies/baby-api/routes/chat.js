require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { chatLogic, LogicError } = require('../logic')
const validateJwt = require('../helpers/validate-jwt')

const chatRouter = express.Router()

const jsonBodyParser = bodyParser.json()

chatRouter.post('/me/:user/chat', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { user }, body: { product } } = req

    chatLogic.addChat(user, product)
        .then(chat => res.status(201).json({ message: 'chat created', chat }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

chatRouter.post('/me/:user/chat/:chat/message', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { user, chat }, body: { text } } = req

    chatLogic.addMessageToChat(user, chat, text)
    .then(() => res.status(201).json({ message: 'message added to chat' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

chatRouter.get('/me/:user/chat/:chat', validateJwt, (req, res) => {
    const { params: { user, chat } } = req

    chatLogic.getChat(user, chat)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

chatRouter.get('/me/:user/chat', validateJwt, (req, res) => {
    const { params: { user } } = req

    chatLogic.listChats(user)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

module.exports = chatRouter