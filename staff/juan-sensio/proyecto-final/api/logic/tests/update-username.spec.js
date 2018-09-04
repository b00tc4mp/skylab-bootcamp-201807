'use strict'

require('dotenv').config()

const mongoose = require('mongoose')
const { User } = require('../../mongoose/models')
const { logic } = require('../.')
const { expect } = require('chai')

const { MONGO_URL } = process.env

describe('update username', () => {

    const username = 'test-' + Math.random()
    const newUsername = 'test-' + Math.random()
    const password = '123'

    let _conn, usersCount = 0, _id

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
                .then(() => User.findOne({username}))
                .then(user => _id = user.id)
    })

    afterEach(() => {
        return Promise.all([
            User.deleteMany()
        ])
    })

    it('should update on correct credentials', () => {
        return logic.updateUsername(_id, password, newUsername)
            .then(res => {
                expect(res).to.be.true
                return User.findById(_id)
            })
            .then(user => expect(user.username).to.equal(newUsername))
    })

    it('should fail on already existing user', () => {
        const username = 'test'
        return User.create({username, password})
            .then( () => logic.updateUsername(_id, password, username))
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`user ${username} already exists`))
    })

    it('should fail on wrong password', () => {
        return logic.updateUsername(_id, '456', username)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('wrong credentials'))
    })

    it('should fail on trying to update username with an undefined username', () => {
        return logic.updateUsername(_id, password, undefined)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid newUsername'))
    })

    it('should fail on trying to update username with an empty username', () => {
        return logic.updateUsername(_id, password, '')
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid newUsername'))
    })

    it('should fail on trying to update username with a numeric username', () => {
        return logic.updateUsername(_id, password, 123)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid newUsername'))
    })

    it('should fail on trying to update username with an undefined password', () => {
        return logic.updateUsername(_id, undefined, newUsername)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid password'))
    })

    it('should fail on trying to update username with an empty password', () => {
        return logic.updateUsername(_id, '', newUsername)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid password'))
    })

    it('should fail on trying to update username with a numeric password', () => {
        return logic.updateUsername(_id, 123, newUsername)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid password'))
    })

})