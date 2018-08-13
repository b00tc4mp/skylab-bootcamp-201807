const express = require('express')
const fileUpload = require('express-fileupload')
const package = require('./package.json')
const bodyParser = require('body-parser')
const logic = require('./logic')

const { argv: [, , port] } = process

const app = express()

app.use(fileUpload())
app.use(bodyParser.json())

app.post('/register', (req, res) => {
    const { body: { username, password } } = req

    try {
        logic.register(username, password)

        res.status(201).json({ message: 'user registered' })
    } catch ({ message }) {
        res.status(500).json({ message })
    }
})

app.post('/authenticate', (req, res) => {
    const { body: { username, password } } = req

    try {
        logic.authenticate(username, password)

        res.status(200).json({ message: 'user authenticated' })
    } catch ({ message }) {
        res.status(401).json({ message })
    }
})

// app.get('/files', (req, res) => {
//     const { query: { username } } = req
app.get('/user/:username/files', (req, res) => {
    const { params: { username } } = req

    try {
        const files = logic.listFiles(username)

        res.json(files)
    } catch ({ message }) {
        res.status(500).json({ message })
    }
})

app.post('/files', (req, res) => {
    // TODO get username from req
    const { files: { upload } } = req

    // if (upload) { // should we use multer instead?
    try {
        logic.saveFile(username, upload.name, upload.data)
    } catch ({ message }) {
        session.error = message
    }

    res.status(201).json({ message: 'file saved' })
})


app.get('/user/:username/files/:file', (req, res) => {
    const { params: { username, file } } = req

    res.download(logic.getFilePath(username, file))
})

app.get('/delete/:file', (req, res) => {
    // TODO get username from req
    const { params: { file } } = req

    try {
        logic.removeFile(username, file)
    } catch ({ message }) {
        // TODO
    }

    res.redirect('/files')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))