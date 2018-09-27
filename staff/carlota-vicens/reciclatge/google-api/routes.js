const express = require('express')

const logic = require('./logic')
const userRouter = express.Router()
const bodyParser= require('body-parser')
const jsonBodyParser = bodyParser.json({ limit: '100000mb' })



userRouter.post('/upload', jsonBodyParser, (req, res) => {
    const { body: { base64 } } = req

    const file = logic.saveFile(base64)
    logic.googlevision(`fotos/${file}`)
    .then (result => res.json({data:result}))
})


/*userRouter.delete('/delete', (req, res) => {
    const { body: { path } } = req

    logic.delete('../fotos')
})*/


userRouter.post('/')

module.exports = userRouter