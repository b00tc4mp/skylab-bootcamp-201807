const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env

function validateJwt(req, res, next) {
    const { params: { id } } = req

    try {
        const authorization = req.get('authorization')

        if (!authorization || !authorization.length) throw new Error('invalid token')

        const parts = authorization.split(' ')

        if (parts.length !== 2) throw new Error('invalid token')

        if (parts[0].toLowerCase() !== 'bearer') throw new Error('invalid token')

        const token = parts[1]

        const payload = jwt.verify(token, JWT_SECRET)

        if (payload.sub !== id) throw new Error('invalid token')

        next()
    } catch ({ message }) {
        res.status(500).json({ message })
    }
}

module.exports = validateJwt