require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { logic, LogicError } = require('./logic')
const jwt = require('jsonwebtoken')
const validateJwt = require('./helpers/validate-jwt')

const router = express.Router()

const jsonBodyParser = bodyParser.json()

router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    logic.register(username, password)
        .then(() => res.status(201).json({ message: 'user registered' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.post('/authenticate', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    logic.authenticate(username, password)
        .then(() => {
            const { JWT_SECRET, JWT_EXP } = process.env

            const token = jwt.sign({ sub: username }, JWT_SECRET, { expiresIn: JWT_EXP })

            res.json({ message: 'user authenticated', token })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

router.patch('/user/:username', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { username }, body: { password, newPassword } } = req

    logic.updatePassword(username, password, newPassword)
        .then(() => res.json({ message: 'user updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})



/* NOTES */
router.get('/user/:username/notes', validateJwt, (req, res) => {
    const { params: { username }, query: { date } } = req

    logic.getNotesByDate(username, date)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.post('/user/:username/notes', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { username }, body: { text, date } } = req

    logic.addNote(username, text, date)
        .then(() => res.json({ message: 'note created' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.patch('/user/:username/notes/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { username, id }, body: { newText } } = req

    logic.updateNote(username, id, newText)
        .then(() => res.json({ message: 'note updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.delete('/user/:username/notes/:id', validateJwt, (req, res) => {
    const { params: { username, id } } = req

    logic.deleteNote(username, id)
        .then(() => res.json({ message: 'note deleted' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

/* END NOTES */

/* CONTACTS */

/* END CONTACTS */

module.exports = function (db) {
    logic._users = db.collection('users')

    return router
}