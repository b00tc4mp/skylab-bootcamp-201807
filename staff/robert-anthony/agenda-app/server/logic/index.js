'use strict'


const uuidv1 = require('uuid/v1');


const logic = {
  _users: null,

  _validateStringField(fieldName, fieldValue) {
    if (typeof fieldValue !== 'string' || !fieldValue.length) throw new LogicError(`invalid ${fieldName}`)
  },

  addContact(username, contact) {
    return Promise.resolve()
      .then(_ => {
        this._validateStringField('username', username)

        if (contact === null || contact === undefined || typeof contact !== 'object') throw new LogicError('invalid contact information')
      })
      .then(_ => this._users.findOne({username}))
      .then(user => {
        if (!user) throw new LogicError(`user ${username} does not exist`)
        contact.id = `${contact.firstname}${contact.surname}`
        return this._users.updateOne({_id: user._id}, {$addToSet: {"contacts": contact}})
      })
      .then(res => {
        if (res.result.nModified === 0) throw new LogicError('error adding contact')
        else return true
      })


  },

  updateContact(username, contact) {
    return Promise.resolve()
      .then(_ => {
        this._validateStringField('username', username)

        if (contact === null || contact === undefined || typeof contact !== 'object') throw new LogicError('invalid contact information')
        if (contact.id === undefined || contact.id === null || contact.id === "") throw new LogicError("invalid contact id")
      })
      .then(_ => this._users.findOne({username}))
      .then(user => {
        if (!user) throw new LogicError(`user ${username} does not exist`)

        return this._users.updateOne({_id: user._id, "contacts.id": contact.id}, {$set: {"contacts.$": contact}})
      })
      .then(res => {
        if (res.result.nModified === 0) throw new LogicError('error updating contact')
        else return true
      })


  },

  addNote(username, note) {
    return Promise.resolve()
      .then(_ => {
        this._validateStringField('username', username)

        if (note === null || note === undefined || typeof note !== 'object') throw new LogicError('invalid note')
      })
      .then(_ => this._users.findOne({username}))
      .then(user => {
        if (!user) throw new LogicError(`user ${username} does not exist`)
        return this._users.updateOne(user, {$addToSet: {"notes": note}})
      })
      .then(_ => true)


  },


  register: function (username, password) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)
        this._validateStringField('password', password)

        return this._users.findOne({username})
      })
      .then(user => {
        if (user) throw new LogicError(`user ${username} already exists`)

        const _user = {username, password}
        return this._users.insertOne(_user)
          .then(() => true)


      })
  },


  authenticate(username, password) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)
        this._validateStringField('password', password)

        return this._users.findOne({username})
      })
      .then(user => {
        if (!user) throw new LogicError(`user ${username} does not exist`)

        if (user.password !== password) throw new LogicError('wrong credentials')
        return true
      })
  },
  updatePassword(username, password, newPassword) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)
        this._validateStringField('password', password)
        this._validateStringField('new password', newPassword)
        return this._users.findOne({username})
      })
      .then(user => {
        if (!user) throw new LogicError(`user ${username} does not exists`)

        if (user.password !== password) throw new LogicError('wrong credentials')

        if (password === newPassword) throw new LogicError('new password cannot be same as current password')
        //return this._users.updateOne({ username }, { $set: { password: newPassword } })
        return this._users.updateOne({_id: user._id}, {$set: {password: newPassword}})
      })
      .then(res => {
        if (res.result.nModified === 0) throw new LogicError('error on updating password')
        else return true
      })
  },


}

class LogicError extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = {logic, LogicError}