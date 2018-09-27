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

    let code, password, name, surname, age, gender, address, phone, dni, date, pill, quantity, frequency

    beforeEach(() => { 
        code = `Maider${Math.random()}`
        password = `123-${Math.random()}`
        name = `Pepe${Math.random()}` 
        surname = 'Doe' 
        age = Math.random() 
        gender = 'male' 
        address = 'Barcelona' 
        phone = 123123123
        dni = Math.floor(10000000 + Math.random() * 90000000)
        date = new Date()
        pill = `atarax${Math.random()}`
        quantity = `1-${Math.random()}`
        frequency = 'mondays, fridays'

        Promise.all([Doctor.deleteMany(), Patient.deleteMany(), Treatment.deleteMany(), Cite.deleteMany(), Caretaker.deleteMany()])
    })

    true && describe('validate fields', () => {

        it('should succeed on correct value', () => {
            expect(() => logic._validateStringField('code', code)).not.to.throw()
            expect(() => logic._validateStringField('password', password)).not.to.throw()
            expect(() => logic._validateAgeField('age', age)).not.to.throw()
            expect(() => logic._validateDniField('dni', dni)).not.to.throw()
            expect(() => logic._validatePhoneField('phone', phone)).not.to.throw()
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
            expect(() => logic._validateAgeField('age', '123')).to.throw(`invalid age`)
        })

        it('should fail on a value less or equal to 0', () => {
            expect(() => logic._validateAgeField('age', '0')).to.throw(`invalid age`)
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

        it('should fail on string value', () => {
            expect(() => logic._validatePhoneField('phone', '12345678')).to.throw(`invalid phone`)
        })

        it('should fail on less than 9 numbers value', () => {
            expect(() => logic._validatePhoneField('phone', 12345)).to.throw(`invalid phone`)
        })

        it('should fail on more than 9 numbers value', () => {
            expect(() => logic._validatePhoneField('phone', 123456495894)).to.throw(`invalid phone`)
        })

        it('should fail on string date value', () => {
            expect(() => logic._validateDateField('date', '15-08-2018')).to.throw(`invalid date`)
        })

        it('should fail on other date value', () => {
            expect(() => logic._validateDateField('date', 15-5481-15)).to.throw(`invalid date`)
        })
    })

    true && describe('authenticate doctor', () => {

        beforeEach(() => Doctor.create({ code, password }))

        it('should authenticate doctor correctly', () => 
            logic.authenticateDoctor(code, password)
                .then(({ id, token }) => {
                    expect(id).to.exist
                    expect(token).to.exist

                    let payload

                    expect(() => payload = jwt.verify(token, JWT_SECRET)).not.to.throw()
                    expect(payload.sub).to.equal(id)
                })
        )

        it('should fail on authenticating with a wrong password', () => {
            const falsePass = '123'
        
            logic.authenticateDoctor(code, falsePass)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`wrong password`))
        })

        it('should fail on trying to authenticate with an undefined code', () =>
            logic.authenticateDoctor(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to authenticate with an empty code', () =>
            logic.authenticateDoctor('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to authenticate with a numeric code', () =>
            logic.authenticateDoctor(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to authenticate with an undefined password', () =>
            logic.authenticateDoctor(code, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to authenticate with an empty password', () =>
            logic.authenticateDoctor(code, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to authenticate with a numeric password', () =>
            logic.authenticateDoctor(code, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )        
    })

    true && describe('return patient data', () => {

        beforeEach(() => Patient.create({name, dni, surname, age, gender, address, phone}))

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

    true && describe('search and list patients by name', () => {

        beforeEach(() => Patient.create({name, dni, surname, age, gender, address, phone}))

        true && it('should succeed on correct data', () => 
            logic.searchPatients(name)
                .then(patients => {
                    expect(patients[0].name).to.equal(name)
                    expect(patients[0].dni).to.equal(dni)
                    expect(patients[0].surname).to.equal(surname)
                    expect(patients[0].age).to.equal(age)
                    expect(patients[0].gender).to.equal(gender)
                    expect(patients[0].address).to.equal(address)
                    expect(patients[0].phone).to.equal(phone)
                })
        )

        it('should fail on trying to search patients with an undefined name', () =>
            logic.searchPatients(undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to search patients with an empty name', () =>
            logic.searchPatients('')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to search patients with a numeric name', () =>
            logic.searchPatients(123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )
    })

    true && describe('list all patients', () => {

        beforeEach(() => Patient.create({name, dni, surname, age, gender, address, phone}))

        true && it('should succeed on correct data', () => 
            logic.listPatients()
                .then(patients => {
                    expect(patients).to.exist
                })
        )
    })

    true && describe('add treatment', () => {

        let id

        beforeEach(() => 
            Patient.create({name, dni, surname, age, gender, address, phone})               
                .then(res => {
                    id = res.id
                    return true
                })
        )

        it('should add treatment correctly', () =>
            logic.addTreatment(id, dni, pill, quantity, frequency)
                .then(res => expect(res).to.exist)
        )

        it('should fail on trying to add treatment with an undefined id', () =>
            logic.addTreatment(undefined, dni, pill, quantity, frequency)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )

        it('should fail on trying to add treatment with an empty id', () =>
            logic.addTreatment('', dni, pill, quantity, frequency)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )

        it('should fail on trying to add treatment with a numeric id', () =>
            logic.addTreatment(123, dni, pill, quantity, frequency)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )
        
        it('should fail on trying to add treatment with an undefined dni', () =>
            logic.addTreatment(id, undefined, pill, quantity, frequency)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to add treatment with an empty dni', () =>
            logic.addTreatment(id, '', pill, quantity, frequency)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to add treatment with a string dni', () =>
            logic.addTreatment(id, '123', pill, quantity, frequency)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )
        
        it('should fail on trying to add treatment with an undefined pill', () =>
            logic.addTreatment(id, dni, undefined, quantity, frequency)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid pill`))
        )

        it('should fail on trying to add treatment with an empty pill', () =>
            logic.addTreatment(id, dni, '', quantity, frequency)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid pill`))
        )

        it('should fail on trying to add treatment with a numeric pill', () =>
            logic.addTreatment(id, dni, 123, quantity, frequency)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid pill`))
        )
        
        it('should fail on trying to add treatment with an undefined quantity', () =>
            logic.addTreatment(id, dni, pill, undefined, frequency)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid quantity`))
        )

        it('should fail on trying to add treatment with an empty quantity', () =>
            logic.addTreatment(id, dni, pill, '', frequency)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid quantity`))
        )

        it('should fail on trying to add treatment with a numeric quantity', () =>
            logic.addTreatment(id, dni, pill, 123, frequency)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid quantity`))
        )

        it('should fail on trying to add treatment with a quantity less or equal to 0', () =>
            logic.addTreatment(id, dni, pill, '0', frequency)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`quantity 0 not possible`))
        )
        
        it('should fail on trying to add treatment with an undefined frequency', () =>
            logic.addTreatment(id, dni, pill, quantity, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid frequency`))
        )

        it('should fail on trying to add treatment with an empty frequency', () =>
            logic.addTreatment(id, dni, pill, quantity, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid frequency`))
        )

        it('should fail on trying to add treatment with a numeric frequency', () =>
            logic.addTreatment(id, dni, pill, quantity, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid frequency`))
        )
    })

    true && describe('remove treatment', () => {

        let id

        beforeEach(() => 
            Patient.create({name, dni, surname, age, gender, address, phone})               
                .then(res => {
                    id = res.id
                    return logic.addTreatment(id, dni, pill, quantity, frequency)
                })
        )

        it('should remove treatment correctly', () => 
            logic.removeTreatment(id, dni, pill)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on trying to remove treatment with an undefined id', () =>
            logic.removeTreatment(undefined, dni, pill)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )

        it('should fail on trying to remove treatment with an empty id', () =>
            logic.removeTreatment('', dni, pill)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )

        it('should fail on trying to remove treatment with a numeric id', () =>
            logic.removeTreatment(123, dni, pill)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )
        
        it('should fail on trying to remove treatment with an undefined dni', () =>
            logic.removeTreatment(id, undefined, pill)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to remove treatment with an empty dni', () =>
            logic.removeTreatment(id, '', pill)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to remove treatment with a string dni', () =>
            logic.removeTreatment(id, '123', pill)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )
        
        it('should fail on trying to remove treatment with an undefined pill', () =>
            logic.removeTreatment(id, dni, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid pill`))
        )

        it('should fail on trying to remove treatment with an empty pill', () =>
            logic.removeTreatment(id, dni, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid pill`))
        )

        it('should fail on trying to remove treatment with a numeric pill', () =>
            logic.removeTreatment(id, dni, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid pill`))
        )
    })

    true && describe('list treatements by patient id', () => {

        let id

        beforeEach(() => 
            Patient.create({name, dni, surname, age, gender, address, phone})               
                .then(res => {
                    id = res.id
                    return logic.addTreatment(id, dni, pill, quantity, frequency)
                })
        )

        it('should list treatments correctly', () => 
            logic.listTreatments(id)
                .then(treatments => {
                    expect(treatments).to.exist
                    expect(treatments[0].pill).to.equal(pill)
                    expect(treatments[0].quantity).to.equal(quantity)
                    expect(treatments[0].frequency).to.equal(frequency)
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

    true && describe('add cite', () => {

        beforeEach(() => 
            Doctor.create({ code, password })
                .then(() => 
                    Patient.create({name, dni, surname, age, gender, address, phone})               
                )
        )

        it('should add cite correctly', () => 
            logic.addCite(code, dni, name, date)
                .then(res => expect(res).to.exist)
        )

        it('should fail on trying to add a cite with an undefined code', () =>
            logic.addCite(undefined, dni, name, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to add a cite with an empty code', () =>
            logic.addCite('', dni, name, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to add a cite with a numeric code', () =>
            logic.addCite(123, dni, name, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to add a cite with an undefined dni', () =>
            logic.addCite(code, undefined, name, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to add a cite with an empty dni', () =>
            logic.addCite(code, '', name, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to add a cite with a string dni', () =>
            logic.addCite(code, '123', name, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to add a cite with an undefined name', () =>
            logic.addCite(code, dni, undefined, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to add a cite with an empty name', () =>
            logic.addCite(code, dni, '', date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to add a cite with a numeric name', () =>
            logic.addCite(code, dni, 123, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to add a cite with an undefined date', () =>
            logic.addCite(code, dni, name, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid date`))
        )

        it('should fail on trying to add a cite with an empty date', () =>
            logic.addCite(code, dni, name, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid date`))
        )

        it('should fail on trying to add a cite with a numeric date', () =>
            logic.addCite(code, dni, name, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid date`))
        )

        it('should fail on trying to add a cite with a string date', () =>
            logic.addCite(code, dni, name, '123')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid date`))
        )
    })

    true && describe('remove cite', () => {

        beforeEach(() => 
            Doctor.create({ code, password })
                .then(() => 
                    Patient.create({name, dni, surname, age, gender, address, phone})               
                )
                .then(res => {
                    expect(res).to.exist

                    return logic.addCite(code, dni, name, date)
                })
        )

        it('should remove cite correctly', () => 
            logic.removeCite(code, dni, name, date)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on trying to remove a cite with an undefined code', () =>
            logic.removeCite(undefined, dni, name, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to remove a cite with an empty code', () =>
            logic.removeCite('', dni, name, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to remove a cite with a numeric code', () =>
            logic.removeCite(123, dni, name, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to remove a cite with an undefined dni', () =>
            logic.removeCite(code, undefined, name, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to remove a cite with an empty dni', () =>
            logic.removeCite(code, '', name, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to remove a cite with a string dni', () =>
            logic.removeCite(code, '123', name, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to remove a cite with an undefined name', () =>
            logic.removeCite(code, dni, undefined, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to remove a cite with an empty name', () =>
            logic.removeCite(code, dni, '', date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to remove a cite with a numeric name', () =>
            logic.removeCite(code, dni, 123, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to remove a cite with an undefined date', () =>
            logic.removeCite(code, dni, name, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid date`))
        )

        it('should fail on trying to remove a cite with an empty date', () =>
            logic.removeCite(code, dni, name, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid date`))
        )

        it('should fail on trying to remove a cite with a numeric date', () =>
            logic.removeCite(code, dni, name, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid date`))
        )

        it('should fail on trying to remove a cite with a string date', () =>
            logic.removeCite(code, dni, name, '123')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid date`))
        )
    })

    true && describe('list cites by date', () => {

        beforeEach(() => 
            Doctor.create({ code, password })
                .then(() => 
                    Patient.create({name, dni, surname, age, gender, address, phone})               
                )
                .then(res => {
                    expect(res).to.exist

                    return logic.addCite(code, dni, name, date)
                })
        )

        it('should list cites correctly', () => 
            logic.listCites(date)
                .then(cites => {
                    expect(cites).to.exist
                    expect(cites[0].name).to.exist
                    expect(cites[0].date).to.exist
                })
        )

        it('should fail on trying to list cites with an undefined date', () =>
            logic.listCites(undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid date`))
        )

        it('should fail on trying to list cites with an empty date', () =>
            logic.listCites('')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid date`))
        )

        it('should fail on trying to list cites with a numeric date', () =>
            logic.listCites(123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid date`))
        )

        it('should fail on trying to list cites with a string date', () =>
            logic.listCites('123')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid date`))
        )
    })

    true && describe('list a patient cites by date', () => {

        let id

        beforeEach(() => 
            Doctor.create({ code, password })
                .then(() => 
                    Patient.create({name, dni, surname, age, gender, address, phone})               
                )
                .then(res => {
                    expect(res).to.exist

                    id = res.id

                    return logic.addCite(code, dni, name, date)
                })
        )

        it('should list cites correctly', () => 
            logic.listPatientCites(id, date)
                .then(cites => {
                    expect(cites).to.exist
                    expect(cites[0].name).to.exist
                    expect(cites[0].date).to.exist
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