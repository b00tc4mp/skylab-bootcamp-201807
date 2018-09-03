require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { logicProduct, logicUser, LogicError } = require('../logic')
const validateJwt = require('../helpers/validate-jwt')
//const fileUpload = require('express-fileupload')

const multer  = require('multer')
const upload = multer()


const productRouter = express.Router()

const jsonBodyParser = bodyParser.json()

//TODO use upload.array() from multer to filter how many files can be pass as form-data
productRouter.post('/prod/:user', [validateJwt, upload.any()], (req, res) => {
    const { params: { user }, body: { title, description, price, cathegory, location }, files } = req

    if (files) {
        const data = { title, description, price: JSON.parse(price), cathegory, location: JSON.parse(location) }

        logicProduct.addProduct(user, data, files)
            .then(productId => logicUser.addProduct(user, productId))
            .then(product => res.status(200).json({ message: 'product uploaded', user, product }))
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

    logicProduct.listProductById(prod)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

productRouter.patch('/prod/:prod/views', (req, res) => {
    const { params: { prod } } = req

    logicProduct.incrementViews(prod)
        .then(() => res.json({ message: 'product visit incremented', product: prod }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

productRouter.get('/prod', (req, res) => {
    const { query } = req

    logicProduct.listFilteredProducts(query)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


module.exports = productRouter