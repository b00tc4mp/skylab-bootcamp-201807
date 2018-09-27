'use strict'

const jwt = require('jsonwebtoken')
const validateEmail = require('../utils/validate-email')
const { JWT_SECRET } = process.env

/**
 *Validate JWT
 *
 * Checks that the json web token is correct
 * 
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
function validateJwt(req, res, next) {
    const { params: { email } } = req

    try {
        if (!validateEmail(email)) throw new LogicError(`invalid email`)

        const authorization = req.get('authorization')

        if (!authorization || !authorization.length) throw new LogicError('invalid token')

        const parts = authorization.split(' ')

        if (parts.length !== 2) throw new LogicError('invalid token')

        if (parts[0].toLowerCase() !== 'bearer') throw new LogicError('invalid token')

        const token = parts[1]

        const payload = jwt.verify(token, JWT_SECRET)

        if (payload.sub !== email) throw new LogicError('invalid token')

        next()
    } catch ({ message }) {
        const code = 401
        res.status(401).json({ code, message })
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = validateJwt