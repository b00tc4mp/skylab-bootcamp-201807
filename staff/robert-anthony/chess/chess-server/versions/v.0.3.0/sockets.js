const chalk = require('chalk')
const {logic, LogicError} = require('./logic')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const socketLogic = {


  io: null,

  _timers: [],

  onError(nickname, error) {
    this.io.emit(`error ${nickname}`, error)
  }
  ,

  announceMoveMade(mover, receiver) {
    this.io.emit(`update to games ${mover}`)
    this.io.emit(`update to games ${mover}`)
  },

  requestConnection(destination) {
    this.io.emit(`game requested ${destination}`)
  },

  requestHasBeenRespondedTo(destination) {
    this.io.emit(`request response ready ${destination}`)
  },

  newGameAdded(confirmer,asker) {
    this.io.emit(`update to games ${confirmer}`)
    this.io.emit(`update to games ${asker}`)
  },

  setNewUserTimeout(username) {
    const timer = setTimeout(this.onUserPermanentlyDisconnect.bind(this), 10000 * 1000, username)
    this._timers.push({username, timer})
  },

  onUserPermanentlyDisconnect(username) {
    console.log(chalk.white.bgMagenta.bold(`User ${username} disconnected`))

    logic.userDisconnected(username)
      .then(res => {
        if (res) this.io.emit('user disconnected')
      })

  },

  setIO(io) {
    this.io = io

    io.on('connection', (socket) => {
      console.log(chalk.yellow.bgBlue.bold(`There was a connection on the server for socket ${socket.id}`))

      /*

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
      */

      /*socket.on('disconnect', reason => {
        console.log(chalk.white.bgBlue.bold(`There was a disconnection on the server for socket ${socket.id}, reason: ${reason}`))
        let username
        this._userToSocket.forEach((value, key) => {
          if (value === socket) username = key
        })
        if (username) {
          this.onUserTemporarilyDisconnect(username)
        } else console.log(chalk.white.bgRed.bold(`User not encountered for ${socket.id}, on disconnection`))

      })*/

      socket.on('client alive', nickname => {
       // console.log(chalk.white.bgGreen.bold(`User ${nickname} client alive message received`))

        // clear any timers related to user (should only be one
        // so that user is not permanently disconnected
        if (nickname === '' || nickname === undefined || nickname === null) return
        this._timers.forEach(timer => {
          if (timer.username === nickname) clearTimeout(timer.timer)
        })
        this._timers = this._timers.filter(timer => timer.username !== nickname)
        // now start a new timer for user
        this.setNewUserTimeout(nickname)
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
            return logic.userConnected(username, socket)
          })
          .then(_ => this.io.emit('user connected'))
      })

    })
  }
}

module.exports = {sockets: socketLogic}