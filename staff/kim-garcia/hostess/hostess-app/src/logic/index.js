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
        if (typeof fieldName !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
    },

    _validateEmail(email) {
        if (!validateEmail(email)) throw new Error('invalid email')
    },

    _validateNumberField(num, value) {
        if (typeof value !== 'number') throw new Error(`invalid ${num}`)
    },

    registerHostess(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call('hostess-register', 'POST', { 'Content-Type': 'application/json' }, JSON.stringify({ email, password }), 201)
                    .then(() => true)
            })
    },

    registerBusiness(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call('business-register', 'POST', { 'Content-Type': 'application/json' }, JSON.stringify({ email, password }), 201)
                    .then(() => true)

            })
    },

    authenticateHostess(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call('hostess-auth', 'POST', { 'Content-Type': 'application/json' }, JSON.stringify({ email, password }), 200)
                    .then(res => res.json())
                    .then(({ token }) => token)
            })
    },

    authenticateBusiness(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call('business-auth', 'POST', { 'Content-Type': 'application/json' }, JSON.stringify({ email, password }), 200)
                    .then(res => res.json())
                    .then(({ token }) => token)
            })
    },

    updatePasswordHostess(email, password, newPassword, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)

                return this._call(`hostess-edit/${email}`, 'PATCH', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, JSON.stringify({ password, newPassword }), 200)
                    .then(res => res.json())
            })
    },

    updatePasswordBusiness(email, password, newPassword, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)

                return this._call(`business-edit/${email}`, 'PATCH', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, JSON.stringify({ password, newPassword }), 200)
                    .then(res => res.json())
            })
    },

    editBusinessProfile(email, name, web, boss, phone, philosophy, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('name', name)
                this._validateStringField('contact name', boss)
                this._validateStringField('contact phone', phone)
                this._validateStringField('company philosophy', philosophy)

                return this._call(`business/${email}`, 'PATCH', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, JSON.stringify({ name, web, boss, phone, philosophy }), 200)
            })
            .then(res => res.json())
    },

    editHostessProfile(email, name, birth, origin, gender, phone, languages, jobType, height, myself, skills, photo, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('name', name)
                this._validateStringField('place of birth', origin)
                this._validateStringField('gender', gender)
                this._validateStringField('phone number', phone)
                this._validateStringField('job type', jobType)
                this._validateNumberField('height', height)
                this._validateStringField('description of myself', myself)

                if (!(languages instanceof Array)) throw new Error('invalid languages')
                if (!(skills instanceof Array)) throw new Error('invalid skills')

                return this._call(`hostess/${email}`, 'PATCH', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, JSON.stringify({ name, birth, origin, gender, phone, languages, jobType, skills, height, myself, photo }), 200)
            })
            .then(res => res.json())
    },

    unregisterHostess(email, password, token) {
        return Promise.resolve()
            .then(() => {

                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call(`unregister-hostess/${email}`, 'DELETE', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, JSON.stringify({ password }), 200)
            })
            .then(res => res.json())
    },

    unregisterBusiness(email, password, token) {
        return Promise.resolve()
            .then(() => {

                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call(`unregister-business/${email}`, 'DELETE', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, JSON.stringify({ password }), 200)
            })
            .then(res => res.json())
    },

    searchWorkers(email, gender, jobType, height, languages, token) {
        return Promise.resolve()
        .then(() => {
            return this._call(`${email}/search/?gender=${gender}&jobType=${jobType}&height=${height}&languages=${languages}`, 'GET', {authorization: `bearer ${token}`, 'Content-Type': 'application/json'}, undefined, 200)
        })
        .then(res => res.json())
        .then(res => res.hostesses)
    },

    addFavs(emailHost, emailBus, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(emailHost)
                this._validateEmail(emailBus)

                return this._call(`favorites/${emailBus}`, 'POST', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, JSON.stringify({ emailHost }), 200)
            })
            .then(res => res.json())
    },


    addHostess(emailHost, emailBus, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(emailHost)
                this._validateEmail(emailBus)

                return this._call(`select/${emailBus}`, 'POST', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, JSON.stringify({ emailHost }), 200)
            })
            .then(res => res.json())
    },

}


module.exports = logic