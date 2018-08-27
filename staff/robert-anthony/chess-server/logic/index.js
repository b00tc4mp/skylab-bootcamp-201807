const validateEmail = require('../utils/validate-email')
const {User} = require('../data/models')
// const socketIO = require('socket.io');
const chalk = require('chalk')
const logic = {

  io: null,


  userToSocket: new Map,
  userToUser: new Map,
  availableUsers: new Set,

  _validateStringField(name, value) {
    if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
  },

  _validateEmail(email) {
    if (!validateEmail(email)) throw new LogicError('invalid email')
  },

  _validateDateField(name, field) {
    if (!(field instanceof Date)) throw new LogicError(`invalid ${name}`)
  },


  register(email, password) {
    return Promise.resolve()
      .then(() => {
        this._validateEmail(email)
        this._validateStringField('password', password)

        return User.findOne({email})
      })
      .then(user => {
        if (user) throw new LogicError(`user with ${email} email already exist`)

        return User.create({email, password})
      })
      .then(() => true)

  },

  authenticate(email, password) {
    return Promise.resolve()
      .then(() => {
        this._validateEmail(email)
        this._validateStringField('password', password)

        return User.findOne({email})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${email} email does not exist`)

        if (user.password !== password) throw new LogicError(`wrong password`)

        if (!this.availableUsers.has(user.email)) {
          this.availableUsers.add(user.email)
        }

      })

      .then(() => true)

  },

  updatePassword(email, password, newPassword) {
    return Promise.resolve()
      .then(() => {
        this._validateEmail(email)
        this._validateStringField('password', password)
        this._validateStringField('new password', newPassword)

        return User.findOne({email})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${email} email does not exist`)

        if (user.password !== password) throw new LogicError(`wrong password`)

        if (password === newPassword) throw new LogicError('new password must be different to old password')

        user.password = newPassword

        return user.save()
      })
      .then(() => true)
  },

  unregisterUser(email, password) {
    return Promise.resolve()
      .then(() => {
        this._validateEmail(email)
        this._validateStringField('password', password)
        return User.findOne({email})
      })
      .then(user => {
        if (!user) throw new LogicError(`user with ${email} email does not exist`)

        if (user.password !== password) throw new LogicError(`wrong password`)

        return User.deleteOne({_id: user._id})
      })
      .then(() => true)
  },


  broadcastUsersState() {
    const usersToSendToClient = Array.from(this.availableUsers)
    this.io.sockets.emit('all users', usersToSendToClient)
  },

  onUserDisconnect(username) {
    this.availableUsers.delete(username)
    this.userToSocket.delete(username)
    const connectedWith = this.userToUser.get(username)
    if (connectedWith) {
      const partnerSocket = this.userToSocket.get(connectedWith)
      partnerSocket.emit('partner disconnected')
      this.availableUsers.add(connectedWith)
    }
    this.userToUser.delete(username)
    this.userToUser.delete(connectedWith)
    this.broadcastUsersState()
  },


  setIO(io) {
    this.io = io

    io.on('connection', (socket) => {
      console.log(chalk.yellow.bgBlue.bold(`There was a connection on the server for socket ${socket.id}`))
      socket.on('disconnect', reason => {
        console.log(chalk.white.bgBlue.bold(`There was a disconnection on the server for socket ${socket.id}, reason: ${reason}`))
        let username
        this.userToSocket.forEach((value, key) => {
          if (value === socket) username = key
        })
        if (username) {
          this.onUserDisconnect(username)
        } else console.log(chalk.white.bgRed.bold(`User not encountered for ${socket.id}, on disconnection`))

      })

      socket.on('logout', username => {
        console.log(chalk.white.bgBlue.bold(`User ${username} has logged out`))
        this.onUserDisconnect(username)
      })

      socket.on('sent message', (sender, message, cb) => {
        const destination = this.userToUser.get(sender)
        if (!destination) return cb(1, "Destination not found")
        const toSocket = this.userToSocket.get(destination)
        if (!toSocket) return cb(1, `Socket for user ${destination} not found`)
        toSocket.emit('message received', message, cb)
      })


      socket.on('establish connection', (requester, destination, cb) => {
        if (!this.availableUsers.has(requester)) return cb(1, `Requesting user ${requester} not available`)
        if (!this.availableUsers.has(destination)) return cb(1, `Destination user ${destination} not available`)
        if (!this.userToSocket.get(requester)) return cb(1, `Requesting user ${requester} does not have a socket`)
        if (!this.userToSocket.get(destination)) return cb(1, `Destination user ${destination} does not have a socket`)
        this.userToUser.set(requester, destination)
        this.userToUser.set(destination, requester)
        this.availableUsers.delete(requester)
        this.availableUsers.delete(destination)
        cb(null, `Connection established between ${requester} and ${destination}`)
        this.userToSocket.get(destination).emit('connected remotely')
        this.broadcastUsersState()
      })

      socket.on('error', client => {
        console.log(chalk.white.bgRed.bold("There was an error with client", client.id))
      })

      socket.on('authenticated', username => {
        if (this.userToSocket.get(username)) this.userToSocket.delete(username)
        this.userToSocket.set(username, socket)
        this.broadcastUsersState()
      })

    })
  }


}

class LogicError extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = {logic, LogicError}