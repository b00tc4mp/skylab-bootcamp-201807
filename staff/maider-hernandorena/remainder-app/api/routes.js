require('dotenv').config()

const { logic, LogicError } = require('./logic')
const express = require('express')
const jwt = require('jsonwebtoken')
const verifyJwt = require('./helpers/jwt')
const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()
const router = express.Router()


router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { code, password } } = req

    logic.registerDoctor(code, password)
        .then(() => res.status(201).json({ message: 'doctor registered correctly' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { code, password } } = req

    logic.authenticateDoctor(code, password)
        .then(doctor => {
            const { JWT_SECRET, JWT_EXP } = process.env
            const token = jwt.sign({ sub: doctor.id }, JWT_SECRET, { expiresIn: JWT_EXP })
            const id = doctor.id
    
            res.json({ message: 'doctor authenticated', token, id })
        })
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


module.exports = router