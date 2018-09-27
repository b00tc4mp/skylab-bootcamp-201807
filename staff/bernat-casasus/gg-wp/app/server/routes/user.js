require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { logic, LogicError } = require('../logic/user')
const jwt = require('jsonwebtoken')
const validateJwt = require('../helpers/validate-jwt')

const user = express.Router()
const jsonBodyParser = bodyParser.json()

//Register User
user.post('/user/register', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.register(email, password)
        .then(() => res.status(201).json({ message: 'user registered' }))
        .catch(err => {
            const { message } = err
            let code
            if (err instanceof LogicError) code = 400
            if (!(err instanceof LogicError)) code = 500
            res.status(err instanceof LogicError ? 400 : 500).json({ code, message })
        })
})

//Authenticate User
user.post('/user/authenticate', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticate(email, password)
        .then((email) => {
            const { env: { JWT_SECRET, JWT_EXP } } = process
            const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: JWT_EXP })

            res.status(200).json({ message: 'user authenticated', email, token })
        })
        .catch(err => {
            const { message } = err
            let code
            if (err instanceof LogicError) code = 401
            if (!(err instanceof LogicError)) code = 500
            res.status(err instanceof LogicError ? 401 : 500).json({ code, message })
        })
})

//Update Password
user.patch('/user/:email', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { password, newPassword } } = req

    logic.updatePassword(email, password, newPassword)
        .then(() => res.status(200).json({ message: 'user updated' }))
        .catch(err => {
            const { message } = err
            let code
            if (err instanceof LogicError) code = 401
            if (!(err instanceof LogicError)) code = 500
            res.status(err instanceof LogicError ? 401 : 500).json({ code, message })
        })
})

//Delete User
user.delete('/user/:email', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { password } } = req

    logic.unregisterUser(email, password)
        .then(() => res.status(200).json({ message: 'user deleted' }))
        .catch(err => {
            const { message } = err
            let code
            if (err instanceof LogicError) code = 401
            if (!(err instanceof LogicError)) code = 500
            res.status(err instanceof LogicError ? 401 : 500).json({ code, message })
        })
})

//Follow Summoner
user.post('/user/:email', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { id } } = req

    logic.addPlayer(email, id)
        .then(() => res.status(201).json({ message: `player added to your list` }))
        .catch(err => {
            const { message } = err
            let code
            if (err instanceof LogicError) code = 401
            if (!(err instanceof LogicError)) code = 500
            res.status(err instanceof LogicError ? 401 : 500).json({ code, message })
        })
})

//Get Following List
user.get('/user/:email', validateJwt, (req, res) => {
    const { params: { email } } = req

    logic.listPlayers(email)
        .then(following => res.json(following))
        .catch(err => {
            const { message } = err
            let code
            if (err instanceof LogicError) code = 401
            if (!(err instanceof LogicError)) code = 500
            res.status(err instanceof LogicError ? 401 : 500).json({ code, message })
        })
})

//Delete Summoner Follow
user.delete('/user/:email/summoner/:id', validateJwt, (req, res) => {
    const { params: { email, id } } = req

    logic.removePlayer(email, id)
        .then((players) => res.status(200).json({ message: 'unfollow succesful', players }))
        .catch(err => {
            const { message } = err
            let code
            if (err instanceof LogicError) code = 401
            if (!(err instanceof LogicError)) code = 500
            res.status(err instanceof LogicError ? 401 : 500).json({ code, message })
        })
})

module.exports = function () {

    return user
}