const validateEmail = require('../utils/validate-email')
const {User} = require('../data/models')
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



}

class LogicError extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = {logic, LogicError}