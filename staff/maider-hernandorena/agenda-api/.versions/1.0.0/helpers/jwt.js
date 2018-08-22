const jwt = require('jsonwebtoken')

const { jwt_secret } = process.env

function verifyJwt(req, res, next) {
    const { params: {username} } = req

    try {
        const auth = req.get('authorization').split(' ')

        if(!auth || auth.length !== 2 || auth[0].toLowerCase() !== 'bearer') throw new Error('invalid token')
        
        const token = auth[1]

        const playload = jwt.verify(token, jwt_secret)
    
        if(playload.sub !== username) throw new Error('invalid token')

        next()
    } catch ({message}) {
        res.status(500).json({message})
    }
}

module.exports = verifyJwt