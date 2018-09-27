require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const {logic, LogicError} = require('./logic')
const jwt = require('jsonwebtoken')
const router = express.Router()
const validateJwt = require('./helpers/validate-jwt')
const {sockets} = require('./sockets')


const jsonBodyParser = bodyParser.json()

router.post('/register', jsonBodyParser, (req, res) => {
  const {body: {email, password, nickname}} = req

  logic.register(email, password, nickname)
    .then(() => res.status(201).json({message: 'user registered'}))
    .catch(err => {
      const {message} = err

      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})

router.post('/authenticate', jsonBodyParser, (req, res) => {
  const {body: {nickname, password}} = req

  logic.authenticate(nickname, password)
    .then(() => {
      const {JWT_SECRET, JWT_EXP} = process.env

      const token = jwt.sign({sub: nickname}, JWT_SECRET, {expiresIn: JWT_EXP})

      res.json({message: 'user authenticated', token})
    })
    .catch(err => {
      const {message} = err

      res.status(err instanceof LogicError ? 401 : 500).json({message})
    })
})

/*  update password */
router.patch('/user/:nickname', [validateJwt, jsonBodyParser], (req, res) => {

  const {params: {nickname}, body: {password, newPassword}} = req

  logic.updatePassword(nickname, password, newPassword)
    .then(() => res.json({message: 'user updated'}))
    .catch(err => {
      const {message} = err

      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})

/*  get all games for user */
router.get('/user/:nickname/games', [validateJwt], (req, res) => {

  const {params: {nickname}} = req

  logic.getGamesForUser(nickname)
    .then(games => res.json(games))
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})


/*  get all users */
router.get('/users', [validateJwt], (req, res) => {

  const {nickname} = req

  logic.getAllUsers()
    .then(users => res.json(users))
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})




/* terminate game */
router.patch('/user/:nickname/game/:gameID/', [validateJwt], (req, res) => {

  const {params: {nickname, gameID}} = req

  logic.terminateGame(nickname, gameID)
    .then(_ => res.json({message: 'game terminated'}))
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})


/* make a move  */
router.post('/user/:nickname/game/:gameID/', [validateJwt, jsonBodyParser], (req, res) => {

  const {params: {nickname, gameID}, body: {move, opponent}} = req
  logic.move(nickname, gameID, move)
    .then(_ => {
        sockets.announceMoveMade(nickname, opponent)
        res.json({message: 'successful move'})
      }
    )
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})

/* request a game  */
router.post('/user/:nickname/gamerequest/', [validateJwt, jsonBodyParser], (req, res) => {
  const {params: {nickname}, body: {opponent}} = req
  console.error(`router.post('/user/:nickname/gamerequest/ -- nickname: ${nickname}, opponent: ${opponent}`)

  logic.requestNewGame(nickname, opponent)
    .then(_ => {
        sockets.requestConnection(opponent)
        res.json({message: 'game requested'})
      }
    )
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})

/* respond to a game request  */
router.post('/user/:nickname/respondtorequest', [validateJwt, jsonBodyParser], (req, res) => {

  const {params: {nickname}, body: {destination,gameID, answer}} = req
  logic.respondToGameRequest(nickname, destination,gameID, answer)
    .then(_ => {
        sockets.gameAcceptedOrRejected(destination)
        res.json({message: 'game request response sent'})
      }
    )
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})


module.exports = function () {

  return router
}