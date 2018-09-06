'use strict'

require('dotenv').config()

require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
const jwt = require('jsonwebtoken')
const { env: { MONGO_URL } } = process
const { mongoose, models: { Doctor, Patient, Cite, Caretaker, Treatment } } = require('remainder-data')

describe('logic', () => {
    let _connection

    before(() =>
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )

    const { jwt_secret } = process.env
    let email, password, newPassword, dni, date, name, surname, age, gender, address, phone, pill, quantity, frequency

    beforeEach(() => { 
        email = `info@maider${Math.random()}.com`
        password = `123-${Math.random()}`
        newPassword = `987-${Math.random()}`
        dni = Math.floor(10000000 + Math.random() * 90000000)
        date = new Date()

        Promise.all([Doctor.deleteMany(), Patient.deleteMany(), Treatment.deleteMany(), Cite.deleteMany(), Caretaker.deleteMany()])
    })

    true && describe('validate fields', () => {

        it('should succeed on correct value', () => {
            expect(() => logic._validateEmail(email)).not.to.throw()
            expect(() => logic._validateStringField('password', password)).not.to.throw()
            expect(() => logic._validateDniField('dni', dni)).not.to.throw()
            expect(() => logic._validateDateField('date', date)).not.to.throw()
        })

        it('should fail on undefined email', () => {
            expect(() => logic._validateEmail(undefined)).to.throw(`invalid email`)
        })

        it('should fail on empty email', () => {
            expect(() => logic._validateEmail('')).to.throw(`invalid email`)
        })

        it('should fail on numeric email', () => {
            expect(() => logic._validateEmail(123)).to.throw(`invalid email`)
        })

        it('should fail on a wrong email', () => {
            expect(() => logic._validateEmail('123@m')).to.throw(`invalid email`)
        })

        it('should fail on a wrong email', () => {
            expect(() => logic._validateEmail('123.com')).to.throw(`invalid email`)
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

    true && describe('register caretaker', () => {

        it('should register caretaker correctly', () =>
            logic.registerCaretaker(email, password)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on already existing caretaker', () =>
            logic.registerCaretaker(email, password)
                .then(() => logic.registerCaretaker(email, password))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`caretaker ${email} already exist`))
        )

        it('should fail on trying to register with an undefined email', () =>
            logic.registerCaretaker(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with an empty email', () =>
            logic.registerCaretaker('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with a numeric email', () =>
            logic.registerCaretaker(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.registerCaretaker(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.registerCaretaker(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.registerCaretaker(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    true && describe('authenticate caretaker', () => {

        it('should authenticate caretaker correctly', () => 
            logic.registerCaretaker(email, password)
                .then(() => {
                    logic.authenticateCaretaker(email, password)
                        .then(({ id, token })=> {
                            expect(id).to.exist
                            expect(token).to.exist
        
                            let payload
        
                            expect(() => payload = jwt.verify(token, jwt_secret)).not.to.throw()
                            expect(payload.sub).to.equal(id)
                        })
                })
        )

        it('should fail on authenticating a not existing caretaker', () => {
            const falseEmail = `info@pepe${Math.random()}.com`
        
            return logic.registerCaretaker(email, password)
                .then(res => {
                    expect(res).to.be.true
                    return logic.authenticateCaretaker(falseEmail, password)
                })
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`caretaker ${falseEmail} does not exist`))
        })

        it('should fail on authenticating with a wrong password', () => {
            const falsePass = '123'
        
            return logic.registerCaretaker(email, password)
                .then(res => {
                    expect(res).to.be.true

                    return logic.authenticateCaretaker(email, falsePass)
                })
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`wrong password`))
        })

        it('should fail on trying to authenticate with an undefined email', () =>
            logic.authenticateCaretaker(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to authenticate with an empty email', () =>
            logic.authenticateCaretaker('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to authenticate with a numeric email', () =>
            logic.authenticateCaretaker(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to authenticate with an undefined password', () =>
            logic.authenticateCaretaker(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to authenticate with an empty password', () =>
            logic.authenticateCaretaker(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to authenticate with a numeric password', () =>
            logic.authenticateCaretaker(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )        
    })

    true && describe('update caretaker password', () => {

        beforeEach(() => logic.registerCaretaker(email, password))

        it('should update caretaker password correctly', () => 
            logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.updateCaretakerPassword(email, password, newPassword, token))
                .then(res => expect(res).to.be.true)
        )

        it('should fail on updating a not existing caretaker', () => {
            const falseEmail = `info@pepe${Math.random()}.com`
        
            return logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.updateCaretakerPassword(falseEmail, password, newPassword, token))
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`caretaker ${falseEmail} does not exist`))
        })

        it('should fail on updating with a wrong password', () => {
            const falsePass = '123'
        
            return logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.updateCaretakerPassword(email, falsePass, newPassword, token))
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`wrong password`))
        })

        it('should fail on updating with the same password', () => {
            const samePass = password
        
            return logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.updateCaretakerPassword(email, password, samePass, token))
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`new password must be different to old password`))
        })

        it('should fail on trying to update with an undefined email', () =>
            logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.updateCaretakerPassword(undefined, password, newPassword, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update with an empty email', () =>
            logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.updateCaretakerPassword('', password, newPassword, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update with a numeric email', () =>
            logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.updateCaretakerPassword(123, password, newPassword, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update with an undefined password', () =>
            logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.updateCaretakerPassword(email, undefined, newPassword, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update with an empty password', () =>
            logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.updateCaretakerPassword(email, '', newPassword, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update with a numeric password', () =>
            logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.updateCaretakerPassword(email, 123, newPassword, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )     
        
        it('should fail on trying to update with an undefined new password', () =>
            logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.updateCaretakerPassword(email, password, undefined, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on trying to update with an empty new password', () =>
            logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.updateCaretakerPassword(email, password, '', token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on trying to update with a numeric new password', () =>
            logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.updateCaretakerPassword(email, password, 123, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )        
    })

    true && describe('unregister caretaker', () => {

        beforeEach(() => logic.registerCaretaker(email, password))

        it('should unregister caretaker password correctly', () => 
            logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.unregisterCaretaker(email, password, token))
                .then(res => expect(res).to.be.true)
        )

        it('should fail on unregistering a not existing caretaker', () => {
            const falseEmail = `info@pepe${Math.random()}.com`
        
            return logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.unregisterCaretaker(falseEmail, password, token))
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`caretaker ${falseEmail} does not exist`))
        })

        it('should fail on unregistering with a wrong password', () => {
            const falsePass = '123'
        
            return logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.unregisterCaretaker(email, falsePass, token))
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`wrong password`))
        })

        it('should fail on trying to unregister with an undefined email', () =>
            logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.unregisterCaretaker(undefined, password, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to unregister with an empty email', () =>
            logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.unregisterCaretaker('', password, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to unregister with a numeric email', () =>
            logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.unregisterCaretaker(123, password, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to unregister with an undefined password', () =>
            logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.unregisterCaretaker(email, undefined, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to unregister with an empty password', () =>
            logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.unregisterCaretaker(email, '', token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to unregister with a numeric password', () =>
            logic.authenticateCaretaker(email, password)
                .then(({ token }) => logic.unregisterCaretaker(email, 123, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )     
    })

    true && describe('caretaker patient', () => {

        const email = `maider-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const { name, surname, age, gender, address, phone } = patient
        const dni = 12345678

        beforeEach(() => 
            Caretaker.create({ email, password })
                .then(() => Patient.create({ name, dni, surname, age, gender, address, phone }))
        )
    
        it('should return caretaker patient correctly', () =>
            logic.caretakerPatient(email, dni)
                .then(listedPatient => {
                    expect(listedPatient).to.exist
                    expect(listedPatient.name).to.equal(name)
                    expect(listedPatient.dni).to.equal(dni)
                    expect(listedPatient.surname).to.equal(surname)
                    expect(listedPatient.age).to.equal(age)
                    expect(listedPatient.gender).to.equal(gender)
                    expect(listedPatient.address).to.equal(address)
                    expect(listedPatient.phone).to.equal(phone)
                })
        )

        it('should fail returning patients of a caretaker with a non existing caretaker', () => {

            const falseEmail = `pepito-${Math.random()}@mail.com`
            
            return logic.caretakerPatient(falseEmail, dni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`caretaker ${falseEmail} does not exist`))
        })

        it('should fail returning a patient does not exist', () => {

            const falseDni = 87654321
            
            return logic.caretakerPatient(email, falseDni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`patient with ${falseDni} dni does not exist`))
        })

        it('should fail on trying to return patient with an undefined email', () =>
            logic.caretakerPatient(undefined, dni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to return patient with an empty email', () =>
            logic.caretakerPatient('', dni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to return patient with a numeric email', () =>
            logic.caretakerPatient(123, dni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to return patient with an undefined dni', () =>
            logic.caretakerPatient(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to return patient with an empty dni', () =>
            logic.caretakerPatient(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to return patient with a string dni', () =>
            logic.caretakerPatient(email, '123')
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