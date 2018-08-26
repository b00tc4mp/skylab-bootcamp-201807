const validateEmail = require('../utils/validate-email')
const {User} = require('../data/models')
const socketIO = require('socket.io');
const logic = {

  io: null,

  /*
    loggedInUsers: [],
  */

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
        /*   if (this.loggedInUsers.findIndex(user => user.email === email) === -1) this.loggedInUsers.push({
             email: user.email,
             socket: null,
             partner: null
           })*/
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
    /* const usersToSendToClient = this.loggedInUsers.map(user => ({
       username: user.email,
       hasPartner: user.partner !== null
     }))*/
    const usersToSendToClient = Array.from(this.availableUsers)
    console.error("sending these users to client", usersToSendToClient)
    this.io.sockets.emit('all users', usersToSendToClient)
  },


  setIO(io) {
    this.io = io

    io.on('connection', (socket) => {

      socket.on('disconnect', reason => {
        /*   this.loggedInUsers.forEach(user => {
             if (user.partner === socket) user.partner = null
           })
           const i = this.loggedInUsers.findIndex(user => user.socket === socket)
           if (i !== -1) this.loggedInUsers.splice(i, 1)
           this.broadcastUsersState()*/
      })

      socket.on('logout', username => {
/*
        this._validateEmail(email)
*/

        this.availableUsers.delete(username)
        this.userToSocket.delete(username)
        const connectedWith = this.userToUser.get(username)
        if (connectedWith) this.availableUsers.add(connectedWith)
        this.userToUser.delete(username)
        this.userToUser.delete(connectedWith)
        this.broadcastUsersState()
      })

      socket.on('sent message',(sender,message,cb) => {
        debugger
        const destination = this.userToUser.get(sender)
        if (!destination) return cb(1,"Destination not found")
        const toSocket = this.userToSocket.get(destination)
        if (!toSocket) return cb(1,`Socket for user ${destination} not found`)
        toSocket.emit('message received',message,cb)
      })


      socket.on('establish connection', (requester, destination, cb) => {
      /*  this._validateStringField('requester', requester)
        this._validateStringField('destination', destination)
        if (typeof cb !== 'function') throw new LogicError(`invalid callback ${cb.toString()}`)*/

        /* const requestingUser = this.loggedInUsers.find(user => user.email === requester)
         if (!requestingUser) return cb("Requesting user not found")
         const userToConnect = this.loggedInUsers.find(user => user.email === destination)
         if (!userToConnect) return cb("Requesting user not found")
         requestingUser.partner = userToConnect.socket
         userToConnect.partner = requestingUser.socket*/
        if (!this.availableUsers.has(requester)) return cb(1,`Requesting user ${requester} not available`)
        if (!this.availableUsers.has(destination)) return cb(1,`Destination user ${destination} not available`)
        if (!this.userToSocket.get(requester)) return cb(1,`Requesting user ${requester} does not have a socket`)
        if (!this.userToSocket.get(destination)) return cb(1,`Destination user ${destination} does not have a socket`)
        this.userToUser.set(requester, destination)
        this.userToUser.set(destination, requester)
        this.availableUsers.delete(requester)
        this.availableUsers.delete(destination)

        cb(null,`Connection established between ${requester} and ${destination}`)
        this.userToSocket.get(destination).emit('connected remotely')
        this.broadcastUsersState()
      })

      socket.on('error', client => {
        console.log("There was an error with client", client.id)
      })

      socket.on('authenticated', username => {
/*
        this._validateEmail(email)
*/

        /*  const userData = this.loggedInUsers.find(userdata => userdata.email === username)
          if (userData) {
            if (userData.socket) userData.socket.disconnect()
            userData.socket = socket
          }
          else this.loggedInUsers.push({email: username, socket: socket, partner: null})*/
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