'use strict'

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = LogicError