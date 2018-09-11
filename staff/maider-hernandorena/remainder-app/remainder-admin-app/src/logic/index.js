'use strict'

const logic = {

    url: 'https://calm-reaches-30474.herokuapp.com/api/admin',
    // url: 'http://localhost:8080/api/admin',

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
     * Authenticates a admin with a code and a password 
     * @param {String} code //admins code
     * @param {String} password //admins password
     * 
     * @returns {Object} admins id and token
     */
    authenticateAdmin(code, password) {
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
     * Registers a doctor with a code and a password 
     * @param {String} code //doctors code
     * @param {String} password //doctors password
     * @param {String} id //admin id for authorization
     * @param {String} token //admin token for authorization
     * 
     * @returns {boolean} TRUE => if it is registered correctly
     */
    registerDoctor(code, password, id, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)
                this._validateStringField('password', password)

                return this._call(`${id}/register-doctor`, 'post', {'Content-Type': 'application/json', authorization: `bearer ${token}` }, JSON.stringify({ code, password }), 201)
                    .then(res => res.json())    
                    .then(() => true)
            })
    },

    /**
     * Removes a doctor with a code 
     * @param {String} code //doctors code
     * @param {String} id //admin id for authorization
     * @param {String} token //admin token for authorization
     * 
     * @returns {boolean} TRUE => if it is registered correctly
     */
    removeDoctor(code, id, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)

                return this._call(`${id}/remove-doctor`, 'delete', {'Content-Type': 'application/json', authorization: `bearer ${token}` }, JSON.stringify({ code }), 200)
                    .then(res => res.json())    
                    .then(() => true)
            })
    },

    /**
     * Returns a doctor data
     * @param {Number} code //doctor code
     * 
     * @returns {Object} doctors data
     */
    doctorData(code) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)

                return this._call(`doctor/${code}`, 'get', {'Content-Type': 'application/json'}, undefined, 200)
                    .then(res => res.json())
            })
    },

    /**
     * Returns doctors list
     * 
     * @returns {Array} all doctors
     */
    listDoctors() {
        return Promise.resolve()
            .then(() => {
                return this._call(`doctors`, 'get', {'Content-Type': 'application/json'}, undefined, 200)
                    .then(res => res.json())
                    .then(doctors => doctors)
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
     * @param {String} id //admin id for authorization
     * @param {String} token //admin token for authorization
     *  
     * @returns {Response} response with message notifying patient was added correctly
     */
    addPatient(name, dni, surname, age, gender, address, phone, id, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)
                this._validateDniField('dni', dni)
                this._validateStringField('surname', surname)
                this._validateAgeField('age', age)
                this._validateStringField('gender', gender)
                this._validateStringField('address', address)
                this._validatePhoneField('phone', phone)

                return this._call(`${id}/add-patient`, 'post', {'Content-Type': 'application/json', authorization: `bearer ${token}`}, JSON.stringify({ name, dni, surname, age, gender, address, phone }), 201)
                    .then(res => res.json())
                    .then(res => res)
            })
    },

    /**
     * Removes a patient with his/her dni
     * @param {Number} dni //patient dni (8 digits)
     * @param {String} id //admin id for authorization
     * @param {String} token //admin token for authorization
     * 
     * @returns {boolean} TRUE => if it removes patient correctly
     */
    removePatient(dni, id, token) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)

                return this._call(`${id}/remove-patient`, 'delete', {'Content-Type': 'application/json', authorization: `bearer ${token}` }, JSON.stringify({ dni }), 200)
                    .then(res => res.json())
                    .then(() => true)
            })
    },

    /**
     * Updates a patients address and/or phone with his/her dni
     * //if there is not any new address or phone should update the other correctly
     * @param {Number} dni //patient dni (8 digits)
     * @param {String} newAddress //patient new address
     * @param {Number} newPhone //patient new phone (9 digits)
     * @param {String} id //admin id for authorization
     * @param {String} token //admin token for authorization
     * 
     * @returns {boolean} TRUE => if it updates patient correctly
     */
    updatePatient(dni, newAddress, newPhone, id, token) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)
                this._validateStringField('newAddress', newAddress)
                this._validatePhoneField('newPhone', newPhone)

                return this._call(`${id}/update-patient`, 'PATCH', {'Content-Type': 'application/json', authorization: `bearer ${token}` }, JSON.stringify({ dni, newAddress, newPhone }), 201)
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

    /**
     * Registers a caretaker
     * @param {Number} dni //caretakers dni (8 digits)
     * @param {String} password //caretakers password
     * @param {String} name //caretakers name
     * @param {String} surname //caretakers surname
     * @param {Number} age //caretakers age
     * @param {String} gender //caretakers gender (male, female or other)
     * @param {Number} phone //caretakers phone (9 digits)
     * @param {String} id //admin id for authorization
     * @param {String} token //admin token for authorization
     * 
     * @returns {Object} res with the message
     */
    registerCaretaker(dni, password, name, surname, age, gender, phone, id, token) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)
                this._validateStringField('password', password)
                this._validateStringField('name', name)
                this._validateStringField('surname', surname)
                this._validateAgeField('age', age)
                this._validateStringField('gender', gender)
                this._validatePhoneField('phone', phone)

                return this._call(`${id}/register-caretaker`, 'post', {'Content-Type': 'application/json', authorization: `bearer ${token}` }, JSON.stringify({ dni, password, name, surname, age, gender, phone }), 201)
                    .then(res => res.json())    
                    .then(res => res)
            })
    },

    /**
     * Removes a caretaker with a dni 
     * @param {String} dni //caretakers dni
     * @param {String} id //admin id for authorization
     * @param {String} token //admin token for authorization
     * 
     * @returns {boolean} TRUE => if it is registered correctly
     */
    removeCaretaker(dni, id, token) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)

                return this._call(`${id}/remove-caretaker`, 'delete', {'Content-Type': 'application/json', authorization: `bearer ${token}` }, JSON.stringify({ dni }), 200)
                    .then(res => res.json())    
                    .then(() => true)
            })
    },

    /**
     * Returns a caretaker data
     * @param {Number} dni //caretaker dni
     * 
     * @returns {Object} caretakers data
     */
    caretakerData(dni) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)

                return this._call(`caretaker/${dni}`, 'get', {'Content-Type': 'application/json'}, undefined, 200)
                    .then(res => res.json())
            })
    },

    /**
     * Returns caretakers list
     * 
     * @returns {Array} all caretakers
     */
    listCaretakers() {
        return Promise.resolve()
            .then(() => {
                return this._call(`caretakers`, 'get', {'Content-Type': 'application/json'}, undefined, 200)
                    .then(res => res.json())
            })
    },

    /**
     * Assigsn a patient to a caretaker
     * @param {Number} caretakerDni //caretakers dni
     * @param {Number} patientDni //patients dni
     * @param {String} id //admin id for authorization
     * @param {String} token //admin token for authorization
     * 
     * @returns {Object} Message of okey
     */
    assignPatientToCaretaker(caretakerDni, patientDni, id, token) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('caretaker dni', caretakerDni)
                this._validateDniField('patient dni', patientDni)

                return this._call(`${id}/assign-patients`, 'PATCH', {'Content-Type': 'application/json', authorization: `bearer ${token}` }, JSON.stringify({ caretakerDni, patientDni }), 200)
                    .then(res => res.json())
                    .then(res => res)
            })
    },

    /**
     * Unssign a patient to a caretaker
     * @param {Number} caretakerDni //caretakers dni
     * @param {Number} patientDni //patients dni
     * @param {String} id //admin id for authorization
     * @param {String} token //admin token for authorization
     * 
     * @returns {Object} Message of okey
     */
    unassignPatientToCaretaker(caretakerDni, patientDni, id, token) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('caretaker dni', caretakerDni)
                this._validateDniField('patient dni', patientDni)

                return this._call(`${id}/unassign-patients`, 'PATCH', {'Content-Type': 'application/json', authorization: `bearer ${token}` }, JSON.stringify({ caretakerDni, patientDni }), 200)
                    .then(res => res.json())
                    .then(res => res)
            })
    },

    /**
     * Caretakers patient 
     * @param {Number} dni //caretakers dni
     * 
     * @returns {Response} caretakers patient data
     */
    retrieveCaretakerPatients(dni) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)

                return this._call(`${dni}/patients`, 'get', {'Content-Type': 'application/json'}, undefined, 200)
                    .then(res => res.json())
                    .then(patient => patient)
            })
    }
}


module.exports = logic