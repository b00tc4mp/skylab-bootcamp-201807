'use strict'

const moment = require('moment')
const { mongoose: { Types: { ObjectId } }, models: { Doctor, Patient, Cite, Caretaker, Admin } } = require('reminder-data')

const logic = {

    /**
     * Validates a field to be type of string and have a minimun length
     * @param {String} name 
     * @param {String} value 
     * 
     * @throws {LogicError} invalid name
     */
    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
    },

    /**
     * Validates the age being a number and more than 0
     * @param {Number} age 
     * @param {Number} value 
     * 
     * @throws {LogicError} invalid age
     */
    _validateAgeField(age, value) {
        if (typeof value !== 'number' || value !== value || value <= 0) throw new LogicError(`invalid ${age}`)
    },

    /**
     * Validates a dni being a number and it must have 8 digits
     * @param {Number} dni 
     * @param {Number} value 
     * 
     * @throws {LogicError} invalid dni
     */
    _validateDniField(dni, value) {
        if (typeof value !== 'number' || value !== value || value.toString().length !== 8) throw new LogicError(`invalid ${dni}`)
    },

    /**
     * Validates a phone being a number and it must have 9 digits
     * @param {Number} phone 
     * @param {Number} value 
     * 
     * @throws {LogicError} invalid phone
     */
    _validatePhoneField(phone, value) {
        if (typeof value !== 'number' || value !== value || value.toString().length !== 9) throw new LogicError(`invalid ${phone}`)
    },

    /**
     * Validates a date being a instance of the Date object
     * @param {Date} date
     * @param {Date} fiels 
     * 
     * @throws {LogicError} invalid date
     */
    _validateDateField(date, field) {
        if (!(field instanceof Date)) throw new LogicError(`invalid ${date}`)
    },


    // DOCTORS

    /**
     * Authenticates a doctor with his/her code and a password 
     * @param {String} code //doctors code
     * @param {String} password //doctors password
     * 
     * @throws {LogicError} if the doctor does not exist
     * @throws {LogicError} if password is wrong
     * 
     * @returns {Object} doctor information
     */
    authenticateDoctor(code, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)
                this._validateStringField('password', password)

                return Doctor.findOne({ code })
            })
            .then(doctor => {
                if (!doctor) throw new LogicError(`there is no matches with code ${code}`)
                if (doctor.password !== password) throw new LogicError(`wrong password`)

                return doctor
            })
    },


    // PATIENTS

    /**
     * Returns a patient data
     * @param {Numer} dni //patient dni
     * 
     * @throws {LogicError} //if patient does not exits
     * 
     * @returns {Object} patient data
     */
    patientData(dni) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)

                return Patient.findOne({ dni }).lean()
            })
            .then(patient => {
                if (!patient) throw new LogicError(`patient with ${dni} dni does not exist`)

                patient.id = patient._id.toString()
                delete patient._id
                delete patient.__v

                return patient
            })
    },

    /**
     * Search all patients by name
     * @param {String} name //patient name
     * 
     * @throws {LogicError} if patient name does not exist
     * 
     * @returns {Array} all patients in an array or an empty array
     */
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

    /**
     * List all patients
     * @throws {LogicError} if it does not exist any patient
     * 
     * @returns {Array} all patients in an array or an empty array
     */
    listPatients() {
        return Promise.resolve()
            .then(() => Patient.find().lean())
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


    // TREATMENTS

    /**
     * Adds a treatment (with pill name, quantity and frequency) to a patient with his/her id and dni
     * @param {String} id //patient id
     * @param {Number} dni //patient dni (8 digits)
     * @param {String} pill //pill name
     * @param {String} quantity //pill quantity on a day (up to 0)
     * @param {String} frequency //pill frequency: days should take them
     * 
     * @throws {LogicError} if patient with dni does not exist
     * @throws {LogicError} if quantity is less or equal to 0
     * 
     * @returns {boolean} TRUE => if treatment was added correctly to the patient
     */
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

                const existingPill = patient.treatments.find(existingTreatment => {
                    existingTreatment.pill === pill
                })

                if (existingPill) {
                    patient.treatments.forEach(existingTreatment => {
                        if (existingTreatment.pill === pill) {
                            existingTreatment.quantity = quantity
                        }
                    })
                    return patient.save()
                }

                return Patient.updateOne({ _id: ObjectId(id) }, { $addToSet: { treatments: treatment } })
            })
            .then(() => true)
    },

    /**
     * Removes patients treatment with his/her id and dni and the name of the pill in the treatment
     * @param {String} id //patient id
     * @param {Number} dni //patient dni (8 digits)
     * @param {String} pill //pill name
     * 
     * @throws {LogicError} if patient with the dni does not exist
     * 
     * @returns {boolean} TRUE => if treatment was removed correctly from the patient
     */
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

                return Patient.updateOne({ _id: ObjectId(id) }, { $pull: { treatments: { pill } } })
            })
            .then(() => true)
    },

    /**
     * Lists patients treatments by his/her id
     * @param {String} id //patients id
     * 
     * @throws {LogicError} if patient does not exist
     * 
     * @returns {Array} a patients treatments in an array
     */
    listTreatments(id) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)

                return Patient.findOne({ _id: ObjectId(id) }).lean()
            })
            .then(patient => {
                if (!patient) throw new LogicError(`patient with ${id} id does not exist`)

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


    // CITES

    /**
     * Adds cites to patients relating them to his/her doctor
     * @param {String} code //doctors code => to asign his cites
     * @param {Number} dni //patients dni (8 digits) => to asign cite to him
     * @param {String} name //cite name
     * @param {Date} date //cite date
     * 
     * @throws {LogicError} if doctor with the code does not exist
     * @throws {LogicError} if patient with the dni does not exist
     * @throws {LogicError} if given cite with the date already exist
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

    /**
     * Removes a patient cite with doctors code and patients DNI
     * @param {String} code //doctors code => to asign his cites
     * @param {Number} dni //patients dni (8 digits) => to asign cite to him
     * @param {String} name //cite name
     * @param {Date} date //cite date
     * 
     * @throws {LogicError} if doctor with the code does not exist
     * @throws {LogicError} if patient with the dni does not exist
     * @throws {LogicError} if cite does not exist
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

    /**
     * Lists all cites of a day. Then doctor could see all his/her cites on that day
     * @param {Date} date //day => example: 2018-08-22
     * 
     * @throws {LogicError} if there is no cites that day
     * 
     * @returns {Array} all cites on that day
     */
    listCites(date) {
        return Promise.resolve()
            .then(() => {
                this._validateDateField('date', date)

                const mDate = moment(date)
                const minDate = mDate.startOf('day').toDate()
                const maxDate = mDate.endOf('day').toDate()

                return Cite.find({ date: { $gte: minDate, $lte: maxDate } }, { __v: 0 }).sort({ date: 1 }).lean()
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

    /**
     * Lists all cites of a patient on a month
     * @param {String} id //pacient id
     * @param {Date} date //month => example: 2018-08
     * 
     * @throws {LogicError} if patient with that id does not exist
     * @throws {LogicError} if there is no cites on that month
     * 
     * @returns {Array} all cites the patient has on that month
     */
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

                return Cite.find({ date: { $gte: minDate, $lte: maxDate }, patient: ObjectId(id) }, { __v: 0 }).sort({ date: 1 }).lean()
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


    // CARETAKERS

    /**
     * Authenticates a caretaker with his/her dni and a password 
     * @param {String} dni //caretakers dni
     * @param {String} password //caretakers password
     * 
     * @throws {LogicError} if the caretaker does not exist
     * @throws {LogicError} if password is wrong
     * 
     * @returns {Object} caretaker information
     */
    authenticateCaretaker(dni, password) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)
                this._validateStringField('password', password)

                return Caretaker.findOne({ dni }).lean()
            })
            .then(caretaker => {
                if (!caretaker) throw new LogicError(`caretaker ${dni} does not exist`)
                if (caretaker.password !== password) throw new LogicError(`wrong password`)

                return caretaker
            })
    },

    /**
     * Updates a caretaker password with his/her dni and a password 
     * @param {String} dni //caretakers dni
     * @param {String} password //caretakers password
     * @param {String} newPassword //caretakers new password
     * 
     * @throws {LogicError} if the caretaker does not exist
     * @throws {LogicError} if password is wrong
     * @throws {LogicError} if old password and new password are the same
     * 
     * @returns {boolean} TRUE => if it is updated correctly
     */
    updateCaretakerPassword(dni, password, newPassword) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)

                return Caretaker.findOne({ dni })
            })
            .then(caretaker => {
                if (!caretaker) throw new LogicError(`caretaker ${dni} does not exist`)
                if (caretaker.password !== password) throw new LogicError(`wrong password`)
                if (password === newPassword) throw new LogicError('new password must be different to old password')

                return Caretaker.updateOne({ _id: caretaker._id }, { $set: { password: newPassword } })
            })
            .then(() => true)
    },

    /**
     * caretakers patients
     * @param {Number} dni //caretakers dni
     * 
     * @throws {LogicError} if caretaker does not exist
     * 
     * @returns {Array} array with the patients assigned to caretaker
     */
    retrieveCaretakerPatients(dni) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)

                return Caretaker.findOne({ dni })
            })
            .then(caretaker => {
                if (!caretaker) throw new LogicError(`caretaker ${dni} does not exist`)
                
                const patientsIds = caretaker.patients.map(patient => patient._id.toString())
                
                return Patient.find({ _id: { $in: patientsIds } }).lean()
            })
            .then(patients => {
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


    // ADMIN

    /**
     * Authenticates a admin with his/her code and a password 
     * @param {String} code //admins code
     * @param {String} password //admins password
     * 
     * @throws {LogicError} if the admin does not exist
     * @throws {LogicError} if password is wrong
     * 
     * @returns {Object} admin information
     */
    authenticateAdmin(code, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)
                this._validateStringField('password', password)

                return Admin.findOne({ code }).lean()
            })
            .then(admin => {
                if (!admin) throw new LogicError(`admin ${code} does not exist`)
                if (admin.password !== password) throw new LogicError(`wrong password`)

                admin.id = admin._id.toString()
                delete admin._id
                delete admin.__v

                return admin
            })
    },

    /**
     * Registers a doctor with a code and a password 
     * @param {String} code //doctors code
     * @param {String} password //doctors password
     * 
     * @throws {LogicError} if doctor already exist
     * 
     * @returns {boolean} TRUE => if it is registered correctly
     */
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

    /**
     * Removes a doctor with his/her code and a password 
     * @param {String} code //doctors code
     * 
     * @throws {LogicError} if the doctor does not exist
     * 
     * @returns {boolean} TRUE => if it is removed correctly
     */
    removeDoctor(code) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)

                return Doctor.findOne({ code })
            })
            .then(doctor => {
                if (!doctor) throw new LogicError(`there is no matches with code ${code}`)

                return Doctor.deleteOne({ _id: doctor._id })
            })
            .then(() => true)
    },

    /**
     * Returns a doctor data
     * @param {String} code //doctor code
     * 
     * @throws {LogicError} //if doctor does not exits
     * 
     * @returns {Object} doctor data
     */
    doctorData(code) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('code', code)

                return Doctor.findOne({ code }).lean()
            })
            .then(doctor => {
                if (!doctor) throw new LogicError(`doctor with ${code} code does not exist`)

                doctor.id = doctor._id.toString()
                delete doctor._id
                delete doctor.__v

                return doctor
            })
    },

    /**
     * List all doctors
     * @throws {LogicError} if it does not exist any doctor
     * 
     * @returns {Array} all doctors in an array or an empty array
     */
    listDoctors() {
        return Promise.resolve()
            .then(() => Doctor.find().lean())
            .then(doctors => {
                if (!doctors) throw new LogicError(`doctor does not exist`)
                if (doctors) {
                    doctors.forEach(doctor => {
                        doctor.id = doctor._id.toString()
                        delete doctor._id
                        delete doctor.__v
                    })
                }
                return doctors || []
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
     * @throws {LogicError} if patient with the same dni already exists
     * 
     * @returns {Object} patient information
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

                return Patient.findOne({ dni })
            })
            .then(patient => {
                if (patient) throw new LogicError(`patient with ${dni} dni already exist`)

                const patientData = { name, dni, surname, age, gender, address, phone }

                return Patient.create(patientData)
            })
            .then(patient => patient)
    },

    /**
     * Removes a patient with his/her dni
     * @param {Number} dni //patient dni (8 digits)
     * 
     * @throws {LogicError} if patient with given dni does not exist
     * 
     * @returns {boolean} TRUE => if it removes patient correctly
     */
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

    /**
     * Updates a patients address and/or phone with his/her dni
     * //if there is not any new address or phone should update the other correctly
     * @param {Number} dni //patient dni (8 digits)
     * @param {String} newAddress //patient new address
     * @param {Number} newPhone //patient new phone (9 digits)
     * 
     * @throws {LogicError} if patient with given dni does not exist
     * @throws {LogicError} if the new address given is not a string
     * @throws {LogicError} if the new phone given is not a number or has no 9 digits
     * 
     * @returns {boolean} TRUE => if it updates patient correctly
     */
    updatePatient(dni, newAddress, newPhone) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)
                debugger
                return Patient.findOne({ dni })
            })
            .then(patient => {
                if (!patient) throw new LogicError(`patient with ${dni} dni does not exist`)

                if (!newAddress || newAddress === '') {
                    return Patient.updateOne({ _id: patient._id }, { $set: { phone: newPhone } })
                } else {
                    if (typeof newAddress !== 'string' || !newAddress.length) throw new LogicError(`invalid new address`)
                }

                if (!newPhone || newPhone.toString().length === 0) {
                    return Patient.updateOne({ _id: patient._id }, { $set: { address: newAddress } })
                } else {
                    if (typeof newPhone !== 'number' || newPhone !== newPhone || newPhone.toString().length !== 9) throw new LogicError(`invalid new phone`)
                }

                return Patient.updateOne({ _id: patient._id }, { $set: { address: newAddress, phone: newPhone } })
            })
            .then(() => true)
    },

    /**
     * Registers a caretaker with a dni and a password 
     * @param {String} dni //caretakers dni
     * @param {String} password //caretakers password
     * 
     * @throws {LogicError} if caretaker already exist
     * 
     * @returns {boolean} TRUE => if it is registered correctly
     */
    registerCaretaker(dni, password, name, surname, age, gender, phone) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)
                this._validateStringField('password', password)
                this._validateStringField('name', name)
                this._validateStringField('surname', surname)
                this._validateAgeField('age', age)
                this._validateStringField('gender', gender)
                this._validatePhoneField('phone', phone)

                return Caretaker.findOne({ dni })
            })
            .then(caretaker => {
                if (caretaker) throw new LogicError(`caretaker ${dni} already exist`)

                const newCaretaker = { dni, password, name, surname, age, gender, phone }

                return Caretaker.create(newCaretaker)
            })
            .then(() => true)
    },

    /**
     * Removes a caretaker with his/her dni
     * @param {String} dni //caretakers dni
     * 
     * @throws {LogicError} if the caretaker does not exist
     * 
     * @returns {boolean} TRUE => if it is removed correctly
     */
    removeCaretaker(dni) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)

                return Caretaker.findOne({ dni })
            })
            .then(caretaker => {
                if (!caretaker) throw new LogicError(`caretaker ${dni} does not exist`)

                return Caretaker.deleteOne({ _id: caretaker._id })
            })
            .then(() => true)
    },

    /**
     * Returns a caretaker data
     * @param {Number} dni //caretaker dni
     * 
     * @throws {LogicError} //if caretaker does not exits
     * 
     * @returns {Object} caretaker data
     */
    caretakerData(dni) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('dni', dni)

                return Caretaker.findOne({ dni }).lean()
            })
            .then(caretaker => {
                if (!caretaker) throw new LogicError(`caretaker with ${dni} dni does not exist`)

                caretaker.id = caretaker._id.toString()
                delete caretaker._id
                delete caretaker.__v

                return caretaker
            })
    },

    /**
     * List all caretakers
     * @throws {LogicError} if it does not exist any caretaker
     * 
     * @returns {Array} all caretakers in an array or an empty array
     */
    listCaretakers() {
        return Promise.resolve()
            .then(() => Caretaker.find().lean())
            .then(caretakers => {
                if (!caretakers) throw new LogicError(`caretaker does not exist`)
                if (caretakers) {
                    caretakers.forEach(caretaker => {
                        caretaker.id = caretaker._id.toString()
                        delete caretaker._id
                        delete caretaker.__v
                    })
                }
                return caretakers || []
            })
    },

    /**
     * Assign a patient to his/her caretaker
     * @param {Number} caretakerDni //caretakers dni
     * @param {Number} patientDni //patients dni
     * 
     * @throws {LogicError} if caretaker does not exist
     * @throws {LogicError} if patient does not exist
     * 
     * @returns {boolean} TRUE => if assigned patient to caretaker correctly
     */
    assignPatientToCaretaker(caretakerDni, patientDni) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('caretaker dni', caretakerDni)
                this._validateDniField('patient dni', patientDni)

                const dni = caretakerDni

                return Caretaker.findOne({ dni })
            })
            .then(caretaker => {
                if (!caretaker) throw new LogicError(`caretaker with ${caretakerDni} dni does not exist`)
                const dni = patientDni

                return Patient.findOne({ dni })
                    .then(patient => {
                        if (!patient) throw new LogicError(`patient with ${patientDni} dni does not exist`)

                        return Caretaker.updateOne({ _id: caretaker._id }, { $addToSet: { patients: patient } })
                    })
            })
            .then(() => true)
    },

    /**
     * Unassign a patient from his/her caretaker
     * @param {Number} caretakerDni //caretakers dni
     * @param {Number} patientDni //patients dni
     * 
     * @throws {LogicError} if caretaker does not exist
     * @throws {LogicError} if patient does not exist
     * 
     * @returns {boolean} TRUE => if patient is unassigned to caretaker correctly
     */
    unassignPatientToCaretaker(caretakerDni, patientDni) {
        return Promise.resolve()
            .then(() => {
                this._validateDniField('caretaker dni', caretakerDni)
                this._validateDniField('patient dni', patientDni)

                const dni = caretakerDni

                return Caretaker.findOne({ dni })
            })
            .then(caretaker => {
                if (!caretaker) throw new LogicError(`caretaker with ${caretakerDni} dni does not exist`)
                const dni = patientDni

                return Patient.findOne({ dni })
                    .then(patient => {
                        if (!patient) throw new LogicError(`patient with ${patientDni} dni does not exist`)

                        return Caretaker.updateOne({ _id: caretaker._id }, { $pull: { patients: patient._id } })
                    })
            })
            .then(() => true)
    }
}

/**
 * To difference errors from logic to frequent errors
 * @class LOGIC ERROR => extends from Error
 */
class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }