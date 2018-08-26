'use strict'

const { Doctor, Patients, Caretaker } = require('../data/models')

const logic = {

    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
    },

    _validateAgeField(age, value) {
        if (typeof value !== 'number') throw new LogicError(`invalid ${age}`)
    },

    _validatePhoneField(phone, value) {
        if (typeof value !== 'number') throw new LogicError(`invalid ${phone}`)
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

    addPatient(code, name, surname, age, gender, address, phone) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)
                this._validateStringField('name', name)
                this._validateStringField('surname', surname)
                this._validateAgeField('age', age)
                this._validateStringField('gender', gender)
                this._validateStringField('address', address)
                this._validatePhoneField('phone', phone)

                return Doctor.findOne({ code })
            })
            .then(doctor => {
                if (!doctor) throw new LogicError(`doctor with ${code} code does not exist`)

                const patient = { name, surname, age, gender, address, phone }

                doctor.patients.push(new Patients(patient))

                return doctor.save()
            })
            .then(() => true)
    },
    
    listPatients(code, name, startWith) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)
                this._validateStringField('name', name)
                this._validateStringField('startWith', startWith)

                return Doctor.findOne({ code })
            })
            .then(doctor => {
                if (!doctor) throw new Error(`doctor with ${code} code does not exist`)

                let patients = doctor.patients.map(patient => patient._doc)

                patients = patients.filter(({ name, surname }) => {
                    if (name) return name.startsWith(startWith)
                    if (surname) return surname.startsWith(startWith)

                    return name.startsWith(startWith)
                })

                return patients.map(patient => {
                    patient.id = patient._id.toString()
                    delete patient._id

                    return patient
                })
            })
    },

    removePatient(code, {name, surname, age, gender, address, phone}) {
        const patient = {name, surname, age, gender, address, phone}
        return Doctor.findOne({ code })
            .then(doctor => {
                if (!doctor) throw new LogicError(`doctor with ${code} code does not exist`)

                const patients = doctor._doc.patients.map(patient => patient._doc.name)
                const index = patients.indexOf(patient)

                if (index === -1) throw new LogicError(`patient with ${patient.name} name was not found`)
                doctor.patients.splice(index, 1)
                
                return doctor.save()
            })
            .then(() => true)
    },

    registerCaretaker(name, dni) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)
                this._validateStringField('dni', dni)

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
                this._validateStringField('dni', dni)

                return Caretaker.findOne({ name })
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