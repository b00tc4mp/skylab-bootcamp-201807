require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { productLogic, userLogic, LogicError } = require('../logic')
const validateJwt = require('../helpers/validate-jwt')
//const fileUpload = require('express-fileupload')

const multer  = require('multer')
const upload = multer()

const productRouter = express.Router()

const jsonBodyParser = bodyParser.json()

//TODO use upload.array() from multer to filter how many files can be pass as form-data
productRouter.post('/me/prod/:user', [validateJwt, upload.any()], (req, res) => {
    const { params: { user }, body: { title, description, price, cathegory, longitude, latitude }, files } = req

    if (files) {
        const location = [JSON.parse(longitude), JSON.parse(latitude)]
        const data = { title, description, price: JSON.parse(price), cathegory, location }

        productLogic.addProduct(user, data, files)
            .then(productId => userLogic.addProduct(user, productId))
            .then(product => res.status(201).json({ message: 'product uploaded', user, product }))
            .catch((err) => {
                const { message } = err
                res.status(err instanceof LogicError ? 400 : 500).json({ message })
            })
    } else {
        res.status(418).json({ message: 'no image received' })
    }
})

productRouter.get('/prod/:prod', (req, res) => {
    const { params: { prod } } = req

    productLogic.listProductById(prod)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

productRouter.patch('/prod/:prod/views', (req, res) => {
    const { params: { prod } } = req

    productLogic.incrementViews(prod)
        .then(() => res.json({ message: 'product visit incremented', product: prod }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// TODO: location will not be an array, will be both long and lat int fields
productRouter.get('/prod', (req, res) => {
    const { query } = req

    if (query.dist) req.query.dist = JSON.parse(query.dist)
    if (query.minVal) req.query.minVal = JSON.parse(query.minVal)
    if (query.maxVal) req.query.maxVal = JSON.parse(query.maxVal)
    if (query.long) req.query.long = JSON.parse(query.long)
    if (query.lat) req.query.lat = JSON.parse(query.lat)

    productLogic.listFilteredProducts(query)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

productRouter.patch('/me/:user/prod/:prod/state', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { prod, user }, body: { state } } = req

    productLogic.updateStateProd(user, prod, state)
        .then(() => res.json({ message: `product state updated to ${state}`, product: prod }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

module.exports = productRouter