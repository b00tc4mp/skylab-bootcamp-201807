'use strict'

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

function verifyJwt(req, res, next) {
    const { params: { id } } = req

    try {
        const auth = req.get('authorization').split(' ')

        if(!auth || auth.length !== 2 || auth[0].toLowerCase() !== 'bearer') throw new Error('invalid token')
        
        const token = auth[1]
        const playload = jwt.verify(token, JWT_SECRET)
    
        if(playload.sub !== id) throw new Error('invalid token')

        next()
    } catch ({ message }) {
        res.status(500).json({message})
    }
}

module.exports = verifyJwt