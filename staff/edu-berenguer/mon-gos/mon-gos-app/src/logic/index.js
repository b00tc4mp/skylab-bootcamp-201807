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
                } else
                    return res.json()
                        .then(({ message }) => {
                            throw new Error(message)
                        })
            })
    },

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
    },

    _validateNumberField(name, value) {
        if (typeof value !== 'number') throw new LogicError(`invalid ${name}`)
    },

    _validateEmail(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },

    register(email, name, adress, phone, password, latitude, longitude) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('name', name)
                this._validateStringField('adress', adress)
                this._validateStringField('phone', phone)
                this._validateStringField('password', password)
                this._validateNumberField('latitude', latitude)
                this._validateNumberField('longitude', longitude)


                return this._call('register', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ email, name, adress, phone, password, latitude, longitude }), 201)
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
                    .then((res) => res)
            })
    },

    insertDog(id, name, gender, age, weight, photo, description, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)
                this._validateStringField('gender', gender)
                this._validateNumberField('age', age)
                this._validateNumberField('weight', weight)
                this._validateStringField('description', description)

                return this._call(`shelter/${id}/dog`, 'post',
                    { authorization: `bearer ${token}`, 'content-type': 'application/json' }
                    , JSON.stringify({ name, gender, age, weight, photo, description }), 200)
                    .then(res => res.json())
            })
    },

    removeDog(id, dogId, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`remove/${id}/dog/${dogId}`, 'delete', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, undefined, 201)
            })
            .then(res => res.json())
    },

    dogAdopted(id, dogId, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`/shelter/${id}/dog/${dogId}`, 'put', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, undefined, 200)
            })
            .then(res => res.json())
    },

    listDogsNotAdopted() {
        return Promise.resolve()
            .then(() => {
                return this._call(`/listNotAdopteds`, 'get', undefined, undefined, 200)
            })
            .then(res => res.json())
    },

    listDogsAdopted() {
        return Promise.resolve()
            .then(() => {
                return this._call(`/listAdopteds`, 'get', undefined, undefined, 200)
            })
            .then(res => res.json())
    },

    listDogsByShelter(id, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`/listDogsByShelter/${id}`, 'get', { authorization: `bearer ${token}` }, undefined, 200)
            })
            .then(res => res.json())
    },

    retrieveDog(dogId) {
        return Promise.resolve()
            .then(() => {
                return this._call(`/retrieveDog/${dogId}`, 'get', undefined, undefined, 200)
            })
            .then(res => res.json())
    },

    retrieveShelter(id) {
        return Promise.resolve()
            .then(() => {
                return this._call(`/retrieveShelter/${id}`, 'get', undefined, undefined, 200)
            })
            .then(res => res.json())
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }