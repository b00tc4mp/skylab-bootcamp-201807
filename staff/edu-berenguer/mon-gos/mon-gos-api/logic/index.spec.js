require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose
const { Shelter, Dog } = require('../data/models')

const { env: { MONGO_URL } } = process

describe('logic', () => {
    const email = `edu-${Math.random()}@mail.com`
    const password = `123-${Math.random()}`
    const name = `Animal sense sostre ${Math.random()}`
    const adress = `bilbao ${Math.random()}`
    const phone = `123-${Math.random()}`
    const latitude = 12.3234
    const longitude = 34.4433
    let _connection

    before(() =>
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )
    beforeEach(() =>
        Promise.all([
            Shelter.deleteMany(),
            Dog.deleteMany()
        ]))
    after(() => {
        // Promise.all([
        //     Shelter.deleteMany(),
        //     Dog.deleteMany()
        // ])
        _connection.disconnect()
    })

    true && describe('validate fields', () => {
        it('should succeed on correct value', () => {
            expect(() => logic._validateStringField('email', email).to.equal(email))
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

    true && describe('register user', () => {
        it('should register correctly', () =>
            Shelter.findOne({ email })
                .then(shelter => {
                    expect(shelter).to.be.null

                    return logic.register(email, name, adress, phone, password, latitude, longitude)
                })
                .then(res => {

                    expect(res).to.be.true

                    return Shelter.findOne({ email })
                })
                .then(shelter => {
                    expect(shelter).to.exist
                    expect(shelter.email).to.equal(email)
                    expect(shelter.password).to.equal(password)

                    return Shelter.find()
                })
                .then(shelters => expect(shelters.length).to.equal(1))
        )

        it('should fail on trying to register an already registered user', () =>
            Shelter.create({ email, name, adress, phone, password, latitude, longitude })
                .then(() => logic.register(email, name, adress, phone, password, latitude, longitude))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`shelter with ${email} email already exist`))
        )

        it('should fail on trying to register with an undefined email', () =>
            logic.register(undefined, name, adress, phone, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with an empty email', () =>
            logic.register('', name, adress, phone, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with a numeric email', () =>
            logic.register(123, name, adress, phone, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.register(email, name, adress, phone, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.register(email, name, adress, phone, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.register(email, name, adress, phone, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
        it('should fail on trying to register with a empty name', () =>
            logic.register(email, '', adress, phone, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )
        it('should fail on trying to register with a empty adress', () =>
            logic.register(email, name, '', phone, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid adress`))
        )
        it('should fail on trying to register with a empty phone', () =>
            logic.register(email, name, adress, '', 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )
        it('should fail on trying to register with a undefined name', () =>
            logic.register(email, undefined, adress, phone, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )
        it('should fail on trying to register with a undefined adress', () =>
            logic.register(email, name, undefined, phone, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid adress`))
        )
        it('should fail on trying to register with a undefined phone', () =>
            logic.register(email, name, adress, undefined, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )

    })
    true && describe('authenticate shelter', () => {
        beforeEach(() => Shelter.create({ email, name, adress, phone, password }))

        it('should login correctly', () =>
            logic.authenticate(email, password)
                .then(res => {
                    expect(res).to.be.true
                })
        )

        it('should fail on trying to login with an undefined email', () =>
            logic.authenticate(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to login with an empty email', () =>
            logic.authenticate('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to login with a numeric email', () =>
            logic.authenticate(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to login with an undefined password', () =>
            logic.authenticate(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login with an empty password', () =>
            logic.authenticate(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login with a numeric password', () =>
            logic.authenticate(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })
    true && describe('insert dog', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 1
        const weight = 10
        const photo = 'http://www.google.es/imagenes/dog.jpg'
        const description = 'bla bla bla bla'

        beforeEach(() => Shelter.create({ email, name, adress, phone, password }))

        it('should succeed on correct value', () => {
            expect(() => logic._validateStringField('email', email).to.equal(email))
            expect(() => logic._validateStringField('password', password).to.equal(password))
        })

        it('should succeed on correct data', () =>

            logic.insertDog(email, name, gender, age, weight, photo, description)
                .then(res => {
                    expect(res).to.exist

                    return Shelter.findOne({ email })
                })
                .then(shelter => {
                    return Dog.find({ shelter: shelter.id })
                })
                .then(dogs => {
                    expect(dogs.length).to.equal(1)

                    const [dog] = dogs

                    expect(dog.name).to.equal(name)
                    expect(dog.gender).to.equal(gender)
                    expect(dog.age).to.equal(age)
                    expect(dog.weight).to.equal(weight)
                    expect(dog.description).to.equal(description)
                })
        )
        it('should succeed on correct data', () =>
            logic.insertDog(email, name, gender, age, weight, photo, description)
                .then(res => {
                    expect(res).to.be.exist

                    return Shelter.findOne({ email })
                })
                .then(shelter => {
                    return Dog.find({ shelter: shelter.id })
                })

        )
        it('should fail on trying to login with a empty name', () =>
            logic.insertDog(email, '', gender, age, weight, photo, description)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )
        it('should fail on trying to login with a empty gender', () =>
            logic.insertDog(email, name, '', age, weight, photo, description)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )
        it('should fail on trying to login with a empty age', () =>
            logic.insertDog(email, name, gender, '123', weight, photo, description)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )
        it('should fail on trying to login with a empty weight', () =>
            logic.insertDog(email, name, gender, age, '', photo, description)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid weight`))
        )
        it('should fail on trying to login with a empty weight', () =>
            logic.insertDog(email, name, gender, age, weight, photo, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid description`))
        )
        it('should fail on trying to login with a empty name', () =>
            logic.insertDog(email, undefined, gender, age, weight, photo, description)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )
        it('should fail on trying to login with a empty gender', () =>
            logic.insertDog(email, name, undefined, age, weight, photo, description)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )
        it('should fail on trying to login with a empty age', () =>
            logic.insertDog(email, name, gender, undefined, weight, photo, description)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )
        it('should fail on trying to login with a empty weight', () =>
            logic.insertDog(email, name, gender, age, undefined, photo, description)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid weight`))
        )
        it('should fail on trying to login with a empty weight', () =>
            logic.insertDog(email, name, gender, age, weight, photo, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid description`))
        )
    })

    true && describe('list dogs not adopteds', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 2.3
        const weight = 12
        const photo = 'http://www.google.es/imagenes/dog.jpg'
        const description = 'bla bla bla bla'

        beforeEach(() => {
            return Shelter.create({ email, name, adress, phone, password })
                .then(() => {
                    return Shelter.findOne({ email })
                })
                .then(shelter => {
                    return Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })

                })
        })

        it('should list all dogs not adopteds', () => {
            return logic.listDogsNotAdopteds()
                .then(dogs => {
                    expect(dogs.length).to.equal(1)
                    expect(dogs[0]._doc.name).to.equal(name)
                    expect(dogs[0]._doc.gender).to.equal(gender)
                    expect(dogs[0]._doc.age).to.equal(age)
                    expect(dogs[0]._doc.weight).to.equal(weight)
                    expect(dogs[0]._doc.description).to.equal(description)
                })

        })
    })

    true && describe('dog adopted', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 1.2
        const weight = 10
        const photo = 'http://www.google.es/imagenes/dog.jpg'
        const description = 'bla bla bla bla'
        let dogId

        beforeEach(() => {
            return Shelter.create({ email, name, adress, phone, password, latitude, longitude })
                .then(() => {
                    return Shelter.findOne({ email })
                })
                .then(shelter => {
                    Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                    return Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                })
                .then(res => {
                    return dogId = res._doc._id.toString()
                })
        })
        it('should update dog adopted by id', () => {
            return logic.dogAdopted(email, dogId)
                .then(res => {
                    expect(res).to.be.true
                })
        })
    })

    true && describe('list dogs adopteds', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 1.6
        const weight = 12
        const photo = 'http://www.google.es/imagenes/dog.jpg'
        const description = 'bla bla bla bla'
        let dogId

        beforeEach(() => {
            return Shelter.create({ email, name, adress, phone, password, latitude, longitude })
                .then(() => {
                    return Shelter.findOne({ email })
                })
                .then(shelter => {
                    Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                    return Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                })
                .then(res => {
                    dogId = res._doc._id.toString()
                    return logic.dogAdopted(email, dogId);
                })
        })

        it('should list all dogs adopteds', () => {
            return logic.listDogsAdopteds()
                .then(dogs => {
                    expect(dogs.length).to.equal(1)
                    expect(dogs[0]._doc.name).to.equal(name)
                    expect(dogs[0]._doc.gender).to.equal(gender)
                    expect(dogs[0]._doc.age).to.equal(age)
                    expect(dogs[0]._doc.weight).to.equal(weight)
                    expect(dogs[0]._doc.description).to.equal(description)
                })

        })
    })
    true && describe('list dogs by shelter', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 1.6
        const weight = 12
        const photo = 'http://www.google.es/imagenes/dog.jpg'
        const description = 'bla bla bla bla'

        beforeEach(() => {
            return Shelter.create({ email, name, adress, phone, password, latitude, longitude })
                .then(() => {
                    return Shelter.findOne({ email })
                })
                .then(shelter => {
                    Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                    return Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                })
        })
        it('should list all dogs by shelter', () => {
            return logic.listDogsByShelter(email)
                .then(dogs => {
                    expect(dogs.length).to.equal(2)
                    expect(dogs[0]._doc.name).to.equal(name)
                    expect(dogs[1]._doc.name).to.equal(name)
                })
        })
    })

    true && describe('retrieve dog', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 1.6
        const weight = 12
        const photo = 'http://www.google.es/imagenes/dog.jpg'
        const description = 'bla bla bla bla'
        let dogId

        beforeEach(() => {
            return Shelter.create({ email, name, adress, phone, password, latitude, longitude })
                .then(() => {
                    return Shelter.findOne({ email })
                })
                .then(shelter => {
                    Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                    return Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                })
                .then(res => dogId = res._doc._id.toString())
        })
        it('should list all dogs by shelter', () => {
            return logic.retrieveDog(email, dogId)
                .then(dog => {
                    expect(dog.name).to.equal(name)
                    expect(dog.gender).to.equal(gender)
                    expect(dog.age).to.equal(age)
                    expect(dog.weight).to.equal(weight)
                })
        })

    })

    true && describe('remove dog', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 1.6
        const weight = 12
        const photo = 'http://www.google.es/imagenes/dog.jpg'
        const description = 'bla bla bla bla'
        let dogId

        beforeEach(() => {
            return Shelter.create({ email, name, adress, phone, password, latitude, longitude })
                .then(() => {
                    return Shelter.findOne({ email })
                })
                .then(shelter => {
                    return Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                })
                .then(res => dogId = res._doc._id.toString())
        })
        it('should remove dog by id', () => {
            return logic.removeDog(email, dogId)
                .then(dog => {
                    expect(dog).to.be.true
                })
        })

    })
    true && describe('update dog', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 1.6
        const weight = 12
        const photo = 'http://www.google.es/imagenes/dog.jpg'
        const description = 'bla bla bla bla'
        let dogId

        const newName = `pepe-${Math.random()}`
        const newGender = 'male'
        const newAge = 1.6
        const newWeight = 12
        const newPhoto = 'http://www.google.es/imagenes/dog.jpg'
        const newDescription = 'bla bla blu blu'
        const fakeId = '5b851555ef2b9f6f7b63ddfc'
        const fakeMail = 'pepito@gmail.com'

        beforeEach(() => {
            return Shelter.create({ email, name, adress, phone, password, latitude, longitude })
                .then(() => {
                    return Shelter.findOne({ email })
                })
                .then(shelter => {
                    return Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                })
                .then(res => dogId = res._doc._id.toString())
        })

        it('should update dog by id', () => {
            return logic.updateDog(email, dogId, newName, newGender, newAge, newWeight, newPhoto, newDescription)
                .then(dog => {
                    expect(dog).to.be.true
                })
        })
        it('should fail on retrieving a non existing dog', () => {
            return logic.updateDog(fakeMail, dogId, "ramon", "male", 1, 2.3, "photo", "ble ble")
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`Shelter with ${fakeMail} email does not exist`))
        })
        it('should fail on retrieving a non existing dog', () => {
            return logic.updateDog(email, fakeId, "ramon", "male", 1, 2.3, "photo", "ble ble")
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`Dog with id ${fakeId} does not exist`))
        })
    })

    true && describe('list dog by query', () => {
        const name = `max-${Math.random()}`
        const genderMale = 'male'
        const genderFemale = 'female'
        const age = 1.4
        const ageTest = 8
        const weight = 12
        const weightTest = 7
        const photo = 'http://www.google.es/imagenes/dog.jpg'
        const description = 'bla bla bla bla'

        beforeEach(() => {
            return Shelter.create({ email, name, adress, phone, password, latitude, longitude })
                .then(() => {
                    return Shelter.findOne({ email })
                })
                .then(shelter => {
                    Dog.create({ name, gender: genderFemale, age, weight: weightTest, photo, description, shelter: shelter.id })
                    Dog.create({ name, gender: genderMale, age:ageTest, weight: weightTest, photo, description, shelter: shelter.id })
                    return Dog.create({ name, gender: genderMale, age, weight, photo, description, shelter: shelter.id })
                })
        })

        it('should list dogs by list with gender, age and weight', () => {
            return logic.listDogsByQuery('male', 'joven', 'grande')
                .then(dog => {
                    debugger
                    expect(dog.length).to.be.equal(1)
                })
        })
        it('should list dogs by list with only gender', () => {
            return logic.listDogsByQuery('female')
                .then(dog => {
                    debugger
                    expect(dog.length).to.be.equal(1)
                })
        })
        it('should list dogs by list with gender and weight', () => {
            return logic.listDogsByQuery('female', 'mediano')
                .then(dog => {
                    debugger
                    expect(dog.length).to.be.equal(1)
                })
        })
        it('should list dogs by list with gender and age', () => {
            return logic.listDogsByQuery('female', 'joven')
                .then(dog => {
                    debugger
                    expect(dog.length).to.be.equal(1)
                })
        })
        it('should list dogs by list with gender and age', () => {
            return logic.listDogsByQuery('male', 'senior')
                .then(dog => {
                    debugger
                    expect(dog.length).to.be.equal(1)
                })
        })
        it('should list dogs by list without query', () => {
            return logic.listDogsByQuery()
                .then(dog => {
                    debugger
                    expect(dog.length).to.be.equal(3)
                })
        })
    })
})
