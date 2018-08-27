require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose
const { Features, Property, User } = require('../data/models')

const { env: { MONGO_URL } } = process

describe('logic', () => {
    const email = `nuria-${Math.random()}@mail.com`, password = `123-${Math.random()}`, name = `jhon-${Math.random()}`
    let _connection

    before(() =>
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            Property.deleteMany()
        ])
    )

    true && describe('validate fields', () => {
        it('should succeed on correct value', () => {
            expect(() => logic._validateStringField('email', email).to.equal(email))
            expect(() => logic._validateStringField('password', password).to.equal(password))
            expect(() => logic._validateStringField('name', name).to.equal(name))
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
            User.findOne({ email })
                .then(user => {
                    expect(user).to.be.null

                    return logic.register(email, password, name)
                })
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                    expect(user.name).to.equal(name)

                    return User.find()
                })
                .then(users => expect(users.length).to.equal(1))
        )

        it('should fail on trying to register an already registered user', () =>
            User.create({ email, password, name })
                .then(() => logic.register(email, password, name))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user with ${email} email already exist`))
        )

        it('should fail on trying to register with an undefined email', () =>
            logic.register(undefined, password, name)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with an empty email', () =>
            logic.register('', password, name)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with a numeric email', () =>
            logic.register(123, password, name)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.register(email, undefined, name)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.register(email, '', name)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.register(email, 123, name)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with a undefined name', () =>
            logic.register(email, password, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to register with a empty name', () =>
            logic.register(email, password, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )
        
        it('should fail on trying to register with a numeric name', () =>
            logic.register(email, password, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )
    })

    true && describe('authenticate user', () => {
        beforeEach(() => User.create({ email, password, name }))

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

    true && describe('update user', () => {
        const newPassword = `${password}-${Math.random()}`

        beforeEach(() => User.create({ email, password, name }))

        it('should update password correctly', () =>
            logic.updatePassword(email, password, newPassword)
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(newPassword)
                })
        )

        it('should fail on trying to update password with an undefined email', () =>
            logic.updatePassword(undefined, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update password with an empty email', () =>
            logic.updatePassword('', password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update password with a numeric email', () =>
            logic.updatePassword(123, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update password with an undefined password', () =>
            logic.updatePassword(email, undefined, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update password with an empty password', () =>
            logic.updatePassword(email, '', newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update password with a numeric password', () =>
            logic.updatePassword(email, 123, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update password with an undefined new password', () =>
            logic.updatePassword(email, password, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on trying to update password with an empty new password', () =>
            logic.updatePassword(email, password, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on trying to update password with a numeric new password', () =>
            logic.updatePassword(email, password, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )
    })

    true && describe('unregister user', () => {
        beforeEach(() => User.create({ email, password, name }))

        it('should unregister user correctly', () =>
            logic.unregisterUser(email, password)
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user).not.to.exist
                })
        )

        it('should fail on trying to unregister user with an undefined email', () =>
            logic.unregisterUser(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to unregister user with an empty email', () =>
            logic.unregisterUser('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to unregister user with a numeric email', () =>
            logic.unregisterUser(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to unregister user with an undefined password', () =>
            logic.unregisterUser(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to unregister user with an empty password', () =>
            logic.unregisterUser(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to unregister user with a numeric password', () =>
            logic.unregisterUser(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    true && describe('add property', () => {
        const title = `Amazing Apartment - ${Math.random()}`, description = 'blablabla', dimentions = '300m2', type = 'Apartment', event = 'Movies'

        beforeEach(() => User.create({ email, password, name }))

        it('should succeed on correct data', () =>
            logic.addProperty(email, title, description, dimentions, type, event)
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    return Property.find({ user: user.id })
                })
                .then(property => {
                    expect(property.length).to.equal(1)

                })
        )

        it('should fail on trying to add properties with an undefined email', () =>
            logic.addProperty(undefined, title, description, dimentions, type, event)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add properties with an empty email', () =>
            logic.addProperty('', title, description, dimentions, type, event)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add properties with an numeric email', () =>
            logic.addProperty(123, title, description, dimentions, type, event)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add properties with an undefined title', () =>
            logic.addProperty(email, undefined, description, dimentions, type, event)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid title`))
        )

        it('should fail on trying to add properties with an empty title', () =>
            logic.addProperty(email, '', description, dimentions, type, event)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid title`))
        )

        it('should fail on trying to add properties with an undefined description', () =>
            logic.addProperty(email, title, undefined, dimentions, type, event)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid description`))
        )

        it('should fail on trying to add properties with an empty description', () =>
            logic.addProperty(email, title, '', dimentions, type, event)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid description`))
        )

        it('should fail on trying to add properties with an undefined dimentions', () =>
            logic.addProperty(email, title, description, undefined, type, event)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dimentions`))
        )

        it('should fail on trying to add properties with an empty dimentions', () =>
            logic.addProperty(email, title, description, '', type, event)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dimentions`))
        )

        it('should fail on trying to add properties with an numeric dimentions', () =>
            logic.addProperty(email, title, description, 123, type, event)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dimentions`))
        )

        it('should fail on trying to add properties with an undefined type', () =>
            logic.addProperty(email, title, description, dimentions, undefined, event)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid type`))
        )

        it('should fail on trying to add properties with an empty type', () =>
            logic.addProperty(email, title, description, dimentions, '', event)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid type`))
        )

        it('should fail on trying to add properties with an numeric type', () =>
            logic.addProperty(email, title, description, dimentions, 123, event)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid type`))
        )

        it('should fail on trying to add properties with an undefined event', () =>
            logic.addProperty(email, title, description, dimentions, type, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid event`))
        )

        it('should fail on trying to add properties with an empty event', () =>
            logic.addProperty(email, title, description, dimentions, type, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid event`))
        )

        it('should fail on trying to add properties with an numeric event', () =>
            logic.addProperty(email, title, description, dimentions, dimentions, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid event`))
        )
    })

    true && describe('update property', () => {
        const newTitle = `NewProperty`

        beforeEach(() => Property.create({ title, description, dimentions, type, event, user: user.id }))

        it('should update title correctly', () =>
            logic.updateProperty(email, password, newPassword)
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(newPassword)
                })
        )

        it('should fail on trying to update password with an undefined email', () =>
            logic.updatePassword(undefined, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update password with an empty email', () =>
            logic.updatePassword('', password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update password with a numeric email', () =>
            logic.updatePassword(123, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update password with an undefined password', () =>
            logic.updatePassword(email, undefined, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update password with an empty password', () =>
            logic.updatePassword(email, '', newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update password with a numeric password', () =>
            logic.updatePassword(email, 123, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update password with an undefined new password', () =>
            logic.updatePassword(email, password, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on trying to update password with an empty new password', () =>
            logic.updatePassword(email, password, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on trying to update password with a numeric new password', () =>
            logic.updatePassword(email, password, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )
    })

    // true && describe('list properties', () => {

    //     const properties = [
    //         { title = `Property01`, description = 'blablabla', dimentions = '300m2', type = 'Apartment', event = 'Movies' },
    //         { title = `Property02`, description = 'blablabla', dimentions = '400m2', type = '', event = 'Event Spaces' },
    //         { title = `Property03`, description = 'blablabla', dimentions = '500m2', type = 'Apartment', event = 'Movies' },
    //         { title = `Property04`, description = 'blablabla', dimentions = '200m2', type = 'Penthouse', event = 'Event Spaces' },
    //         { title = `Property05`, description = 'blablabla', dimentions = '100m2', type = 'Apartment', event = 'Movies' }
    //     ]

    //     beforeEach(() =>
    //         new User({ email, password, name }).save()
    //             .then(user => {
    //                 const userId = user.id

    //                 properties.forEach(property => property.user = userId)

    //                 return Property.insertMany(properties)
    //             })
    //             // .then(_notes => notes = _notes.map(note => note._doc))
    //     )

    //     it('should list all user proper', () => {
    //         return logic.listNotes(email, new Date('2018-08-24'))
    //             .then(_notes => {
    //                 const expectedNotes = notes.slice(2)

    //                 expect(_notes.length).to.equal(expectedNotes.length)

    //                 const normalizedNotes = expectedNotes.map(note => {
    //                     note.id = note._id.toString()

    //                     delete note._id

    //                     delete note.user

    //                     delete note.__v

    //                     return note
    //                 })

    //                 expect(_notes).to.deep.equal(normalizedNotes)
    //             })
    //     })
    // })

    after(() =>
        Promise.all([
            // Property.deleteMany(),
            // User.deleteMany()
        ])
            .then(() => _connection.disconnect())
    )
})