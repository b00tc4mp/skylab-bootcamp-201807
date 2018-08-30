'use strict'

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

/**
 * Function to verify the token given on any case by id
 * @param {Request} req 
 * @param {Response} res 
 * @param {next} next 
 * 
 * @throws {Error} invalid token: if no bearer authorization or no length
 * @throws {Error} invalid token: if the playload sub is different to the id given
 * 
 * @throws {Error} message if the function catches an error of status 500
 */
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