'use strict'
require('dotenv').config()

const { logic } = require('./index')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose
const { Hostess, Business, Events } = require('../data/models')

const { env: { MONGO_URL } } = process

describe('logic', () => {
    const email = `test${Math.random()}@mail.com`
    const password = `oldpassword`
    const newPassword = `newpassword`
    let _connection

    const event = {
        location: "barcelona",
        date: "01/01/2000",
        hours: "horas del evento",
        title: "the title",
        goal: "finalidad del evento",
        briefing: "briefing del evento",
        contactName: "rudolf",
        contactPhone: "666",
    }

    const event2 = {
        location: "kiribati",
        date: "07/10/1991",
        hours: "horas del evento dos",
        title: "the title dos",
        goal: "finalidad del evento dos",
        briefing: "briefing del evento dos",
        contactName: "arnold",
        contactPhone: "777",
    }

    const business1 = {
        email: 'business1@mail.com',
        password: password,
        name: "the company",
        boss: "director",
        phone: "111",
        web: "web.com",
        philosophy: "go slow to go fast",
    }

    const business2 = {
        email: 'business2@mail.com',
        password: password,
        name: "the company dos",
        boss: "director dos",
        phone: "222",
        web: "web.com.com",
        philosophy: "piedra a piedra, tecla a tecla",
    }

    const host1 = {
        email: 'host1@mail.com',
        name: 'kim',
        password: password,
        birth: "01/02/2003",
        myself: "im super",
        origin: "kiribati",
        gender: 'M',
        jobType: 'sells',
        languages: ['catalan', 'spanish', 'otra'],
    }

    const host2 = {
        email: 'host2@mail.com',
        password: password,
        gender: 'M',
        jobType: 'animation',
        languages: ['english', 'spanish'],
    }

    const host3 = {
        email: 'host3@mail.com',
        password: password,
        gender: 'W',
        jobType: 'image',
        languages: ['english', 'german'],
    }

    const host4 = {
        email: 'host4@mail.com',
        password: password,
        gender: 'W',
        jobType: 'info',
        languages: ['english', 'catalan', 'otra'],
    }

    const host5 = {
        email: 'host5@mail.com',
        password: password,
        gender: 'W',
        jobType: 'info',
        languages: ['spanish', 'catalan'],
    }

    const hostesses = [host1, host2, host3, host4, host5]
    const businesses = [business1, business2]
    const events = [event, event2]

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

    true && describe('validate fields', () => {
        it('should succeed on correct value', () => {
            expect(() => logic._validateStringcd.Field('email', email).to.equal(email))
            expect(() => logic._validateStringField('password', password).to.equal(password))
        })

        it('should fail on undefined value', () => {
            expect(() => logic._validateStringField('name', undefined).to.throw('invalid name'))
            expect(() => logic._validateStringField('password', undefined).to.throw('invalid password'))
            expect(() => logic._validateStringField('password', 111).to.throw('invalid password'))
        })
    })

    /**
     * Register, authenticate, retrieve, update password, update details, unregister
     */

    true && describe('register hostess', () => {
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
                .then(({ message }) => expect(message).to.equal(`We allready have and acount with this email ${email}`))
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

    true && describe('register business', () => {
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


    true && describe('authenticatation of the hostess', () => {
        beforeEach(() => Hostess.insertMany(hostesses))

        it('should login correctly for a hostess', () =>
            logic.authenticateHostess('host1@mail.com', password)
                .then(objectId => {
                    expect(objectId).to.exist

                    return Hostess.findById({ _id: objectId })
                })
                .then(hostess => {
                    expect(hostess.name).to.equal('kim')
                })
        )

    })

    true && describe('authenticatation of the hostess', () => {
        beforeEach(() => Business.insertMany(businesses))

        it('should login correctly for a hostess', () =>
            logic.authenticateBusiness('business1@mail.com', password)
                .then(objectId => {
                    expect(objectId).to.exist

                    return Business.findById({ _id: objectId })
                })
                .then(business => {
                    expect(business.name).exist.equal('the company')
                })
        )
    })

    true && describe('update hostess password', () => {
        beforeEach(() => Hostess.create({ email, password }))

        it('should update the hostess password correctly', () =>
            logic.updatePasswordHostess(email, password, newPassword)
                .then(res => {
                    expect(res).to.be.true
                    return Hostess.findOne({ email })
                })
                .then(hostess => {
                    expect(hostess).to.exist
                    expect(hostess.email).to.equal(email)
                    expect(hostess.password).to.equal(newPassword)
                })
        )
    })

    true && describe('update business password', () => {
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
            logic.authenticateHostess('host1@mail.com', password)
                .then(id => {
                    return logic.retrieveHostess(id)
                        .then(hostess => {
                            expect(hostess).to.exist
                            expect(hostess.name).to.equal('kim')
                        })
                })
        )
    })

    true && describe('retrieve business details', () => {
        beforeEach(() => Business.insertMany(businesses))

        it('should retrieve the business details', () =>
            logic.authenticateBusiness('business1@mail.com', password)
                .then(id => {
                    return logic.retrieveBusiness(id)
                        .then(business => {
                            expect(business).to.exist
                            expect(business.philosophy).to.equal('go slow to go fast')
                        })
                })
        )
    })

    true && describe('update hostess details', () => {
        beforeEach(() => Hostess.insertMany(hostesses))

        it('should update the hostess details correctly', () =>
            logic.authenticateHostess('host1@mail.com', password)
                .then(id => {
                    return logic.editHostessProfile(id, password, 'Arantxa', '05/05/2005', 'Palms', '1234567', 'im describing my super self', 'W', ['catalan', 'castellano'], 'image', 'photo here')
                        .then(res => {
                            expect(res).to.be.true

                            return Hostess.findById(id)
                        })
                        .then(hostess => {
                            expect(hostess).to.exist
                            expect(hostess.name).exist.equal('Arantxa')
                            expect(hostess.languages).to.exist
                        })
                })
        )
        it('should fail with wrong password', () =>
            logic.authenticateHostess('host1@mail.com', password)
                .then(id => 
                    logic.editHostessProfile(id, '111222', 'Arantxa', '05/05/2005', 'Palms', '1234567', 'im describing my super self', 'W', ['catalan', 'castellano'], 'image', 'photo here')
                        .catch(err => err)
                        .then(({ message }) => expect(message).to.equal(`use the correct password`))
                )
        )
    })

    true && describe('update business details', () => {
        beforeEach(() => Business.insertMany(businesses))

        it('should update the business details correctly', () =>
            logic.authenticateBusiness('business1@mail.com', password)
                .then((id) => {
                    return logic.editBusinessProfile(id, password, 'Aguas saladas', 'www.aguitas.com', 'Christof', '123456', 'Desalinar las aguas saladas', 'photos card')
                        .then(res => {
                            expect(res).to.be.true

                            return Business.findById(id)
                        })
                        .then(business => {
                            expect(business).to.exist
                            expect(business.name).exist.equal('Aguas saladas')
                            expect(business.web).exist.equal('www.aguitas.com')
                        })
                })
        )
    })

    true && describe('unregister hostess', () => {
        beforeEach(() => Hostess.create({ email, password }))

        it('should unregister the hostess acound correctly', () =>
            logic.unregisterHostess(email, password)
                .then(res => {
                    expect(res).to.be.true

                    return Hostess.findOne({ email })
                })
                .then(hostess => {
                    expect(hostess).to.be.null
                })
        )
    })

    true && describe('unregister business', () => {
        beforeEach(() => Business.create({ email, password }))

        it('should unregister the business acound correctly', () =>
            logic.unregisterBusiness(email, password)
                .then(res => {
                    expect(res).to.be.true

                    return Business.findOne({ email })
                })
                .then(business => {
                    expect(business).to.be.null
                })
        )
    })









    /**
     * Comandos internos
     */


    true && describe('search hostesses', () => {
        beforeEach(() => Hostess.insertMany(hostesses))
        beforeEach(() => Business.insertMany(businesses))

        it('should search the correct hostesses', () =>
            logic.searchWorkers('W', ['catalan', 'spanish'], 'info')
                .then(searched => {
                    expect(searched).to.exist
                    expect(searched.length).to.equal(1)
                })
        )

        it('should search only with languages', () =>
            logic.searchWorkers('', ['english'], '')
                .then(searched => {
                    expect(searched).to.exist
                    expect(searched.length).to.equal(3)
                })
        )

        it('should retrieve all hostesses', () =>
            logic.searchWorkers()
                .then(all => {
                    expect(all).to.exist
                    expect(all.length).to.equal(5)
                })
        )
    })

    true && describe('create event', () => {

        beforeEach(() => Business.insertMany(businesses))

        it('should create an event', () =>
            logic.authenticateBusiness('business1@mail.com', password)
                .then(idB => {
                    return logic.newEvent(idB, 'Barcelona', 'dates', 'hours to work', '10/hora', 'title of the event', 'final goal')
                        .then(idE => {
                            expect(idE).to.exist

                            Events.findById({ _id: idE })
                                .then(event => {
                                    expect(event.location).to.equal('Barcelona')
                                    expect(event.business).to.exist
                                    expect(event.location).to.equal('Barcelona')
                                    expect(event.date).to.exist
                                    expect(event.hours).to.exist
                                    expect(event.title).to.equal('title of the event')
                                    expect(event.goal).to.equal('final goal')
                                })
                            return Business.findById({ _id: idB })
                        })
                        .then(business => {
                            expect(business).to.exist
                            expect(business._doc.events.length).to.equal(1)
                        })
                })
        )
    })

    true && describe('update the event with the briefing', () => {
        beforeEach(() => Business.insertMany(businesses))

        it('should create an event', () =>
            logic.authenticateBusiness('business1@mail.com', password)
                .then(idB => {
                    return logic.newEvent(idB, 'Barcelona', 'dates', 'hours to work', 'salary', 'title of the event', 'final goal')
                        .then(idE => {
                            expect(idE).to.exist

                            return logic.makeBriefing(idE, 'pepito', '45654', 'detalles de la accion')
                                .then(res => {
                                    expect(res).to.be.true
                                })
                        })
                })
        )
    })

    true && describe('send request to the host', () => {

        let idB = ''
        let idH = ''


        beforeEach(() => {
            Business.insertMany(businesses)
            Hostess.insertMany(hostesses)

            return logic.authenticateBusiness('business1@mail.com', password)
                .then(idBus => {
                    idB = idBus
                    return logic.authenticateHostess('host1@mail.com', password)
                })
                .then(idHost => {
                    idH = idHost
                    return true
                })
        })

        it('should send a request', () => {
            return logic.sendRequest(idB, idH)
                .then(res => {
                    expect(res).to.be.true
                })
        })

    })


    true && describe('close the event', () => {

        let idB = ''
        let idH = ''
        let idE = ''

        beforeEach(() => {
            Business.insertMany(businesses)
            Hostess.insertMany(hostesses)

            return logic.authenticateBusiness('business1@mail.com', password)
                .then(idBus => {
                    idB = idBus
                    return logic.authenticateHostess('host1@mail.com', password)
                })
                .then(idHost => {
                    idH = idHost
                    return logic.newEvent(idB, 'place', 'date', 'at some time', 'salary', 'who knows', 'the goal')
                })
                .then(idEvent => idE = idEvent)
        })

        it('should close the event', () => {
            return logic.closeEvent(idE, idH)
                .then(res => {
                    expect(res).to.be.true
                })
        })
    })

    true && describe('assist to the event', () => {

        let idB = ''
        let idH = ''
        let idE = ''

        beforeEach(() => {
            Business.insertMany(businesses)
            Hostess.insertMany(hostesses)

            return logic.authenticateBusiness('business1@mail.com', password)
                .then(idBus => {
                    idB = idBus
                    return logic.authenticateHostess('host1@mail.com', password)
                })
                .then(idHost => {
                    idH = idHost
                    return logic.newEvent(idB, 'place', 'date', 'at some time', 'salary', 'who knows', 'the goal')
                })
                .then(idEvent => idE = idEvent)
        })

        it('should close the event', () => {
            return logic.iAssist(idE, idH)
                .then(res => {
                    expect(res).to.be.true
                })
        })
    })

    /**
     * dice que no se puede leeer _doc de undefined. en  viene definido y populado
     */

    true && describe('accept busines requestes', () => {

        let idB = ''
        let idH = ''
        let idE = ''

        beforeEach(() => {
            Business.insertMany(businesses)
            Hostess.insertMany(hostesses)

            return logic.authenticateBusiness('business1@mail.com', password)
                .then(idBus => {
                    idB = idBus
                    return logic.authenticateHostess('host1@mail.com', password)
                })
                .then(idHost => {
                    idH = idHost
                    return logic.newEvent(idB, 'place', 'date', 'at some time', 'salary', 'who knows', 'the goal')
                })
                .then(idEvent => idE = idEvent)
        })

        it('accept the request', () => {
            return logic.acceptRequest(idH, idB)
                .then(business => {
                    
                    expect(business).to.exist
                    expect(business.name).to.equal("the company")
                    expect(business.events[0].location).to.equal("place")
                })
        })
    })

    true && describe('join to event as a candidate', () => {

        let idB = ''
        let idH = ''
        let idE = ''

        beforeEach(() => {
            Business.insertMany(businesses)
            Hostess.insertMany(hostesses)

            return logic.authenticateBusiness('business1@mail.com', password)
                .then(idBus => {
                    idB = idBus
                    return logic.authenticateHostess('host1@mail.com', password)
                })
                .then(idHost => {
                    idH = idHost
                    return logic.newEvent(idB, 'place', 'date', 'at some time', 'salary', 'who knows', 'the goal')
                })
                .then(idEvent => idE = idEvent)
        })


        it('should join as a candidate', () => {
            return logic.joinToEvent(idH, idE)
            .then(res => {
                expect(res).to.be.true
                return Events.findById(idE)
            })
            .then(event => {
                expect(event).to.exist
                expect(event._doc.location).to.equal('place')
                expect(event._doc.candidates.length).to.equal(1)
            })
        })
    })
    
    true && describe('probando repopulacion', () => {

        let idB = ''
        let idH = ''
        let idE = ''

        beforeEach(() => {
            Business.insertMany(businesses)
            Hostess.insertMany(hostesses)

            return logic.authenticateBusiness('business1@mail.com', password)
                .then(idBus => {
                    idB = idBus
                    return logic.authenticateHostess('host1@mail.com', password)
                })
                .then(idHost => {
                    idH = idHost
                    return logic.newEvent(idB, 'place', 'date', 'at some time', 'salary', 'who knows', 'the goal')
                })
                .then(idEvent => {
                    idE = idEvent
                    return logic.joinToEvent(idH, idE)
                })
                .then(() => true)
        })

        it('should close the event', () => {
            return logic.retrieveBusiness(idB)
                .then(business => {
                    expect(business).to.exist
                })
        })
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

