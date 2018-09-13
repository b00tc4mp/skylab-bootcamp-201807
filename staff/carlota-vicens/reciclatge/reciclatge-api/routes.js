require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

const { logic, LogicError } = require('./logic')

const userRouter = express.Router()

const jsonBodyParser = bodyParser.json({ limit: '100000mb' })

userRouter.post('/register', jsonBodyParser, (req, res) => {
    const {
        email, password
    } = req.body
    logic.register(email, password)
        .then(() => {
            res.status(201).json({ status: 'OK' })
        })
        .catch((err) => {
            const { message } = err
            res.status(500).json({ message })
        })
})

userRouter.post('/login', jsonBodyParser, (req, res) => {
    const {
        email, password
    } = req.body

    logic.login(email, password)
        .then(user => {
            res.status(200).json({ status: 'OK', user })
        })
        .catch((err) => {
            const { message } = err
            res.status(500).json({ message })
        })
})


userRouter.patch('/update/:email', jsonBodyParser, (req, res) => {
    const { params: { email }, body: { password, newPassword } } = req

    logic.update(email, password, newPassword)
        .then(() => res.json({ message: 'user updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


userRouter.delete('/delete', jsonBodyParser, (req, res) => {
    const { body :{email, password}} = req
    console.log(req.body)
    logic.delete(email, password)
    .then ( () => res.json({message: 'user deleted'}))
    .catch(err => {
        const {message} = err
        res.status(err instanceof LogicError ? 400 :500).json({message})
    })


})


module.exports = userRouter

