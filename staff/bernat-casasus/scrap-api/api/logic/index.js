'use strict'

const logic = {
    _flats: null,

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new LogicError(`invalid ${fieldName}`)
    },

    listByTitle(title) {
        return Promise.resolve()
            .then(() => {
                const keyword = "Piso en "
                this._validateStringField('title', title)

                title = title.replace('+',' ')
                title = keyword.concat(title)
                return this._flats.find({title}).toArray()
            })
            .then((flat) => {
               console.log(flat)
               return flat

            })
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }