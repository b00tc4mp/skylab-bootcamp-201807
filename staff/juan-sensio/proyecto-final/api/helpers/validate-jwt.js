'use strict'

const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env

function validateJwt(req, res, next) {
    const { params: { id }, query: { token: _token } } = req

    try {
        let token

        if (!_token) {
            const authorization = req.get('authorization')
            if (!authorization || !authorization.length) throw new Error('invalid token')
            const parts = authorization.split(' ')
            if (parts.length !== 2) throw new Error('invalid token')
            if (parts[0].toLowerCase() !== 'bearer') throw new Error('invalid token')
            token = parts[1]
        } else token = _token

        const payload = jwt.verify(token, JWT_SECRET)
        if (payload.sub !== id) throw new Error('invalid token')
        next()
    } catch ({ message }) {
        res.status(500).json({ message })
    }
}

module.exports = validateJwt