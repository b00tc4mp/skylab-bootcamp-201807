require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const {logic, LogicError} = require('./logic')
const jwt = require('jsonwebtoken')
const router = express.Router()
const validateJwt = require('./helpers/validate-jwt')
const {sockets} = require('./sockets')
const logger = require('./logger')


const jsonBodyParser = bodyParser.json()

router.post('/register', jsonBodyParser, (req, res) => {

  const {body: {email, password, nickname}} = req
  logger.debug(`POST:/register, CONTEXT: "router.js", EMAIL: ${email}, PASSWORD:${password}, NICKNAME:${nickname} `)

  logic.register(email, password, nickname)
    .then(() => res.status(201).json({message: 'user registered'}))
    .catch(err => {
      const {message} = err

      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})

router.post('/authenticate', jsonBodyParser, (req, res) => {
  const {body: {nickname, password}} = req
  logger.debug(`POST:/authenticate,  CONTEXT: "router.js",  PASSWORD:${password}, NICKNAME:${nickname} `)

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
/*
/!*  update password *!/
router.patch('/user/:nickname', [validateJwt, jsonBodyParser], (req, res) => {

  const {params: {nickname}, body: {password, newPassword}} = req
  logger.debug('/user/:nickname', { "context": "router.js", "nickname": nickname,"password":password, "newPassword":newPassword })

  logic.updatePassword(nickname, password, newPassword)
    .then(() => res.json({message: 'user updated'}))
    .catch(err => {
      const {message} = err

      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})*/

/*  get all games for user */
router.get('/user/:nickname/games', [validateJwt], (req, res) => {

  const {params: {nickname}} = req
  logger.debug(`GET:/user/:nickname/games,  CONTEXT: "router.js", NICKNAME:${nickname} `)

  logic.getGamesForUser(nickname)
    .then(games => res.json(games))
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})


/*  get users for string */
router.get('/user/:nickname/users', [validateJwt], (req, res) => {
  const {query: {term}, params: {nickname}} = req
  logger.debug(`GET:/user/:nickname/users,  CONTEXT: "router.js", TERM: ${term}, NICKNAME:${nickname} `)

  logic.getUsersForString(nickname, term)
    .then(users => res.json(users))
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})


/* terminate game */
router.patch('/user/:nickname/game/:gameID', [validateJwt], (req, res) => {

  const {params: {nickname, gameID}} = req
  logger.debug(`PATCH:/user/:nickname/game/:gameID,  CONTEXT: "router.js",  NICKNAME:${nickname}, GAMEID: ${gameID} `)

  logic.acknowledgeGameOverForUser(nickname, gameID)
    .then(_ => res.json({message: 'game terminated'}))
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})


/* make a move  */
router.post('/user/:nickname/game/:gameID', [validateJwt, jsonBodyParser], (req, res) => {

  const {params: {nickname, gameID}, body: {move}} = req
  logger.debug(`POST:/user/:nickname/game/:gameID,  CONTEXT: "router.js",  NICKNAME:${nickname},  GAMEID: ${gameID}, MOVE:${JSON.stringify(move)}`)

  logic.move(nickname, gameID, move)
    .then(_ =>  logic.getOpponentForGame(nickname,gameID))
    .then(opponent => {
      if (!opponent ) throw new LogicError(`no opponent found for game id ${gameID}`)
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
router.post('/user/:nickname/gamerequest', [validateJwt, jsonBodyParser], (req, res) => {
  const {params: {nickname}, body: {opponent}} = req
  logger.debug(`POST:/user/:nickname/gamerequest/,  CONTEXT: "router.js",  NICKNAME:${nickname}, OPPONENT:${opponent}`)


  logic.requestNewGame(nickname, opponent)
    .then(_ => {
        sockets.requestConnection(opponent,nickname)
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

  const {params: {nickname}, body: {destination, gameID, answer}} = req

  logger.debug(`POST:/user/:nickname/respondtorequest,  CONTEXT: "router.js",  NICKNAME:${nickname}, DESTINATION:${destination},  GAMEID: ${gameID}, ANSWER:${answer}`)

  logic.respondToGameRequest(nickname, destination, gameID, answer)
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

/*

/!* set user ended games to terminated  *!/
router.post('/user/:nickname/', [validateJwt, jsonBodyParser], (req, res) => {

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
*/


/*  get logs */
router.get('/logs/:type', (req, res) => {
  const {params: {type}} = req

  logic.getLogs(type)
    .then(logs => res.send(logs))
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})


module.exports = function () {

  return router
}