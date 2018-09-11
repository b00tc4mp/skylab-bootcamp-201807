'use strict'

const logic = {

    url: 'https://calm-reaches-30474.herokuapp.com/api/doctor',
    // url: 'http://localhost:8080/api/doctor',

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
     * Validates the age being a number and more than 0
     * @param {Number} age 
     * @param {Number} value 
     * 
     * @throws {Error} invalid age
     */
    _validateAgeField(age, value) {
        if (typeof value !== 'number' || value !== value || value <= 0) throw new Error(`invalid ${age}`)
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
     * Validates a phone being a number and it must have 9 digits
     * @param {Number} phone 
     * @param {Number} value 
     * 
     * @throws {Error} invalid phone
     */
    _validatePhoneField(phone, value) {
        if (typeof value !== 'number' || value !== value || value.toString().length !== 9) throw new Error(`invalid ${phone}`)
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
     * Authenticates a doctor with a code and a password 
     * @param {String} code //doctors code
     * @param {String} password //doctors password
     * 
     * @returns {Object} doctors message, id and token
     */
    authenticateDoctor(code, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)
                this._validateStringField('password', password)

                return this._call('auth', 'post', {'Content-Type': 'application/json'}, JSON.stringify({ code, password }), 200)
                    .then(res => res.json())
                    .then(res => res)
            })
    },

    /**
     * Returns a patient data
     * @param {Number} dni //patient id
     * 
     * @returns {Object} patients data
     */
    patientData(dni) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)

                return this._call(`patient/${dni}`, 'get', {'Content-Type': 'application/json'}, undefined, 200)
                    .then(res => res.json())
            })
    },

    /**
     * Search all patients by name
     * @param {String} name //patient name
     * 
     * @returns {Response} all patients in an array or an empty array
     */
    searchPatients(name) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)

                return this._call(`patients/${name}`, 'get', {'Content-Type': 'application/json'}, undefined, 200)
                    .then(res => res.json())
                    .then(patients => patients)
            })
    },

    /**
     * List all patients  
     * @returns {Response} all patients in an array or an empty array
     */
    listPatients() {
        return Promise.resolve()
            .then(() => 
                this._call(`patients`, 'get', {'Content-Type': 'application/json'}, undefined, 200)
                    .then(res => res.json())
                    .then(patients => patients)
            )
    },

    /**
     * Adds a treatment (with pill name, quantity and frequency) to a patient with his/her id and dni
     * @param {String} id //patient id
     * @param {Number} dni //patient dni (8 digits)
     * @param {String} pill //pill name
     * @param {String} quantity //pill quantity on a day (up to 0)
     * @param {String} frequency //pill frequency: days should take them
     * 
     * @returns {Response} Treatment added correctly and its information
     */
    addTreatment(id, dni, pill, quantity, frequency) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateDniField('dni', dni)
                this._validateStringField('pill', pill)
                this._validateStringField('quantity', quantity)
                this._validateStringField('frequency', frequency)

                return this._call(`patient/${id}/add-treatment`, 'PATCH', {'Content-Type': 'application/json'}, JSON.stringify({ dni, pill, quantity, frequency }), 201)
                    .then(res => res.json())
            })
    },

    /**
     * Removes patients treatment with his/her id and dni and the name of the pill in the treatment
     * @param {String} id //patient id
     * @param {Number} dni //patient dni (8 digits)
     * @param {String} pill //pill name
     * 
     * @returns {boolean} TRUE => if treatment was removed correctly from the patient
     */
    removeTreatment(id, dni, pill) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateDniField('dni', dni)
                this._validateStringField('pill', pill)
                
                return this._call(`patient/${id}/remove-treatment`, 'delete', {'Content-Type': 'application/json'}, JSON.stringify({ dni, pill }), 200)
                    .then(res => res.json())
                    .then(() => true)
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
            })
    },

    /**
     * Adds cites to patients relating them to his/her doctor
     * @param {String} code //doctors code => to asign his cites
     * @param {Number} dni //patients dni (8 digits) => to asign cite to him
     * @param {String} name //cite name
     * @param {Date} date //cite date
     * 
     * @returns {Object} cite information
     */
    addCite(code, dni, name, date) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)
                this._validateDniField('dni', dni)
                this._validateStringField('name', name)
                this._validateDateField('date', date)

                return this._call('add-cite', 'post', {'Content-Type': 'application/json'}, JSON.stringify({ code, dni, name, date }), 201)
                    .then(res => res.json())
            })
    },

    /**
     * Removes a patient cite with doctors code and patients DNI
     * @param {String} code //doctors code => to asign his cites
     * @param {Number} dni //patients dni (8 digits) => to asign cite to him
     * @param {String} name //cite name
     * @param {Date} date //cite date
     * 
     * @returns {boolean} TRUE => if cite was removed correctly
     */
    removeCite(code, dni, name, date) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)
                this._validateDniField('dni', dni)
                this._validateStringField('name', name)
                this._validateDateField('date', date)

                return this._call(`remove-cite`, 'delete', {'Content-Type': 'application/json'}, JSON.stringify({ code, dni, name, date }), 200)
                    .then(res => res.json())
                    .then(() => true)
            })
    },

    /**
     * Lists all cites of a day. Then doctor could see all his/her cites on that day
     * @param {Date} date //day => example: 2018-08-22
     * 
     * @returns {Response} all cites on that day
     */
    listCites(date) {
        return Promise.resolve()
            .then(() => {
                this._validateDateField('date', date)

                return this._call(`cites/${date}`, 'get', {'Content-Type': 'application/json'}, undefined, 200)
                    .then(res => res.json())
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
            })
    }
    
}

module.exports = logic