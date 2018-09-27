require('dotenv').config()

const express = require('express')
const { logic, LogicError } = require('./logic')
const router = express.Router()


router.get('/loc', (req, res) => {
    const { query: { title, price } } = req

    logic.listByTitle(title) 
        .then(files => res.json(files))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })

})


module.exports = function (db) {
    logic._flats = db.collection('flats')

    return router
}