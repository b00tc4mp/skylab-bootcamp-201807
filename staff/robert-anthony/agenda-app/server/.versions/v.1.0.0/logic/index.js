'use strict'



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
        if (contact.firstname === null || contact.firstname === undefined || contact.firstname === "" || typeof contact.firstname !== 'string') throw new LogicError('invalid firstname information')
          if (contact.surname === null || contact.surname === undefined || contact.surname === "" ||  typeof contact.surname !== 'string') throw new LogicError('invalid surname information')
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

        if (note === null || note === undefined || typeof note !== 'object') throw new LogicError('invalid note information')
      })
      .then(_ => this._users.findOne({username}))
      .then(user => {
        if (!user) throw new LogicError(`user ${username} does not exist`)
        note.id = uuidv1()
        return this._users.updateOne({_id: user._id}, {$addToSet: {"notes": note}})
      })
      .then(res => {
        if (res.result.nModified === 0) throw new LogicError('error adding note')
        else return true
      })


  },


  updateNote(username, note) {
    return Promise.resolve()
      .then(_ => {
        this._validateStringField('username', username)

        if (note === null || note === undefined || typeof note !== 'object') throw new LogicError('invalid note information')
        if (note.id === undefined || note.id === null || note.id === "") throw new LogicError("invalid note id")
      })
      .then(_ => this._users.findOne({username}))
      .then(user => {
        if (!user) throw new LogicError(`user ${username} does not exist`)

        return this._users.updateOne({_id: user._id, "notes.id": note.id}, {$set: {"notes.$.text": note.text}})
      })
      .then(res => {
        if (res.result.nModified === 0) throw new LogicError('error updating note')
        else return true
      })
  },

  getNoteByID(username, id) {
    return Promise.resolve()
      .then(_ => {
        this._validateStringField('username', username)

        if (id === null || id === undefined || id === "" || typeof id !== 'string') throw new LogicError('invalid note id')
      })
      .then(_ => this._users.findOne({username}))
      .then(user => {
        if (!user) throw new LogicError(`user ${username} does not exist`)
        if (user.notes === undefined) throw new LogicError(`user ${username} has no notes`)
        const note = user.notes.find(element =>  element.id === id)
        if (note === undefined)  throw new LogicError(`note with id ${id} does not exist`)
        return note
      })
  },


    getContactByID(username, id) {
        return Promise.resolve()
            .then(_ => {
                this._validateStringField('username', username)

                if (id === null || id === undefined || id === "" || typeof id !== 'string') throw new LogicError('invalid contact id')
            })
            .then(_ => this._users.findOne({username}))
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                if (user.contacts === undefined) throw new LogicError(`user ${username} has no contacts`)
                const contact = user.contacts.find(element =>  element.id === id)
                if (contact === undefined)  throw new LogicError(`contact with id ${id} does not exist`)
                return contact
            })
    },

    getAllContacts(username) {
        return Promise.resolve()
            .then(_ => {
                this._validateStringField('username', username)
            })
            .then(_ => this._users.findOne({username}))
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)

              return (user.contacts) ? user.contacts : []
            })
    },
    getAllNotes(username) {
        return Promise.resolve()
            .then(_ => {
                this._validateStringField('username', username)

            })
            .then(_ => this._users.findOne({username}))
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)

                return (user.notes) ? user.notes : []
            })
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