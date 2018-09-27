require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const { mongoose, models: { Doctor, Patient, Cite, Caretaker, Treatment, Admin } } = require('reminder-data')

const { env: { MONGO_URL } } = process

describe('logic', () => {
    let _connection

    before(() =>
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )

    beforeEach(() => Promise.all([Doctor.deleteMany(), Patient.deleteMany(), Treatment.deleteMany(), Cite.deleteMany(), Caretaker.deleteMany(), Admin.deleteMany()]))

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

    // DOCTOR

    true && describe('authenticate doctor', () => {

        const code = `123A${Math.random()}`
        const password = `12-${Math.random()}`

        beforeEach(() => Doctor.create({ code, password }))

        it('should authenticate correctly', () =>
            logic.authenticateDoctor(code, password)
                .then(doctor => {
                    expect(doctor.code).to.equal(code)
                    expect(doctor.password).to.equal(password)
                    expect(doctor.id).to.exist
                })
        )

        it('should fail on authenticatin with wrong code', () => {

            const falseCode = '123B'

            return logic.authenticateDoctor(falseCode, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`there is no matches with code ${falseCode}`))
        })

        it('should fail on authenticatin with wrong password', () => {

            const wrongPassword = '12345'

            return logic.authenticateDoctor(code, wrongPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`wrong password`))
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

    // PATIENT

    true && describe('return patient data', () => {

        const patient1 = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const dni = 12345678

        beforeEach(() => 
            Patient.create(patient1)
        )

        it('should be return correctly the patient data', () => 
            logic.patientData(dni)
                .then(patient => {
                    expect(patient).to.exist
                    expect(patient.name).to.equal(patient1.name)
                    expect(patient.surname).to.equal(patient1.surname)
                    expect(patient.dni).to.equal(patient1.dni)
                    expect(patient.age).to.equal(patient1.age)
                    expect(patient.gender).to.equal(patient1.gender)
                    expect(patient.address).to.equal(patient1.address)
                    expect(patient.phone).to.equal(patient1.phone)
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

        const patient1 = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const patient2 = { name: 'Laura', dni: 12345677, surname: 'Lala', age: 78 , gender: 'female', address: 'Barcelona', phone: 123123123}
        const patient3 = { name: 'Juana', dni: 33334444, surname: 'JJ', age: 78 , gender: 'female', address: 'Barcelona', phone: 123123123}
        const patient4 = { name: 'Gorka', dni: 12345675, surname: 'Pala', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}

        beforeEach(() =>
            Patient.create(patient1)
                .then(() => Patient.create(patient2))
                .then(() => Patient.create(patient3))
                .then(() => Patient.create(patient4))
        )

        true && it('should succeed on correct data', () => 
            logic.listPatients()
                .then(patients => {
                    expect(patients[0].name).to.equal(patient1.name)
                    expect(patients[0].dni).to.equal(patient1.dni)
                    expect(patients[0].surname).to.equal(patient1.surname)
                    expect(patients[0].age).to.equal(patient1.age)
                    expect(patients[0].gender).to.equal(patient1.gender)
                    expect(patients[0].address).to.equal(patient1.address)
                    expect(patients[0].phone).to.equal(patient1.phone)

                    expect(patients[1].name).to.equal(patient2.name)
                    expect(patients[1].dni).to.equal(patient2.dni)
                    expect(patients[1].surname).to.equal(patient2.surname)
                    expect(patients[1].age).to.equal(patient2.age)
                    expect(patients[1].gender).to.equal(patient2.gender)
                    expect(patients[1].address).to.equal(patient2.address)
                    expect(patients[1].phone).to.equal(patient2.phone)

                    expect(patients[2].name).to.equal(patient3.name)
                    expect(patients[2].dni).to.equal(patient3.dni)
                    expect(patients[2].surname).to.equal(patient3.surname)
                    expect(patients[2].age).to.equal(patient3.age)
                    expect(patients[2].gender).to.equal(patient3.gender)
                    expect(patients[2].address).to.equal(patient3.address)
                    expect(patients[2].phone).to.equal(patient3.phone)

                    expect(patients[3].name).to.equal(patient4.name)
                    expect(patients[3].dni).to.equal(patient4.dni)
                    expect(patients[3].surname).to.equal(patient4.surname)
                    expect(patients[3].age).to.equal(patient4.age)
                    expect(patients[3].gender).to.equal(patient4.gender)
                    expect(patients[3].address).to.equal(patient4.address)
                    expect(patients[3].phone).to.equal(patient4.phone)
                })
        )
    })

    // TREATMENT

    true && describe('add treatment', () => {

        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const dni = 12345678

        const pill = 'atarax'
        const quantity = '3'
        const frequency = 'mondays, fridays'

        let id

        beforeEach(() => 
            Patient.create(patient)
                .then(patientCreated => {
                    id = patientCreated.id
                    
                    return true
                })
        )

        it('should add treatment correctly', () =>
            Patient.findOne({ dni })
                    .then(patient => {
                        expect(patient).to.exist

                        return logic.addTreatment(id, dni, pill, quantity, frequency)
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

        it('should update treatment parametres correctly if it already exist', () => {

            const newQuantity = '1'
            const newFrequency = 'tuesday, sunday'

            return Patient.findOne({ dni })
                    .then(patient => {
                        expect(patient).to.exist

                        return logic.addTreatment(id, dni, pill, newQuantity, newFrequency)
                    })
                    .then(res => {
                        expect(res).to.be.true

                        return Patient.findOne({ dni })
                    })
                    .then(patient => {
                        expect(patient.treatments.length).to.equal(1)
                        
                        const { treatments } = patient

                        expect(treatments[0].pill).to.equal(pill)
                        expect(treatments[0].quantity).to.equal(newQuantity)
                        expect(treatments[0].frequency).to.equal(newFrequency)
                    })
        })
        
        it('should add a treatment existing another different already', () => {

            const pill2 = 'nolotil'
            const quantity2 = '1'
            const frequency2 = 'tuesday, sunday'

            return Patient.findOne({ dni })
                    .then(patient => {
                        expect(patient).to.exist

                        return logic.addTreatment(id, dni, pill, quantity, frequency)
                    })
                    .then(res => {
                        expect(res).to.be.true

                        return logic.addTreatment(id, dni, pill2, quantity2, frequency2)
                    })
                    .then(res => {
                        expect(res).to.be.true

                        return Patient.findOne({ dni })
                    })
                    .then(patient => {
                        expect(patient.treatments.length).to.equal(2)
                        
                        const { treatments } = patient

                        expect(treatments[0].pill).to.equal(pill)
                        expect(treatments[0].quantity).to.equal(quantity)
                        expect(treatments[0].frequency).to.equal(frequency)

                        expect(treatments[1].pill).to.equal(pill2)
                        expect(treatments[1].quantity).to.equal(quantity2)
                        expect(treatments[1].frequency).to.equal(frequency2)
                    })
        })
        
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
        let treatmentsList

        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const dni = 12345678
        const pill = 'Nolotil'

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

        it('should remove treatment correctly', () => 
            logic.removeTreatment(id, dni, pill)
                .then(res => {
                    expect(res).to.be.true

                    return Patient.find({ dni })
                })
                .then(patientRes => {
                    expect(patientRes[0].treatments[0].pill).to.equal('Atarax')
                    expect(patientRes[0].treatments[0].quantity).to.equal('3')
                    expect(patientRes[0].treatments[0].frequency).to.equal('monday, thursday')

                    expect(patientRes[0].treatments[1].pill).to.equal('Ebastina')
                    expect(patientRes[0].treatments[1].quantity).to.equal('2')
                    expect(patientRes[0].treatments[1].frequency).to.equal('friday, sunday')
                })
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

    // CITES

    true && describe('add cite', () => {

        const name = `cite${Math.random()}`
        const date = new Date()

        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const code = `123A${Math.random()}`
        const password = `12-${Math.random()}`
        const dni = 12345678

        beforeEach(() => 
            Doctor.create({ code, password })
                .then(() => Patient.create(patient))
        )

        it('should add cite correctly', () => 
            logic.addCite(code, dni, name, date)
                .then(cite => {
                    expect(cite.doctor).to.exist
                    expect(cite.patient).to.exist
                    expect(cite.name).to.equal(name)
                    expect(cite.date).to.deep.equal(date)
                })
        )

        it('should fail on trying to add a cite with a doctor who does not exist', () => {

            const falseCode = '123V'

            return logic.addCite(falseCode, dni, name, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`doctor with ${falseCode} code does not exist`))
        })

        it('should fail on trying to add a cite to a patient who does not exist', () => {

            const falseDni = 11110000

            return logic.addCite(code, falseDni, name, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`patient with ${falseDni} dni does not exist`))
        })

        it('should fail on adding an already existing cite', () => 
            logic.addCite(code, dni, name, date)
                .then(cite => {
                    expect(cite.doctor).to.exist
                    expect(cite.patient).to.exist
                    expect(cite.name).to.equal(name)
                    expect(cite.date).to.deep.equal(date)

                    return logic.addCite(code, dni, name, date)
                })
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`cite with ${date} date already exist`))
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

        it('should remove cite correctly', () => 
            logic.removeCite(code, dni, name, date)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on trying to add a cite with a doctor who does not exist', () => {

            const falseCode = '123V'

            return logic.removeCite(falseCode, dni, name, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`doctor with ${falseCode} code does not exist`))
        })

        it('should fail on trying to add a cite to a patient who does not exist', () => {

            const falseDni = 11110000

            return logic.removeCite(code, falseDni, name, date)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`patient with ${falseDni} dni does not exist`))
        })

        it('should throw error on removing an not existing cite', () =>  
            logic.removeCite(code, dni, name, date)
                .then(res => {
                    expect(res).to.be.true
                    
                    return logic.removeCite(code, dni, name, date)
                })
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`cite with ${date} date does not exist`))
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

        let cites

        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const code = `123A${Math.random()}`
        const password = `12-${Math.random()}`

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

        it('should list cites correctly', () => 
            logic.listCites(cites[0].date)
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
            logic.listPatientCites(id, cites[0].date)
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

    // CARETAKER

    true && describe('authenticate caretaker', () => {

        const dni = 12345678
        const password = `123-${Math.random()}`

        beforeEach(() => Caretaker.create({ dni, password }))

        it('should authenticate correctly', () =>
            logic.authenticateCaretaker(dni, password)
                .then(caretaker => {
                    expect(caretaker).to.exist
                    expect(caretaker._id).to.exist
                    expect(caretaker.dni).to.equal(dni.toString())
                    expect(caretaker.password).to.equal(password)
                })
        )

        it('should fail on authenticating an non existing caretaker', () => {

            const falsedni = 98765432
            
            return logic.authenticateCaretaker(falsedni, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`caretaker ${falsedni} does not exist`))
        })

        it('should fail on authenticating with a wrong password', () => {

            const falsePassword = `9-${Math.random()}`
            
            return logic.authenticateCaretaker(dni, falsePassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`wrong password`))
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

        it('should fail on trying to authenticate with a numeric dni', () =>
            logic.authenticateCaretaker(123, password)
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

    true && describe('update caretakers password', () => {

        const dni = 12345678
        const password = `123-${Math.random()}`
        const newPassword = `789-${Math.random()}`

        beforeEach(() => Caretaker.create({ dni, password }))
    
        it('should update correctly the password', () =>
            logic.updateCaretakerPassword(dni, password, newPassword)
                .then(res => {
                    expect(res).to.be.true

                    return Caretaker.findOne({ dni })
                })
                .then(caretaker => {
                    expect(caretaker).to.exist
                    expect(caretaker.dni).to.equal(dni.toString())
                    expect(caretaker.password).to.equal(newPassword)
                })
        )

        it('should fail on updating a non existing caretaker', () => {

            const falsedni = 98765432
            
            return logic.updateCaretakerPassword(falsedni, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`caretaker ${falsedni} does not exist`))
        })

        it('should fail on updating with a wrong password', () => {

            const falsePassword = `9-${Math.random()}`
            
            return logic.updateCaretakerPassword(dni, falsePassword, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`wrong password`))
        })
        
        it('should fail on updating old password with the same password', () => {

            const thisNewPassword = password
            
            return logic.updateCaretakerPassword(dni, password, thisNewPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`new password must be different to old password`))
        })

        it('should fail on trying to update caretaker with an undefined dni', () =>
            logic.updateCaretakerPassword(undefined, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to update caretaker with an empty dni', () =>
            logic.updateCaretakerPassword('', password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to update caretaker with a numeric dni', () =>
            logic.updateCaretakerPassword(123, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to update caretaker with an undefined password', () =>
            logic.updateCaretakerPassword(dni, undefined, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update caretaker with an empty password', () =>
            logic.updateCaretakerPassword(dni, '', newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update caretaker with a numeric password', () =>
            logic.updateCaretakerPassword(dni, 123, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update caretaker with an undefined new password', () =>
            logic.updateCaretakerPassword(dni, password, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on trying to update caretaker with an empty new password', () =>
            logic.updateCaretakerPassword(dni, password, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on trying to update caretaker with a numeric new password', () =>
            logic.updateCaretakerPassword(dni, password, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )
    })

    true && describe('caretaker patient', () => {

        const dni = 11223344
        const password = `123-${Math.random()}`
        
        let allPatients = []

        beforeEach(() => {
            
            const patients = [
                { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123},
                { name: 'Jessica', dni: 44554455, surname: 'Saedra', age: 82 , gender: 'female', address: 'Paris', phone: 456456456},
                { name: 'Philips', dni: 22553366, surname: 'Morris', age: 98 , gender: 'male', address: 'Madrid', phone: 789789789}
            ]

            return Promise.all(patients.map(patient => Patient.create(patient)))
                .then(createdPatients => createdPatients.map(patient => patient._id))
                .then(patientIds => 
                    Caretaker.create({ dni, password })
                        .then(caretaker => {
                            caretaker.patients = patientIds
                            return caretaker.save()
                        })
                        .then(caretaker => {
                            return ids = caretaker.patients.map(patient => patient._id.toString())
                        })
                        .then(ids => Patient.find({ _id: { $in: ids } }))
                        .then(patients => allPatients = patients)
                )            
        })
    
        it('should return caretaker patient correctly', () =>
            logic.retrieveCaretakerPatients(dni)
                .then(listedPatient => {
                    expect(listedPatient[0].name).to.equal(allPatients[0].name)
                    expect(listedPatient[0].dni).to.equal(allPatients[0].dni)
                    expect(listedPatient[0].surname).to.equal(allPatients[0].surname)
                    expect(listedPatient[0].age).to.equal(allPatients[0].age)
                    expect(listedPatient[0].gender).to.equal(allPatients[0].gender)
                    expect(listedPatient[0].address).to.equal(allPatients[0].address)
                    expect(listedPatient[0].phone).to.equal(allPatients[0].phone)
                    
                    expect(listedPatient[1].name).to.equal(allPatients[1].name)
                    expect(listedPatient[1].dni).to.equal(allPatients[1].dni)
                    expect(listedPatient[1].surname).to.equal(allPatients[1].surname)
                    expect(listedPatient[1].age).to.equal(allPatients[1].age)
                    expect(listedPatient[1].gender).to.equal(allPatients[1].gender)
                    expect(listedPatient[1].address).to.equal(allPatients[1].address)
                    expect(listedPatient[1].phone).to.equal(allPatients[1].phone)

                    expect(listedPatient[2].name).to.equal(allPatients[2].name)
                    expect(listedPatient[2].dni).to.equal(allPatients[2].dni)
                    expect(listedPatient[2].surname).to.equal(allPatients[2].surname)
                    expect(listedPatient[2].age).to.equal(allPatients[2].age)
                    expect(listedPatient[2].gender).to.equal(allPatients[2].gender)
                    expect(listedPatient[2].address).to.equal(allPatients[2].address)
                    expect(listedPatient[2].phone).to.equal(allPatients[2].phone)
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

        it('should fail on trying to return patient with a numeric dni', () =>
            logic.retrieveCaretakerPatients(123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )
    })

    // ADMIN

    true && describe('authenticate admin', () => {

        const code = `123A${Math.random()}`
        const password = `12-${Math.random()}`

        beforeEach(() => Admin.create({ code, password }))

        it('should authenticate correctly', () =>
            logic.authenticateAdmin(code, password)
                .then(admin => {
                    expect(admin.code).to.equal(code)
                    expect(admin.password).to.equal(password)
                    expect(admin.id).to.exist
                })
        )

        it('should fail on authenticating with wrong code', () => {

            const falseCode = '123B'

            return logic.authenticateAdmin(falseCode, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`admin ${falseCode} does not exist`))
        })

        it('should fail on authenticating with wrong password', () => {

            const wrongPassword = '12345'

            return logic.authenticateAdmin(code, wrongPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`wrong password`))
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

        it('should fail on registering an already registered doctor', () => {

            const newCode = code

            return logic.registerDoctor(code, password)
                .then(res => {
                    expect(res).to.be.true

                    return logic.registerDoctor(newCode, password)
                })
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`${newCode} doctor already exist`))
        })

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

    true && describe('remove doctor', () => {

        const code = `maider-${Math.random()}`
        const password = `123-${Math.random()}`

        beforeEach(() => Doctor.create({ code, password }))
    
        it('should remove doctor correctly', () =>
            logic.removeDoctor(code)
                .then(res => {
                    expect(res).to.be.true

                    return Doctor.findOne({ code })
                })
                .then(doctor => {
                    expect(doctor).not.to.exist
                })
        )

        it('should fail on removinging a non existing doctor', () => {

            const falseCode = `pepito-${Math.random()}`
            
            return logic.removeDoctor(falseCode)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`there is no matches with code ${falseCode}`))
        })

        it('should fail on trying to remove with an undefined code', () =>
            logic.removeDoctor(undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to remove with an empty code', () =>
            logic.removeDoctor('')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )

        it('should fail on trying to remove with a numeric code', () =>
            logic.removeDoctor(123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid code`))
        )
    })

    true && describe('return doctor data', () => {

        const code = `maider-${Math.random()}`
        const password = `123-${Math.random()}`

        beforeEach(() => Doctor.create({ code, password }))

        it('should be return correctly the doctor data', () => 
            logic.doctorData(code)
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

        const doctor1 = { code: `1-${Math.random()}`, password: `111-${Math.random()}` }
        const doctor2 = { code: `2-${Math.random()}`, password: `222-${Math.random()}` }
        const doctor3 = { code: `3-${Math.random()}`, password: `333-${Math.random()}` }
        const doctor4 = { code: `4-${Math.random()}`, password: `444-${Math.random()}` }

        beforeEach(() =>
            Doctor.create(doctor1)
                .then(() => Doctor.create(doctor2))
                .then(() => Doctor.create(doctor3))
                .then(() => Doctor.create(doctor4))
        )

        true && it('should succeed on correct data', () => 
            logic.listDoctors()
                .then(doctors => {
                    expect(doctors[0].name).to.equal(doctor1.name)
                    expect(doctors[0].dni).to.equal(doctor1.dni)

                    expect(doctors[1].name).to.equal(doctor2.name)
                    expect(doctors[1].dni).to.equal(doctor2.dni)

                    expect(doctors[2].name).to.equal(doctor3.name)
                    expect(doctors[2].dni).to.equal(doctor3.dni)

                    expect(doctors[3].name).to.equal(doctor4.name)
                    expect(doctors[3].dni).to.equal(doctor4.dni)
                })
        )
    })

    true && describe('add patient', () => {

        const patient = { name: 'John', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}

        const {name, dni, surname, age, gender, address, phone} = patient

        it('should add correctly the given patient', () =>
            Patient.findOne(patient)
                .then(foundPatient => {
                    expect(foundPatient).to.be.null

                    return logic.addPatient(name, dni, surname, age, gender, address, phone)
                })
                .then(foundPatient => {
                    expect(foundPatient).to.exist
                    expect(foundPatient.id).to.exist
                    expect(foundPatient.name).to.equal(name)
                    expect(foundPatient.dni).to.equal(dni)
                    expect(foundPatient.surname).to.equal(surname)
                    expect(foundPatient.age).to.equal(age)
                    expect(foundPatient.gender).to.equal(gender)
                    expect(foundPatient.address).to.equal(address)
                    expect(foundPatient.phone).to.equal(phone)
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

        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const dni = 12345678

        beforeEach(() => Patient.create(patient))

        it('should remove patient correctly', () =>        
            logic.removePatient(dni)
                .then(res =>  expect(res).to.be.true)
        )

        it('should throw error on removing an not existing patient', () =>  
            logic.removePatient(dni)
                .then(res => {
                    expect(res).to.be.true
                    
                    return logic.removePatient(dni)
                })
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`patient with ${dni} dni does not exist`))
        )

        it('should fail on trying to remove a patient with an undefined dni', () =>
            logic.removePatient(undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to remove a patient with an empty dni', () =>
            logic.removePatient('')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to remove a patient with a string dni', () =>
            logic.removePatient('123')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )
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
                .then(res => {
                    expect(res).to.be.true

                    return Patient.findOne({ dni })
                })
                .then(patient => {
                    expect(patient).to.exist
                    expect(patient.address).to.equal(newAddress)
                    expect(patient.phone).to.equal(newPhone)
                })
        )

        it('should fail on updating a patient does not exist', () => {

            const falseDni = 11110000

            return Patient.findOne({ dni })
                .then(patient => {
                    expect(patient).to.exist

                    return logic.updatePatient(falseDni, newAddress, newPhone)
                })
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`patient with ${falseDni} dni does not exist`))
        })

        it('should update new phone correctly if the address given is empty', () =>
            Patient.findOne({ dni })
                    .then(patient => {
                        expect(patient).to.exist

                        return logic.updatePatient(dni, '', newPhone)
                    })
                    .then(res => {
                        expect(res).to.be.true

                        return Patient.findOne({ dni })
                    })
                    .then(patient => {
                        expect(patient).to.exist
                        expect(patient.address).to.equal(patient.address)
                        expect(patient.phone).to.equal(newPhone)
                    })
        )

        it('should update new phone correctly if the address given is undefined', () =>
            Patient.findOne({ dni })
                    .then(patient => {
                        expect(patient).to.exist

                        return logic.updatePatient(dni, undefined, newPhone)
                    })
                    .then(res => {
                        expect(res).to.be.true

                        return Patient.findOne({ dni })
                    })
                    .then(patient => {
                        expect(patient).to.exist
                        expect(patient.address).to.equal(patient.address)
                        expect(patient.phone).to.equal(newPhone)
                    })
        )

        it('should update new address correctly if the phone given is empty', () =>
            Patient.findOne({ dni })
                    .then(patient => {
                        expect(patient).to.exist

                        return logic.updatePatient(dni, newAddress, '')
                    })
                    .then(res => {
                        expect(res).to.be.true

                        return Patient.findOne({ dni })
                    })
                    .then(patient => {
                        expect(patient).to.exist
                        expect(patient.address).to.equal(newAddress)
                        expect(patient.phone).to.equal(patient.phone)
                    })
        )

        it('should update new address correctly if the phone given is undefined', () =>
            Patient.findOne({ dni })
                    .then(patient => {
                        expect(patient).to.exist

                        return logic.updatePatient(dni, newAddress, undefined)
                    })
                    .then(res => {
                        expect(res).to.be.true

                        return Patient.findOne({ dni })
                    })
                    .then(patient => {
                        expect(patient).to.exist
                        expect(patient.address).to.equal(newAddress)
                        expect(patient.phone).to.equal(patient.phone)
                    })
        )

        it('should fail on trying to update a patient with an undefined dni', () =>
            logic.updatePatient(undefined, newAddress, newPhone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to update a patient with an empty dni', () =>
            logic.updatePatient('', newAddress, newPhone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to update a patient with a string dni', () =>
            logic.updatePatient('123', newAddress, newPhone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to update a patient with a numeric address', () =>
            logic.updatePatient(dni, 123, newPhone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new address`))
        )

        it('should fail on trying to update a patient with a string phone', () =>
            logic.updatePatient(dni, newAddress, '12334546')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new phone`))
        )
    })
    
    true && describe('register caretaker', () => {

        const dni = 12345678
        const password = `123-${Math.random()}`
        const name = "Pepe"
        const surname = "Doe"
        const age = 40
        const gender = "male"
        const phone = 654654654
    
        it('should be registered correctly with dni and password', () =>
            Caretaker.findOne({ dni })
                .then(caretaker => {
                    expect(caretaker).not.to.exist

                    return logic.registerCaretaker(dni, password, name, surname, age, gender, phone)
                })
                .then(res => {
                    expect(res).to.be.true

                    return Caretaker.findOne({ dni })
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

        it('should fail on registering an already existing caretaker', () =>
            logic.registerCaretaker(dni, password, name, surname, age, gender, phone)
                .then(res => {
                    expect(res).to.be.true

                    return logic.registerCaretaker(dni, password, name, surname, age, gender, phone)
                })
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`caretaker ${dni} already exist`))
        )

        it('should fail on trying to register with an undefined dni', () =>
            logic.registerCaretaker(undefined, password, name, surname, age, gender, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to register with an empty dni', () =>
            logic.registerCaretaker('', password, name, surname, age, gender, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to register with a numeric dni', () =>
            logic.registerCaretaker(123, password, name, surname, age, gender, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.registerCaretaker(dni, undefined, name, surname, age, gender, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.registerCaretaker(dni, '', name, surname, age, gender, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.registerCaretaker(dni, 123, name, surname, age, gender, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
        
        it('should fail on trying to register with an undefined name', () =>
            logic.registerCaretaker(dni, password, undefined, surname, age, gender, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to register with an empty name', () =>
            logic.registerCaretaker(dni, password, '', surname, age, gender, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to register with a numeric name', () =>
            logic.registerCaretaker(dni, password, 123, surname, age, gender, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to register with an undefined surname', () =>
            logic.registerCaretaker(dni, password, name, undefined, age, gender, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid surname`))
        )

        it('should fail on trying to register with an empty surname', () =>
            logic.registerCaretaker(dni, password, name, '', age, gender, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid surname`))
        )

        it('should fail on trying to register with a numeric surname', () =>
            logic.registerCaretaker(dni, password, name, 123, age, gender, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid surname`))
        )
        
        it('should fail on trying to register with an undefined age', () =>
            logic.registerCaretaker(dni, password, name, surname, undefined, gender, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )

        it('should fail on trying to register with an empty age', () =>
            logic.registerCaretaker(dni, password, name, surname, '', gender, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )

        it('should fail on trying to register with a string age', () =>
            logic.registerCaretaker(dni, password, name, surname, '123', gender, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )
        it('should fail on trying to register with an undefined phone', () =>
            logic.registerCaretaker(dni, password, name, surname, age, gender, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )

        it('should fail on trying to register with an undefined gender', () =>
            logic.registerCaretaker(dni, password, name, surname, age, undefined, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )

        it('should fail on trying to register with an empty gender', () =>
            logic.registerCaretaker(dni, password, name, surname, age, '', phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )

        it('should fail on trying to register with a numeric gender', () =>
            logic.registerCaretaker(dni, password, name, surname, age, 123, phone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )

        it('should fail on trying to register with an empty phone', () =>
            logic.registerCaretaker(dni, password, name, surname, age, gender, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )

        it('should fail on trying to register with a string phone', () =>
            logic.registerCaretaker(dni, password, name, surname, age, gender, '123123123')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )
    })

    true && describe('remove caretaker', () => {

        const dni = 12345678
        const password = `123-${Math.random()}`

        beforeEach(() => Caretaker.create({ dni, password }))
    
        it('should remove caretaker correctly', () =>
            logic.removeCaretaker(dni)
                .then(res => {
                    expect(res).to.be.true

                    return Caretaker.findOne({ dni })
                })
                .then(caretaker => {
                    expect(caretaker).not.to.exist
                })
        )

        it('should fail on unregistering a non existing caretaker', () => {

            const falsedni = 98765432
            
            return logic.removeCaretaker(falsedni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`caretaker ${falsedni} does not exist`))
        })

        it('should fail on trying to unregister with an undefined dni', () =>
            logic.removeCaretaker(undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to unregister with an empty dni', () =>
            logic.removeCaretaker('')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )

        it('should fail on trying to unregister with a string dni', () =>
            logic.removeCaretaker('123')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dni`))
        )
    })

    true && describe('return caretaker data', () => {

        const dni = 12341234
        const password = `123-${Math.random()}`

        beforeEach(() => Caretaker.create({ dni, password }))

        it('should be return correctly the caretaker data', () => 
            logic.caretakerData(dni)
                .then(caretaker => {
                    expect(caretaker).to.exist
                    expect(caretaker.dni).to.equal(dni.toString())
                    expect(caretaker.password).to.equal(password)
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

        const caretaker1 = { dni: 11112222, password: `111-${Math.random()}` }
        const caretaker2 = { dni: 22223333, password: `222-${Math.random()}` }
        const caretaker3 = { dni: 33334444, password: `333-${Math.random()}` }
        const caretaker4 = { dni: 44445555, password: `444-${Math.random()}` }

        beforeEach(() =>
            Caretaker.create(caretaker1)
                .then(() => Caretaker.create(caretaker2))
                .then(() => Caretaker.create(caretaker3))
                .then(() => Caretaker.create(caretaker4))
        )

        true && it('should succeed on correct data', () => 
            logic.listCaretakers()
                .then(caretakers => {
                    expect(caretakers[0].dni).to.equal(caretaker1.dni.toString())
                    expect(caretakers[0].password).to.equal(caretaker1.password)

                    expect(caretakers[1].dni).to.equal(caretaker2.dni.toString())
                    expect(caretakers[1].password).to.equal(caretaker2.password)

                    expect(caretakers[2].dni).to.equal(caretaker3.dni.toString())
                    expect(caretakers[2].password).to.equal(caretaker3.password)

                    expect(caretakers[3].dni).to.equal(caretaker4.dni.toString())
                    expect(caretakers[3].password).to.equal(caretaker4.password)
                })
        )
    })

    true && describe('assign patient to caretaker', () => {

        const caretakerDni = 11223344
        const password = `123-${Math.random()}`
        
        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const patientDni = 12345678

        beforeEach(() => {
            const dni = caretakerDni
            return Caretaker.create({ dni, password })
                .then(() => Patient.create(patient))
        })

        it('should assign correctly patients to caretaker', () => 
            logic.assignPatientToCaretaker(caretakerDni, patientDni)
                .then(res => {
                    expect(res).to.be.true

                    const dni = caretakerDni
                    return Caretaker.findOne({ dni })
                })
                .then(caretaker => {
                    expect(caretaker.patients).to.exist
                    expect(caretaker.patients[0]._id).to.exist
                })
        )

        it('should fail on assigning patients to a non existing caretaker', () => {
            const falseDni = 11220000
            
            return logic.assignPatientToCaretaker(falseDni, patientDni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`caretaker with ${falseDni} dni does not exist`))
        })

        it('should fail on assigning a non existing patient to a caretaker', () => {
            const falseDni = 11220000
            
            return logic.assignPatientToCaretaker(caretakerDni, falseDni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`patient with ${falseDni} dni does not exist`))
        })

        it('should fail on trying to assign with an undefined dni', () =>
            logic.assignPatientToCaretaker(undefined, patientDni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid caretaker dni`))
        )

        it('should fail on trying to assign with an empty dni', () =>
            logic.assignPatientToCaretaker('', patientDni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid caretaker dni`))
        )

        it('should fail on trying to assign with a string dni', () =>
            logic.assignPatientToCaretaker('123', patientDni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid caretaker dni`))
        )

        it('should fail on trying to assign with an undefined dni', () =>
            logic.assignPatientToCaretaker(caretakerDni, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid patient dni`))
        )

        it('should fail on trying to assign with an empty dni', () =>
            logic.assignPatientToCaretaker(caretakerDni, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid patient dni`))
        )

        it('should fail on trying to assign with a string dni', () =>
            logic.assignPatientToCaretaker(caretakerDni, '123')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid patient dni`))
        )
    })

    true && describe('unassign patient to caretaker', () => {

        const caretakerDni = 11223344
        const password = `123-${Math.random()}`
        
        const patient = { name: 'Pepe', dni: 12345678, surname: 'Doe', age: 78 , gender: 'male', address: 'Barcelona', phone: 123123123}
        const patientDni = 12345678

        beforeEach(() => {
            const dni = caretakerDni
            return Caretaker.create({ dni, password })
                .then(() => Patient.create(patient))
        })

        it('should unassign correctly patients to caretaker', () => 
            logic.assignPatientToCaretaker(caretakerDni, patientDni)
                .then(res => {
                    expect(res).to.be.true

                    const dni = caretakerDni
                    return Caretaker.findOne({ dni })
                })
                .then(caretaker => {
                    expect(caretaker.patients).to.exist
                    expect(caretaker.patients[0]._id).to.exist
                    
                    return logic.unassignPatientToCaretaker(caretakerDni, patientDni)
                })
                .then(res => expect(res).to.be.true)
        )

        it('should fail on unassigning patients to a non existing caretaker', () => {
            const falseDni = 11220000
            
            return logic.unassignPatientToCaretaker(falseDni, patientDni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`caretaker with ${falseDni} dni does not exist`))
        })

        it('should fail on unassigning a non existing patient to a caretaker', () => {
            const falseDni = 11220000
            
            return logic.unassignPatientToCaretaker(caretakerDni, falseDni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`patient with ${falseDni} dni does not exist`))
        })

        it('should fail on trying to unassign with an undefined dni', () =>
            logic.unassignPatientToCaretaker(undefined, patientDni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid caretaker dni`))
        )

        it('should fail on trying to unassign with an empty dni', () =>
            logic.unassignPatientToCaretaker('', patientDni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid caretaker dni`))
        )

        it('should fail on trying to unassign with a string dni', () =>
            logic.unassignPatientToCaretaker('123', patientDni)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid caretaker dni`))
        )

        it('should fail on trying to unassign with an undefined dni', () =>
            logic.unassignPatientToCaretaker(caretakerDni, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid patient dni`))
        )

        it('should fail on trying to unassign with an empty dni', () =>
            logic.unassignPatientToCaretaker(caretakerDni, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid patient dni`))
        )

        it('should fail on trying to unassign with a string dni', () =>
            logic.unassignPatientToCaretaker(caretakerDni, '123')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid patient dni`))
        )
    })

    after(() =>
        Promise.all([Doctor.deleteMany(), Patient.deleteMany(), Treatment.deleteMany(), Cite.deleteMany(), Caretaker.deleteMany(), Admin.deleteMany()])
            .then(() => _connection.disconnect())
    )
})