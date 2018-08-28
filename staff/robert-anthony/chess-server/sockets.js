const chalk = require('chalk')
const {logic, LogicError} = require('./logic')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const socketLogic = {


  io: null,

  timers: [],
  _userToSocket: new Map,

  onError(username, error) {
    const socket = this._userToSocket.get(username)
    if (socket) socket.emit('error', error)
    else
      console.error(`socket not found for user ${username}`)
  },

  announceMoveMade(mover, receiver) {
    const socketWhite = this._userToSocket(mover)
    if (!socketWhite) throw new LogicError(`Missing socket for ${mover} when announcing move made`)
    const socketBlack = this._userToSocket(receiver)
    if (!socketBlack) throw new LogicError(`Missing socket for ${receiver} when announcing move made`)
    socketWhite.emit('move made')
    socketBlack.emit('move made')
  },

  requestConnection(requester, destination) {
    const socketDestination = this._userToSocket(destination)
    socketDestination.emit('move made')
  },

  onUserTemporarilyDisconnect(username) {
    if (this._userToSocket.has(username)) this._userToSocket.set(username, null)
    const timer = setTimeout(this.onUserPermanentlyDisconnect.bind(this), 60 * 1000, username)
    this.timers.push({username, timer})
  },

  onUserPermanentlyDisconnect(username) {
    if (this._userToSocket.has(username)) this._userToSocket.set(username, null)
    logic.userDisconnected(username)
      .then(res => {
        if (res) this.io.emit('user disconnected')
      })

  },

  setIO(io) {
    this.io = io

    io.on('connection', (socket) => {
      console.log(chalk.yellow.bgBlue.bold(`There was a connection on the server for socket ${socket.id}`))


      // a reconnection request from client (after unwanted disconnection)
      socket.on('client has reconnected', (username, cb) => {
        console.log(chalk.yellow.bgBlue.bold(`Client reconnected with socket ${socket.id}`))
        // clear any timers related to user (should only be one
        // so that user is not permanently disconnected
        this.timers.forEach(timer => {
          if (timer.username === username) timer.clearTimeout()
        })
        this.timers = this.timers.filter(timer => timer.username !== username)
        // and associate new socket with user
        if (this._userToSocket.has(username)) {
          this._userToSocket.set(username, socket)
          cb(null, `Successfully reset socket for user ${username}`)
        } else cb(1, `Did not reset socket for user ${username}`)
      })

      socket.on('disconnect', reason => {
        console.log(chalk.white.bgBlue.bold(`There was a disconnection on the server for socket ${socket.id}, reason: ${reason}`))
        let username
        this._userToSocket.forEach((value, key) => {
          if (value === socket) username = key
        })
        if (username) {
          this.onUserTemporarilyDisconnect(username)
        } else console.log(chalk.white.bgRed.bold(`User not encountered for ${socket.id}, on disconnection`))

      })

      socket.on('logout', username => {
        console.log(chalk.white.bgBlue.bold(`User ${username} has logged out`))
        this.onUserPermanentlyDisconnect(username)
      })


      socket.on('error', client => {
        console.log(chalk.white.bgRed.bold("There was an error with client", client.id))
      })

      socket.on('authenticated', username => {
        console.error("authenticated user", username)

        return Promise.resolve()
          .then(_ => {
            this._userToSocket.set(username, socket)
            return logic.userConnected(username, socket)
          })
      })

    })
  }
}

module.exports = {sockets: socketLogic}