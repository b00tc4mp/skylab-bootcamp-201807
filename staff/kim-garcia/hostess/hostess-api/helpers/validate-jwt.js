'use strict'

const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env

function validateJwt(req, res, next) {
    const { params: { id } } = req

    try {
        const authorization = req.get('authorization')

        if (!authorization || !authorization.length) throw new Error('0 invalid token')

        const parts = authorization.split(' ')

        if (parts.length !== 2) throw new Error('1 invalid token')

        if (parts[0].toLowerCase() !== 'bearer') throw new Error('2 invalid token')

        const token = parts[1]

        const payload = jwt.verify(token, JWT_SECRET)

        if (payload.sub !== id) throw new Error('3 invalid token')

        next()
    } catch ({ message }) {
        res.status(500).json({ message })
    }
}

module.exports = validateJwt