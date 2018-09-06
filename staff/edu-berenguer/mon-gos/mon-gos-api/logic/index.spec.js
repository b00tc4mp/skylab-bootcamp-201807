require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose
const { Shelter, Dog } = require('../data/models')
const fs = require('file-system')
const chunk = require('./test')

const { env: { MONGO_URL } } = process

describe('logic', () => {
    const email = `edu-${Math.random()}@mail.com`
    const password = `123-${Math.random()}`
    const name = `Animal sense sostre ${Math.random()}`
    const address = `bilbao ${Math.random()}`
    const phone = `123-${Math.random()}`
    const latitude = 12.3234
    const longitude = 34.4433
    let _connection, dogId, id
    const fakeId = '5b851555ef2b9f6f7b63ddfc', fakeShelterid = '5b851555ef2b9f6f7b63ddfc'

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
        it('should register correctly', () => {
            Shelter.findOne({ email })
                .then(shelter => {
                    expect(shelter).to.be.null

                    return logic.register(email, name, address, phone, password, latitude, longitude)
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
        })

        it('should fail on trying to register an already registered user', () =>
            Shelter.create({ email, name, address, phone, password, latitude, longitude })
                .then(() => logic.register(email, name, address, phone, password, latitude, longitude))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`shelter with ${email} email already exist`))
        )

        it('should fail on trying to register with an undefined email', () =>
            logic.register(undefined, name, address, phone, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with an empty email', () =>
            logic.register('', name, address, phone, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with a numeric email', () =>
            logic.register(123, name, address, phone, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.register(email, name, address, phone, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.register(email, name, address, phone, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.register(email, name, address, phone, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
        it('should fail on trying to register with a empty name', () =>
            logic.register(email, '', address, phone, '123456')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )
        it('should fail on trying to register with a empty address', () =>
            logic.register(email, name, '', phone, '123456')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid address`))
        )
        it('should fail on trying to register with a empty phone', () =>
            logic.register(email, name, address, '', '123456')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )
        it('should fail on trying to register with a numeric name', () =>
            logic.register(email, 123, address, phone, '123456')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )
        it('should fail on trying to register with a numeric address', () =>
            logic.register(email, name, 123, phone, '123456')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid address`))
        )
        it('should fail on trying to register with a numeric phone', () =>
            logic.register(email, name, address, 123, '123456')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid phone`))
        )
        it('should fail on trying to register with a string latitude', () =>
            logic.register(email, name, address, '123', '123456', '12312', 123.32)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid latitude`))
        )

        it('should fail on trying to register with a string longitude', () =>
            logic.register(email, name, address, '123', '123456', 123.4234, '12.312')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid longitude`))
        )
    })

    true && describe('authenticate shelter', () => {
        beforeEach(() => {
            return Shelter.create({
                email, name, address, phone, password
            })
        })
        it('should login correctly', () =>
            logic.authenticate(email, password)
                .then(res => {
                    expect(res).to.be.exist
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
        const photo = chunk
        const description = 'bla bla bla bla'

        beforeEach(() => {
            return Shelter.create({ email, name, address, phone, password })
                .then(shelter => {
                    id = shelter._id.toString()
                })
        })

        it('should succeed on correct value', () => {
            expect(() => logic._validateStringField('email', email).to.equal(email))
            expect(() => logic._validateStringField('password', password).to.equal(password))
        })

        it('should succeed on correct data', () => {
            logic.insertDog(id, name, gender, age, weight, photo, description)
                .then(res => {
                    expect(res).to.exist
                    return Shelter.findOne({ _id: id })
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
        })
        it('should succeed on correct data', () =>
            logic.insertDog(id, name, gender, age, weight, photo, description)
                .then(res => {
                    expect(res).to.be.exist

                    return Shelter.findOne({ _id: id })
                })
                .then(shelter => {
                    return Dog.find({ shelter: shelter.id })
                })

        )

        it('should fail on no base64Image', () => {
            logic._saveImage("test")
                .catch(({ message }) => expect(message).to.equal('base64Image is not a string'))
        })

        it('should fail on trying to login with a empty name', () =>
            logic.insertDog(id, '', gender, age, weight, photo, description)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )
        it('should fail on trying to login with a empty gender', () =>
            logic.insertDog(id, name, '', age, weight, photo, description)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )
        it('should fail on trying to login with a empty age', () =>
            logic.insertDog(id, name, gender, '123', weight, photo, description)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )
        it('should fail on trying to login with a empty weight', () =>
            logic.insertDog(id, name, gender, age, '', photo, description)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid weight`))
        )
        it('should fail on trying to login with a empty weight', () =>
            logic.insertDog(id, name, gender, age, weight, photo, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid description`))
        )
        it('should fail on trying to login with a empty name', () =>
            logic.insertDog(id, undefined, gender, age, weight, photo, description)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )
        it('should fail on trying to login with a empty gender', () =>
            logic.insertDog(id, name, undefined, age, weight, photo, description)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid gender`))
        )
        it('should fail on trying to login with a empty age', () =>
            logic.insertDog(id, name, gender, undefined, weight, photo, description)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid age`))
        )
        it('should fail on trying to login with a empty weight', () =>
            logic.insertDog(id, name, gender, age, undefined, photo, description)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid weight`))
        )
        it('should fail on trying to login with a empty weight', () =>
            logic.insertDog(id, name, gender, age, weight, photo, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid description`))
        )
    })

    true && describe('list dogs not adopteds', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 2.3
        const weight = 12
        const photo = chunk
        const description = 'bla bla bla bla'

        beforeEach(() => {
            return Shelter.create({ email, name, address, phone, password })
                .then(shelter => {
                    return id = shelter.id
                })
                .then(id => {
                    return Shelter.findOne({ _id: id })
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
        const photo = chunk
        const description = 'bla bla bla bla'

        beforeEach(() => {
            return Shelter.create({ email, name, address, phone, password, latitude, longitude })
                .then(shelter => {
                    return id = shelter.id
                })
                .then(() => {
                    return Shelter.findOne({ _id: id })
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
            return logic.dogAdopted(id, dogId)
                .then(res => {
                    expect(res).to.be.true
                })
        })
    })

    true && describe('dog Not adopted', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 1.2
        const weight = 10
        const photo = chunk
        const description = 'bla bla bla bla'
        const adopted = true

        beforeEach(() => {
            return Shelter.create({ email, name, address, phone, password, latitude, longitude })
                .then(shelter => {
                    return id = shelter.id
                })
                .then(() => {
                    return Shelter.findOne({ _id: id })
                })
                .then(shelter => {
                    Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                    return Dog.create({ name, gender, age, weight, photo, description, adopted, shelter: shelter.id })
                })
                .then(res => {
                    return dogId = res._doc._id.toString()
                })
        })
        it('should update dog adopted by id', () => {
            return logic.dogNotAdopted(id, dogId)
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
        const photo = chunk
        const description = 'bla bla bla bla'



        beforeEach(() => {
            return Shelter.create({ email, name, address, phone, password, latitude, longitude })
                .then(shelter => {
                    return id = shelter.id
                })
                .then(() => {
                    return Shelter.findOne({ _id: id })
                })
                .then(shelter => {
                    Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                    return Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                })
                .then(res => {
                    dogId = res._doc._id.toString()
                    return logic.dogAdopted(id, dogId);
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
        const photo = chunk
        const description = 'bla bla bla bla'

        beforeEach(() => {
            return Shelter.create({ email, name, address, phone, password, latitude, longitude })
                .then(shelter => {
                    return id = shelter.id
                })
                .then(() => {
                    return Shelter.findOne({ _id: id })
                })
                .then(shelter => {
                    Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                    return Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                })
        })
        it('should list all dogs by shelter', () => {
            return logic.listDogsByShelter(id)
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
        const photo = chunk
        const description = 'bla bla bla bla'

        beforeEach(() => {
            return Shelter.create({ email, name, address, phone, password, latitude, longitude })
                .then(shelter => {
                    return id = shelter.id
                })
                .then(() => {
                    return Shelter.findOne({ _id: id })
                })
                .then(shelter => {
                    Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                    return Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                })
                .then(res => {
                    return dogId = res._doc._id.toString()
                })
        })
        it('should list all dogs by shelter', () => {
            return logic.retrieveDog(dogId)
                .then(dog => {
                    expect(dog.name).to.equal(name)
                    expect(dog.gender).to.equal(gender)
                    expect(dog.age).to.equal(age)
                    expect(dog.weight).to.equal(weight)
                })
        })
    })

    true && describe('retrieve shelter', () => {

        beforeEach(() => {
            return Shelter.create({ email, name, address, phone, password, latitude, longitude })
                .then(shelter => {
                    return id = shelter.id
                })
        })

        it('should shelter by id', () => {
            return logic.retrieveShelter(id)
                .then(shelter => {
                    expect(shelter.name).to.equal(name)
                    expect(shelter.address).to.equal(address)
                    expect(shelter.phone).to.equal(phone)
                    expect(shelter.email).to.equal(email)
                    expect(shelter.latitude).to.equal(latitude)
                    expect(shelter.longitude).to.equal(longitude)
                })
        })

    })

    true && describe('remove dog', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 1.6
        const weight = 12
        const photo = chunk
        const description = 'bla bla bla bla'

        beforeEach(() => {
            return Shelter.create({ email, name, address, phone, password, latitude, longitude })
                .then(shelter => {
                    return id = shelter.id
                })
                .then(() => {
                    return Shelter.findOne({ email })
                })
                .then(shelter => {
                    return Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                })
                .then(res => dogId = res._doc._id.toString())
        })
        it('should remove dog by id', () => {
            return logic.removeDog(id, dogId)
                .then(dog => {
                    expect(dog).to.be.true
                })
        })
        it('should fail on remove a non existing dog', () => {
            return logic.removeDog(id, fakeId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`Dog with id ${fakeId} does not exist`))
        })
        it('should fail on remove a non existing dog', () => {
            return logic.removeDog(fakeShelterid, fakeId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`Shelter with ${fakeShelterid} id does not exist`))
        })

    })
    true && describe('update dog', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 1.6
        const weight = 12
        const photo = chunk
        const description = 'bla bla bla bla'

        const newName = `pepe-${Math.random()}`
        const newGender = 'male'
        const newAge = 1.6
        const newWeight = 12
        const newPhoto = chunk
        const newDescription = 'bla bla blu blu'

        beforeEach(() => {
            return Shelter.create({ email, name, address, phone, password, latitude, longitude })
                .then(shelter => {
                    return id = shelter.id
                })
                .then(id => {
                    return Shelter.findOne({ _id: id })
                })
                .then(shelter => {
                    return Dog.create({ name, gender, age, weight, photo, description, shelter: shelter.id })
                })
                .then(res => dogId = res._doc._id.toString())
        })

        it('should update dog by id', () => {
            return logic.updateDog(id, dogId, newName, newGender, newAge, newWeight, newPhoto, newDescription)
                .then(dog => {
                    expect(dog).to.be.true
                })
        })
        it('should fail on retrieving a non existing shelter', () => {
            return logic.updateDog(fakeShelterid, dogId, "ramon", "male", 1, 2.3, "photo", "ble ble")
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`Shelter with ${fakeShelterid} id does not exist`))
        })
        it('should fail on retrieving a non existing dog', () => {
            return logic.updateDog(id, fakeId, "ramon", "male", 1, 2.3, newPhoto, "ble ble")
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
        const photo = chunk
        const description = 'bla bla bla bla'

        beforeEach(() => {
            return Shelter.create({ email, name, address, phone, password, latitude, longitude })
                .then(shelter => {
                    return id = shelter.id
                })
                .then(() => {
                    return Shelter.findOne({ _id: id })
                })
                .then(shelter => {
                    Dog.create({ name, gender: genderFemale, age, weight: weightTest, photo, description, shelter: shelter.id })
                    Dog.create({ name, gender: genderMale, age: ageTest, weight: weightTest, photo, description, shelter: shelter.id })
                    return Dog.create({ name, gender: genderMale, age, weight, photo, description, shelter: shelter.id })
                })
        })

        it('should list dogs by list with gender, age and weight', () => {
            return logic.listDogsByQuery('male', 'young', 'big')
                .then(dog => {
                    expect(dog.length).to.be.equal(1)
                })
        })
        it('should list dogs by list with only gender', () => {
            return logic.listDogsByQuery('female')
                .then(dog => {
                    expect(dog.length).to.be.equal(1)
                })
        })
        it('should list dogs by list with gender and weight', () => {
            return logic.listDogsByQuery('female', 'medium')
                .then(dog => {
                    expect(dog.length).to.be.equal(1)
                })
        })
        it('should list dogs by list with gender and age', () => {
            return logic.listDogsByQuery('female', 'young')
                .then(dog => {
                    expect(dog.length).to.be.equal(1)
                })
        })
        it('should list dogs by list with gender and age', () => {
            return logic.listDogsByQuery('male', 'senior')
                .then(dog => {
                    expect(dog.length).to.be.equal(1)
                })
        })
        it('should list dogs by list without query', () => {
            return logic.listDogsByQuery()
                .then(dog => {
                    expect(dog.length).to.be.equal(3)
                })
        })
        it('should list dogs by list without query', () => {
            return logic.listDogsByQuery('male')
                .then(dog => {
                    expect(dog.length).to.be.equal(2)
                })
        })
    })
})

