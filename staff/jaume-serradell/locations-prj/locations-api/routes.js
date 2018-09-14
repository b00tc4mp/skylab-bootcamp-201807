require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { logic, LogicError } = require('./logic')
const jwt = require('jsonwebtoken')
const validateJwt = require('./helpers/validate-jwt')

const router = express.Router()

const jsonBodyParser = bodyParser.json({limit:'10mb'})


//USER ROUTES//

// REGISTER OWNER

router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { name, email, password } } = req

    logic.register(name, email, password)
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
        .then(id => {
            const { JWT_SECRET, JWT_EXP } = process.env

            const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: JWT_EXP })

            res.json({ message: 'owner authenticated', token, id })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

// UPDATE OWNER PASSWORD

router.patch('/owner/:email/profile', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { password, newPassword } } = req

    logic.updatePassword(email, password, newPassword)
        .then(() => res.json({ message: 'owner password updated succesfully' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//DELETE OWNER

router.delete('/owner/:email/unregister', [validateJwt, jsonBodyParser], (req, res) => {
    const { body: { email, password } } = req

    logic.unregisterOwner(email, password)
        .then(() => res.json({ message: 'owner deleted succesfully' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })

})

// ADD PROPERTY

router.post('/owner/:email/property', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { title, subtitle, photo, description, categories, type } } = req

    logic.addProperty(email, title, subtitle, photo, description, categories, type)
        .then(property => {
            const id = property.id

            res.json({ message: 'property added', id })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// LIST PROPERTIES (ALL OR WITH FILTERS)

router.get('/listProperties', (req, res) => {
    const query = req.query

    if (query.hasOwnProperty('type') || query.hasOwnProperty('categories')) {
        const type = req.query.type
        const categories = req.query.categories ? req.query.categories.split(',') : undefined

        logic.listPropertyByQuery(type, categories)
            .then(properties => {
                res.status(200).json({ status: 'OK', properties })
            })
            .catch(err => {
                const { message } = err

                res.status(err instanceof LogicError ? 400 : 500).json({ message })
            })
    } else {
        logic.listProperty()
            .then(properties => {
                res.status(200).json({ status: 'OK', properties })
            })
            .catch(err => {
                const { message } = err

                res.status(err instanceof LogicError ? 400 : 500).json({ message })
            })
    }
})

// RETRIEVE PROPERTY BY ID

router.get('/properties/:id', (req, res) => {
    const { params: { id } } = req

    logic.retrievePropertyById(id)
        .then(property => res.json({ property }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// UPDATE PROPERTY

router.patch('/owner/:email/property/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email, id }, body: { title, subtitle, photo, description, categories, type } } = req
    logic.updatePropertyById(email, id, title, subtitle, photo, description, categories, type)
        .then(() => res.json({ message: 'property updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//DELETE PROPERTY

router.delete('/owner/:email/property/:id', [validateJwt], (req, res) => {
    const { params: { email, id } } = req

    logic.deletePropertyById(email, id)
        .then(() => res.json({ message: 'property deleted succesfully' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//ADD PHOTO CLOUDINARY
router.patch('/upload', jsonBodyParser, (req, res) => {
    const {
        body: { base64Image },
    } = req;

    return logic._saveImage(base64Image)
        .then(photo => res.status(200).json({ status: 'OK', photo }))
        .catch((err) => {
            const { message } = err;
            res.status(err instanceof LogicError ? 400 : 500).json({ message });
        });
});


module.exports = router


