'use strict'

const moment = require('moment')
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

                return doctor
            })
            //change test
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

    updatePatient(dni, newAddress, newPhone) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)

                return Patient.findOne({ dni })
            })
            .then(patient => {
                if (!patient) throw new LogicError(`patient with ${dni} dni does not exist`)
                if(typeof newAddress !== 'string' || !newAddress.length)
                if(typeof newPhone !== 'number' || newPhone !== newPhone || newPhone.toString().length !== 9)

                return Patient.updateOne({ _id: patient._id }, { $set: {address: newAddress, phone: newPhone} })
            })
            .then(() => true)
    },

    searchPatients(name) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)

                return Patient.find({ name })
            })
            .then(patients => {
                if (!patients) throw new LogicError(`patient with ${name} name does not exist`)
                
                return patients
            })
    },

    addTreatment(dni, pill, quantity, frequency) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)
                this._validateStringField('pill', pill)
                this._validateStringField('quantity', quantity)
                this._validateStringField('frequency', frequency)

                return Patient.findOne({ dni })
            })
            .then(patient => {
                if (!patient) throw new LogicError(`patient with ${dni} dni does not exist`)

                const treatment = { pill, quantity, frequency }

                patient.treatments.push(new Treatment(treatment))

                return patient.save()
            })
            .then(() => true)
    },

    removeTreatment(dni, treatment) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)

                return Patient.findOne({ dni })
            })
            .then(patient => {
                if (!patient) throw new LogicError(`patient with ${dni} dni does not exist`)
                
                const treatments = patient.treatments.map(treatment => treatment.pill)
                const index = treatments.indexOf(treatment.pill)

                if (index === -1) throw new LogicError(`treatment with ${treatment.pill} name was not found`)
                patient.treatments.splice(index, 1)
                return patient.save()
            })
            .then(() => true)
    },

    listTreatments(dni) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)

                return Patient.findOne({ dni })
            })
            .then(patient => {
                if (!patient) throw new Error(`patient with ${dni} dni does not exist`)

                let treatments = patient.treatments.map(treatment => treatment)
                
                return treatments
            })
    },

    addCite(code, dni, name, date) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)
                this._validateDniField('dni', dni)
                this._validateStringField('name', name)
                this._validateDateField('date', date)

                return Doctor.findOne({ code })
                    .then(doctor => {
                        if (!doctor) throw new LogicError(`doctor with ${code} code does not exist`)
                        
                        return Patient.findOne({ dni })
                            .then(patient => {
                                if (!patient) throw new LogicError(`patient with ${dni} dni does not exist`)

                                return Cite.findOne({ date })
                                    .then(cite => {
                                        if (cite) throw new LogicError(`cite with ${date} date already exist`)
        
                                        const newCite = { name, date, doctor: doctor.id, patient: patient.id }
                        
                                        return Cite.create(newCite)
                                    })
                                    .then(() => true)
                            })
                    })
            })
    },

    removeCite(code, dni, name, date) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)
                this._validateDniField('dni', dni)
                this._validateStringField('name', name)
                this._validateDateField('date', date)

                return Doctor.findOne({ code })
                    .then(doctor => {
                        if (!doctor) throw new LogicError(`doctor with ${code} code does not exist`)
                        
                        return Patient.findOne({ dni })
                            .then(patient => {
                                if (!patient) throw new LogicError(`patient with ${dni} dni does not exist`)

                                return Cite.findOne({ date })
                                    .then(cite => {
                                        if (!cite) throw new LogicError(`cite with ${date} date does not exist`)
                
                                        const oldCite = { name, date, doctor: doctor.id, patient: patient.id }
                        
                                        return Cite.updateOne({ _id: cite._id }, { $pull: { cite: oldCite } })
                                    })
                                    .then(() => true)
                            })
                    })
            })
    },

    listCites(code, dni, date) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)
                this._validateDniField('dni', dni)
                this._validateDateField('date', date)

                return Doctor.findOne({ code })
                    .then(doctor => {
                        if (!doctor) throw new LogicError(`doctor with ${code} code does not exist`)
                        
                        return Patient.findOne({ dni })
                            .then(patient => {
                                if (!patient) throw new LogicError(`patient with ${dni} dni does not exist`)
                                
                                const mDate = moment(date)
                                const minDate = mDate.startOf('day').toDate()
                                const maxDate = mDate.endOf('day').toDate() 

                                return Cite.find({ date: { $gte: minDate, $lte: maxDate } }, { __v: 0 }).lean()
                                    .then(cites => {
                                        if (!cites) throw new LogicError(`cite with ${date} date does not exist`)
                        
                                        return cites = cites.map(cite => cite)
                                    })
                            })
                    })
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