'use strict'

require('dotenv').config()

const mongoose = require('mongoose')
const { User } = require('../../mongoose/models')
const { logic } = require('../.')
const { expect } = require('chai')
const fs = require('fs')

const { MONGO_URL } = process.env

describe('delete user', () => {

    const username = 'test-' + Math.random()
    const password = '123'
    const path = './data'

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

    it('should delete on correct credentials', () => {
        return logic.delete(_id, password)
            .then(res => {
                expect(res).to.be.true
                debugger
                return User.findById(_id)
            })
            .then(user => {
                expect(user).not.to.exist
                expect(fs.existsSync(`${path}/${_id}`)).to.be.false
            })
    })

    it('should fail on wrong password', () => {
        return logic.delete(_id, '456')
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('wrong credentials'))
    })

    it('should fail on trying to delete user with an undefined password', () => {
        return logic.delete(_id, undefined)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid password'))
    })

    it('should fail on trying to delete user with an empty Password', () => {
        return logic.delete(_id, '')
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid password'))
    })

    it('should fail on trying to delete user with a numeric password', () => {
        return logic.delete(_id, 123)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid password'))
    })

    it('should fail on trying to delete user with an undefined id', () => {
        return logic.delete(undefined, password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid id'))
    })

    it('should fail on trying to delete user with an empty id', () => {
        return logic.delete('', password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid id'))
    })

    it('should fail on trying to update password with a numeric password', () => {
        return logic.delete(123, password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('invalid id'))
    })

})