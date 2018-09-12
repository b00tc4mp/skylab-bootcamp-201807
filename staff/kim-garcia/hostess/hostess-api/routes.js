// CRUD
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { logic, LogicError } = require('./logic')
const jwt = require('jsonwebtoken')
const validateJwt = require('./helpers/validate-jwt')

const router = express.Router()

const jsonBodyParser = bodyParser.json()

router.post('/hostess-register', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.registerHostess(email, password)
        .then(() => res.status(201).json({ message: 'hostess registered' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.post('/business-register', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.registerBusiness(email, password)
        .then(() => res.status(201).json({ message: 'business registered' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.post('/hostess-auth', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticateHostess(email, password)
        .then(() => {
            const { JWT_SECRET, JWT_EXP } = process.env

            const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: JWT_EXP })

            res.json({ message: 'hostess authenticated', token })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

router.post('/business-auth', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticateBusiness(email, password)
        .then(() => {
            const { JWT_SECRET, JWT_EXP } = process.env

            const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: JWT_EXP })

            res.json({ message: 'business authenticated', token })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

router.get('/hostess-details/:email', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }} = req

    logic.retrieveHostess(email)
    .then(hostesses => res.status(200).json({ status: 'OK', hostesses }))
    .catch(err => {
        const { message } = err

        res.status(err instanceof LogicError ? 400 : 500).json({ message })
    })
})

router.get('/business-details/:email', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }} = req

    logic.retrieveBusiness(email)
    .then(businesses => res.status(200).json({ status: 'OK', businesses }))
    .catch(err => {
        const { message } = err

        res.status(err instanceof LogicError ? 400 : 500).json({ message })
    })
})



router.patch('/hostess-edit/:email', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { password, newPassword } } = req

    logic.updatePasswordHostess(email, password, newPassword)
        .then(() => res.json({ message: 'password updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.patch('/business-edit/:email', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { password, newPassword } } = req

    logic.updatePasswordBusiness(email, password, newPassword)
        .then(() => res.json({ message: 'password updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.patch('/hostess/:email', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { name, birth, origin, gender, phone, languages, jobType, skills, height, myself, photo } } = req

    logic.editHostessProfile(email, name, birth, origin, gender, phone, languages, jobType, height, myself, skills, photo)
        .then(() => res.json({ message: 'hostess profile updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.patch('/business/:email', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { name, web, boss, phone, philosophy } } = req

    logic.editBusinessProfile(email, name, web, boss, phone, philosophy)
        .then(() => res.json({ message: 'company profile updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.delete('/unregister-hostess/:email', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { password } } = req

    logic.unregisterHostess(email, password)
        .then(() => res.json({ message: 'hostess deleted succesfully' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.delete('/unregister-business/:email', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { password } } = req

    logic.unregisterBusiness(email, password)
        .then(() => res.json({ message: 'company deleted succesfully' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


router.get('/:email/search', [validateJwt, jsonBodyParser], (req, res) => {
    const email = req.params.email
    const gender = req.query.gender
    const jobType = req.query.jobType
    const height = JSON.parse(req.query.height) 

    const languages = req.query.languages ? req.query.languages.split('|') : undefined

    logic.searchWorkers(email, gender, jobType, height, languages)
        .then(hostesses => {
            res.status(200).json({ status: 'OK', hostesses })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


router.post('/favorites/:email', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { emailHost } } = req

    logic.addFavs(emailHost, email)
        .then(() => {
            res.status(200).json({ status: 'OK' })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


router.post('/select/:email', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { emailHost } } = req

    logic.addHostess(email, emailHost)
        .then(() => {
            res.status(200).json({ status: 'OK' })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.post('/create-event/:email', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { date, location, title, description } } = req

    logic.createEvent(email, date, location, title, description)
        .then(id => {
            res.status(200).json({ status: 'OK', id })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.get('/event/:id', (req, res) => {
    const { params: { id } } = req

    logic.retrieveEventById(id)
    .then(event => {
        res.status(200).json({ status: 'OK', event })
    })
    .catch(err => {
        const { message } = err

        res.status(err instanceof LogicError ? 400 : 500).json({ message })
    })    
})




module.exports = router

