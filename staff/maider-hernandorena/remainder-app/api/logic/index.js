'use strict'

const moment = require('moment')
const { Doctor, Patient, Cite, Caretaker } = require('../data/models')
const { Types: { ObjectId } } = require('mongoose')

const logic = {

    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
    },

    _validateAgeField(age, value) {
        if (typeof value !== 'number' || value !== value || value <= 0) throw new LogicError(`invalid ${age}`)
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
            .then(patient => patient)
    },
    
    removePatient(id, dni) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateDniField('dni', dni)

                return Patient.findOne({ dni })
            })
            .then(patient => {
                if (!patient) throw new LogicError(`patient with ${dni} dni does not exist`)

                return Patient.deleteOne({ _id: ObjectId(id) })
            })
            .then(() => true)
    },

    updatePatient(id, dni, newAddress, newPhone) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateDniField('dni', dni)

                return Patient.findOne({ dni })
            })
            .then(patient => {
                if (!patient) throw new LogicError(`patient with ${dni} dni does not exist`)
                if(typeof newAddress !== 'string' || !newAddress.length) throw new LogicError(`invalid new address`)
                if(typeof newPhone !== 'number' || newPhone !== newPhone || newPhone.toString().length !== 9) throw new LogicError(`invalid new phone`)

                return Patient.updateOne({ _id: ObjectId(id) }, { $set: {address: newAddress, phone: newPhone} })
            })
            .then(() => true)
    },

    searchPatients(name) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)

                return Patient.find({ name }).lean()
            })
            .then(patients => {
                if (!patients) throw new LogicError(`patient with ${name} name does not exist`)
                if (patients) {
                    patients.forEach(patient => {
                        patient.id = patient._id.toString()
                        delete patient._id
                        delete patient.__v
                    })
                }
                return patients || []
            })
    },

    addTreatment(id, dni, pill, quantity, frequency) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateDniField('dni', dni)
                this._validateStringField('pill', pill)
                this._validateStringField('quantity', quantity)
                this._validateStringField('frequency', frequency)

                return Patient.findOne({ dni })
            })
            .then(patient => {
                if (!patient) throw new LogicError(`patient with ${dni} dni does not exist`)
                if (quantity <= 0) throw new LogicError(`quantity ${quantity} not possible`)

                const treatment = { pill, quantity, frequency }
// TO TEST 
                const existingPill = patient.treatments.find(elem => {
                    elem.pill === pill})

                if(existingPill){
                    patient.treatments.forEach(ele =>{
                        if(ele.pill === pill) {
                            ele.quantity = quantity
                        }
                    })
                    return patient.save()
                }

                return Patient.updateOne({ _id: ObjectId(id) }, { $addToSet: {treatments: treatment} })
            })
            .then(() => true)
    },

    removeTreatment(id, dni, pill) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateDniField('dni', dni)
                this._validateStringField('pill', pill)

                return Patient.findOne({ dni })
            })
            .then(patient => {
                if (!patient) throw new LogicError(`patient with ${dni} dni does not exist`)

                return Patient.updateOne({ _id: ObjectId(id) }, { $pull: {treatments: { pill } } })
            })
            .then(() => true)
    },

    listTreatments(id) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)

                return Patient.findOne({ _id: ObjectId(id) }).lean()
            })
            .then(patient => {
                if (!patient) throw new Error(`patient with ${id} id does not exist`)

                let treatments = patient.treatments.map(treatment => treatment)
                
                return treatments
            })
            .then(treatments => {
                if (treatments) {
                    treatments.forEach(treatment => {
                        treatment.id = treatment._id.toString()
                        delete treatment._id
                        delete treatment.__v
                    })
                }
                return treatments || []
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
                                    .then(cite => cite)
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
                                        
                                        return Cite.deleteOne({ _id: cite._id })
                                    })
                                    .then(() => true)
                            })
                    })
            })
    },

    listCites(date) {
        return Promise.resolve()
            .then(() => {
                this._validateDateField('date', date)

                const mDate = moment(date)
                const minDate = mDate.startOf('day').toDate()
                const maxDate = mDate.endOf('day').toDate()

                return Cite.find({ date: { $gte: minDate, $lte: maxDate } }, { __v: 0 }).lean()
                    .then(cites => {
                        if (!cites) throw new LogicError(`cite with ${date} date does not exist`)
        
                        cites.forEach(cite => {
                            cite.id = cite._id.toString()
                            delete cite._id
                            delete cite.__v
                        })

                        return cites || []
                    })
            })
    },
    
    listPatientCites(id, date) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateDateField('date', date)

                return Patient.findOne({ _id: ObjectId(id) })
            })
            .then(patient => {
                if (!patient) throw new LogicError(`patient with ${id} id does not exist`)

                const mDate = moment(date)
                const minDate = mDate.startOf('month').toDate()
                const maxDate = mDate.endOf('month').toDate()

                return Cite.find({ date: { $gte: minDate, $lte: maxDate }, patient: ObjectId(id) }, { __v: 0 }).lean()
                    .then(cites => {
                        if (!cites) throw new LogicError(`cite with ${date} date does not exist`)
        
                        cites.forEach(cite => {
                            cite.id = cite._id.toString()
                            delete cite._id
                            delete cite.__v
                        })

                        return cites || []
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