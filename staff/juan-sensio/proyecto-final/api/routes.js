require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const { logic, LogicError } = require('./logic')
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

router.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    logic.authenticate(username, password)
        .then(id => {
            const { JWT_SECRET, JWT_EXP } = process.env
            const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: JWT_EXP })
            res.json({ message: 'user authenticated', token, id })
        })
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

router.put('/users/:id/updateUsername', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { newUsername, password } } = req
    logic.updateUsername(id, password, newUsername)
        .then(() => {
            res.status(200).json({ message: 'username updated correctly.' })
        })
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

router.put('/users/:id/updatePassword', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { newPassword, password } } = req
    logic.updatePassword(id, password, newPassword)
        .then(() => {
            res.status(200).json({ message: 'password updated correctly.' })
        })
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

router.delete('/users/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { password } } = req

    logic.delete(id, password)
        .then(() => {
            res.status(200).json({ message: 'user deleted' })
        })
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

module.exports = router