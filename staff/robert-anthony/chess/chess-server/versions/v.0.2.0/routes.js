require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const {logic, LogicError} = require('./logic')
const jwt = require('jsonwebtoken')
const router = express.Router()
const validateJwt = require('./helpers/validate-jwt')


const jsonBodyParser = bodyParser.json()

router.post('/register', jsonBodyParser, (req, res) => {
  const {body: {username, password}} = req

  logic.register(username, password)
    .then(() => res.status(201).json({message: 'user registered'}))
    .catch(err => {
      const {message} = err

      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})

router.post('/authenticate', jsonBodyParser, (req, res) => {
  const {body: {username, password}} = req

  logic.authenticate(username, password)
    .then(() => {
      const {JWT_SECRET, JWT_EXP} = process.env

      const token = jwt.sign({sub: username}, JWT_SECRET, {expiresIn: JWT_EXP})

      res.json({message: 'user authenticated', token})
    })
    .catch(err => {
      const {message} = err

      res.status(err instanceof LogicError ? 401 : 500).json({message})
    })
})

/*  update password */
router.patch('/user/:username', [validateJwt, jsonBodyParser], (req, res) => {

  const {params: {username}, body: {password, newPassword}} = req

  logic.updatePassword(username, password, newPassword)
    .then(() => res.json({message: 'user updated'}))
    .catch(err => {
      const {message} = err

      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})





module.exports = function () {

  return router
}