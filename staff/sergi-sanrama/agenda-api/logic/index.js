const emailValidate = require('../utils/validate-email/index')

const logic = {
    _users: null,

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new LogicError(`invalid ${fieldName}`),

        register(username, password) {
            return Promise.resolve()
                .then(() => {
                    this._validateStringField('username', username)
                    this._validateStringField('password', password)

                    return this._users.findOne({ email })
            })
            .then (users =>{
                if(user) throw new Error(`user ${user} already exist`)
                return this._users.insert({email, password})
            })
            .then(() => true)
        }
    }
}