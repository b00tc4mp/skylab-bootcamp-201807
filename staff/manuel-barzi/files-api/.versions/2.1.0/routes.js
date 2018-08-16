require('dotenv').config()

const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const { logic, LogicError } = require('./logic')
const jwt = require('jsonwebtoken')
const validateJwt = require('./helpers/validate-jwt')

const router = express.Router()

const jsonBodyParser = bodyParser.json()

router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    try {
        logic.register(username, password)

        res.status(201).json({ message: 'user registered' })
    } catch (err) {
        const { message } = err

        res.status(err instanceof LogicError? 400 : 500).json({ message })
    }
})

router.post('/authenticate', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    try {
        logic.authenticate(username, password)

        const { JWT_SECRET, JWT_EXP } = process.env

        const token = jwt.sign({ sub: username }, JWT_SECRET, { expiresIn: JWT_EXP })

        res.status(200).json({ message: 'user authenticated', token })
    } catch (err) {
        const { message } = err

        res.status(err instanceof LogicError? 401 : 500).json({ message })
    }
})

router.patch('/user/:username', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { username }, body: { password, newPassword } } = req

    try {
        logic.updatePassword(username, password, newPassword)

        res.status(200).json({ message: 'user updated' })
    } catch (err) {
        const { message } = err

        res.status(err instanceof LogicError? 400 : 500).json({ message })
    }
})

router.get('/user/:username/files', validateJwt, (req, res) => {
    const { params: { username } } = req

    try {
        const files = logic.listFiles(username)

        res.json(files)
    } catch (err) {
        const { message } = err

        res.status(err instanceof LogicError? 400 : 500).json({ message })
    }
})

router.post('/user/:username/files', [validateJwt, fileUpload()], (req, res) => {
    const { params: { username }, files: { upload } } = req

    if (upload) {
        try {
            logic.saveFile(username, upload.name, upload.data)

            res.status(201).json({ message: 'file saved' })
        } catch (err) {
            const { message } = err
    
            res.status(err instanceof LogicError? 400 : 500).json({ message })
        }
    } else
        res.status(418).json({ message: 'no file received' })

})

router.get('/user/:username/files/:file', validateJwt, (req, res) => {
    const { params: { username, file } } = req

    try {
        res.download(logic.getFilePath(username, file))
    } catch ({ message }) {
        res.status(500).json({ message })
    }
})

router.delete('/user/:username/files/:file', validateJwt, (req, res) => {
    const { params: { username, file } } = req

    try {
        logic.removeFile(username, file)

        res.status(200).json({ message: 'file deleted' })
    } catch (err) {
        const { message } = err

        res.status(err instanceof LogicError? 400 : 500).json({ message })
    }
})

module.exports = router