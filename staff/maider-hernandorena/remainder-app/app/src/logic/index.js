'use strict'



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
     * Authenticates a doctor with a code and a password 
     * @param {String} code //doctors code
     * @param {String} password //doctors password
     * 
     * @returns {Object} doctors id and token
     */
    authenticateDoctor(code, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)
                this._validateStringField('password', password)

                return this._call('auth', 'post', {'Content-Type': 'application/json'}, JSON.stringify({ code, password }), 200)
                    .then(res => res.json())
                    .then(({ id, token }) => {id, token})
            })
    },

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
                    .then(({ id, token }) => {id, token})
            })
    },

    removePatient(id, dni, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateDniField('dni', dni)

                return this._call(`remove-patient/${id}`, 'delete', {'Content-Type': 'application/json' , authorization: `bearer ${token}`}, JSON.stringify({ dni }), 200)
                    .then(res => res.json())
                    .then(() => true)
            })
    },

    updatePatient(id, dni, newAddress, newPhone, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateDniField('dni', dni)
                this._validateStringField('newAddress', newAddress)
                this._validatePhoneField('newPhone', newPhone)

                return this._call(`update-patient/${id}`, 'PATCH', {'Content-Type': 'application/json' , authorization: `bearer ${token}`}, JSON.stringify({ dni, newAddress, newPhone }), 201)
                    .then(res => res.json())
                    .then(() => true)
            })
    },

    searchPatients(name) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)

                return this._call(`patients/${name}`, 'get', {'Content-Type': 'application/json'}, undefined, 200)
                    .then(res => res.json())
            })
    },

    addTreatment(id, dni, pill, quantity, frequency, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateDniField('dni', dni)
                this._validateStringField('pill', pill)
                this._validatePhoneField('quantity', quantity)
                this._validatePhoneField('frequency', frequency)

                return this._call(`patient/${id}/add-treatment`, 'PATCH', {'Content-Type': 'application/json' , authorization: `bearer ${token}`}, JSON.stringify({ dni, pill, quantity, frequency }), 201)
                    .then(res => res.json())
                    .then(({ treatment }) => treatment)
            })
    },

    removeTreatment(id, dni, pill, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateDniField('dni', dni)
                this._validateStringField('pill', pill)

                return this._call(`patient/${id}/remove-treatment`, 'delete', {'Content-Type': 'application/json' , authorization: `bearer ${token}`}, JSON.stringify({ dni }), 200)
                    .then(res => res.json())
                    .then(() => true)
            })
    },

    listTreatments(id) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)

                return this._call(`patient/${id}/treatments`, 'get', {'Content-Type': 'application/json'}, undefined, 200)
                    .then(res => res.json())
            })
    },

    addCite(code, dni, name, date) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)
                this._validateDniField('dni', dni)
                this._validateStringField('name', name)
                this._validateDateField('date', date)

                return this._call('add-cite', 'post', {'Content-Type': 'application/json'}, JSON.stringify({ code, dni, name, date }), 201)
                    .then(res => res.json())
                    .then(({ cite }) => cite)
            })
    },

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

    listCites(date) {
        return Promise.resolve()
            .then(() => {
                this._validateDateField('date', date)

                return this._call(`cites/${date}`, 'get', {'Content-Type': 'application/json'}, undefined, 200)
                    .then(res => res.json())
            })
    },

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