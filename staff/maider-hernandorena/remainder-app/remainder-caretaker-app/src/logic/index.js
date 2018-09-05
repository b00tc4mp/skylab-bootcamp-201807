'use strict'

const validateEmail = require('../utils/validate-email')

const logic = {

    url: 'http://localhost:8080/api/caretaker',

    /**
     * The call to the API which connects with the data base (on each function later, will be called and sent different parameter for each situation)
     * @param {String} path //path to add to url
     * @param {method} method //api method to do request (post, get, delete or patch)
     * @param {Headers} headers //content-type (applicaiton json) and authorization of bearer token
     * @param {String} body //the information sent
     * @param {status} expectedStatus //status of the server on request or response
     * 
     * @throws {Error} if bad status on response
     * 
     * @returns {Response} response on each situation
     */
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

    /**
     * Validates a field to be type of string and have a minimun length
     * @param {String} name 
     * @param {String} value 
     * 
     * @throws {Error} invalid name
     */
    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new Error(`invalid ${name}`)
    },

    /**
     * Validates a dni being a number and it must have 8 digits
     * @param {Number} dni 
     * @param {Number} value 
     * 
     * @throws {Error} invalid dni
     */
    _validateDniField(dni, value) {
        if (typeof value !== 'number' || value !== value || value.toString().length !== 8) throw new Error(`invalid ${dni}`)
    },

    /**
     * Validates a date being a instance of the Date object
     * @param {Date} date
     * @param {Date} fiels 
     * 
     * @throws {Error} invalid date
     */
    _validateDateField(date, field) {
        if (!(field instanceof Date)) throw new Error(`invalid ${date}`)
    },

    /**
     * Validates a email with a RegExp on a imported function
     * @param {String} email
     * 
     * @throws {Error} invalid email
     */
    _validateEmail(email) {
        if (!validateEmail(email)) throw new Error('invalid email')
    },

    /**
     * Registers a caretaker with a email and a password 
     * @param {String} email //caretakers email
     * @param {String} password //caretakers password
     * 
     * @returns {boolean} TRUE => if it is registered correctly
     */
    registerCaretaker(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call('register', 'post', {'Content-Type': 'application/json'}, JSON.stringify({ email, password }), 201)
                    .then(res => res.json())    
                    .then(() => true)
            })
    },

    /**
     * Authenticates a caretaker with a email and a password 
     * @param {String} email //caretakers email
     * @param {String} password //caretakers password
     * 
     * @returns {Object} caretakers id and token
     */
    authenticateCaretaker(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call('auth', 'post', {'Content-Type': 'application/json'}, JSON.stringify({ email, password }), 200)
                    .then(res => res.json())
                    .then(caretaker => caretaker)
            })
    },

    /**
     * Updates the caretakers account password 
     * @param {String} email //caretakers email
     * @param {String} password //caretakers password
     * @param {String} newPassword //caretakers new password
     * @param {String} token //caretakers token, received on authentication
     * 
     * @returns {boolean} TRUE => if it is registered correctly
     */
    updateCaretakerPassword(email, password, newPassword, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)

                return this._call(`update/${email}`, 'PATCH', {'Content-Type': 'application/json', authorization: `bearer ${token}`}, JSON.stringify({ password, newPassword }), 201)
                    .then(res => res.json())
                    .then(() => true)
            })
    },

    /**
     * Unregisters the caretaker
     * @param {String} email //caretakers email
     * @param {String} password //caretakers password
     * 
     * @returns {boolean} TRUE => if it is registered correctly
     */
    unregisterCaretaker(email, password, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call(`unregister/${email}`, 'delete', {'Content-Type': 'application/json', authorization: `bearer ${token}`}, JSON.stringify({ password }), 200)
                    .then(res => res.json())
                    .then(() => true)
            })
    },

    /**
     * Caretakers patient 
     * @param {String} email //caretakers email
     * @param {String} dni //patient dni
     * 
     * @returns {Response} caretakers patient data
     */
    caretakerPatient(email, dni) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateDniField('dni', dni)

                return this._call(`${email}/patient/${dni}`, 'get', {'Content-Type': 'application/json'}, undefined, 200)
                    .then(res => res.json())
                    .then(patient => patient)
            })
    },

    /**
     * Lists patients treatments by his/her id
     * @param {String} id //patients id
     * 
     * @returns {Response} a patients treatments in an array
     */
    listTreatments(id) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)

                return this._call(`patient/${id}/treatments`, 'get', {'Content-Type': 'application/json'}, undefined, 200)
                    .then(res => res.json())
                    .then(treatments => treatments)
            })
    },

    /**
     * Lists all cites of a patient on a month
     * @param {String} id //pacient id
     * @param {Date} date //month => example: 2018-08
     * 
     * @returns {Response} all cites the patient has on that month
     */
    listPatientCites(id, date) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateDateField('date', date)

                return this._call(`patient/${id}/cites/${date}`, 'get', {'Content-Type': 'application/json'}, undefined, 200)
                    .then(res => res.json())
                    .then(cites => cites)
            })
    }
    
}

module.exports = logic