require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { logic, LogicError } = require('./logic')
const jwt = require('jsonwebtoken')
const validateJwt = require('./helpers/validate-jwt')

const router = express.Router()

const jsonBodyParser = bodyParser.json()


//USER ROUTES//

// REGISTER OWNER

router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { email, password, name } } = req

    logic.register(email, password, name)
        .then(() => res.status(201).json({ message: 'owner registered' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })

})


// AUTHENTICATE OWNER

router.post('/authenticate', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticate(email, password)
        .then(() => {
            const { JWT_SECRET, JWT_EXP } = process.env

            const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: JWT_EXP })

            res.json({ message: 'owner authenticated', token })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})


// ADD PROPERTY

router.post('/owner/:email/property', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { title, photo, description, dimentions, categories, type } } = req

    logic.addProperty(email, title, photo, description, dimentions, categories, type)
        .then(() => res.json({ message: 'property added' }))
        .catch(err => {
            const { message } = err
            debugger

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// LIST PROPERTIES (ALL OR WITH FILTERS)

router.get('/listProperties', (req, res) => {
    const query = req.query

    if(query.hasOwnProperty('type') || query.hasOwnProperty('categories')) {
        const type = req.query.type
        const categories = req.query.categories ? req.query.categories.split('|') : undefined
    
        logic.listPropertyByQuery(type, categories)
            .then(properties => {
                res.status(200).json({status: 'OK', properties})
            })
            .catch(err => {
                const { message } = err

                res.status(err instanceof LogicError ? 400 : 500).json({ message })
            })
    } else {
        logic.listProperty()
            .then(properties => {
                res.status(200).json({status: 'OK', properties})
            })
            .catch(err => {
                const { message } = err
    
                res.status(err instanceof LogicError ? 400 : 500).json({ message })
            })
    }
})

// RETRIEVE PROPERTY BY ID

router.get('/retrievePropertyById/:email/property/:id', validateJwt, (req, res) => {
    const { params: { email, id } } = req

    logic.retrievePropertyById(email, id)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// UPDATE PROPERTY

router.patch('/updatePropertyById/:email/property/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email, id }, body: { title, photo, description, dimentions, categories, type } } = req
    logic.updatePropertyById(email, id, title, photo, description, dimentions, categories, type)
        .then(() => res.json({ message: 'property updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

module.exports = router


