'use strict'

require('dotenv').config()

require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
//const fs = require('fs')
//const rimraf = require('rimraf')
const FormData = require('form-data')
//const Jimp = require('jimp')
const jwt = require('jsonwebtoken')
const randomEmail = require('random-email')
global.FormData = FormData

describe('logic', () => {
    const { JWT_SECRET } = process.env
    let username, password


    beforeEach(() => {
        username = "bobbo" + Math.random() + "@bobo.com"
        password = 'ABCDef12342'
    })

    describe('register user', () => {
        it('should succeed on new user', () =>
            logic.register(username, password)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on already existing user', () =>
            logic.register(username, password)
                .then(() => logic.register(username, password))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`user with ${username} email already exist`)
                })
        )

        it('should fail on empty username', () =>
            logic.register('', password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid username`)
                })
        )

        it('should fail on password user', () =>
            logic.register(username, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        )
    })

    describe('authenticate user', () => {
        it('should succeed on existing user', () =>
            logic.register(username, password)
                .then(() => logic.authenticate(username, password))
                .then(token => {
                    expect(token).to.be.a('string')

                    let payload

                    expect(() => payload = jwt.verify(token, JWT_SECRET)).not.to.throw()
                    expect(payload.sub).to.equal(username)
                })
        )

        it('should fail on unregistered user', () =>
            logic.authenticate(username, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`user with ${username} email does not exist`)
                })
        )

        it('should fail on empty username', () =>
            logic.authenticate('', password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid username`)
                })
        )

        it('should fail on password user', () =>
            logic.authenticate(username, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        )
    })

})

