const validateEmail = require('../utils/validate-email')
const moment = require('moment')
const { Hostess, Business, Events} = require('../data/models')

const logic = {

    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
    },

    _validateEmail(email) {
        if(!validateEmail(email)) throw new LogicError('invalid email')
    },

    



}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }