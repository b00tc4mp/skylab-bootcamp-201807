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

    beforeEach(() => Promise.all([Doctor.deleteMany(), Patient.deleteMany(), Caretaker.deleteMany(), Treatment.deleteMany(), Cite.deleteMany()]))

    true && describe('validate fields', () => {

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

    true && describe('register doctor', () => {

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

    true && describe('authenticate doctor', () => {

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

    true && describe('add patient', () => {

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

    true && describe('remove patient', () => {

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

    true && describe('update patient', () => {

        const patient1 = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}

        const newAddress = 'Beasain'
        const newPhone = 888999888
        const dni = 12345678

        beforeEach(() => Patient.create(patient1))

        it('should be update correctly the address or phone', () => 
            Patient.findOne({ dni })
                .then(patient => {
                    expect(patient).to.exist

                    return logic.updatePatient(dni, newAddress, newPhone)
                })
                .then(res => expect(res).to.be.true)
        )

        it('should fail on trying to register with an undefined dni', () =>
            logic.updatePatient(undefined, newAddress, newPhone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to register with an empty dni', () =>
            logic.updatePatient('', newAddress, newPhone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to register with a string dni', () =>
            logic.updatePatient('123', newAddress, newPhone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to register with an undefined address', () =>
            logic.updatePatient(dni, undefined, newPhone)
                .then(res => {
                    expect(res).to.be.true

                    return Patient.findOne({ dni })
                })
                .then(patient => {
                    expect(patient.address).to.equal(patient1.address)
                })
        )

        it('should fail on trying to register with an empty address', () =>
            logic.updatePatient(dni, '', newPhone)
                .then(res => {
                    expect(res).to.be.true

                    return Patient.findOne({ dni })
                })
                .then(patient => {
                    expect(patient.address).to.equal(patient1.address)
                })
        )

        it('should fail on trying to register with a numeric address', () =>
            logic.updatePatient(dni, 123, newPhone)
                .then(res => {
                    expect(res).to.be.true

                    return Patient.findOne({ dni })
                })
                .then(patient => {
                    expect(patient.address).to.equal(patient1.address)
                })
        )

        it('should fail on trying to register with an undefined phone', () =>
            logic.updatePatient(dni, newAddress, undefined)
                .then(res => {
                    expect(res).to.be.true

                    return Patient.findOne({ dni })
                })
                .then(patient => {
                    expect(patient.phone).to.equal(patient1.phone)
                })
        )

        it('should fail on trying to register with an empty phone', () =>
            logic.updatePatient(dni, newAddress, '')
                .then(res => {
                    expect(res).to.be.true

                    return Patient.findOne({ dni })
                })
                .then(patient => {
                    expect(patient.phone).to.equal(patient1.phone)
                })
        )

        it('should fail on trying to register with a string phone', () =>
            logic.updatePatient(dni, newAddress, '12334546')
                .then(res => {
                    expect(res).to.be.true

                    return Patient.findOne({ dni })
                })
                .then(patient => {
                    expect(patient.phone).to.equal(patient1.phone)
                })
        )
    })

    true && describe('search and list patients by name', () => {

        const patient1 = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const patient2 = { name: 'Laura', dni: 12345677, surname: 'Lala', age: 78 , gender: 'female', address: 'Barcelona', phone: 123123123}
        const patient3 = { name: 'Juana', dni: 33334444, surname: 'JJ', age: 78 , gender: 'female', address: 'Barcelona', phone: 123123123}
        const patient4 = { name: 'Gorka', dni: 12345675, surname: 'Pala', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const patient5 = { name: 'Juana', dni: 81112222, surname: 'LL', age: 78 , gender: 'female', address: 'Barcelona', phone: 123123123}

        beforeEach(() =>
            Patient.create(patient1)
                .then(() => Patient.create(patient2))
                .then(() => Patient.create(patient3))
                .then(() => Patient.create(patient4))
                .then(() => Patient.create(patient5))
        )

        true && it('should succeed on correct data', () => {

            const name = 'Juana'

            return logic.searchPatients(name)
                .then(patients => {
                    expect(patients[0].name).to.equal(patient3.name)
                    expect(patients[0].dni).to.equal(patient3.dni)
                    expect(patients[0].surname).to.equal(patient3.surname)
                    expect(patients[0].age).to.equal(patient3.age)
                    expect(patients[0].gender).to.equal(patient3.gender)
                    expect(patients[0].address).to.equal(patient3.address)
                    expect(patients[0].phone).to.equal(patient3.phone)

                    expect(patients[1].name).to.equal(patient5.name)
                    expect(patients[1].dni).to.equal(patient5.dni)
                    expect(patients[1].surname).to.equal(patient5.surname)
                    expect(patients[1].age).to.equal(patient5.age)
                    expect(patients[1].gender).to.equal(patient5.gender)
                    expect(patients[1].address).to.equal(patient5.address)
                    expect(patients[1].phone).to.equal(patient5.phone)
                })
        })

        it('should fail on trying to register with an undefined name', () =>
            logic.searchPatients(undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to register with an empty name', () =>
            logic.searchPatients('')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to register with a numeric name', () =>
            logic.searchPatients(123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )
    })

    true && describe('add treatment', () => {

        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const dni = 12345678

        const pill = 'atarax'
        const quantity = '3'
        const frequency = 'mondays, fridays'

        beforeEach(() => Patient.create(patient))

        it('should succeed on correct data', () =>
            Patient.findOne({ dni })
                    .then(patient => {
                        expect(patient).to.exist

                        return logic.addTreatment(dni, pill, quantity, frequency)
                    })
                    .then(res => {
                        expect(res).to.be.true

                        return Patient.findOne({ dni })
                    })
                    .then(patient => {
                        expect(patient.treatments.length).to.equal(1)
                        
                        const { treatments } = patient

                        expect(treatments[0].pill).to.equal(pill)
                        expect(treatments[0].quantity).to.equal(quantity)
                        expect(treatments[0].frequency).to.equal(frequency)
                    })
        )
    })

    true && describe('remove treatment', () => {
        let treatmentsList

        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const dni = 12345678

        beforeEach(() => {
            treatmentsList = [
                { pill: 'Atarax', quantity: '3', frequency: 'monday, thursday'},
                { pill: 'Nolotil', quantity: '1', frequency: 'monday, wednesday'},
                { pill: 'Ebastina', quantity: '2', frequency: 'friday, sunday'}
            ]

            return Patient.create(patient)
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

        it('should remove treatment correctly', () => {
            const treatmentRemove = treatmentsList[2]

            return logic.removeTreatment(dni, treatmentRemove)
                .then(res => {
                    expect(res).to.be.true
                })
        })
    })

    true && describe('list treatements by patient dni', () => {

        let treatmentsList

        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const dni = 12345678

        beforeEach(() => {
            treatmentsList = [
                { pill: 'Atarax', quantity: '3', frequency: 'monday, thursday'},
                { pill: 'Nolotil', quantity: '1', frequency: 'monday, wednesday'},
                { pill: 'Ebastina', quantity: '2', frequency: 'friday, sunday'}
            ]

            return Patient.create(patient)
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

        it('should succeed on correct data', () => 
            logic.listTreatments(dni)
                .then(treatments => {
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
    })

    true && describe('add cite', () => {

        const name = `cite${Math.random()}`
        const date = new Date()

        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const code = `123A${Math.random()}`
        const password = `12-${Math.random()}`

        beforeEach(() => 
            Doctor.create({ code, password })
                .then(() => Patient.create(patient))
        )

        it('should succeed on correct data', () => {

            const { dni } = patient

            return logic.addCite(code, dni, name, date)
                .then(res => {
                    expect(res).to.be.true

                    return Cite.findOne({ date })
                })
                .then(cite => {
                    expect(cite.doctor).to.exist
                    expect(cite.patient).to.exist
                    expect(cite.name).to.equal(name)
                    expect(cite.date).to.deep.equal(date)

                    return logic.addCite(code, dni, name, date)
                })
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`cite with ${date} date already exist`))
        })
    })

    true && describe('remove cite', () => {

        const name = `cite${Math.random()}`
        const date = new Date()

        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const code = `123A${Math.random()}`
        const password = `12-${Math.random()}`
        const { dni } = patient

        beforeEach(() => 
            Doctor.create({ code, password })
                .then(doctor => {
                    return Patient.create(patient)
                        .then(patient => Cite.create({name, date, doctor: doctor.id, patient: patient.id}))
                })
        )

        it('should succeed on correct data', () => 
            logic.removeCite(code, dni, name, date)
                .then(res => expect(res).to.be.true)
        )
    })

    true && describe('list cite by date', () => {

        let cites

        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const code = `123A${Math.random()}`
        const password = `12-${Math.random()}`
        const { dni } = patient

        beforeEach(() => 
            Doctor.create({ code, password })
                .then(doctor => {
                    return Patient.create(patient)
                        .then(patient => {
                            cites = [
                                {name: 'cite1', date: new Date(), doctor: doctor.id, patient: patient.id},
                                {name: 'cite2', date: new Date(), doctor: doctor.id, patient: patient.id},
                                {name: 'cite3', date: new Date(), doctor: doctor.id, patient: patient.id},
                                {name: 'cite4', date: new Date(), doctor: doctor.id, patient: patient.id}
                            ]
                            
                            return Cite.create(cites)
                        })
                })
        )

        it('should succeed on correct data', () => 
            logic.listCites(code, dni, cites[0].date)
                .then(resultedCites => {
                    expect(resultedCites[0].doctor).to.exist
                    expect(resultedCites[0].patient).to.exist
                    expect(resultedCites[0].name).to.exist
                    expect(resultedCites[0].date).to.exist
                })
        )
    })

    true && describe('register caretaker', () => {

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

    true && describe('authenticate caretaker', () => {

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

    after(() =>
        Promise.all([Doctor.deleteMany(), Patient.deleteMany(), Caretaker.deleteMany(), Treatment.deleteMany(), Cite.deleteMany()])
            .then(() => _connection.disconnect())
    )
})