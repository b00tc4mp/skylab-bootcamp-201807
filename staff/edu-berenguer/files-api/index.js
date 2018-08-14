const express = require('express')
const fileUpload = require('express-fileupload')
const package = require('./package.json')
const bodyParser = require('body-parser')
const logic = require('./logic')

const { argv: [, , port] } = process

const app = express()

app.use(fileUpload())

// app.use(bodyParser.json())
const jsonBodyParser = bodyParser.json()
const formBodyParser = bodyParser.urlencoded({ extended: false })

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

        res.status(200).json({ message: 'user authenticated' })
    } catch ({ message }) {
        res.status(401).json({ message })
    }
})

app.get('/user/:username/files', (req, res) => {
    const { params: { username } } = req

    try {
        const files = logic.listFiles(username)

        res.json(files)
    } catch ({ message }) {
        res.status(500).json({ message })
    }
})

app.post('/user/:username/files', formBodyParser, (req, res) => {
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

app.get('/user/:username/files/:file', (req, res) => {
    const { params: { username, file } } = req

    res.download(logic.getFilePath(username, file))
})

app.delete('/user/:username/files/:file', (req, res) => {
    const { params: { username, file } } = req

    try {
        logic.removeFile(username, file)

        res.status(200).json({ message: 'file deleted' })
    } catch ({ message }) {
        res.status(500).json({ message })
    }
})

app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))