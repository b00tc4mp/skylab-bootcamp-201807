require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose
const { Doctor, Patients, Caretaker } = require('../data/models')

const { env: { MONGO_URL } } = process

describe('logic', () => {
    let _connection
    const code = `A123${Math.random()}`
    const password = `123${Math.random()}`
    const name = `Maider${Math.random()}`
    const dni = `A22${Math.random()}`

    before(() =>
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )

    true && describe('validate fields', () => {
        it('should succeed on correct value', () => {
            expect(() => logic._validateStringField('name', name).to.equal(name))
            expect(() => logic._validateStringField('password', password).to.equal(password))
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
    })

    true && describe('register doctor', () => {
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

    true && describe('authenticate doctor', () => {
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

    true && describe('add patient', () => {

        const patient = { name: 'John', surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}

        beforeEach(() => Doctor.create({ code, password }))

        it('should succeed on correct data', () =>
            logic.addPatient(code, patient.name, patient.surname, patient.age, patient.gender, patient.address, patient.phone)
                .then(res => {
                    expect(res).to.be.true

                    return Doctor.findOne({ code })
                })
                .then(doctor => {
                    expect(doctor.patients.length).to.equal(1)

                    const [_patient] = doctor.patients

                    expect(_patient.name).to.equal(patient.name)
                    expect(_patient.surname).to.equal(patient.surname)
                    expect(_patient.age).to.equal(patient.age)
                    expect(_patient.gender).to.equal(patient.gender)
                    expect(_patient.address).to.equal(patient.address)
                    expect(_patient.phone).to.equal(patient.phone)
                })
        )
    })

    !true && describe('list patients by name', () => {

        let patients

        beforeEach(() => {
            patients = [
                { name: 'John', surname: 'Doe', phone: '123-456-789', age: 75},
                { name: 'Ele', surname: 'Fante', phone: '123-456-789', age: 73 },
                { name: 'Coco', surname: 'Drilo', phone: '123-456-789', age: 72 },
                { name: 'Jira', surname: 'Fa', phone: '123-456-789', age: 68 },
                { name: 'Murcie', surname: 'Lago', phone: '123-456-789', age: 78 },
                { name: 'Hipo', surname: 'Potamo', phone: '123-456-789', age: 85 },
                { name: 'Oran', surname: 'Gutan', phone: '123-456-789', age: 80 },
                { name: 'Mama', surname: 'Racho', phone: '123-456-789', age: 64 }
            ]

            return new Doctor({ code, password }).save()
                .then(doctor => {
                    patients.map(patient => new Patients(patient)).forEach(patient => doctor.patients.push(patient))
                
                    return doctor.save()
                })
                .then(doctor => {
                    patients = doctor.patients.map(({_doc}) => {
                        const { _id, name, surname, phone, age } = _doc

                        return { id: _id.toString(), name, surname, phone, age }
                    })
                })
        })

        it('should succeed on correct data', () => {
            return logic.listPatients(code, name, 'Coco')
                .then(_patients => {

                    expect(_patients).to.deep.equal(patients[2])
                })
        })
    })

    true && describe('remove patient', () => {
        const patient = { name: 'John', surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}

        beforeEach(() => Doctor.create({ code, password }))

        it('should remove patient correctly', () => {

            logic.removePatient(code, patient.name, patient.surname, patient.age, patient.gender, patient.address, patient.phone)
                .then(res => {
                    expect(res).to.be.true
                    expect(patient.name).not.to.exist
                    expect(patient.surname).not.to.exist
                    expect(patient.age).not.to.exist
                    expect(patient.gender).not.to.exist
                    expect(patient.address).not.to.exist
                    expect(patient.phone).not.to.exist

                    logic.removePatient(code, patient)
                })
                .then(res => {
                    expect(res).to.throw.err(`patient with ${patient.name} name was not found`)
                })
        })
    })

    true && describe('register caretaker', () => {
        it('should be registered with given name and dni', () =>
            Caretaker.findOne({ name })
                .then(caretaker => {
                    expect(caretaker).not.to.exist

                    return logic.registerCaretaker(name, dni)
                })
                .then(res => {
                    expect(res).to.be.true

                    return Caretaker.findOne({ name })
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

    true && describe('authenticate caretaker', () => {
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

    after(() => _connection.disconnect())
})