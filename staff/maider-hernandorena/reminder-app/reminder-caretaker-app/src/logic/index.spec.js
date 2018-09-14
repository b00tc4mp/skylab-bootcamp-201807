'use strict'

require('dotenv').config()

require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
const jwt = require('jsonwebtoken')
const { env: { MONGO_URL, JWT_SECRET } } = process
const { mongoose, models: { Doctor, Patient, Cite, Caretaker, Treatment } } = require('reminder-data')

describe('logic', () => {
    let _connection

    before(() =>
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )

    let dni, password, newPassword, date

    beforeEach(() => { 
        password = `123-${Math.random()}`
        newPassword = `987-${Math.random()}`
        dni = Math.floor(10000000 + Math.random() * 90000000)
        date = new Date()

        Promise.all([Doctor.deleteMany(), Patient.deleteMany(), Treatment.deleteMany(), Cite.deleteMany(), Caretaker.deleteMany()])
    })

    true && describe('validate fields', () => {

        it('should succeed on correct value', () => {
            expect(() => logic._validateStringField('password', password)).not.to.throw()
            expect(() => logic._validateDniField('dni', dni)).not.to.throw()
            expect(() => logic._validateDateField('date', date)).not.to.throw()
        })

        it('should fail on undefined value', () => {
            expect(() => logic._validateStringField('name', undefined)).to.throw(`invalid name`)
        })

        it('should fail on empty value', () => {
            expect(() => logic._validateStringField('name', '')).to.throw(`invalid name`)
        })

        it('should fail on numeric value', () => {
            expect(() => logic._validateStringField('name', 123)).to.throw(`invalid name`)
        })

        it('should fail on string value', () => {
            expect(() => logic._validateDniField('dni', '12345678')).to.throw(`invalid dni`)
        })

        it('should fail on less than 8 numbers value', () => {
            expect(() => logic._validateDniField('dni', 123466)).to.throw(`invalid dni`)
        })

        it('should fail on more than 8 numbers value', () => {
            expect(() => logic._validateDniField('dni', 12345649894)).to.throw(`invalid dni`)
        })

        it('should fail on string date value', () => {
            expect(() => logic._validateDateField('date', '15-08-2018')).to.throw(`invalid date`)
        })

        it('should fail on other date value', () => {
            expect(() => logic._validateDateField('date', 15-5481-15)).to.throw(`invalid date`)
        })
    })

    true && describe('authenticate caretaker', () => {

        const dni = 12345678
        const password = `123${Math.random()}`

        beforeEach(() => Caretaker.create({ dni, password }))

        it('should authenticate caretaker correctly', () => 
            logic.authenticateCaretaker(dni, password)
                .then(({ id, token })=> {
                    expect(id).to.exist
                    expect(token).to.exist

                    let payload

                    expect(() => payload = jwt.verify(token, JWT_SECRET)).not.to.throw()
                    expect(payload.sub).to.equal(id)
                })
        )

        it('should fail on authenticating a not existing caretaker', () => {
            const falseDni = 45674567
        
            return logic.authenticateCaretaker(falseDni, password)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`caretaker ${falseDni} does not exist`))
        })

        it('should fail on authenticating with a wrong password', () => {
            const falsePass = '123'
        
            return logic.authenticateCaretaker(dni, falsePass)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`wrong password`))
        })

        it('should fail on trying to authenticate with an undefined dni', () =>
            logic.authenticateCaretaker(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to authenticate with an empty dni', () =>
            logic.authenticateCaretaker('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to authenticate with a string dni', () =>
            logic.authenticateCaretaker('123', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to authenticate with an undefined password', () =>
            logic.authenticateCaretaker(dni, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to authenticate with an empty password', () =>
            logic.authenticateCaretaker(dni, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to authenticate with a numeric password', () =>
            logic.authenticateCaretaker(dni, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )        
    })

    true && describe('update caretaker password', () => {

        beforeEach(() =>  Caretaker.create({ dni, password }))

        it('should update caretaker password correctly', () => 
            logic.authenticateCaretaker(dni, password)
                .then(({ id, token }) => logic.updateCaretakerPassword(dni, password, newPassword, id, token))
                .then(res => expect(res).to.be.true)
        )

        it('should fail on updating a not existing caretaker', () => {
            const falsedni = 55554444
        
            return logic.authenticateCaretaker(dni, password)
                .then(({ id, token }) => logic.updateCaretakerPassword(falsedni, password, newPassword, id, token))
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`caretaker ${falsedni} does not exist`))
        })

        it('should fail on updating with a wrong password', () => {
            const falsePass = '123'
        
            return logic.authenticateCaretaker(dni, password)
                .then(({ id, token }) => logic.updateCaretakerPassword(dni, falsePass, newPassword, id, token))
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`wrong password`))
        })

        it('should fail on updating with the same password', () => {
            const samePass = password
        
            return logic.authenticateCaretaker(dni, password)
                .then(({ id, token }) => logic.updateCaretakerPassword(dni, password, samePass, id, token))
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`new password must be different to old password`))
        })

        it('should fail on trying to update with an undefined dni', () =>
            logic.authenticateCaretaker(dni, password)
                .then(({ id, token }) => logic.updateCaretakerPassword(undefined, password, newPassword, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to update with an empty dni', () =>
            logic.authenticateCaretaker(dni, password)
                .then(({ id, token }) => logic.updateCaretakerPassword('', password, newPassword, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to update with a string dni', () =>
            logic.authenticateCaretaker(dni, password)
                .then(({ id, token }) => logic.updateCaretakerPassword('123', password, newPassword, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to update with an undefined password', () =>
            logic.authenticateCaretaker(dni, password)
                .then(({ id, token }) => logic.updateCaretakerPassword(dni, undefined, newPassword, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update with an empty password', () =>
            logic.authenticateCaretaker(dni, password)
                .then(({ id, token }) => logic.updateCaretakerPassword(dni, '', newPassword, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update with a numeric password', () =>
            logic.authenticateCaretaker(dni, password)
                .then(({ id, token }) => logic.updateCaretakerPassword(dni, 123, newPassword, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )     
        
        it('should fail on trying to update with an undefined new password', () =>
            logic.authenticateCaretaker(dni, password)
                .then(({ id, token }) => logic.updateCaretakerPassword(dni, password, undefined, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on trying to update with an empty new password', () =>
            logic.authenticateCaretaker(dni, password)
                .then(({ id, token }) => logic.updateCaretakerPassword(dni, password, '', id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on trying to update with a numeric new password', () =>
            logic.authenticateCaretaker(dni, password)
                .then(({ id, token }) => logic.updateCaretakerPassword(dni, password, 123, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )        
    })

    true && describe('retrieve caretaker patient', () => {

        const password = `123-${Math.random()}`
        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const { name, surname, age, gender, address, phone } = patient
        const dni = 12345678

        beforeEach(() => {
            Patient.create({ name, dni, surname, age, gender, address, phone})

            return Caretaker.create({ dni, password })
                .then(() => {
                    return Caretaker.findOne({ dni })
                })
                .then(caretaker => {
                    return Patient.findOne({ dni })
                        .then(patient => {
                            return Caretaker.updateOne({ _id: caretaker._id }, { $addToSet: { patients: patient } })
                        })
                })
        })
    
        it('should return caretaker patient correctly', () =>
            logic.retrieveCaretakerPatients(dni)
                .then(listedPatient => {
                    expect(listedPatient).to.exist
                    expect(listedPatient[0].name).to.equal(name)
                    expect(listedPatient[0].dni).to.equal(dni)
                    expect(listedPatient[0].surname).to.equal(surname)
                    expect(listedPatient[0].age).to.equal(age)
                    expect(listedPatient[0].gender).to.equal(gender)
                    expect(listedPatient[0].address).to.equal(address)
                    expect(listedPatient[0].phone).to.equal(phone)
                })
        )

        it('should fail returning a patient does not exist', () => {

            const falseDni = 87654321
            
            return logic.retrieveCaretakerPatients(falseDni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`caretaker ${falseDni} does not exist`))
        })

        it('should fail on trying to return patient with an undefined dni', () =>
            logic.retrieveCaretakerPatients(undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to return patient with an empty dni', () =>
            logic.retrieveCaretakerPatients('')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to return patient with a string dni', () =>
            logic.retrieveCaretakerPatients('123')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )
    })

    true && describe('return patient data', () => {

        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const { name, dni, surname, age, gender, address, phone } = patient

        beforeEach(() => Patient.create({ name, dni, surname, age, gender, address, phone }))

        it('should be return correctly the patient data', () => 
            logic.patientData(dni)
                .then(patient => {
                    expect(patient).to.exist
                    expect(patient.name).to.equal(name)
                    expect(patient.surname).to.equal(surname)
                    expect(patient.dni).to.equal(dni)
                    expect(patient.age).to.equal(age)
                    expect(patient.gender).to.equal(gender)
                    expect(patient.address).to.equal(address)
                    expect(patient.phone).to.equal(phone)
                })
        )

        it('should fail on trying to return patient data with an undefined dni', () =>
            logic.patientData(undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to return patient data with an empty dni', () =>
            logic.patientData('')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to return patient data with a string dni', () =>
            logic.patientData(123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )
    })

    true && describe('list treatements by patient id', () => {

        let treatmentsList

        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}

        let id 

        beforeEach(() => {
            treatmentsList = [
                { pill: 'Atarax', quantity: '3', frequency: 'monday, thursday'},
                { pill: 'Nolotil', quantity: '1', frequency: 'monday, wednesday'},
                { pill: 'Ebastina', quantity: '2', frequency: 'friday, sunday'}
            ]

            return Patient.create(patient)
                .then(patientCreated => {
                    id = patientCreated.id
                    
                    return patientCreated
                })
                .then(patient => {
                    treatmentsList.map(treatment => new Treatment(treatment)).forEach(treatment => patient.treatments.push(treatment))

                    return patient.save()
                })
                .then(patient => {
                    let treatments = patient.treatments.map(({ _doc }) => {
                        const { pill, quantity, frequency } = _doc
                        return { pill, quantity, frequency }
                    })
                    return treatments
                })
        })

        it('should list treatments correctly', () => 
            logic.listTreatments(id)
                .then(treatments => {
                    expect(treatments).to.exist
                    
                    expect(treatments[0].pill).to.equal('Atarax')
                    expect(treatments[0].quantity).to.equal('3')
                    expect(treatments[0].frequency).to.equal('monday, thursday')
                    
                    expect(treatments[1].pill).to.equal('Nolotil')
                    expect(treatments[1].quantity).to.equal('1')
                    expect(treatments[1].frequency).to.equal('monday, wednesday')

                    expect(treatments[2].pill).to.equal('Ebastina')
                    expect(treatments[2].quantity).to.equal('2')
                    expect(treatments[2].frequency).to.equal('friday, sunday')
                })
        )

        it('should fail on trying to list treatments with an undefined id', () =>
            logic.listTreatments(undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )

        it('should fail on trying to list treatments with an empty id', () =>
            logic.listTreatments('')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )

        it('should fail on trying to list treatments with a numeric id', () =>
            logic.listTreatments(123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )
    })

    true && describe('list a patient cites by date', () => {

        let cites

        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const code = `123A${Math.random()}`
        const password = `12-${Math.random()}`

        const date = new Date()
        let id

        beforeEach(() => 
            Doctor.create({ code, password })
                .then(doctor => {
                    return Patient.create(patient)
                        .then(patientCreated => {
                            id = patientCreated.id

                            cites = [
                                {name: 'cite1', date: new Date(), doctor: doctor.id, patient: patientCreated.id},
                                {name: 'cite2', date: new Date(), doctor: doctor.id, patient: patientCreated.id},
                                {name: 'cite3', date: new Date(), doctor: doctor.id, patient: patientCreated.id},
                                {name: 'cite4', date: new Date(), doctor: doctor.id, patient: patientCreated.id}
                            ]
                            
                            return Cite.create(cites)
                        })
                })
        )

        it('should list cites correctly', () => 
            logic.listPatientCites(id, date)
                .then(resultedCites => {
                    expect(resultedCites[0].name).to.exist
                    expect(resultedCites[0].date).to.exist

                    expect(resultedCites[1].name).to.exist
                    expect(resultedCites[1].date).to.exist

                    expect(resultedCites[2].name).to.exist
                    expect(resultedCites[2].date).to.exist

                    expect(resultedCites[3].name).to.exist
                    expect(resultedCites[3].date).to.exist
                })
        )

        it('should fail on trying to list a patient cites with an undefined id', () =>
            logic.listPatientCites(undefined, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )

        it('should fail on trying to list a patient cites with an empty id', () =>
            logic.listPatientCites('', date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )

        it('should fail on trying to list a patient cites with a numeric id', () =>
            logic.listPatientCites(123, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )

        it('should fail on trying to list a patient cites with an undefined date', () =>
            logic.listPatientCites(id, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid date`))
        )

        it('should fail on trying to list a patient cites with an empty date', () =>
            logic.listPatientCites(id, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid date`))
        )

        it('should fail on trying to list a patient cites with a numeric date', () =>
            logic.listPatientCites(id, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid date`))
        )

        it('should fail on trying to list a patient cites with a string date', () =>
            logic.listPatientCites(id, '123')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid date`))
        )
    })

    after(() =>
        Promise.all([Doctor.deleteMany(), Patient.deleteMany(), Treatment.deleteMany(), Cite.deleteMany(), Caretaker.deleteMany()])
            .then(() => _connection.disconnect())
    )
})