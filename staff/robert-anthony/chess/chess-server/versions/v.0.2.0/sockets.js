const chalk = require('chalk')
const {Chess} = require('chess.js')

const socketLogic = {


  io: null,

  timers: [],
  userToSocket: new Map,
  userToUser: new Map,
  availableUsers: new Set,
  games: [],

  makeGame(requester, destination) {
    const game = new Chess();
    this.games.push({game, white: requester, black: destination})
  },

  gameForUser(username) {
    return this.games.find(game => (game.white === username || game.black === username))
  },

  removeGameForUser(username) {
    const i = this.games.findIndex(game => (game.white === username || game.black === username))
    if (i !== -1) this.games.splice(i, 1)
  },

  broadcastUsersState() {
    const usersToSendToClient = Array.from(this.availableUsers)
    this.io.sockets.emit('all users', usersToSendToClient)
  },

  onUserTemporarilyDisconnect(username) {
    this.userToSocket.set(username, null)
    const timer = setTimeout(this.onUserPermanentlyDisconnect.bind(this), 60 * 1000, username)
    this.timers.push({username, timer})
  },

  onUserPermanentlyDisconnect(username) {
    if (this.availableUsers.has(username)) this.availableUsers.delete(username)
    if (this.userToSocket.has(username)) this.userToSocket.set(username, null)
    if (this.userToUser.has(username)) {
      const connectedWith = this.userToUser.get(username)
      if (connectedWith) {
        if (this.userToUser.has(connectedWith)) this.userToUser.delete(connectedWith)
        const partnerSocket = this.userToSocket.get(connectedWith)
        if (partnerSocket) partnerSocket.emit('partner disconnected')
        this.availableUsers.add(connectedWith)
      }
    }
    if (this.userToUser.has(username)) this.userToUser.delete(username)
    this.broadcastUsersState()
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
        if (this.userToSocket.has(username)) {
          this.userToSocket.set(username, socket)
          cb(null, `Successfully reset socket for user ${username}`)
        } else cb(1, `Did not reset socket for user ${username}`)
      })

      socket.on('disconnect', reason => {
        console.log(chalk.white.bgBlue.bold(`There was a disconnection on the server for socket ${socket.id}, reason: ${reason}`))
        let username
        this.userToSocket.forEach((value, key) => {
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

      socket.on('move sent to chess engine', (sender, message, cb) => {
        const game = this.gameForUser(sender)
        if (!game) return cb(1, `No game found for user ${sender} `)
        if (game.game.move(message)) { // move approved by game engine
          const senderSocket = this.userToSocket.get(sender)
          const destination = this.userToUser.get(sender)
          const destinationSocket = this.userToSocket.get(destination)
          senderSocket.emit('new position',game.game.fen()) /// WRONG!!!!!! need to emit only to some not to all
          destinationSocket.emit('new position',game.game.fen()) /// WRONG!!!!!! need to emit only to some not to all
         // io.sockets.emit('new position',game.game.fen()) /// WRONG!!!!!! need to emit only to some not to all
          cb(null,"Move approved by game engine")
        } else {
          cb(5050,"Move not approved by game engine")
        }
      })


      socket.on('establish connection', (requester, destination, cb) => {
        console.error("establish connection", requester, destination)

        if (!this.availableUsers.has(requester)) return cb(1, `Requesting user ${requester} not available`)
        if (!this.availableUsers.has(destination)) return cb(1, `Destination user ${destination} not available`)
        if (!this.userToSocket.get(requester)) return cb(1, `Requesting user ${requester} does not have a socket`)
        if (!this.userToSocket.get(destination)) return cb(1, `Destination user ${destination} does not have a socket`)
        this.userToUser.set(requester, destination)
        this.userToUser.set(destination, requester)
        this.availableUsers.delete(requester)
        this.availableUsers.delete(destination)
        this.makeGame(requester, destination)
        cb(null, `Connection established between ${requester} and ${destination}`)
        this.userToSocket.get(destination).emit('connected remotely')
        this.broadcastUsersState()
      })

      socket.on('error', client => {
        console.log(chalk.white.bgRed.bold("There was an error with client", client.id))
      })

      socket.on('authenticated', username => {
        console.error("authenticated user", username)
        if (this.userToSocket.get(username)) this.userToSocket.delete(username)
        this.userToSocket.set(username, socket)
        this.availableUsers.add(username)
        this.broadcastUsersState()
      })

    })
  }
}

module.exports = {sockets: socketLogic}