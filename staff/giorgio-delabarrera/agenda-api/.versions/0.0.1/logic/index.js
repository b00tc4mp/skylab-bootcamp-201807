'use strict'

const fs = require('fs')

const logic = {

  _users: null,

  _validateStringField(fieldName, fieldValue) {
    if (typeof fieldValue !== 'string' || !fieldValue.length) throw new LogicError(`invalid ${fieldName}`)
  },

  register(username, password) {
    console.log(username, password)
  }

}

class LogicError extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = { logic, LogicError }