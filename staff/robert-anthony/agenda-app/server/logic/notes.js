'use strict'

const {dateToString} = require( '../utils/dateToString')

const notes = {
  _notes: null,

  _validateStringField(fieldName, fieldValue) {
    if (typeof fieldValue !== 'string' || !fieldValue.length) throw new LogicError(`invalid ${fieldName}`)
  },

}

class LogicError extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = {notes}