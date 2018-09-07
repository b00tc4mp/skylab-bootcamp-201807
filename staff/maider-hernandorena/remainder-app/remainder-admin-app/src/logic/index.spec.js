'use strict'

require('dotenv').config()

require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
const jwt = require('jsonwebtoken')

describe('logic', () => {

    let code, password, name, surname, age, gender, address, phone, dni, newAddress, newPhone, date, pill, quantity, frequency

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
        newAddress = 'Paris'
        newPhone = 789789789
        date = new Date()
        pill = `atarax${Math.random()}`
        quantity = `1-${Math.random()}`
        frequency = 'mondays, fridays'
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

    true && describe('register doctor', () => {

        it('should register doctor correctly', () =>
            logic.registerDoctor(code, password)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on already existing doctor', () =>
            logic.registerDoctor(code, password)
                .then(() => logic.registerDoctor(code, password))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`${code} doctor already exist`))
        )

        it('should fail on trying to register with an undefined code', () =>
            logic.registerDoctor(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to register with an empty code', () =>
            logic.registerDoctor('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to register with a numeric code', () =>
            logic.registerDoctor(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.registerDoctor(code, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.registerDoctor(code, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.registerDoctor(code, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    true && describe('add patient', () => {

        it('should add correctly the given patient', () =>
            logic.addPatient(name, dni, surname, age, gender, address, phone)
                .then(res => {
                    expect(res).to.exist
                    expect(res.id).to.exist
                })
        )

        it('should fail on adding an already existing patient', () => {

            const sameDni = dni

            return logic.addPatient(name, dni, surname, age, gender, address, phone)
                .then(foundPatient => {
                    expect(foundPatient).to.exist

                    return logic.addPatient(name, sameDni, surname, age, gender, address, phone)
                })
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`patient with ${sameDni} dni already exist`))
        })

        it('should fail on trying to add patient with an undefined name', () =>
            logic.addPatient(undefined, dni, surname, age, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to add patient with an empty name', () =>
            logic.addPatient('', dni, surname, age, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to add patient with a numeric name', () =>
            logic.addPatient(123, dni, surname, age, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to add patient with an undefined dni', () =>
            logic.addPatient(name, undefined, surname, age, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to add patient with an empty dni', () =>
            logic.addPatient(name, '', surname, age, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to add patient with a string dni', () =>
            logic.addPatient(name, '123', surname, age, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to add patient with an undefined surname', () =>
            logic.addPatient(name, dni, undefined, age, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid surname`))
        )

        it('should fail on trying to add patient with an empty surname', () =>
            logic.addPatient(name, dni, '', age, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid surname`))
        )

        it('should fail on trying to add patient with a numeric surname', () =>
            logic.addPatient(name, dni, 123, age, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid surname`))
        )

        it('should fail on trying to add patient with an undefined age', () =>
            logic.addPatient(name, dni, surname, undefined, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )

        it('should fail on trying to add patient with an empty age', () =>
            logic.addPatient(name, dni, surname, '', gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )

        it('should fail on trying to add patient with a string age', () =>
            logic.addPatient(name, dni, surname, '123', gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )

        it('should fail on trying to add patient with an undefined gender', () =>
            logic.addPatient(name, dni, surname, age, undefined, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )

        it('should fail on trying to add patient with an empty gender', () =>
            logic.addPatient(name, dni, surname, age, '', address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )

        it('should fail on trying to add patient with a numeric gender', () =>
            logic.addPatient(name, dni, surname, age, 123, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )

        it('should fail on trying to add patient with an undefined address', () =>
            logic.addPatient(name, dni, surname, age, gender, undefined, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid address`))
        )

        it('should fail on trying to add patient with an empty address', () =>
            logic.addPatient(name, dni, surname, age, gender, '', phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid address`))
        )

        it('should fail on trying to add patient with a numeric address', () =>
            logic.addPatient(name, dni, surname, age, gender, 123, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid address`))
        )

        it('should fail on trying to add patient with an undefined phone', () =>
            logic.addPatient(name, dni, surname, age, gender, address, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )

        it('should fail on trying to add patient with an empty phone', () =>
            logic.addPatient(name, dni, surname, age, gender, address, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )

        it('should fail on trying to add patient with a string phone', () =>
            logic.addPatient(name, dni, surname, age, gender, address, '123')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )
    })

    true && describe('remove patient', () => {

        let id
        
        beforeEach(() => 
            logic.addPatient(name, dni, surname, age, gender, address, phone)                
                .then(res => {
                    id = res.id
                    return true
                })
        )

        it('should remove patient correctly', () =>       
            logic.removePatient(id, dni)
                .then(res =>  expect(res).to.be.true)
        )

        it('should throw error on removing an not existing patient', () =>  
            logic.removePatient(id, dni)
                .then(res => {
                    expect(res).to.be.true
                    
                    return logic.removePatient(id, dni)
                })
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`patient with ${dni} dni does not exist`))
        )
    })

    true && describe('update patient', () => {
        
        let id

        beforeEach(() => 
            logic.addPatient(name, dni, surname, age, gender, address, phone)                
                .then(res => {
                    id = res.id
                    return true
                })
        )

        it('should be update correctly the address or phone', () => 
            logic.updatePatient(id, dni, newAddress, newPhone)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on updating a patient does not exist', () => {
            const falseDni = 10000000

            return logic.updatePatient(id, falseDni, newAddress, newPhone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`patient with ${falseDni} dni does not exist`))
        })

        it('should fail on trying to update a patient with an undefined id', () =>
            logic.updatePatient(undefined, dni, newAddress, newPhone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )

        it('should fail on trying to update a patient with an empty id', () =>
            logic.updatePatient('', dni, newAddress, newPhone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )

        it('should fail on trying to update a patient with a numeric id', () =>
            logic.updatePatient(123, dni, newAddress, newPhone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )

        it('should fail on trying to update a patient with an undefined dni', () =>
            logic.updatePatient(id, undefined, newAddress, newPhone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to update a patient with an empty dni', () =>
            logic.updatePatient(id, '', newAddress, newPhone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to update a patient with a string dni', () =>
            logic.updatePatient(id, '123', newAddress, newPhone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to update a patient with a numeric address', () =>
            logic.updatePatient(id, dni, 123, newPhone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid newAddress`))
        )

        it('should fail on trying to update a patient with a string phone', () =>
            logic.updatePatient(id, dni, newAddress, '12334546')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid newPhone`))
        )
    })

    true && describe('return patient data', () => {

        it('should be return correctly the patient data', () => 
            logic.addPatient(name, dni, surname, age, gender, address, phone)                
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

        true && it('should succeed on correct data', () => 
            logic.addPatient(name, dni, surname, age, gender, address, phone)
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

        true && it('should succeed on correct data', () => 
            logic.addPatient(name, dni, surname, age, gender, address, phone)
                .then(res => {
                    expect(res).to.exist

                    return logic.listPatients()
                })
                .then(patients => {
                    expect(patients).to.exist
                })
        )
    })


})