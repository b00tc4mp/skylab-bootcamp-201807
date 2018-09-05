require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const { logic, LogicError } = require('./logic')
const validateJwt = require('./helpers/validate-jwt')
const fileUpload = require('express-fileupload')

const router = express.Router()
const jsonBodyParser = bodyParser.json()
const upload = fileUpload()

// user management

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

// video management

router.put('/users/:id/videos', [validateJwt, upload], (req, res) => {
    const { params: { id }, files: { file } } = req
    logic.saveVideo(id, file.name, file.data)
        .then(() => {
            res.status(201).json({ message: 'file saved correctly.' })
        })
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

router.delete('/users/:id/videos/:videoId', validateJwt, (req, res) => {
    const { params: { id, videoId } } = req
    logic.deleteVideo(id, videoId)
        .then(() => {
            res.status(200).json({ message: 'file deleted correctly.' })
        })
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

router.get('/users/:id/videos', validateJwt, (req, res) => {
    const { params: { id } } = req
    logic.retrieveVideos(id)
        .then(videos => {
            res.status(200).json({ videos })
        })
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

router.get('/users/:id/videos/:videoId', validateJwt, (req, res) => {
    const { params: { id, videoId } } = req
    logic.retrieveVideo(id, videoId)
        .then(filename => res.download(filename))
})

// dataset management

router.put('/users/:id/dataset', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { videoId } } = req
    debugger
    logic.buildDataset(id, videoId)
        .then(() => {
            res.status(201).json({ message: 'dataset built correctly' })
        })
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

router.delete('/users/:id/datasets/:datasetId', validateJwt, (req, res) => {
    const { params: { id, datasetId } } = req
    logic.deleteDataset(id, datasetId)
        .then(() => {
            res.status(200).json({ message: 'dataset deleted correctly.' })
        })
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

router.get('/users/:id/datasets', validateJwt, (req, res) => {
    const { params: { id } } = req
    logic.retrieveDatasets(id)
        .then(datasets => {
            res.status(200).json({ datasets })
        })
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

router.get('/users/:id/datasets/:datasetId', validateJwt, (req, res) => {
    const { params: { id, datasetId } } = req
    logic.retrieveDataset(id, datasetId)
        .then(filename => res.download(filename))
})

module.exports = router