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
    const password = `3333${Math.random()}`
    let _connection

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
            expect(() => logic._validateStringField('email', email).to.equal(email))
            expect(() => logic._validateStringField('password', password).to.equal(password))
        })

        it('should fail on undefined value', () => {
            expect(() => logic._validateStringField('name', undefined).to.throw('invalid name'))
        })
    })

    true && describe('register user', () => {
        it('should register correctly', () =>
            Hostess.findOne({ email })
                .then(hostess => {
                    expect(hostess).to.be.null

                    return logic.register

                })


        )
    })

    // after(() =>
    //     Promise.all([
    //         Hostess.deleteMany(),
    //         Business.deleteMany(),
    //         Events.deleteMany()
    //     ])
    //         .then(() => _connection.disconnect())
    // )
})