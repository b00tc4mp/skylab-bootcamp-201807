require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { logic, LogicError } = require('./logic')
const jwt = require('jsonwebtoken')
const validateJwt = require('./helpers/validate-jwt')

const router = express.Router()

const jsonBodyParser = bodyParser.json()

router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { name, surname, email, password } } = req

    logic.register(name, surname, email, password)
        .then(() => res.status(201).json({ message: 'user registered' }))
        .catch(err => {
            const {message} = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.post('/authenticate', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticate(email, password)
        .then(() => {
            const { env: {JWT_SECRET, JWT_EXP} } = process
            const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: JWT_EXP })

            res.status(200).json({message: 'user authenticated', token})
    })
    .catch(err => {
        const { message } = err
        res.status(err instanceof LogicError ? 401 : 500).json({ message })
    })
})

router.get('/user/:email/:year/:month/:day/notes', validateJwt, (req , res) => {
    const { params: { email, year, month, day } } = req
    const date = year + "/" + month + "/" + day

    logic.listNotes(email, date)
        .then(notes => res.json(notes))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })

})

router.post('/user/:email/notes', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { date, text } } = req

        logic.saveNote(email, date, text)
            .then(() => res.status(201).json({ message: 'note saved'}))
            .catch(err => {
                const { message } = err
                res.status(err instanceof LogicError ? 400 : 500).json({ message })
            })
})

router.get('/user/:email/contacts', validateJwt, (req , res) => {
    const { params: { email } } = req

    logic.listContacts(email)
        .then(contacts => res.json(contacts))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })

})

router.post('/user/:email/contacts', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { cname, csurname, cphone, cemail, caddress } } = req

        logic.saveContact(email, cname, csurname, cphone, cemail, caddress)
            .then(() => res.status(201).json({ message: 'contact saved'}))
            .catch(err => {
                const { message } = err
                res.status(err instanceof LogicError ? 400 : 500).json({ message })
            })
})

module.exports = function (db) {
    logic._users = db.collection('users')

    return router
}