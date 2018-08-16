'use strict'

const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env

function validateJwt(req, res, next) {
    const { params: { username } } = req

    try {
        const authorization = req.get('authorization')

        if (!authorization || !authorization.length) throw new Error('1invalid token')

        const parts = authorization.split(' ')

        if (parts.length !== 2) throw new Error('invalid token')

        if (parts[0].toLowerCase() !== 'bearer') throw new Error('2invalid token')

        const token = parts[1]

        const payload = jwt.verify(token, JWT_SECRET)

        if (payload.sub !== username) throw new Error('3invalid token')

        next()
    } catch ({ message }) {
        res.status(500).json({ message })
    }
}

module.exports = validateJwt