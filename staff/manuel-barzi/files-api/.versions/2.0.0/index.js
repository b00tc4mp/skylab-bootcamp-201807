require('dotenv').config()

const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const package = require('./package.json')
const bodyParser = require('body-parser')
const logic = require('./logic')
const jwt = require('jsonwebtoken')
const validateJwt = require('./utils/validate-jwt')

const { argv: [, , port] } = process

const app = express()

app.use(cors())

const jsonBodyParser = bodyParser.json()

app.post('/register', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    try {
        logic.register(username, password)

        res.status(201).json({ message: 'user registered' })
    } catch ({ message }) {
        res.status(500).json({ message })
    }
})

app.post('/authenticate', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    try {
        logic.authenticate(username, password)

        const { JWT_SECRET, JWT_EXP } = process.env

        const token = jwt.sign({ sub: username }, JWT_SECRET, { expiresIn: JWT_EXP })

        res.status(200).json({ message: 'user authenticated', token })
    } catch ({ message }) {
        res.status(401).json({ message })
    }
})

app.get('/user/:username/files', validateJwt, (req, res) => {
    const { params: { username } } = req

    try {
        const files = logic.listFiles(username)

        res.json(files)
    } catch ({ message }) {
        res.status(500).json({ message })
    }
})

app.post('/user/:username/files', [validateJwt, fileUpload()], (req, res) => {
    const { params: { username }, files: { upload } } = req

    if (upload) {
        try {
            logic.saveFile(username, upload.name, upload.data)

            res.status(201).json({ message: 'file saved' })
        } catch ({ message }) {
            res.status(500).json({ message })
        }
    } else
        res.status(418).json({ message: 'no file received' })

})

app.get('/user/:username/files/:file', validateJwt, (req, res) => {
    const { params: { username, file } } = req

    res.download(logic.getFilePath(username, file))
})

app.delete('/user/:username/files/:file', validateJwt, (req, res) => {
    const { params: { username, file } } = req

    try {
        logic.removeFile(username, file)

        res.status(200).json({ message: 'file deleted' })
    } catch ({ message }) {
        res.status(500).json({ message })
    }
})

app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))