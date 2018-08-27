'use strict'

const { Doctor, Patient, Cite, Treatment, Caretaker } = require('../data/models')

const logic = {

    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
    },

    _validateAgeField(age, value) {
        if (typeof value !== 'number' || value !== value) throw new LogicError(`invalid ${age}`)
    },

    _validateDniField(dni, value) {
        if (typeof value !== 'number' || value !== value || value.toString().length !== 8) throw new LogicError(`invalid ${dni}`)
    },

    _validatePhoneField(phone, value) {
        if (typeof value !== 'number' || value !== value || value.toString().length !== 9) throw new LogicError(`invalid ${phone}`)
    },

    _validateDateField(date, field) {
        if (!(field instanceof Date)) throw new LogicError(`invalid ${date}`)
    },

    registerDoctor(code, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)
                this._validateStringField('password', password)

                return Doctor.findOne({ code })
            })
            .then(doctor => {
                if (doctor) throw new LogicError(`${code} doctor already exist`)

                return Doctor.create({ code, password })
            })
            .then(() => true)
    },

    authenticateDoctor(code, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)
                this._validateStringField('password', password)

                return Doctor.findOne({ code })
            })
            .then(doctor => {
                if (!doctor) throw new LogicError(`there is no matches with that code`)
                if (doctor.password !== password) throw new LogicError(`wrong password`)

                return true
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

                return Patient.findOne({ dni })
            })
            .then(patient => {
                if (patient) throw new LogicError(`patient with ${dni} dni already exist`)

                const patientData = {name, dni, surname, age, gender, address, phone}

                return Patient.create(patientData)
            })
            .then(() => true)
    },
    
    removePatient(dni) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)

                return Patient.findOne({ dni })
            })
            .then(patient => {
                if (!patient) throw new LogicError(`patient with ${dni} dni does not exist`)
                
                return Patient.deleteOne({ _id: patient._id })
            })
            .then(() => true)
    },

    searchPatients(name, startWith) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)
                this._validateStringField('startWith', startWith)

                return Patient.findOne({ name })
            })
            .then(patient => {
                if (!patient) throw new Error(`patient with ${name} name does not exist`)

                patients = patient.findOne(({ name }) => {
                    if (name) return name.startsWith(startWith)
                    return name.startsWith(startWith)
                })
                return patients
            })
    },

    


    registerCaretaker(name, dni) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)
                this._validateDniField('dni', dni)

                return Caretaker.findOne({ name })
            })
            .then(caretaker => {
                if (caretaker) throw new LogicError(`${name} caretaker name already exist`)

                return Caretaker.create({name, dni})
            })
            .then(() => true)
    },

    authenticateCaretaker(name, dni) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)
                this._validateDniField('dni', dni)

                return Caretaker.findOne({ dni })
            })
            .then(caretaker => {
                if (!caretaker) throw new LogicError(`caretaker ${name} does not exist`)

                return true
            })
    }
    
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }