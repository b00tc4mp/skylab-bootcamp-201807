const logic = {

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
    },

    register(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail('email', email)
                this._validateStringField('password', password)
            })
    },

    login(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('email', email)
                this._validateStringField('password', password)

            })
    }


}


class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }