require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose
const { Property, Owner } = require('../data/models')
// const fs = require('file-system')

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

    !true && describe('validate fields', () => {
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

    !true && describe('register owner', () => {

        it('should register correctly', () =>
            Owner.findOne({ email })
                .then(owner => {
                    expect(owner).to.be.null

                    return logic.register(email, password, name)
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
            Owner.create({ email, password, name })
                .then(() => logic.register(email, password, name))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`owner with ${email} email already exist`))
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

    !true && describe('authenticate owner', () => {
        beforeEach(() => Owner.create({ email, password, name }))

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

    !true && describe('update owner', () => {
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

    !true && describe('unregister owner', () => {
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

    !true && describe('add property', () => {
        const title = `Amazing Apartment - ${Math.random()}`
        const photo = fileTest
        const description = 'blablabla'
        const dimentions = 300
        const categories = ['Balcony', 'Bathroom', 'Kitchen']
        const type = 'Penthouse'

        beforeEach(() => Owner.create({ email, password, name }))

        it('should succeed on correct data', () => {
            logic.addProperty(email, title, photo, description, dimentions, categories, type)
                .then(res => {
                    expect(res).to.be.true
                    return Owner.findOne({ email })
                })
                .then(owner => {
                    return Property.find({ owner: owner.id })
                })
                .then(property => {
                    expect(property.length).to.equal(1)
                })
        })

        it('should fail on trying to add properties with an undefined email', () =>
            logic.addProperty(undefined, title, photo, description, dimentions, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add properties with an empty email', () =>
            logic.addProperty('', title, photo, description, dimentions, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add properties with an numeric email', () =>
            logic.addProperty(123, title, photo, description, dimentions, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add properties with an undefined title', () =>
            logic.addProperty(email, undefined, photo, description, dimentions, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid title`))
        )

        it('should fail on trying to add properties with an empty title', () =>
            logic.addProperty(email, '', photo, description, dimentions, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid title`))
        )

        it('should fail on trying to add properties with an undefined field', () =>
            logic.addProperty(email, title, undefined, description, dimentions, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid photo`))
        )

        it('should fail on trying to add properties with an empty field', () =>
            logic.addProperty(email, title, '', description, dimentions, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid photo`))
        )

        it('should fail on trying to add properties with a number field', () =>
            logic.addProperty(email, title, 123, description, dimentions, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid photo`))
        )

        it('should fail on trying to add properties with an undefined description', () =>
            logic.addProperty(email, title, photo, undefined, dimentions, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid description`))
        )

        it('should fail on trying to add properties with an empty description', () =>
            logic.addProperty(email, title, photo, '', dimentions, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid description`))
        )

        it('should fail on trying to add properties with an undefined dimentions', () =>
            logic.addProperty(email, title, photo, description, undefined, categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dimentions`))
        )

        it('should fail on trying to add properties with an empty dimentions', () =>
            logic.addProperty(email, title, photo, description, '', categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dimentions`))
        )

        it('should fail on trying to add properties with a string dimentions', () =>
            logic.addProperty(email, title, photo, description, '123', categories, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid dimentions`))
        )

        it('should fail on trying to add properties with an undefined category', () =>
            logic.addProperty(email, title, photo, description, dimentions, undefined, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid categories`))
        )

        it('should fail on trying to add properties with an empty array of categories', () =>
            logic.addProperty(email, title, photo, description, dimentions, [], type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`at least one category`))
        )

        it('should fail on trying to add properties with a numeric category', () =>
            logic.addProperty(email, title, photo, description, dimentions, 123, type)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid categories`))
        )

        it('should fail on trying to add properties with an undefined type', () =>
            logic.addProperty(email, title, photo, description, dimentions, categories, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid type`))
        )

        it('should fail on trying to add properties with an empty type', () =>
            logic.addProperty(email, title, photo, description, dimentions, categories, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid type`))
        )

        it('should fail on trying to add properties with a numeric type', () =>
            logic.addProperty(email, title, photo, description, dimentions, categories, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid type`))
        )
    })

    true && describe('list property', () => {

        const title = `New Apartment`
        const photo = 'http://cci10.com/blog/wp-content/uploads/2017/11/%C3%A1ticos-680x365.jpg'
        const description = 'new Blablabla'
        const dimentions = 100
        const categories = ['Adult Bedroom', 'Office']
        const type = 'Events Spaces'

        let propertyId

        beforeEach(() => {
            return Owner.create({ email, password, name })
                .then(() => {
                    return Owner.findOne({ email })
                })
                .then(owner => {
                    return Property.create({ title, photo, description, dimentions, categories, type, owner: owner.id })
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
        const photo = 'http://cci10.com/blog/wp-content/uploads/2017/11/%C3%A1ticos-680x365.jpg'
        const description = 'new Blablabla'
        const dimentions = 100
        const categories = ['Adult Bedroom', 'Office']
        const type = 'Events Spaces'

        const newTitle = `Modify title`
        const newPhoto = 'http://cci10.com/blog/wp-content/uploads/2017/11/%C3%A1ticos-680x365.jpg'
        const newDescription = 'Modify description'
        const newDimentions = 100
        const newCategories = ['Bathroom', 'Dinning room']
        const newType = 'Singular Spaces'
        
        let propertyId
        
        beforeEach(() => {
            return Owner.create({ email, password, name })
                .then(() => {
                    return Owner.findOne({ email })
                })
                .then(owner => {
                    return Property.create({ title, photo, description, dimentions, categories, type, owner: owner.id })
                })
                .then(res => propertyId = res._doc._id.toString())
        })

        it('should update property succesfully', () => {
            return logic.updatePropertyById(email, propertyId, newTitle, newPhoto, newDescription, newDimentions, newCategories, newType)
                .then(property => {
                    expect(property).to.be.true
                })
        })
        
    })

    !true && describe('retrieve properties by Id', () => {
        const title = `New Apartment`
        const photo = 'http://cci10.com/blog/wp-content/uploads/2017/11/%C3%A1ticos-680x365.jpg'
        const description = 'new Blablabla'
        const dimentions = 100
        const categories = ['Adult Bedroom', 'Office']
        const type = 'Events Spaces'
        let propertyId

        beforeEach(() => {
            return Owner.create({ email, password, name })
                .then(() => {
                    return Owner.findOne({ email })
                })
                .then(owner => {
                    return Property.create({ title, photo, description, dimentions, categories, type, owner: owner.id })
                })
                .then(res => propertyId = res._doc._id.toString())
        })

        it('should retrieve property succesfully', () => {
            return logic.retrievePropertyById(email, propertyId)
                .then(property => {
                    expect(property.title).to.equal(title)
                    expect(property.photo).to.equal(photo)
                    expect(property.description).to.equal(description)
                    expect(property.dimentions).to.equal(dimentions)
                    expect(property.categories).to.deep.equal(categories)
                    expect(property.type).to.equal(type)
                })
        })
    })

    // !true && describe('search properties', () => {
    //     let type = "Events Spaces"
    //     let categories = ['Adult Bedroom', 'Office', 'Bathroom']

    //     const properties = [
    //         {
    //             title: `title 1`,
    //             photo: 'http://cci10.com/blog/wp-content/uploads/2017/11/%C3%A1ticos-680x365.jpg',
    //             description: 'description 1',
    //             dimentions: 100,
    //             categories: ['Adult Bedroom', 'Office'],
    //             type: 'Events Spaces'
    //         },
    //         {
    //             title: `title 2`,
    //             photo: 'http://cci10.com/blog/wp-content/uploads/2017/11/%C3%A1ticos-680x365.jpg',
    //             description: 'description 2',
    //             dimentions: 200,
    //             categories: ['Bathroom'],
    //             type: 'Events Spaces'
    //         },
    //         {
    //             title: `title 3`,
    //             photo: 'http://cci10.com/blog/wp-content/uploads/2017/11/%C3%A1ticos-680x365.jpg',
    //             description: 'description 3',
    //             dimentions: 300,
    //             categories: ['Abandoned Style'],
    //             type: 'Events Spaces'
    //         },
    //         {
    //             title: `title 4`,
    //             photo: 'http://cci10.com/blog/wp-content/uploads/2017/11/%C3%A1ticos-680x365.jpg',
    //             description: 'description 4',
    //             dimentions: 400,
    //             categories: ['Abandoned Style'],
    //             type: 'Houses'
    //         },
    //         {
    //             title: `title 5`,
    //             photo: 'http://cci10.com/blog/wp-content/uploads/2017/11/%C3%A1ticos-680x365.jpg',
    //             description: 'description 5',
    //             dimentions: 500,
    //             categories: ['Adult Bedroom'],
    //             type: 'Singular Spaces'
    //         }
    //     ]

    //     beforeEach(() => {
    //         return Owner.create({ email, password, name })
    //             .then(() => {
    //                 return Owner.findOne({ email })
    //             })
    //             .then(owner => {
    //                 return Promise.all([
    //                     Property.create({ ...properties[0], owner: owner.id }),
    //                     Property.create({ ...properties[1], owner: owner.id }),
    //                     Property.create({ ...properties[2], owner: owner.id }),
    //                     Property.create({ ...properties[3], owner: owner.id }),
    //                     Property.create({ ...properties[4], owner: owner.id })
    //                 ])
    //             })
    //     })

    //     // it('should filter by categories properlly', () => {
    //     //     debugger
    //     //     return logic.listPropertyByQuery(type, categories)
    //     //         .then(properties => {
    //     //             // expect(properties[0].categories).to.deep.equal(['Adult Bedroom', 'Office'])
    //     //             // expect(properties[1].categories).to.deep.equal(['Bathroom'])
    //     //             // expect(properties[2].categories).to.deep.equal(['Abandoned Style'])
    //     //             // expect(properties[3].categories).to.deep.equal(['Abandoned Style'])
    //     //             // expect(properties[4].categories).to.deep.equal(['Adult Bedroom'])
    //     //         })
    //     // })

    //     // it('should fail when filter does not match', () => {
    //     //     return logic.listPropertyByQuery(type, categories)
    //     //         .then(properties => {
    //     //             expect()
    //     //         })
         
    //     // })

    // })

    after(() =>
        Promise.all([
            Property.deleteMany(),
            Owner.deleteMany()
        ])
            .then(() => _connection.disconnect())
    )
})