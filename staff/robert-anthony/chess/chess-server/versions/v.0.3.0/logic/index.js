const validateEmail = require('../utils/validate-email')
const {User, Game} = require('../data/models')
const chalk = require('chalk')
const {Chess} = require('chess.js')
const uuidv1 = require('uuid/v1');
var debug = require('debug')('logic')
const mongoose = require( 'mongoose')

const logic = {


  _validateStringField(name, value) {
    if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
  },

  _validateEmail(email) {
    if (!validateEmail(email)) throw new LogicError('invalid email')
  },

  _validateDateField(name, field) {
    if (!(field instanceof Date)) throw new LogicError(`invalid ${name}`)
  },


  register(email, password, nickname) {
    return Promise.resolve()
      .then(() => {
        console.log(email, password, nickname)
        this._validateEmail(email)
        this._validateStringField('password', password)
        this._validateStringField('nickname', nickname)

        return User.findOne({nickname})
      })
      .then(user => {
        if (user) throw new LogicError(`user with ${nickname} nickname already exists`)

        user = new User({email, password, nickname, lastRequest: "", online: false})
        return user.save()
      })
      .then(() => true)

  },

  authenticate(nickname, password) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('nickname', nickname)
        this._validateStringField('password', password)

        return User.findOne({nickname})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${nickname} nickname does not exist`)

        if (user.password !== password) throw new LogicError(`wrong password`)


      })

      .then(() => true)

  },

  updatePassword(nickname, password, newPassword) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('nickname', nickname)
        this._validateStringField('password', password)
        this._validateStringField('new password', newPassword)

        return User.findOne({nickname})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${nickname} nickname does not exist`)

        if (user.password !== password) throw new LogicError(`wrong password`)

        if (password === newPassword) throw new LogicError('new password must be different to old password')

        user.password = newPassword

        return user.save()
      })
      .then(() => true)
  },

  unregisterUser(nickname, password) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('nickname', nickname)
        this._validateStringField('password', password)
        return User.findOne({email})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${nickname} nickname does not exist`)

        if (user.password !== password) throw new LogicError(`wrong password`)

        return User.deleteOne({_id: user._id})
      })
      .then(() => true)
  },

  /****
   *
   *      GAME
   *
   *
   *
   */

  _currentEngines: new Map,


  getGamesForUser(nickname) {
    console.log(chalk.red.bgYellow.bold(`Getting games for user ${nickname}`))

    return Promise.resolve()
      .then(_ => {
        this._validateStringField("nickname", nickname)
        return Game.find({$or: [{white: nickname}, {black: nickname}]})
          .then(games => games.filter(game => (game.winner === '')).map(game => {
              const obj = {}
              obj.id = game.id
              obj.opponent = game.white === nickname ? game.black : game.white
              let engine = this._currentEngines.get(game.engineID)
              if (!engine) {
                engine = new Chess()
                engine.load_pgn(game.pgn)
                this._currentEngines.set(game.engineID,engine)
              }
              obj.fen = engine.fen()
              return obj
            }
          ))
      })
  },

  /* called from sockets */
  userConnected(nickname) {
    return Promise.resolve()
      .then(_ => {
        this._validateStringField("nickname", nickname)
        return User.findOne({nickname})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${nickname} nickname does not exist`)
        user.online = true
        return user.save()
      })
      .then(() => true)

  },

  /* called from sockets */
  userDisconnected(nickname) {
    return Promise.resolve()
      .then(_ => {
        this._validateStringField("nickname", nickname)
        return User.findOne({nickname})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${nickname} nickname does not exist`)
        user.online = false
        return user.save()
      })
      .then(() => true)
  },

  getOnlineUsers() {
    return User.find({online: true}).lean()
      .then(users => {
        return users.map(user => user.nickname)
      })
  },

  terminateGame(nickname, gameID) {
    return Promise.resolve()
      .then(_ => {
        this._validateStringField("nickname", nickname)
        this._validateStringField("gameID", gameID)
        return Game.findOne({_id: mongoose.Types.ObjectId(gameID)})
      })
      .then(game => {
        if (!game) throw new LogicError(`game with id ${gameID} does not exist`)
        if (game.white !== nickname && game.black !== nickname) throw new LogicError(`game with id ${gameID} does not belong to user ${nickname}`)
        game.terminated = true

        return game.save()
      })
      .then(_ => true)

  },

  _createGame(white, black) {
    let game
    return Promise.resolve()
      .then(_ => {
        this._validateStringField("white", white)
        this._validateStringField("black", black)
        return User.findOne({nickname: white})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${white} nickname does not exist`)
        return User.findOne({nickname: white})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${black} nickname does not exist`)
        const engine = new Chess()
        const uuid = uuidv1()
        this._currentEngines.set(uuid, engine)
        engine.header('White', white, 'Black', black)
        const pgn = engine.pgn()
        game = new Game({
          white,
          black,
          engineID: uuid,
          pgn,
          winner: "",
          lastMove: ""
        })
        return game.save()
      })
      .then(_ => true)
  },

  move(nickname, gameID, move) {
    let game
    return Game.findOne({_id: mongoose.Types.ObjectId(gameID)})
      .then(_game => {
        game = _game

        if (!game) throw new LogicError(`game with id ${gameID} does not exist`)
        if (game.white !== nickname && game.black !== nickname) throw new LogicError(`game with id ${gameID} does not belong to user ${nickname}`)
        const engine = this._currentEngines.get(game.engineID)
        const result = engine.move(move)
        if (!result) throw new LogicError(`move is not allowed`)
        else {
          game.pgn = engine.pgn()
          game.fen = engine.fen()
          return game.save()
            .then(_ => {
              return true
            })
        }
      })

  },

  requestNewGame(requester, destination) {
    return Promise.resolve()
      .then(_ => {
        this._validateStringField("requester", requester)
        this._validateStringField("destination", destination)
        return User.findOne({nickname: destination})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${destination} nickname does not exist`)
        if (user.lastRequest !== "") throw new LogicError(`user with ${destination} nickname is waiting to accept another request`)
        user.lastRequest = requester
        return user.save()
      })
      .then(_ => {
        return true
      })
  },

  respondToGameRequest(confirmer, destination, answer) {
    return Promise.resolve()
      .then(_ => {
        this._validateStringField("confirmer", confirmer)
        this._validateStringField("destination", destination)
        return User.findOne({nickname: confirmer})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${confirmer} nickname does not exist`)
        user.lastRequest = ''
        return user.save()
      })
      .then(_ => User.findOne({nickname: destination}))
      .then(user => {
        if (!user) throw new LogicError(`user with ${confirmer} nickname does not exist`)
        user.lastRequestResponse = answer ? confirmer : 'rejected'
        return user.save()
      })
      .then(_ => {
        if (answer) return this._createGame(destination, confirmer)
        else return true
      })

  },

  getLastGameRequester(nickname) {
    return Promise.resolve()
      .then(_ => {
        this._validateStringField("nickname", nickname)
        return User.findOne({nickname})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${nickname} nickname does not exist`)
        return user.lastRequest
      })
  }
  ,

  getGameRequestResponse(nickname) {
    let response = ''
    return Promise.resolve()
      .then(_ => {
        this._validateStringField("nickname", nickname)
        return User.findOne({nickname})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${nickname} nickname does not exist`)
        response = user.lastRequestResponse
        user.lastRequestResponse = ''
        return user.save()
      })
      .then(_ => response)
  }

}


class LogicError extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = {logic, LogicError}