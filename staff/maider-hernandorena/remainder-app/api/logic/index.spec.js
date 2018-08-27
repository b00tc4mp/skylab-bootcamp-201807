require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose
const { Doctor, Patient, Cite, Treatment, Caretaker } = require('../data/models')

const { env: { MONGO_URL } } = process

describe('logic', () => {
    let _connection

    before(() =>
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )

    beforeEach(() => Promise.all([Doctor.deleteMany(), Patient.deleteMany(), Caretaker.deleteMany()]))

    !true && describe('validate fields', () => {

        const name = `Maider${Math.random()}`
        const password = `123-${Math.random()}`
        const age = Math.random()
        const dni = 12345678
        const phone = 123456789
        const date = new Date()

        it('should succeed on correct value', () => {
            expect(() => logic._validateStringField('name', name)).not.to.throw()
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

    !true && describe('register doctor', () => {

        const code = `123A${Math.random()}`
        const password = `12-${Math.random()}`

        it('should be registered with given code and password', () =>
            Doctor.findOne({ code })
                .then(doctor => {
                    expect(doctor).to.be.null

                    return logic.registerDoctor(code, password)
                })
                .then(res => {
                    expect(res).to.be.true

                    return Doctor.findOne({ code })
                })
                .then(doctor => {
                    expect(doctor).to.exist
                    expect(doctor.code).to.equal(code)
                    expect(doctor.password).to.equal(password)
                })
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

    !true && describe('authenticate doctor', () => {

        const code = `123A${Math.random()}`
        const password = `12-${Math.random()}`

        beforeEach(() => Doctor.create({ code, password }))

        it('should authenticate correctly', () =>
            logic.authenticateDoctor(code, password)
                .then(res => {
                    expect(res).to.be.true
                })
        )

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

    !true && describe('add patient', () => {

        const patient = { name: 'John', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}

        const {name, dni, surname, age, gender, address, phone} = patient

        it('should be registered with given patient', () =>
            Patient.findOne(patient)
                .then(foundPatient => {
                    expect(foundPatient).to.be.null

                    return logic.addPatient(name, dni, surname, age, gender, address, phone)
                })
                .then(res => {
                    expect(res).to.be.true

                    return Patient.findOne(patient)
                })
                .then(foundPatient => {
                    expect(foundPatient).to.exist
                    expect(foundPatient.name).to.equal(name)
                    expect(foundPatient.dni).to.equal(dni)
                    expect(foundPatient.surname).to.equal(surname)
                    expect(foundPatient.age).to.equal(age)
                    expect(foundPatient.gender).to.equal(gender)
                    expect(foundPatient.address).to.equal(address)
                    expect(foundPatient.phone).to.equal(phone)
                })
        )

        it('should fail on trying to register with an undefined name', () =>
            logic.addPatient(undefined, dni, surname, age, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to register with an empty name', () =>
            logic.addPatient('', dni, surname, age, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to register with a numeric name', () =>
            logic.addPatient(123, dni, surname, age, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to register with an undefined dni', () =>
            logic.addPatient(name, undefined, surname, age, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to register with an empty dni', () =>
            logic.addPatient(name, '', surname, age, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to register with a string dni', () =>
            logic.addPatient(name, '123', surname, age, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to register with an undefined surname', () =>
            logic.addPatient(name, dni, undefined, age, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid surname`))
        )

        it('should fail on trying to register with an empty surname', () =>
            logic.addPatient(name, dni, '', age, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid surname`))
        )

        it('should fail on trying to register with a numeric surname', () =>
            logic.addPatient(name, dni, 123, age, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid surname`))
        )

        it('should fail on trying to register with an undefined age', () =>
            logic.addPatient(name, dni, surname, undefined, gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )

        it('should fail on trying to register with an empty age', () =>
            logic.addPatient(name, dni, surname, '', gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )

        it('should fail on trying to register with a string age', () =>
            logic.addPatient(name, dni, surname, '123', gender, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )

        it('should fail on trying to register with an undefined gender', () =>
            logic.addPatient(name, dni, surname, age, undefined, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )

        it('should fail on trying to register with an empty gender', () =>
            logic.addPatient(name, dni, surname, age, '', address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )

        it('should fail on trying to register with a numeric gender', () =>
            logic.addPatient(name, dni, surname, age, 123, address, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )

        it('should fail on trying to register with an undefined address', () =>
            logic.addPatient(name, dni, surname, age, gender, undefined, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid address`))
        )

        it('should fail on trying to register with an empty address', () =>
            logic.addPatient(name, dni, surname, age, gender, '', phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid address`))
        )

        it('should fail on trying to register with a numeric address', () =>
            logic.addPatient(name, dni, surname, age, gender, 123, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid address`))
        )

        it('should fail on trying to register with an undefined phone', () =>
            logic.addPatient(name, dni, surname, age, gender, address, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )

        it('should fail on trying to register with an empty phone', () =>
            logic.addPatient(name, dni, surname, age, gender, address, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )

        it('should fail on trying to register with a string phone', () =>
            logic.addPatient(name, dni, surname, age, gender, address, '123')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )
    })

    !true && describe('remove patient', () => {

        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}

        beforeEach(() =>  Patient.create(patient))

        it('should remove patient correctly', () => {

            const { dni } = patient
            
            return logic.removePatient(dni)
                .then(res => {
                    expect(res).to.be.true
                    
                    return logic.removePatient(dni)
                })
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`patient with ${dni} dni does not exist`))
        })
    })

    true && describe('search patients by name', () => {

        const patientsList = [
            { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123},
            { name: 'Laura', dni: 12345677, surname: 'Lala', age: 78 , gender: 'female', address: 'Barcelona', phone: 123123123},
            { name: 'Juana', dni: 12345676, surname: 'Ja', age: 78 , gender: 'female', address: 'Barcelona', phone: 123123123},
            { name: 'Gorka', dni: 12345675, surname: 'Pala', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        ]

        beforeEach(() =>  Patient.create(patientsList))

        it('should succeed on correct data', () => {

            const name = 'Juana'

            return logic.searchPatients(name, 'J')
                .then(patients => {
                    expect(patients[0].name).to.equal(patientsList[2].name)
                    expect(patients[0].dni).to.equal(patientsList[2].dni)
                    expect(patients[0].surname).to.equal(patientsList[2].surname)
                    expect(patients[0].age).to.equal(patientsList[2].age)
                    expect(patients[0].gender).to.equal(patientsList[2].gender)
                    expect(patients[0].address).to.equal(patientsList[2].address)
                    expect(patients[0].phone).to.equal(patientsList[2].phone)
                })
        })
    })



    !true && describe('register caretaker', () => {

        const name = `Maider${Math.random()}`
        const dni = 12564878

        it('should be registered with given name and dni', () =>
            Caretaker.findOne({ dni })
                .then(caretaker => {
                    expect(caretaker).not.to.exist

                    return logic.registerCaretaker(name, dni)
                })
                .then(res => {
                    expect(res).to.be.true

                    return Caretaker.findOne({ dni })
                })
                .then(caretaker => {
                    expect(caretaker).to.exist
                    expect(caretaker.name).to.equal(name)
                    expect(caretaker.dni).to.equal(dni)
                })
        )

        it('should fail on trying to register with an undefined name', () =>
            logic.registerCaretaker(undefined, dni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to register with an empty name', () =>
            logic.registerCaretaker('', dni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to register with a numeric name', () =>
            logic.registerCaretaker(123, dni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to register with an undefined dni', () =>
            logic.registerCaretaker(name, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to register with an empty dni', () =>
            logic.registerCaretaker(name, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to register with a numeric dni', () =>
            logic.registerCaretaker(name, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )
    })

    !true && describe('authenticate caretaker', () => {

        const name = `Maider${Math.random()}`
        const dni = 12564878

        beforeEach(() => Caretaker.create({ name, dni }))

        it('should authenticate correctly', () =>
            logic.authenticateCaretaker(name, dni)
                .then(res => {
                    expect(res).to.be.true
                })
        )

        it('should fail on trying to authenticate with an undefined name', () =>
            logic.authenticateCaretaker(undefined, dni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to authenticate with an empty name', () =>
            logic.authenticateCaretaker('', dni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to authenticate with a numeric name', () =>
            logic.authenticateCaretaker(123, dni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to authenticate with an undefined dni', () =>
            logic.authenticateCaretaker(name, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to authenticate with an empty dni', () =>
            logic.authenticateCaretaker(name, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to authenticate with a numeric dni', () =>
            logic.authenticateCaretaker(name, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )
    })

    after(() => {
        Promise.all([Doctor.deleteMany(), Patient.deleteMany(), Caretaker.deleteMany()])
            .then(() => _connection.disconnect())
    })
})