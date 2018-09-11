const validateEmail = require('../utils/validate-email')
const {mongoose, models: {User, Game}} = require('chess-data')
const chalk = require('chalk')
const {Chess} = require('chess.js')
const uuidv1 = require('uuid/v1')
const logger = require('../logger')
const fs = require('fs')
var appRoot = require('app-root-path');

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
    logger.debug(`register,  CONTEXT: "logic/index.js", EMAIL:${email}, PASSWORD:${password},  NICKNAME: ${nickname}`)

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
        return User.findOne({email})
      })
      .then(user => {
        if (user) throw new LogicError(`user with ${email} email already exists`)
        user = new User({email, password, nickname})
        return user.save()
      })
      .then(() => true)

  },

  authenticate(nickname, password) {
    logger.debug(`authenticate,  CONTEXT: "logic/index.js", NICKNAME:${nickname}, PASSWORD:${password}`)

    return Promise.resolve()
      .then(() => {
        this._validateStringField('nickname', nickname)
        this._validateStringField('password', password)
        return User.findOne({nickname})
        //   return User.findOne({nickname: {$regex: nickname, $options: "i"}})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${nickname} nickname does not exist`)

        if (user.password !== password) throw new LogicError(`wrong password`)


      })

      .then(() => true)

  },
  /*

    updatePassword(nickname, password, newPassword) {
      logger.debug('updatePassword', { "context": "logic/index.js", "nickname": nickname, "password": password})

      return Promise.resolve()
        .then(() => {
          this._validateStringField('nickname', nickname)
          this._validateStringField('password', password)
          this._validateStringField('new password', newPassword)

          return User.findOne({ nickname })
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
  */

  unregisterUser(nickname, password) {
    logger.debug(`unregisterUser,  CONTEXT: "logic/index.js", NICKNAME:${nickname}, PASSWORD:${password}`)

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
    logger.debug(`getGamesForUser,  CONTEXT: "logic/index.js", NICKNAME:${nickname}`)

    return Promise.resolve()
      .then(_ => {
        this._validateStringField("nickname", nickname)
        return Game.find({$or: [{initiator: nickname}, {acceptor: nickname}]})
          .then(games => games.filter(game => (game.state !== 'terminated')).filter(game => game.hasAcknowledgedGameOver.indexOf(nickname) === -1).map(game => {
              const obj = {}
              obj.id = game.id
              obj.state = game.state
              obj.toPlay = game.toPlay
              obj.initiator = game.initiator
              obj.acceptor = game.acceptor
              obj.inCheck = game.inCheck
              obj.inDraw = game.inDraw
              obj.inStalemate = game.inStalemate
              obj.inCheckmate = game.inCheckmate
              obj.inThreefoldRepetition = game.inThreefoldRepetition
              obj.insufficientMaterial = game.insufficientMaterial
              obj.inDraw = game.inDraw
              obj.winner = game.winner
              obj.initiator = game.initiator
              obj.acceptor = game.acceptor
              obj.opponent = game.initiator === nickname ? game.acceptor : game.initiator
              engine = this._currentEngines.get(game.engineID)
              if (!engine) {
                engine = new Chess()
                engine.load_pgn(game.pgn)
                this._currentEngines.set(game.engineID, engine)
              }
              obj.fen = engine.fen()
              obj.pgn = engine.pgn()
              return obj
            }
          ))
      })
  },

  /* called from sockets */
  userConnected(nickname) {
    logger.debug(`userConnected,  CONTEXT: "logic/index.js", NICKNAME:${nickname}`)

    return Promise.resolve()
      .then(_ => {
        this._validateStringField("nickname", nickname)
        return User.findOne({nickname})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${nickname} nickname does not exist`)
      })
      .then(() => true)

  },

  getUsersForString(nickname, term) {
    logger.debug(`getUsersForString,  CONTEXT: "logic/index.js", TERM:${term}`)

    return Promise.resolve()
      .then(_ => {
        this._validateStringField('nickname', nickname)
        if (!term) return []
        else if (typeof term !== 'string')
          throw new LogicError('search term is not a string')
        else {
          return User.find({$and: [{nickname: {"$regex": term, $options: "i"}}, {nickname: {$ne: nickname}}]}).lean()
            .then(users => {
              users = users.map(user => user.nickname)
              userSet = new Set
              users.forEach(user => userSet.add(user))
              userSet.delete(nickname)
              return Array.from(userSet)
            })
        }
      })
  },

  /*

    getOpponentsForUser(nickname) {
      return Promise.resolve()
        .then(_ => {
          this._validateStringField("nickname", nickname)
          return Game.find({$or: [{initiator: nickname}, {acceptor: nickname}]}).lean()
        })
        .then(games => {
          const users = new Set
          games.forEach(game => {
            users.add(game.initiator)
            users.add(game.acceptor)
          })
          users.delete(nickname)
          return Array.from(users)
        })
    },
  */

  acknowledgeGameOverForUser(nickname, gameID) {
    logger.debug(`acknowledgeGameOverForUser,  CONTEXT: "logic/index.js", NICKNAME:${nickname}, GAMEID:${gameID}`)

    return Promise.resolve()
      .then(_ => {
        this._validateStringField("nickname", nickname)
        this._validateStringField("gameID", gameID)
        return Game.findOne({_id: mongoose.Types.ObjectId(gameID)})
      })
      .then(game => {
        if (!game) throw new LogicError(`game with id ${gameID} does not exist`)
        if (game.initiator !== nickname && game.acceptor !== nickname) throw new LogicError(`game with id ${gameID} does not belong to user ${nickname}`)
        if (game.hasAcknowledgedGameOver.length > 0 && game.hasAcknowledgedGameOver.indexOf(nickname) === -1)  // other user has acknowledged
          game.state = 'terminated'
        game.hasAcknowledgedGameOver.push(nickname)
        return game.save()
      })
      .then(_ => true)
  },

  _createGame(requester, confirmer) {
    logger.debug(`_createGame,  CONTEXT: "logic/index.js", REQUESTER:${requester}, CONFIRMER:${confirmer}`)

    let game
    return Promise.resolve()
      .then(_ => {
        this._validateStringField("requester", requester)
        this._validateStringField("confirmer", confirmer)
        return User.findOne({nickname: requester})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${requester} nickname does not exist`)
        return User.findOne({nickname: requester})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${confirmer} nickname does not exist`)
        const engine = new Chess()
        const uuid = uuidv1()
        this._currentEngines.set(uuid, engine)
        //   engine.header('White', requester, 'Black', confirmer)
        const pgn = engine.pgn()
        game = new Game({
          initiator: requester,
          acceptor: confirmer,
          engineID: uuid,
          pgn,
          winner: "",
          state: "invited",
          toPlay: requester,
          inCheck: false,
          inDraw: false,
          inStalemate: false,
          inCheckmate: false,
          inThreefoldRepetition: false,
          insufficientMaterial: false,
          hasAcknowledgedGameOver: [],
        })
        return game.save()
      })
      .then(_ => true)
  },

  getOpponentForGame(nickname, gameID) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField("nickname",nickname)
        this._validateStringField("gameID",gameID)
        return Game.findOne({_id: mongoose.Types.ObjectId(gameID)})
      })
      .then(game => {
        if (!game) throw new LogicError(`game does not exist for game id ${gameID}`)
        if (game.initiator !== nickname && game.acceptor !== nickname) throw new LogicError(`game with game id ${gameID} does not belong to user ${nickname}`)
        return nickname === game.initiator ? game.acceptor : game.initiator
      })
  },


  move(nickname, gameID, move) {
    logger.debug(`move,  CONTEXT: "logic/index.js", GAMEID:${gameID}, MOVE:${move ? JSON.stringify(move) : 'undefined'}`)

    let game

    return Promise.resolve()
      .then(_ => {
        this._validateStringField("nickname", nickname)
        this._validateStringField("gameID", gameID)
        if (move === undefined || typeof move !== 'object' || !move.from || !move.to || !move.promotion) throw new LogicError('move is of wrong format')
        return Game.findOne({_id: mongoose.Types.ObjectId(gameID)})
      })
      .then(_game => {
        game = _game

        if (!game) throw new LogicError(`game with id ${gameID} does not exist`)
        if (game.initiator !== nickname && game.acceptor !== nickname) throw new LogicError(`game with id ${gameID} does not belong to user ${nickname}`)
        if (game.toPlay !== nickname) throw new LogicError(`it is not the turn of ${nickname}`)
        const engine = this._currentEngines.get(game.engineID)
        if (engine.game_over()) throw new LogicError('game is over, cannot move')
        const result = engine.move(move)
        if (!result) throw new LogicError(`move is not allowed`)
        if (engine.game_over()) {
          game.inThreefoldRepetition = engine.in_threefold_repetition()
          game.inDraw = engine.in_draw()
          game.insufficientMaterial = engine.insufficient_material()
          game.inStalemate = engine.in_stalemate()
          game.inCheckmate = engine.in_checkmate()
          if (game.inCheckmate) game.winner = nickname
          else game.winner = "no winner"
        } else {
          game.pgn = engine.pgn()
          game.inCheck = engine.in_check()
          const turn = engine.turn()
          game.toPlay = (turn === 'w') ? game.initiator : game.acceptor // because the initiator is always white (for now)
        }
        return game.save()
      })
      .then(_ => true)

  },

  requestNewGame(requester, destination) {
    logger.debug(`requestNewGame,  CONTEXT: "logic/index.js", REQUESTER:${requester}, DESTINATION:${destination}`)

    return Promise.resolve()
      .then(_ => {
        this._validateStringField("requester", requester)
        this._validateStringField("destination", destination)
        return User.findOne({nickname: requester})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${requester} nickname does not exist`)
        return User.findOne({nickname: destination})

      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${destination} nickname does not exist`)
        return Game.findOne({
          $or: [{$and: [{"initiator": requester}, {"acceptor": destination}]}, {$and: [{"initiator": destination}, {"acceptor": requester}]}],
          "state": {$ne: "terminated"}
        })

      })
      .then(game => {
        if (game) throw new LogicError(`game between ${game.initiator} and ${game.acceptor} already exists`)
        return this._createGame(requester, destination)
      })
      .then(_ => {
        return true
      })
  },

  respondToGameRequest(confirmer, destination, gameID, answer) {
    logger.debug(`respondToGameRequest,  CONTEXT: "logic/index.js", CONFIRMER:${confirmer}, DESTINATION:${destination}, GAMEID:${gameID}, ANSWER:${answer}`)

    return Promise.resolve()
      .then(_ => {
        this._validateStringField("confirmer", confirmer)
        this._validateStringField("destination", destination)
        this._validateStringField("gameID", gameID)
        if (typeof answer !== 'boolean') throw new LogicError('answer is not type boolean')
        return Game.findOne({_id: mongoose.Types.ObjectId(gameID)})
      })
      .then(game => {
        if (!game) throw new LogicError(`game with id ${gameID} does not exist`)
        if (game.initiator !== destination) throw new LogicError(`game with id ${gameID} does not belong to ${destination}`)
        if (game.acceptor !== confirmer) throw new LogicError(`game with id ${gameID} does not belong to ${confirmer}`)
        game.state = answer ? 'playing' : 'terminated'
        return game.save()
      })
      .then(_ => {
        return true
      })

  },
/*
  getLogs(type) {
    type = type || 'combined'
    return new Promise((resolve, reject) => {
      fs.readFile(`${appRoot}/logs/${type}.log`, "utf8", (err, data) => {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }*/

}


class LogicError extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = {logic, LogicError}