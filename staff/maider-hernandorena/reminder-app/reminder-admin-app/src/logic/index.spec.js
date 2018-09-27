'use strict'

require('dotenv').config()

require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
const jwt = require('jsonwebtoken')
const { env: { MONGO_URL, JWT_SECRET } } = process
const { mongoose, models: { Admin, Doctor, Patient, Cite, Caretaker, Treatment } } = require('reminder-data')

describe('logic', () => {

    let _connection

    before(() =>
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )

    beforeEach(() => { 
        Promise.all([Admin.deleteMany(), Doctor.deleteMany(), Patient.deleteMany(), Treatment.deleteMany(), Cite.deleteMany(), Caretaker.deleteMany()])
    })

    true && describe('validate fields', () => {

        const code = `Maider${Math.random()}`
        const password = `123-${Math.random()}`
        const age = 20
        const dni = 12345678
        const phone = 123456789
        const date = new Date()

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

    true && describe('authenticate admin', () => {

        const code = `Maider${Math.random()}`
        const password = `123-${Math.random()}`

        beforeEach(() => Admin.create({ code, password }))

        it('should authenticate admin correctly', () => 
            logic.authenticateAdmin(code, password)
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
        
            logic.authenticateAdmin(code, falsePass)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`wrong password`))
        })

        it('should fail on trying to authenticate with an undefined code', () =>
            logic.authenticateAdmin(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to authenticate with an empty code', () =>
            logic.authenticateAdmin('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to authenticate with a numeric code', () =>
            logic.authenticateAdmin(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to authenticate with an undefined password', () =>
            logic.authenticateAdmin(code, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to authenticate with an empty password', () =>
            logic.authenticateAdmin(code, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to authenticate with a numeric password', () =>
            logic.authenticateAdmin(code, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )        
    })

    true && describe('register doctor', () => {

        const code = `Maider${Math.random()}`
        const password = `123-${Math.random()}`

        beforeEach(() => Admin.create({ code, password }))

        it('should register doctor correctly', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerDoctor(code, password, id, token))
                .then(res => expect(res).to.be.true)
        )

        it('should fail on already existing doctor', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => {
                    return logic.registerDoctor(code, password, id, token)
                        .then(() => logic.registerDoctor(code, password, id, token))
                        .catch(err => err)
                        .then(({ message }) => expect(message).to.equal(`${code} doctor already exist`))
                })
        )

        it('should fail on trying to register with an undefined code', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerDoctor(undefined, password, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to register with an empty code', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerDoctor('', password, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to register with a numeric code', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerDoctor(123, password, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerDoctor(code, undefined, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerDoctor(code, '', id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerDoctor(code, 123, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    true && describe('remove doctor', () => {

        const code = `Maider${Math.random()}`
        const password = `123-${Math.random()}`

        beforeEach(() => {
            return Admin.create({ code, password })
                .then(() => Doctor.create({ code, password }))
        })

        it('should unregister doctor correctly', () => 
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.removeDoctor(code, id, token))
                .then(res => expect(res).to.be.true)
        )

        it('should fail on unregistering a not existing doctor', () => {
            const falseCode = `info@pepe${Math.random()}.com`
        
            return logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.removeDoctor(falseCode, id, token))
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`there is no matches with code ${falseCode}`))
        })

        it('should fail on trying to unregister with an undefined code', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.removeDoctor(undefined, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to unregister with an empty code', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.removeDoctor('', id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to unregister with a numeric code', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.removeDoctor(123, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )   
    })

    true && describe('return doctor data', () => {

        const code = `Pepe${Math.random()}`
        const password = `Garcia${Math.random()}`

        it('should be return correctly the doctor data', () => 
            Doctor.create({code, password})                
                .then(res => {
                    expect(res).to.exist
                    return logic.doctorData(code)
                })
                .then(doctor => {
                    expect(doctor).to.exist
                    expect(doctor.code).to.equal(code)
                    expect(doctor.password).to.equal(password)
                })
        )

        it('should fail on trying to return doctor data with an undefined code', () =>
            logic.doctorData(undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to return doctor data with an empty code', () =>
            logic.doctorData('')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to return doctor data with a numeric code', () =>
            logic.doctorData(123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )
    })
    
    true && describe('list all doctors', () => {

        const code = `Pepe${Math.random()}`
        const password = `Garcia${Math.random()}`

        true && it('should succeed on correct data', () => 
            Doctor.create({ code, password })
                .then(res => {
                    expect(res).to.exist

                    return logic.listDoctors()
                })
                .then(doctors => {
                    expect(doctors).to.exist
                })
        )
    })

    true && describe('add patient', () => {

        const code = `Maider${Math.random()}`
        const password = `123-${Math.random()}`
        const dni = 12345678
        const name = `Pepe${Math.random()}`
        const surname = `Garcia${Math.random()}`
        const age = 20
        const gender = 'male'
        const address = 'Roc Boronat 35'
        const phone = 123456789

        beforeEach(() => Admin.create({ code, password }))

        it('should add correctly the given patient', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, dni, surname, age, gender, address, phone, id, token))
                .then(res => {
                    expect(res).to.exist
                    expect(res.id).to.exist
                })
        )

        it('should fail on adding an already existing patient', () => {

            const sameDni = dni

            return logic.authenticateAdmin(code, password)
                .then(({ id, token }) => {
                    return logic.addPatient(name, dni, surname, age, gender, address, phone, id, token) 
                        .then(foundPatient => {
                            expect(foundPatient).to.exist
        
                            return logic.addPatient(name, sameDni, surname, age, gender, address, phone, id, token)
                        })
                        .catch(err => err)
                        .then(({ message }) => expect(message).to.equal(`patient with ${sameDni} dni already exist`))
                })
        })

        it('should fail on trying to add patient with an undefined name', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(undefined, dni, surname, age, gender, address, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to add patient with an empty name', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient('', dni, surname, age, gender, address, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to add patient with a numeric name', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(123, dni, surname, age, gender, address, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to add patient with an undefined dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, undefined, surname, age, gender, address, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to add patient with an empty dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, '', surname, age, gender, address, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to add patient with a string dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, '123', surname, age, gender, address, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to add patient with an undefined surname', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, dni, undefined, age, gender, address, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid surname`))
        )

        it('should fail on trying to add patient with an empty surname', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, dni, '', age, gender, address, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid surname`))
        )

        it('should fail on trying to add patient with a numeric surname', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, dni, 123, age, gender, address, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid surname`))
        )

        it('should fail on trying to add patient with an undefined age', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, dni, surname, undefined, gender, address, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )

        it('should fail on trying to add patient with an empty age', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, dni, surname, '', gender, address, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )

        it('should fail on trying to add patient with a string age', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, dni, surname, '123', gender, address, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )

        it('should fail on trying to add patient with an undefined gender', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, dni, surname, age, undefined, address, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )

        it('should fail on trying to add patient with an empty gender', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, dni, surname, age, '', address, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )

        it('should fail on trying to add patient with a numeric gender', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, dni, surname, age, 123, address, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )

        it('should fail on trying to add patient with an undefined address', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, dni, surname, age, gender, undefined, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid address`))
        )

        it('should fail on trying to add patient with an empty address', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, dni, surname, age, gender, '', phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid address`))
        )

        it('should fail on trying to add patient with a numeric address', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, dni, surname, age, gender, 123, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid address`))
        )

        it('should fail on trying to add patient with an undefined phone', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, dni, surname, age, gender, address, undefined, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )

        it('should fail on trying to add patient with an empty phone', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, dni, surname, age, gender, address, '', id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )

        it('should fail on trying to add patient with a string phone', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.addPatient(name, dni, surname, age, gender, address, '123', id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )
    })

    true && describe('remove patient', () => {

        const code = `Maider${Math.random()}`
        const password = `123-${Math.random()}`
        const dni = 12345678
        const name = `Pepe${Math.random()}`
        const surname = `Garcia${Math.random()}`
        const age = 20
        const gender = 'male'
        const address = 'Roc Boronat 35'
        const phone = 123456789
        
        beforeEach(() => {
            return  Admin.create({ code, password })
                .then(() => Patient.create({name, dni, surname, age, gender, address, phone}))              
        })

        it('should remove patient correctly', () =>       
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.removePatient(dni, id, token))
                .then(res =>  expect(res).to.be.true)
        )

        it('should throw error on removing an not existing patient', () =>  
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => {logic.removePatient(dni, id, token)
                    .then(res => {
                        expect(res).to.be.true
                        
                        return logic.removePatient(dni, id, token)
                    })
                    .catch(err => err)
                    .then(({message}) => expect(message).to.equal(`patient with ${dni} dni does not exist`))
                })
        )
    })

    true && describe('update patient', () => {
        
        const code = `Maider${Math.random()}`
        const password = `123-${Math.random()}`

        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const { name, dni, surname, age, gender, address, phone } = patient

        const newAddress = 'Vila i Vila 78'
        const newPhone = 987654321

        beforeEach(() => 
            Admin.create({ code, password })
                .then(() => Patient.create({ name, dni, surname, age, gender, address, phone }))
        )

        it('should fail on updating a patient does not exist', () => {
            const falseDni = 10000000

            return logic.authenticateAdmin(code, password)
                .then(({ id, token }) => {
                    return logic.updatePatient(falseDni, newAddress, newPhone, id, token)
                        .catch(err => err)
                        .then(({ message }) => expect(message).to.equal(`patient with ${falseDni} dni does not exist`))
                })
        })

        it('should fail on trying to update a patient with an undefined dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.updatePatient(undefined, newAddress, newPhone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to update a patient with an empty dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.updatePatient('', newAddress, newPhone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to update a patient with a string dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.updatePatient('123', newAddress, newPhone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to update a patient with a numeric address', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.updatePatient(dni, 123, newPhone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid newAddress`))
        )

        it('should fail on trying to update a patient with a string phone', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.updatePatient(dni, newAddress, '12334546', id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid newPhone`))
        )
    })

    true && describe('return patient data', () => {

        const dni = 12345678
        const name = `Pepe${Math.random()}`
        const surname = `Garcia${Math.random()}`
        const age = 20
        const gender = 'male'
        const address = 'Roc Boronat 35'
        const phone = 123456789

        it('should be return correctly the patient data', () => 
            Patient.create({name, dni, surname, age, gender, address, phone})                
                .then(res => {
                    expect(res).to.exist
                    return logic.patientData(dni)
                })
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

        const dni = 12345678
        const name = `Pepe${Math.random()}`
        const surname = `Garcia${Math.random()}`
        const age = 20
        const gender = 'male'
        const address = 'Roc Boronat 35'
        const phone = 123456789

        true && it('should succeed on correct data', () => 
            Patient.create({name, dni, surname, age, gender, address, phone})
                .then(res => {
                    expect(res).to.exist

                    return logic.searchPatients(name)
                })
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

        const dni = 12345678
        const name = `Pepe${Math.random()}`
        const surname = `Garcia${Math.random()}`
        const age = 20
        const gender = 'male'
        const address = 'Roc Boronat 35'
        const phone = 123456789

        true && it('should succeed on correct data', () => 
            Patient.create({name, dni, surname, age, gender, address, phone})
                .then(res => {
                    expect(res).to.exist

                    return logic.listPatients()
                })
                .then(patients => {
                    expect(patients).to.exist
                })
        )
    })

    true && describe('register caretaker', () => {

        const code = `Maider${Math.random()}`
        const password = `123-${Math.random()}`
        const dni = 12345678
        const name = `Pepe${Math.random()}`
        const surname = `Garcia${Math.random()}`
        const age = 20
        const gender = 'male'
        const phone = 123456789

        beforeEach(() => Admin.create({ code, password }))

        it('should register caretaker correctly', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, password, name, surname, age, gender, phone, id, token))
                .then(({ message }) => expect(message).to.equal('caretaker registered correctly'))
        )

        it('should fail on already existing doctor', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => {
                    return logic.registerCaretaker(dni, password, name, surname, age, gender, phone, id, token)
                        .then(() => logic.registerCaretaker(dni, password, name, surname, age, gender, phone, id, token))
                        .catch(err => err)
                        .then(({ message }) => expect(message).to.equal(`caretaker ${dni} already exist`))
                })
        )

        it('should fail on trying to register with an undefined dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(undefined, password, name, surname, age, gender, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to register with an empty dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker('', password, name, surname, age, gender, phone, id, token))            
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to register with a string dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker('123', password, name, surname, age, gender, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, undefined, name, surname, age, gender, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, '', name, surname, age, gender, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, 123, name, surname, age, gender, phone, id, token))             
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with an undefined name', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, password, undefined, surname, age, gender, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to register with an empty name', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, password, '', surname, age, gender, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to register with a numeric name', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, password, 123, surname, age, gender, phone, id, token))             
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to register with an undefined surname', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, password, name, undefined, age, gender, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid surname`))
        )

        it('should fail on trying to register with an empty surname', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, password, name, '', age, gender, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid surname`))
        )

        it('should fail on trying to register with a numeric surname', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, password, name, 123, age, gender, phone, id, token))             
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid surname`))
        )

        it('should fail on trying to register with an undefined age', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, password, name, surname, undefined, gender, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )

        it('should fail on trying to register with an empty age', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, password, name, surname, '', gender, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )

        it('should fail on trying to register with a string age', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, password, name, surname, '123', gender, phone, id, token))             
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )

        it('should fail on trying to register with an undefined gender', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, password, name, surname, age, undefined, phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )

        it('should fail on trying to register with an empty gender', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, password, name, surname, age, '', phone, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )

        it('should fail on trying to register with a numeric gender', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, password, name, surname, age, 123, phone, id, token))             
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )

        it('should fail on trying to register with an undefined phone', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, password, name, surname, age, gender, undefined, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )

        it('should fail on trying to register with an empty phone', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, password, name, surname, age, gender, '', id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )

        it('should fail on trying to register with a string phone', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.registerCaretaker(dni, password, name, surname, age, gender, '123', id, token))             
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )
    })

    true && describe('remove caretaker', () => {

        const code = `Maider${Math.random()}`
        const password = `123-${Math.random()}`
        const dni = 12345678
        const name = `Pepe${Math.random()}`
        const surname = `Garcia${Math.random()}`
        const age = 20
        const gender = 'male'
        const phone = 123456789

        beforeEach(() => {
            return Admin.create({ code, password })
                .then(() => Caretaker.create({ dni, password, name, surname, age, gender, phone }))
        })

        it('should unregister caretaker correctly', () => 
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.removeCaretaker(dni, id, token))
                .then(res => expect(res).to.be.true)
        )

        it('should fail on unregistering a not existing doctor', () => {
            const falseDni = 99889988
        
            return logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.removeCaretaker(falseDni, id, token))
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`caretaker ${falseDni} does not exist`))
        })

        it('should fail on trying to unregister with an undefined dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.removeCaretaker(undefined, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to unregister with an empty dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.removeCaretaker('', id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to unregister with a string dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.removeCaretaker('123', id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )   
    })

    true && describe('return caretaker data', () => {

        const dni = 12345678
        const password = `Garcia${Math.random()}`
        const name = `Pepe${Math.random()}`
        const surname = `Garcia${Math.random()}`
        const age = 20
        const gender = 'male'
        const phone = 123456789

        it('should be return correctly the caretaker data', () => 
            Caretaker.create({ dni, password, name, surname, age, gender, phone })             
                .then(res => {
                    expect(res).to.exist
                    return logic.caretakerData(dni)
                })
                .then(caretaker => {
                    expect(caretaker).to.exist
                    expect(caretaker.dni).to.equal(dni.toString())
                    expect(caretaker.password).to.equal(password)
                    expect(caretaker.name).to.equal(name)
                    expect(caretaker.surname).to.equal(surname)
                    expect(caretaker.age).to.equal(age)
                    expect(caretaker.gender).to.equal(gender)
                    expect(caretaker.phone).to.equal(phone)
                })
        )

        it('should fail on trying to return caretaker data with an undefined dni', () =>
            logic.caretakerData(undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to return caretaker data with an empty dni', () =>
            logic.caretakerData('')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to return caretaker data with a string dni', () =>
            logic.caretakerData('123')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )
    })
    
    true && describe('list all caretakers', () => {

        const dni = 12345678
        const password = `123${Math.random()}`
        const name = `Pepe${Math.random()}`
        const surname = `Garcia${Math.random()}`
        const age = 20
        const gender = 'male'
        const phone = 123456789

        true && it('should succeed on correct data', () => 
            Caretaker.create({dni, password, name, surname, age, gender, phone})
                .then(res => {
                    expect(res).to.exist

                    return logic.listCaretakers()
                })
                .then(caretakers => {
                    expect(caretakers).to.exist
                })
        )
    })

    true && describe('assign patient to caretaker', () => {

        const code = `Maider${Math.random()}`
        const password = `123-${Math.random()}`
        const caretakerDni = 12345678
        const patientDni = 87654321
        const name = `Pepe${Math.random()}`
        const surname = `Garcia${Math.random()}`
        const age = 20
        const gender = 'male'
        const address = 'Roc Boronat'
        const phone = 123456789

        beforeEach(() => {
            return Admin.create({ code, password })
                .then(() => {
                    const dni = caretakerDni
                    return Caretaker.create({ dni, password, name, surname, age, gender, phone })
                })
                .then(() => {
                    const dni = patientDni
                    return Patient.create({ dni, name, surname, age, gender, address, phone })
                })
        })

        it('should assign a patient to a caretaker correctly', () => 
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.assignPatientToCaretaker(caretakerDni, patientDni, id, token))
                .then(({ message }) => expect(message).to.equal('patient assigned correctly to caretaker'))
        )

        it('should fail on assigning a patient to a caretaker that does not exist', () => {
            const falseDni = 11112222

            return logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.assignPatientToCaretaker(falseDni, patientDni, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`caretaker with ${falseDni} dni does not exist`))
        })

        it('should fail on assigning a patient does not exist to a caretaker', () => {
            const falseDni = 11112222

            return logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.assignPatientToCaretaker(caretakerDni, falseDni, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`patient with ${falseDni} dni does not exist`))
        })

        it('should fail on trying to assign a patient to a caretaker with an undefined dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.assignPatientToCaretaker(undefined, dni, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`dni is not defined`))
        )

        it('should fail on trying to assign a patient to a caretaker with an empty dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.assignPatientToCaretaker('', dni, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`dni is not defined`))
        )

        it('should fail on trying to assign a patient to a caretaker with a string dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.assignPatientToCaretaker('123', dni, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`dni is not defined`))
        )   

        it('should fail on trying to assign a patient to a caretaker with an undefined dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.assignPatientToCaretaker(dni, undefined, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`dni is not defined`))
        )

        it('should fail on trying to assign a patient to a caretaker with an empty dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.assignPatientToCaretaker(dni, '', id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`dni is not defined`))
        )

        it('should fail on trying to assign a patient to a caretaker with a string dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.assignPatientToCaretaker(dni, '123', id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`dni is not defined`))
        )  
    })
    
    true && describe('unassign patient to caretaker', () => {

        const code = `Maider${Math.random()}`
        const password = `123-${Math.random()}`
        const caretakerDni = 12345678
        const patientDni = 87654321
        const name = `Pepe${Math.random()}`
        const surname = `Garcia${Math.random()}`
        const age = 20
        const gender = 'male'
        const address = 'Roc Boronat'
        const phone = 123456789

        beforeEach(() => {
            return Admin.create({ code, password })
                .then(() => {
                    const dni = caretakerDni
                    return Caretaker.create({ dni, password, name, surname, age, gender, phone })
                })
                .then(() => {
                    const dni = patientDni
                    return Patient.create({ dni, name, surname, age, gender, address, phone })
                })
                .then(() => {
                    return logic.authenticateAdmin(code, password)
                        .then(({ id, token }) => logic.assignPatientToCaretaker(caretakerDni, patientDni, id, token))
                })
        })

        it('should unassign a patient to a caretaker correctly', () => 
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.unassignPatientToCaretaker(caretakerDni, patientDni, id, token))
                .then(({ message }) => expect(message).to.equal('patient unassigned correctly to caretaker'))
        )

        it('should fail on unassigning a patient to a caretaker that does not exist', () => {
            const falseDni = 11112222

            return logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.unassignPatientToCaretaker(falseDni, patientDni, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`caretaker with ${falseDni} dni does not exist`))
        })

        it('should fail on unassigning a patient does not exist to a caretaker', () => {
            const falseDni = 11112222

            return logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.unassignPatientToCaretaker(caretakerDni, falseDni, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`patient with ${falseDni} dni does not exist`))
        })

        it('should fail on trying to unassign a patient to a caretaker with an undefined dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.unassignPatientToCaretaker(undefined, dni, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`dni is not defined`))
        )

        it('should fail on trying to unassign a patient to a caretaker with an empty dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.unassignPatientToCaretaker('', dni, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`dni is not defined`))
        )

        it('should fail on trying to unassign a patient to a caretaker with a string dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.unassignPatientToCaretaker('123', dni, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`dni is not defined`))
        )   

        it('should fail on trying to unassign a patient to a caretaker with an undefined dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.unassignPatientToCaretaker(dni, undefined, id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`dni is not defined`))
        )

        it('should fail on trying to unassign a patient to a caretaker with an empty dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.unassignPatientToCaretaker(dni, '', id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`dni is not defined`))
        )

        it('should fail on trying to unassign a patient to a caretaker with a string dni', () =>
            logic.authenticateAdmin(code, password)
                .then(({ id, token }) => logic.unassignPatientToCaretaker(dni, '123', id, token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`dni is not defined`))
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

    after(() =>
        Promise.all([Admin.deleteMany(), Doctor.deleteMany(), Patient.deleteMany(), Treatment.deleteMany(), Cite.deleteMany(), Caretaker.deleteMany()])
            .then(() => _connection.disconnect())
    )
})