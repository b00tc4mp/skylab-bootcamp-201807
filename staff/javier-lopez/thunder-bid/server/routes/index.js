'use strict'

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const {logic} = require('../logic')
const validateJwt = require('./helpers/validate-jwt')
const sockets = require('../sockets')

const router = express.Router()
const jsonBodyParser = bodyParser.json()

router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { email, password, name, surname } } = req

    logic.register(email, password, name, surname)
        .then(() => {
            res.status(201)
            res.json({ status: 'OK'})
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof Error ? 400 : 500).json({ message })
        })
})

router.post('/login', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticate(email, password)
        .then(({ _id }) => {
            const { JWT_SECRET, JWT_EXP } = process.env

            const token = jwt.sign({ sub: _id }, JWT_SECRET, { expiresIn: JWT_EXP })

            res.json({ message: 'user authenticated', token, id: _id})
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof Error ? 401 : 500).json({ message })
        })
})

//Show product by id
router.get('/product/:productId',  (req, res) =>{
    const { params: { productId} } = req

    return logic.retrieveProduct(productId)
        .then(product => {
            res.status(200).json({ data: product})
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof Error ? 400 : 500).json({ message })
        })
})

//Show user by id
router.get('/user/:userId', validateJwt, (req, res) =>{
    const { params: { userId} } = req

    return logic.retrieveUser(userId)
        .then(user => {
            res.status(200).json({ data: user})
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof Error ? 400 : 500).json({ message })
        })
})

//Show bidded products of a user
router.get('/user/bidded/:userId', validateJwt, (req, res) => {
    const { params: { userId } } = req

    return logic.listUserBiddedProducts(userId)
        .then(products => {
            res.status(200).json({ data: products })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof Error ? 400 : 500).json({ message })
        })
})

//Show wished products of a user
router.get('/user/wishes/:userId', validateJwt, (req, res) => {
    const { params: { userId } } = req

    logic.listUserWishes(userId)
        .then(products => {
            res.status(200).json({ data: products })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof Error ? 400 : 500).json({ message })
        })
})

//Add a bid
router.post('/product/:productId/bid/:userId', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { productId, userId }, body: { price } } = req

    logic.addBid(productId, userId, price)
        .then(() => {
            res.status(201).json({status: 'OK', message : 'Bid added correctly' })
            
            sockets.io.emit('fetch price')            
        })
        .catch(err => {         

            const { message } = err
            
            res.status(err instanceof Error ? 400 : 500).json({ message })
        })
})

//Add a wish
router.post('/product/:productId/wish/:userId', validateJwt, (req, res) => {
    const { params: {productId, userId } } = req

    logic.addWish(productId, userId)
        .then(() => {
            res.status(201).json({ message : 'Wish added correctly' })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof Error ? 400 : 500).json({ message })
        })
})

//Delete a wish
router.delete('/product/:productId/wish/:userId', validateJwt, (req, res) => {
    const { params: { productId, userId } } = req

    logic.deleteWish(productId, userId)
    .then(() => res.json({ message: 'Wish deleted correctly'}))
    .catch(err => {
        const { message } = err

        res.status(err instanceof Error ? 400 : 500).json({ message })
    })
})

//List all products
router.get('/products', (req, res) => {
    const { query: { q, c} } = req

    return logic.listProducts(q, c)
        .then(products => {
            res.status(200).json({ data: products})
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof Error ? 404 : 500).json({ message })
        })
})

module.exports = router