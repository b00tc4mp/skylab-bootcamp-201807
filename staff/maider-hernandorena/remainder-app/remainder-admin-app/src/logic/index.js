'use strict'

const logic = {

    url: 'http://localhost:8080/api/admin',

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
     * Registers a doctor with a code and a password 
     * @param {String} code //doctors code
     * @param {String} password //doctors password
     * 
     * @returns {boolean} TRUE => if it is registered correctly
     */
    registerDoctor(code, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)
                this._validateStringField('password', password)

                return this._call('register', 'post', {'Content-Type': 'application/json'}, JSON.stringify({ code, password }), 201)
                    .then(res => res.json())    
                    .then(() => true)
            })
    },

    /**
     * Adds a patient requiring different parameters
     * @param {String} name //patient name
     * @param {Number} dni //patient dni (8 digits)
     * @param {String} surname //patient surname
     * @param {Number} age //patient age
     * @param {String} gender //patient gender (male, female or other)
     * @param {String} address //patient address
     * @param {Number} phone //patient phone (9 digits)
     *  
     * @returns {Response} response with message notifying patient was added correctly
     */
    addPatient(name, dni, surname, age, gender, address, phone) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)
                this._validateDniField('dni', dni)
                this._validateStringField('surname', surname)
                this._validateAgeField('age', age)
                this._validateStringField('gender', gender)
                this._validateStringField('address', address)
                this._validatePhoneField('phone', phone)

                return this._call('add-patient', 'post', {'Content-Type': 'application/json'}, JSON.stringify({ name, dni, surname, age, gender, address, phone }), 201)
                    .then(res => res.json())
                    .then(res => res)
            })
    },

    /**
     * Removes a patient with his/her id and dni
     * @param {String} id //patient id
     * @param {Number} dni //patient dni (8 digits)
     * 
     * @returns {boolean} TRUE => if it removes patient correctly
     */
    removePatient(id, dni) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateDniField('dni', dni)

                return this._call(`remove-patient/${id}`, 'delete', {'Content-Type': 'application/json'}, JSON.stringify({ dni }), 200)
                    .then(res => res.json())
                    .then(() => true)
            })
    },

    /**
     * Updates a patients address and/or phone with his/her id and dni
     * //if there is not any new address or phone should update the other correctly
     * @param {String} id //patient id
     * @param {Number} dni //patient dni (8 digits)
     * @param {String} newAddress //patient new address
     * @param {Number} newPhone //patient new phone (9 digits)
     * 
     * @returns {boolean} TRUE => if it updates patient correctly
     */
    updatePatient(id, dni, newAddress, newPhone) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateDniField('dni', dni)
                this._validateStringField('newAddress', newAddress)
                this._validatePhoneField('newPhone', newPhone)

                return this._call(`update-patient/${id}`, 'PATCH', {'Content-Type': 'application/json'}, JSON.stringify({ dni, newAddress, newPhone }), 201)
                    .then(res => res.json())
                    .then(() => true)
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

}