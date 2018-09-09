const chalk = require('chalk')
const {logic, LogicError} = require('./logic')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const logger = require('./logger')


const socketLogic = {


  io: null,


  onError(nickname, error) {
    logger.debug(`onError,  CONTEXT: "sockets.js"", NICKNAME:${nickname}, ERROR:${error}`)

    this.io.emit(`error ${nickname}`, error)
  },

  gameAcceptedOrRejected(destination) {
    logger.debug(`gameAcceptedOrRejected,  CONTEXT: "sockets.js"", DESTINATION:${destination}`)

    this.io.emit(`update to games ${destination}`)
  },

  announceMoveMade(mover, receiver) {
    logger.debug(`announceMoveMade,  CONTEXT: "sockets.js"", MOVER:${mover}, RECEIVER:${receiver}`)

    this.io.emit(`update to games ${mover}`)
    this.io.emit(`update to games ${receiver}`)
  },

  requestConnection(destination) {
    logger.debug(`announceMoveMade,  CONTEXT: "sockets.js"", DESTINATION:${destination}`)

    this.io.emit(`update to games ${destination}`)
  },

 /* requestHasBeenRespondedTo(destination) {
    this.io.emit(`request response ready ${destination}`)
  },*/

  newGameAdded(confirmer,asker) {
    logger.debug(`newGameAdded,  CONTEXT: "sockets.js"", CONFIRMER:${confirmer}, ASKER:${asker}`)

    this.io.emit(`update to games ${confirmer}`)
    this.io.emit(`update to games ${asker}`)
  },



  setIO(io) {
    this.io = io

    io.on('connection', (socket) => {
      logger.debug(`on connection,  CONTEXT: "sockets.js"", SOCKETID:${socket.id}`)



     socket.on('disconnect', reason => {
       logger.debug(`on disconnect,  CONTEXT: "sockets.js"", SOCKETID:${socket.id}, REASON:${reason}`)

     })

      socket.on('client alive', nickname => {
       // console.log(chalk.white.bgGreen.bold(`User ${nickname} client alive message received`))

           })

 /*     socket.on('logout', username => {
        console.log(chalk.white.bgBlue.bold(`User ${username} has logged out`))
        this.onUserPermanentlyDisconnect(username)
      })
*/

      socket.on('error', client => {
        logger.debug('on error', { "context": "sockets.js", "client": client })
        logger.debug(`on error,  CONTEXT: "sockets.js"", client:${client}`)

      })

      socket.on('authenticated', username => {
        logger.debug('on authenticated', { "context": "sockets.js", "username": username })
        logger.debug(`on authenticated,  CONTEXT: "sockets.js"", USERNAME:${username}`)

        return Promise.resolve()
          .then(_ => {
            return logic.userConnected(username, socket)
          })
          .then(_ => this.io.emit('user connected'))
      })

    })
  }
}

module.exports = {sockets: socketLogic}