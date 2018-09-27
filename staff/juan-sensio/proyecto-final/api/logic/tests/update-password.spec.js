'use strict'

require('dotenv').config()

const mongoose = require('mongoose')
const { User } = require('../../mongoose/models')
const { logic } = require('../.')
const { expect } = require('chai')

const { MONGO_URL } = process.env

describe('update password', () => {

    const username = 'test-' + Math.random()
    const password = '123'
    const newPassword = '456'

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
        return logic.updatePassword(_id, password, newPassword)
            .then(res => {
                expect(res).to.be.true
                return User.findById(_id)
            })
            .then(user => expect(user.password).to.equal(newPassword))
    })

    it('should fail on same password', () => {
        return logic.updatePassword(_id, password, password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`new password must be different`))
    })

    it('should fail on wrong password', () => {
        return logic.updatePassword(_id, '456', newPassword)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('wrong credentials'))
    })

    it('should fail on trying to update password with an undefined password', () => {
        return logic.updatePassword(_id, password, undefined)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid newPassword'))
    })

    it('should fail on trying to update password with an empty Password', () => {
        return logic.updatePassword(_id, password, '')
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid newPassword'))
    })

    it('should fail on trying to update password with a numeric password', () => {
        return logic.updatePassword(_id, password, 123)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid newPassword'))
    })

    it('should fail on trying to update password with an undefined password', () => {
        return logic.updatePassword(_id, undefined, newPassword)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid password'))
    })

    it('should fail on trying to update password with an empty password', () => {
        return logic.updatePassword(_id, '', newPassword)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid password'))
    })

    it('should fail on trying to update password with a numeric password', () => {
        return logic.updatePassword(_id, 123, newPassword)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid password'))
    })

})