'use strict'
require('dotenv').config()

const { logic } = require('./index')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose
const { Hostess, Business, Events } = require('../data/models')

const { env: { MONGO_URL } } = process

describe('logic', () => {
    const email = `client-${Math.random()}@mail.com`
    const password = `oldpassword`
    const newPassword = `newpassword`
    let _connection

    const failEvents = {
        location: "Barcelona",
        date: "01/01/2000",
        title: "The event",
        description: "Description of the event"
    }

    const business1 = {
        email: 'business1@mail.com',
        password: password,
        favs: [],
        philosophy: "Go slow to go fast"
    }

    const host1 = {
        email: 'host1@mail.com',
        name: 'kim',
        password: password,
        gender: 'M',
        jobType: 'sells',
        languages: ['catalan', 'spanish'],
        height: 150
    }

    const host2 = {
        email: 'host2@mail.com',
        password: password,
        gender: 'M',
        jobType: 'animation',
        languages: ['english', 'spanish'],
        height: 160
    }

    const host3 = {
        email: 'host3@mail.com',
        password: password,
        gender: 'W',
        jobType: 'image',
        languages: ['english', 'german'],
        height: 170
    }

    const host4 = {
        email: 'host4@mail.com',
        password: password,
        gender: 'W',
        jobType: 'info',
        languages: ['english', 'catalan'],
        height: 180
    }

    const host5 = {
        email: 'host5@mail.com',
        password: password,
        gender: 'W',
        jobType: 'info',
        languages: ['spanish', 'catalan'],
        height: 180
    }

    const hostesses = [host1, host2, host3, host4, host5]

    before(() =>
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )

    beforeEach(() =>
        Promise.all([
            Hostess.deleteMany(),
            Business.deleteMany(),
            Events.deleteMany()
        ])
    )

    false && describe('validate fields', () => {
        it('should succeed on correct value', () => {
            expect(() => logic._validateStringField('email', email).to.equal(email))
            expect(() => logic._validateStringField('password', password).to.equal(password))
        })

        it('should fail on undefined value', () => {
            expect(() => logic._validateStringField('name', undefined).to.throw('invalid name'))
        })
    })

    false && describe('register hostess', () => {
        it('should register correctly', () =>
            Hostess.findOne({ email: email })
                .then(hostess => {
                    expect(hostess).to.be.null

                    return logic.registerHostess(email, password)
                })
                .then(res => {
                    expect(res).to.be.true

                    return Hostess.findOne({ email: email })
                })
                .then(hostess => {
                    expect(hostess).to.exist
                    expect(hostess.email).to.equal(email)
                    expect(hostess.password).to.equal(password)

                    return Hostess.find()
                })
                .then(hostess => expect(hostess.length).to.equal(1))
        )

        it('should fail on trying to register an already registered hostess', () =>
            Hostess.create({ email, password })
                .then(() => logic.registerHostess(email, password))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`We allready have and acount with this email`))
        )

        it('should fail on trying to register a hostess with an undefined email', () =>
            logic.registerHostess(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register a hostess with an empty email', () =>
            logic.registerHostess('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register a hostess with a numeric email', () =>
            logic.registerHostess(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register a hostess with an undefined password', () =>
            logic.registerHostess(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register a hostess with an empty password', () =>
            logic.registerHostess(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register a hostess with a numeric password', () =>
            logic.registerHostess(email, 123456)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    false && describe('register business', () => {
        it('should register a business correctly', () =>
            Business.findOne({ email: email })
                .then(business => {
                    expect(business).to.be.null

                    return logic.registerBusiness(email, password)
                })
                .then(res => {
                    expect(res).to.be.true

                    return Business.findOne({ email: email })
                })
                .then(business => {
                    expect(business).to.exist
                    expect(business.email).to.equal(email)
                    expect(business.password).to.equal(password)

                    return Business.find()
                })
                .then(business => expect(business.length).to.equal(1))
        )
    })


    false && describe('authenticatation of the hostess', () => {
        beforeEach(() => Hostess.create({ email, password }))

        it('should login correctly for a hostess', () =>
            logic.authenticateHostess(email, password)
                .then(res => {
                    expect(res).to.be.true
                })
        )

    })

    false && describe('authenticatation of the hostess', () => {
        beforeEach(() => Business.create({ email, password }))

        it('should login correctly for a hostess', () =>
            logic.authenticateBusiness(email, password)
                .then(res => {
                    expect(res).to.be.true
                })
        )
    })

    false && describe('update hostess password', () => {
        beforeEach(() => Hostess.create({ email, password }))

        it('should update the hostess password correctly', () =>
            logic.updatePasswordHostess(email, password, newPassword)
                .then(res => {
                    expect(res).to.be.true
                    const pepe = Hostess.findOne({ email })
                    return Hostess.findOne({ email })
                })
                .then(hostess => {
                    expect(hostess).to.exist
                    expect(hostess.email).to.equal(email)
                    expect(hostess.password).to.equal(newPassword)
                })
        )
    })

    false && describe('update business password', () => {
        beforeEach(() => Business.create({ email, password }))

        it('should update the business password correctly', () =>
            logic.updatePasswordBusiness(email, password, newPassword)
                .then(res => {

                    expect(res).to.be.true

                    return Business.findOne({ email })
                })
                .then(business => {
                    expect(business).to.exist
                    expect(business.email).to.equal(email)
                    expect(business.password).to.equal(newPassword)
                })
        )
    })

    true && describe('retrieve hostess details', () => {
        beforeEach(() => Hostess.insertMany(hostesses))

        it('should retrieve the hostess details', () =>
            logic.retrieveHostess('host1@mail.com')
                .then(hostess => {
                    expect(hostess).to.exist
                    expect(hostess.name).to.equal('kim')
                })
        )
    })

    true && describe('retrieve business details', () => {
        beforeEach(() => Business.insertMany(business1))

        it('should retrieve the business details', () =>
            logic.retrieveBusiness('business1@mail.com')
                .then(business => {
                    expect(business).to.exist
                    expect(business.philosophy).to.equal('Go slow to go fast')
                })
        )
    })

    false && describe('update hostess details', () => {
        beforeEach(() => Hostess.create({ email, password }))

        it('should update the hostess details correctly', () =>
            logic.editHostessProfile(email, 'Arantxa', '05/05/2005', 'Palms', 'W', '1234567', ['catalan', 'castellano'], 'info', 150, 'im describing my super self', ['skill1', 'skill2'])
                .then(res => {
                    expect(res).to.be.true

                    return Hostess.findOne({ email })
                })
                .then(hostess => {
                    expect(hostess).to.exist
                    expect(hostess.name).exist.equal('Arantxa')
                })
        )
    })

    false && describe('update business details', () => {
        beforeEach(() => Business.create({ email, password }))

        it('should update the business details correctly', () =>
            logic.editBusinessProfile(email, 'Aguas saladas', 'www.aguitas.com', 'Christof', '123456', 'Desalinar las aguas saladas')
                .then(res => {
                    expect(res).to.be.true

                    return Business.findOne({ email })
                })
                .then(business => {
                    expect(business).to.exist
                    expect(business.name).exist.equal('Aguas saladas')
                })
        )
    })

    false && describe('unregister hostess', () => {
        beforeEach(() => Hostess.create({ email, password }))

        it('should unregister the hostess acound correctly', () =>
            logic.unregisterHostess(email, password)
                .then(res => {
                    expect(res).to.be.true

                    return Hostess.findOne({ email })
                })
                .then(hostess => {
                    expect(hostess).not.to.exist
                })
        )
    })

    false && describe('unregister business', () => {
        beforeEach(() => Business.create({ email, password }))

        it('should unregister the business acound correctly', () =>
            logic.unregisterBusiness(email, password)
                .then(res => {
                    expect(res).to.be.true

                    return Business.findOne({ email })
                })
                .then(business => {
                    expect(business).not.to.exist
                })
        )
    })


    false && describe('search hostesses', () => {
        beforeEach(() => Hostess.insertMany(hostesses))
        beforeEach(() => Business.insertMany(business1))

        it('should search the correct hostesses', () =>
            logic.searchWorkers('business1@mail.com', 'W', 'info', 150, ['catalan'])
                .then(searched => {
                    expect(searched).to.exist
                    expect(searched.length).to.equal(2)
                })
        )
    })

    false && describe('list hostesses', () => {
        beforeEach(() => Hostess.insertMany(hostesses))

        it('should list correctly', () =>

            logic.hostesDetails('host1@mail.com')
                .then(listed => {
                    expect(listed).to.exist
                    expect(listed.length).to.equal(1)
                    expect(listed[0].email).to.equal('host1@mail.com')
                    expect(listed[0].height).to.equal(150)
                })
        )

        it('should fail with empty email', () =>
            logic.hostesDetails('')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('There is no hostess selected'))
        )
    })

    false && describe('add to favorites', () => {
        beforeEach(() =>
            Promise.all([
                Hostess.insertMany(hostesses),
                Business.insertMany(business1)])
        )

        it('should add a hostess to the favorites of a company', () =>
            logic.addFavs('host1@mail.com', 'business1@mail.com')
                .then(res => expect(res).to.be.true)

        )
    })

    true && describe('select hostesses', () => {
        beforeEach(() =>
            Promise.all([
                Hostess.insertMany(hostesses),
                Business.insertMany(business1)])
        )

        it('should select hostess for an event', () =>
            logic.addHostess('business1@mail.com', 'host1@mail.com')
                .then(res => {
                    expect(res).to.be.true
                })
        )

        it('should fail if the business email is missing', () =>
            logic.addHostess()
                .catch(err => err)
                .then(({ message }) => {
                    expect(message).to.equal('Missing the business in charge of this event')
                })
        )

        it('should fail if the hostess email is missing', () =>
            logic.addHostess('business1@mail.com', '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('You should select at least one hostess for your event'))
        )

        it('should fail if the hostess is already selected', () =>
            logic.addHostess('business1@mail.com', 'host1@mail.com')
                .then(() => {
                    return logic.addHostess('business1@mail.com', 'host1@mail.com')
                        .catch(err => {
                            debugger
                            return err
                        })
                        .then(({ message }) => {
                            debugger
                            expect(message).to.equal('Hostess already selected')
                        })
                })
        )
    })

    false && describe('create event', () => {
        beforeEach(() => {
            return Hostess.insertMany(hostesses)
                .then(hostesses => {
                    return hostesses
                })
                .then(hostesses => {
                    return Business.create(business1)
                        .then(business => {
                            business.selected.push(...hostesses.map(hostess => hostess._id))

                            return business.save()
                        })
                })
        })

        it('should create an event', () =>
            logic.createEvent(business1.email, new Date('01/01/2000'), 'Barcelona', 'title', 'description')
                .then(event => {
                    expect(event.business).to.exist
                    expect(event.date).to.exist
                    expect(event.location).to.equal('Barcelona')
                    expect(event.title).to.equal('title')
                    expect(event.description).to.equal('description')
                    expect(event.hostesses.length).to.equal(4)
                })
        )
    })

    false && describe('return all details of the event', () => {
        let id

        beforeEach(() => {
            return Events.insertMany(failEvents)
                .then(() => {
                    return Events.findOne({ "location": "Barcelona" })
                })
                .then((event) => {
                    return id = event._id
                })
        })

        it('should retrieve an event', () =>
            logic.retrieveEventById(id)

                .then(event => {
                    expect(event).to.exist
                    expect(event.title).to.equal("The event")
                })

        )
    })

    after(() =>
        Promise.all([
            Hostess.deleteMany(),
            Business.deleteMany(),
            Events.deleteMany()
        ])
            .then(() => _connection.disconnect())
    )
})
