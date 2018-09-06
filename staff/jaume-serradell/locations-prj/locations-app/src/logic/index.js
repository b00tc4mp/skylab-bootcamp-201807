const validateEmail = require('../utils/validate-email')

const logic = {
    url: 'http://localhost:8080/api',

    _call(path, method, headers, body, expectedStatus) {
        const config = { method }

        if (headers) config.headers = headers
        if (body) config.body = body

        return fetch(`${this.url}/${path}`, config)
            .then(res => {
                if (res.status === expectedStatus) {
                    return res
                } else{
                    return res.json()
                        .then(({ message }) => {
                            throw new Error(message)
                        })
                }
            })
    },

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new LogicError(`invalid ${fieldName}`)
    },

    

    /** Number field validator
     * 
     * @param {string} name The name of the value
     * @param {string} value The value of the value
     * 
     * @throws {LogicError} If number input is invalid
     * 
     */
    _validateNumberField(name, value) {
        if (typeof value !== 'number') throw new LogicError(`invalid ${name}`)
    },

    /** Email validator
     * 
     * @param {string} email The owner's email
     * 
     * @throws {LogicError} If mail is invalid
     * 
     */
    _validateEmail(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },

    register(name, email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call('register', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ name, email, password }), 201)
                    .then(() => true)
            })
    },

    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call('authenticate', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ email, password }), 200)
                    .then(res => res.json())
                    // .then(({ token }) => {
                    //     debugger
                    //     token
                    // })
                    .then(res => res)
            })

    },

    updatePassword(email, password, newPassword, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)

                return this._call(`owner/${email}/update`, 'patch', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, JSON.stringify({ email, password, newPassword }), 200)
            })
            .then(res => res.json())

    },

    unregisterOwner(email, password, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call(`owner/${email}/unregister`, 'delete', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, JSON.stringify({ email, password }), 200)
            })
            .then(res => res.json())
            .then(() => true)
    },

    addProperty(email, title, subtitle, photo, description, categories, type, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('title', title)
                this._validateStringField('photo', photo)
                this._validateStringField('type', type)
                if (!(categories instanceof Array)) throw new LogicError('invalid categories')

                return this._call(`owner/${email}/property`, 'post', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, JSON.stringify({ email, title, subtitle, photo, description, categories, type }), 200)
            })
            .then(res => res.json())
            .then(id  => {
                return id
            })
    },

    listPropertyByQuery(type = 'all', categories = []) {
        return Promise.resolve()
            .then(() => {
                let url = 'listProperties'

                // Si vienen filtros
                if(type !== 'all' || categories.length) {
                    // Vienen ambos filtros
                    if(type !== 'all' && categories.length) {
                        url += `?type=${type}&categories=${categories}`
                    }
                    else { // Viene uno de los dos
                        if(type !== 'all') url += `?type=${type}`
                        if(categories.length) url += `?categories=${categories}`
                    }
                }

                return this._call(url, 'get', undefined, undefined, 200)
            })
            .then(res => res.json())
    },

    deletePropertyById(email, propertyId, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                // this._validateObjectId(propertyId)
                debugger
                return this._call(`owner/${email}/property/${propertyId}`, 'delete', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, undefined, 200)
            })
            .then(res => {
                return res.json()
            })
            .then(res => res)
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = logic
