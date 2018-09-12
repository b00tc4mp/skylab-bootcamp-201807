require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose
const { Property, Owner } = require('../data/models')

const fileTest = require('./imagesTest/test')

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
            Owner.deleteMany(),
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

    true && describe('register owner', () => {

        it('should register correctly', () =>
            Owner.findOne({ email })
                .then(owner => {
                    expect(owner).to.be.null

                    return logic.register(name, email, password)
                })
                .then(res => {
                    expect(res).to.be.true

                    return Owner.findOne({ email })
                })
                .then(owner => {
                    expect(owner).to.exist
                    expect(owner.email).to.equal(email)
                    expect(owner.password).to.equal(password)
                    expect(owner.name).to.equal(name)

                    return Owner.find()
                })
                .then(owners => expect(owners.length).to.equal(1))
        )

        it('should fail on trying to register an already registered owner', () =>
            Owner.create({ name, email, password })
                .then(() => logic.register(name, email, password))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`owner with ${email} email already exist`))
        )

        it('should fail on trying to register with an undefined name', () =>
            logic.register(undefined, email, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to register with an empty name', () =>
            logic.register('', email, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid name`))
        )

        it('should fail on trying to register with an undefined email', () =>
            logic.register(name, undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with an empty email', () =>
            logic.register(name, '', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with a numeric email', () =>
            logic.register(name, 123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with a undefined password', () =>
            logic.register(name, email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with a empty password', () =>
            logic.register(name, email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    true && describe('authenticate owner', () => {
        beforeEach(() => Owner.create({ name, email, password }))

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

    true && describe('update owner', () => {
        const newPassword = `${password}-${Math.random()}`

        beforeEach(() => Owner.create({ email, password, name }))

        it('should update password correctly', () =>
            logic.updatePassword(email, password, newPassword)
                .then(res => {
                    expect(res).to.be.true

                    return Owner.findOne({ email })
                })
                .then(owner => {
                    expect(owner).to.exist
                    expect(owner.email).to.equal(email)
                    expect(owner.password).to.equal(newPassword)
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

    true && describe('unregister owner', () => {
        beforeEach(() => Owner.create({ email, password, name }))

        it('should unregister user correctly', () =>
            logic.unregisterOwner(email, password)
                .then(res => {
                    expect(res).to.be.true

                    return Owner.findOne({ email })
                })
                .then(owner => {
                    expect(owner).not.to.exist
                })
        )

        it('should fail on trying to unregister owner with an undefined email', () =>
            logic.unregisterOwner(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to unregister owner with an empty email', () =>
            logic.unregisterOwner('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to unregister owner with a numeric email', () =>
            logic.unregisterOwner(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to unregister owner with an undefined password', () =>
            logic.unregisterOwner(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to unregister owner with an empty password', () =>
            logic.unregisterOwner(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to unregister owner with a numeric password', () =>
            logic.unregisterOwner(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    true && describe('add property', () => {
        const title = `Amazing Penthouse`
        const subtitle = `Ideal for movies`
        const photo = fileTest
        const description = 'blablabla'
        const categories = ['Balcony', 'Bathroom', 'Kitchen']
        const type = 'Penthouse'

        beforeEach(() => Owner.create({ email, password, name }))

        it('should succeed on correct data', () =>
            logic.addProperty(email, title, subtitle, photo, description, categories, type)
                .then(res => {
                    expect(res.title).to.equal(title)
                    return Owner.findOne({ email })
                })
                .then(owner => {
                    return Property.find({ owner: owner.id })
                })
                .then(property => {
                    expect(property.length).to.equal(1)
                })
        )

        it('should fail on trying to add properties with an undefined email', () =>
            logic.addProperty(undefined, title, subtitle, photo, description, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add properties with an empty email', () =>
            logic.addProperty('', title, subtitle, photo, description, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add properties with an numeric email', () =>
            logic.addProperty(123, title, subtitle, photo, description, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add properties with an undefined title', () =>
            logic.addProperty(email, undefined, subtitle, photo, description, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid title`))
        )

        it('should fail on trying to add properties with an empty title', () =>
            logic.addProperty(email, '', subtitle, photo, description, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid title`))
        )

        it('should fail on trying to add properties with an undefined field', () =>
            logic.addProperty(email, title, subtitle, undefined, description, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid photo`))
        )

        it('should fail on trying to add properties with an empty field', () =>
            logic.addProperty(email, title, subtitle, '', description, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid photo`))
        )

        it('should fail on trying to add properties with a number field', () =>
            logic.addProperty(email, title, subtitle, 123, description, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid photo`))
        )

        it('should fail on trying to add properties with an undefined category', () =>
            logic.addProperty(email, title, subtitle, photo, description, undefined, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid categories`))
        )

        it('should fail on trying to add properties with an empty array of categories', () =>
            logic.addProperty(email, title, subtitle, photo, description, [], type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`at least one category`))
        )

        it('should fail on trying to add properties with an undefined type', () =>
            logic.addProperty(email, title, subtitle, photo, description, categories, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid type`))
        )

        it('should fail on trying to add properties with an empty type', () =>
            logic.addProperty(email, title, subtitle, photo, description, categories, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid type`))
        )

        it('should fail on trying to add properties with a numeric type', () =>
            logic.addProperty(email, title, subtitle, photo, description, categories, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid type`))
        )
    })

    true && describe('list property', () => {

        const title = `New Apartment`
        const subtitle = 'New subtitle'
        const photo = 'http://cci10.com/blog/wp-content/uploads/2017/11/%C3%A1ticos-680x365.jpg'
        const description = 'new Blablabla'
        const categories = ['Elevator', 'Office']
        const type = 'Events Spaces'

        let propertyId

        beforeEach(() => {
            return Owner.create({ email, password, name })
                .then(() => {
                    return Owner.findOne({ email })
                })
                .then(owner => {
                    return Property.create({ title, subtitle, photo, description, categories, type, owner: owner.id })
                })
                .then(res => propertyId = res._doc._id.toString())
        })

        it('should list all properties', () => {
            return logic.listProperty()
                .then(property => expect(property.length).to.equal(1))
        })
    })

    true && describe('update property', () => {
        const title = `New Apartment`
        const subtitle = 'New Subtitle'
        const photo = 'http://cci10.com/blog/wp-content/uploads/2017/11/%C3%A1ticos-680x365.jpg'
        const description = 'new Blablabla'
        const categories = ['Elevator', 'Office']
        const type = 'Events Spaces'

        let propertyId

        beforeEach(() => {
            return Owner.create({ email, password, name })
                .then(() => {
                    return Owner.findOne({ email })
                })
                .then(owner => {
                    return Property.create({ title, subtitle, photo, description, categories, type, owner: owner.id })
                })
                .then(res => propertyId = res._doc._id.toString())
        })

        it('should update property succesfully', () => {
            return logic.updatePropertyById(email, propertyId, title, subtitle, photo, description, categories, type)
                .then(property => {
                    expect(property).to.be.true
                })
        })

        it('should fail with invalid email', () => {
            return logic.updatePropertyById('jhondoe.mail.com', propertyId, title, subtitle, photo, description, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        })

        it('should fail with a numeric email', () => {
            return logic.updatePropertyById(123455, propertyId, title, subtitle, photo, description, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        })

        it('should fail with a empty email', () => {
            return logic.updatePropertyById('', propertyId, title, subtitle, photo, description, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        })

        it('should fail with invalid propertyId', () => {
            return logic.updatePropertyById(email, '123456', title, subtitle, photo, description, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid property id: 123456`))
        })

        it('should fail with empty newTitle', () => {
            return logic.updatePropertyById(email, propertyId, '', subtitle, photo, description, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid title`))
        })

        it('should fail with undefined newTitle', () => {
            return logic.updatePropertyById(email, propertyId, undefined, subtitle, photo, description, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid title`))
        })

        it('should fail with undefined newPhoto', () => {
            return logic.updatePropertyById(email, propertyId, title, subtitle, undefined, description, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid photo`))
        })

        it('should fail with empty newPhoto', () => {
            return logic.updatePropertyById(email, propertyId, title, subtitle, '', description, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid photo`))
        })

        it('should fail with empty newCategory', () => {
            return logic.updatePropertyById(email, propertyId, title, subtitle, photo, description, [], type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`at least one category`))
        })

        it('should fail with undefined newCategory', () => {
            return logic.updatePropertyById(email, propertyId, title, subtitle, photo, description, undefined, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid categories`))
        })

        it('should fail with object newCategory', () => {
            return logic.updatePropertyById(email, propertyId, title, subtitle, photo, description, {}, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid categories`))
        })

        it('should fail with empty newType', () => {
            return logic.updatePropertyById(email, propertyId, title, subtitle, photo, description, categories, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid type`))
        })

        it('should fail with undefined newType', () => {
            return logic.updatePropertyById(email, propertyId, title, subtitle, photo, description, categories, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid type`))
        })
    })

    true && describe('retrieve properties by Id', () => {
        const title = `New Apartment`
        const subtitle = 'New Subtitle'
        const photo = 'http://cci10.com/blog/wp-content/uploads/2017/11/%C3%A1ticos-680x365.jpg'
        const description = 'new Blablabla'
        const categories = ['Elevator', 'Office']
        const type = 'Events Spaces'
        let propertyId

        beforeEach(() => {
            return Owner.create({ email, password, name })
                .then(() => {
                    return Owner.findOne({ email })
                })
                .then(owner => {
                    return Property.create({ title, subtitle, photo, description, categories, type, owner: owner.id })
                })
                .then(res => propertyId = res._doc._id.toString())
        })

        it('should retrieve property succesfully', () => {
            return logic.retrievePropertyById(propertyId)
                .then(property => {
                    expect(property.title).to.equal(title)
                    expect(property.subtitle).to.equal(subtitle)
                    expect(property.photo).to.equal(photo)
                    expect(property.description).to.equal(description)
                    expect(property.categories).to.deep.equal(categories)
                    expect(property.type).to.equal(type)
                })
        })

        it('should fail with invalid propertyId', () => {
            let propertyId = '123456789'

            return logic.retrievePropertyById(propertyId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid property id: ${propertyId}`))
        })

        it('should fail with not found propertyId', () => {
            let propertyId = ObjectId()

            return logic.retrievePropertyById(propertyId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`Property with id ${propertyId} does not exist`))
        })
    })

    true && describe('delete property', () => {
        const title = `New Apartment`
        const subtitle = 'New Subtitle'
        const photo = 'http://cci10.com/blog/wp-content/uploads/2017/11/%C3%A1ticos-680x365.jpg'
        const description = 'new Blablabla'
        const categories = ['Elevator', 'Office']
        const type = 'Events Spaces'
        let propertyId

        beforeEach(() => {
            return Owner.create({ email, password, name })
                .then(() => {
                    return Owner.findOne({ email })
                })
                .then(owner => {
                    return Property.create({ title, subtitle, photo, description, categories, type, owner: owner.id })
                })
                .then(res => propertyId = res._doc._id.toString())
        })

        it('should fail with invalid propertyId', () => {
            let propertyId = '123456789'

            return logic.deletePropertyById(email, propertyId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid property id: ${propertyId}`))
        })

        it('should fail with an empty propertyId', () => {
            let propertyId = ''

            return logic.deletePropertyById(email, propertyId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid property id: ${propertyId}`))
        })

        it('should fail with an invalid email', () => {

            return logic.deletePropertyById('jhondoe.mail.com', propertyId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        })

        it('should fail with an empty email', () => {

            return logic.deletePropertyById('', propertyId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        })

        it('should fail with an undefined email', () => {

            return logic.deletePropertyById('', propertyId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        })
    })

    after(() =>
        Promise.all([
            Property.deleteMany(),
            Owner.deleteMany()
        ])
            .then(() => _connection.disconnect())
    )
})