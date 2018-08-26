const validateEmail = require('../utils/validate-email')
const {User} = require('../data/models')
const socketIO = require('socket.io');
const logic = {

  io: null,

  loggedInUsers: [],

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
        if (this.loggedInUsers.findIndex(user => user.email === email) === -1) this.loggedInUsers.push({
          email: user.email,
          socket: null,
          partner: null
        })
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
    const usersToSendToClient = this.loggedInUsers.map(user => ({
      username: user.email,
      hasPartner: user.partner !== null
    }))
    console.error("sending these users to client",usersToSendToClient)
    this.io.sockets.emit('all users', usersToSendToClient)
  },



  setIO(io) {
    this.io = io

    io.on('connection', (socket) => {

      socket.on('disconnect', reason => {
        this.loggedInUsers.forEach(user =>{
          if (user.partner === socket) user.partner = null
        })
        const i = this.loggedInUsers.findIndex(user => user.socket === socket)
        if (i !== -1) this.loggedInUsers.splice(i, 1)
        this.broadcastUsersState()
      })



      socket.on('establish connection', (requester, destination, cb) => {
        const requestingUser = this.loggedInUsers.find(user => user.email === requester)
        if (!requestingUser) return cb("Requesting user not found")
        const userToConnect = this.loggedInUsers.find(user => user.email === destination)
        if (!userToConnect) return cb("Requesting user not found")
        requestingUser.partner = userToConnect.socket
        userToConnect.partner = requestingUser.socket
        debugger
        cb(`Connection established between ${requestingUser.socket.id} and ${userToConnect.socket.id}`)
        this.broadcastUsersState()
      })

      socket.on('error', client => {
        console.log("There was an error with client", client.id)
      })

      socket.on('authenticated', username => {
        const userData = this.loggedInUsers.find(userdata => userdata.email === username)
        if (userData) {
          if (userData.socket) userData.socket.disconnect()
          userData.socket = socket
        }
        else this.loggedInUsers.push({email: username, socket: socket, partner: null})
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