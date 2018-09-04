'use strict'

require('dotenv').config()

const mongoose = require('mongoose')
const { User } = require('../../mongoose/models')
const { logic } = require('../.')
const { expect } = require('chai')

const { MONGO_URL } = process.env

describe('authenticate', () => {

    const username = 'test-' + Math.random(), password = '123'
    let _conn, usersCount = 0

    before(() => {
        // connect database
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _conn = conn)
        // clean database
        return Promise.all([
            User.deleteMany()
        ])
    })

    // disconnect database
    after(() => _conn.disconnect())

    beforeEach(() => {
        // simulate users in database
        let count = Math.ceil(Math.random() * 20)
        const creations = []
        while (count--) 
            creations.push({ username: `username-${Math.random()}`, password: `123-${Math.random()}` })
        creations.push({username, password})
        if (usersCount = creations.length)
            return User.create(creations)
    })

    afterEach(() => {
        return Promise.all([
            User.deleteMany()
        ])
    })

    it('should authenticate on correct credentials', () => {
        return logic.authenticate(username, password)
            .then(res => expect(res).to.exist)
    })

    it('should fail on wrong credentials', () => {
        return logic.authenticate('pepito', 'grillo')
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('user pepito does not exist'))
    })

    it('should fail on wrong password', () => {
        return logic.authenticate(username, '456')
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('wrong credentials'))
    })

    it('should fail on trying to authenticate with an undefined username', () => {
        return logic.authenticate(undefined, password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid username'))
    })

    it('should fail on trying to authenticate with an empty username', () => {
        return logic.authenticate('', password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid username'))
    })

    it('should fail on trying to authenticate with a numeric username', () => {
        return logic.authenticate(123, password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid username'))
    })

    it('should fail on trying to authenticate with an undefined password', () => {
        return logic.authenticate(username, undefined)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid password'))
    })

    it('should fail on trying to authenticate with an empty password', () => {
        return logic.authenticate(username, '')
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid password'))
    })

    it('should fail on trying to authenticate with a numeric password', () => {
        return logic.authenticate(username, 123)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid password'))
    })

})