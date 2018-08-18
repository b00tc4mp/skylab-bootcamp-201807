require('dotenv').config()

const logic = require('./logic/index')
const express = require('express')
const jwt = require('jsonwebtoken')
const verifyJwt = require('./helpers/jwt')
const bodyParser = require('body-parser')

const router = express.Router()
const jsonBodyParser = bodyParser.json()


router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    logic.register(username, password)
        .then(() => res.status(201).json({ message: 'user registered correctly' }))
        .catch(err => {
            const {message} = err
            res.status(400 || 500).json({message})
        })
})

router.post('/login', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    logic.login(username, password)
        .then(() => {
            const { jwt_secret, jwt_exp } = process.env
            const token = jwt.sign({ sub: username }, jwt_secret, { expiresIn: jwt_exp })
    
            res.json({ message: 'user logged correctly', token })
        })
        .catch(err => {
            const {message} = err
            res.status(401 || 500).json({message})
        })
})

router.patch('/user/:username', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { username }, body: { password, newPassword } } = req

    logic.updatePassword(username, password, newPassword)
        .then(() => res.json({ message: 'password updated correctly' }))
        .catch(err => {
            const {message} = err
            res.status(400 || 500).json({message})
        })
})

router.delete('/user/:username', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { username }, body: { password } } = req

    logic.deleteUser(username, password)
        .then(() => res.json({ message: 'user deleted correctly' }))
        .catch(err => {
            const {message} = err
            res.status(400 || 500).json({message})
        })
})

router.patch('/user/:username/notes', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { username }, body: { password, title, note } } = req

    logic.addNotes(username, password, title, note)
        .then(() => {
            const notes = [{title, note}]

            res.json({ message: 'note added correctly' }, notes)
        })
        .catch(err => {
            const {message} = err
            res.status(400 || 500).json({message})
        })
})

router.patch('/user/:username/contacts', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { username }, body: { password, contact, telephone } } = req

    logic.addContacts(username, password, contact, telephone)
        .then(() => res.json({ message: 'contact added correctly' }, contact, telephone))
        .catch(err => {
            const {message} = err
            res.status(400 || 500).json({message})
        })
})


module.exports = function(db) {
    logic._users = db.collection('users')

    return router
}