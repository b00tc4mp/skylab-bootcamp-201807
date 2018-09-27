'use strict'

require('dotenv').config()

const mongoose = require('mongoose')
const { User } = require('../../mongoose/models')
const { MONGO_URL } = process.env
const { logic } = require('../.')
const { expect } = require('chai')
const fs = require('fs');
var rimraf = require('rimraf');

describe('register', () => {

    const username = 'test-' + Math.random(), password = '123'
    const path = './data/'
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
        if (!fs.existsSync(path))
            fs.mkdirSync(path)
        // simulate users in database
        let count = Math.ceil(Math.random() * 20)
        const creations = []
        while (count--) creations.push({ username: `username-${Math.random()}`, password: `123-${Math.random()}` })
        if (usersCount = creations.length)
            return User.create(creations)
    })

    afterEach(() => {
        if (fs.existsSync(path))
            rimraf(path, () => { })
        Promise.all([
            User.deleteMany()
        ])
    })

    it('should register on valid credentials', () =>
        User.findOne({ username })
            .then(user => {
                expect(user).to.be.null
                return logic.register(username, password)
            })
            .then(res => {
                expect(res).to.be.true
                return User.findOne({ username })
            })
            .then(user => {
                expect(user).to.exist
                expect(user.username).to.equal(username)
                expect(user.password).to.equal(password)
                expect(fs.existsSync(`${path}/${user.id}`)).to.be.true
                expect(fs.existsSync(`${path}/${user.id}/videos`)).to.be.true
                expect(fs.existsSync(`${path}/${user.id}/data-sets`)).to.be.true
                expect(fs.existsSync(`${path}/${user.id}/results`)).to.be.true
                return User.find()
            })
            .then(users => expect(users.length).to.equal(usersCount + 1))
    )

    it('should fail on trying to register an already registered user', () =>
        User.create({ username, password })
            .then(() => logic.register(username, password))
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`user ${username} already exists`))
    )

    it('should fail on trying to register with an undefined username', () =>
        logic.register(undefined, password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid username`))
    )

    it('should fail on trying to register with an empty username', () =>
        logic.register('', password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid username`))
    )

    it('should fail on trying to register with a numeric username', () =>
        logic.register(123, password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid username`))
    )

    it('should fail on trying to register with an undefined password', () =>
        logic.register(username)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid password`))
    )

    it('should fail on trying to register with an empty password', () =>
        logic.register(username, '')
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid password`))
    )

    it('should fail on trying to register with a numeric password', () =>
        logic.register(username, 123)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid password`))
    )

})