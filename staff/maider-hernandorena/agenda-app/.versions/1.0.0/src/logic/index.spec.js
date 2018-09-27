'use strict'

require('dotenv').config()

require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
const jwt = require('jsonwebtoken')

describe('logic', () => {
    const { jwt_secret } = process.env
    let username, password

    beforeEach(() => {
        username = `maider-${Math.random()}`, password = '123'
    })

    describe('validate fields', () => {

        it('should give the correct value', () => {
            expect(() => logic._validateField('username', username).to.equal(username))
            expect(() => logic._validateField('password', password).to.equal(password))
        })

        it('should fail on undefined value', () => {
            expect(() => logic._validateField('name', undefined)).to.throw(`invalid name`)
        })

        it('should fail on empty value', () => {
            expect(() => logic._validateField('name', '')).to.throw(`invalid name`)
        })

        it('should fail on numeric value', () => {
            expect(() => logic._validateField('name', 123)).to.throw(`invalid name`)
        })
    })

    describe('register user', () => {
        it('should register user correctly', () =>
            logic.register(username, password)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on already existing user', () =>
            logic.register(username, password)
                .then(() => logic.register(username, password))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`user with ${username} username already exist`)
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

        it('should fail on empty password', () =>
            logic.register(username, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        )
    })


    describe('login user', () => {

        it('should login user correctly', () =>
            logic.register(username, password)
                .then(() => logic.login(username, password))
                .then(token => {
                    expect(token).to.be.a('string')

                    let payload

                    expect(() => payload = jwt.verify(token, jwt_secret)).not.to.throw()
                    expect(payload.sub).to.equal(username)
                })
        )

        it('should fail on unregistered user', () =>
            logic.login(username, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`user with ${username} username does not exist`)
                })
        )

        it('should fail on empty username', () =>
            logic.login('', password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid username`)
                })
        )

        it('should fail on empty password', () =>
            logic.login(username, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        )
    })

})