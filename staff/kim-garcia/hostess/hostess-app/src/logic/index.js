const validateEmail = require('../utils/validate-email')

const logic = {
    url: 'http://localhost:8080/api',

    _call(path, method, headers, body, expectedStatus) {
        const config = { method }

        if (headers) config.headers = headers
        if(body) config.body = body

        return fetch(`${this.url}/${path}`, config)
        .then(res => {
            if(res.status === expectedStatus) {
                return res
            } else
            return res.json()
            .then(({ message }) => {
                throw new Error(message)
            })
        })
    },

    _validateStringField(fieldName, fieldValue) {
        if(typeof fieldName !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
    },

    _validateEmail(email) {
        if (!validateEmail(email)) throw new Error('invalid email')
    },

    registerHostess(email, password) {
        return Promise.resolve()
        .then(() => {
            this._validateEmail(email)
            this._validateStringField('password', password)

            return this._call('hostess-register', 'POST', { 'Content-Type': 'application/json'}, JSON.stringify({ email, password }), 201)
            .then(() => true)
            
        })

    },
    
    
}

module.exports = logic