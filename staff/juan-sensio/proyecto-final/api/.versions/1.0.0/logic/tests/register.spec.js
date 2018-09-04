'use strict'

require('dotenv').config()

const { MongoClient } = require('mongodb')

const { MONGO_URL } = process.env
const { logic } = require('../.')
const { expect } = require('chai')

describe('register', () => {
    const username = 'juan'+Math.random(), password = '123'
    let _conn, _db, _users

    before(done => {
        MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, conn) => {
            if (err) return done(err)
            _conn = conn
            const db = _db = conn.db()
            logic._users = _users = db.collection('users')
            done()
        })
    })
    after(() => {
        return _users.deleteMany()
            .then(() => _conn.close())
    })

    beforeEach(() => _users.deleteMany())

    it('should register on valid credentials', () =>
        _users.findOne({ username })
            .then(user => {
                expect(user).to.be.null
                return logic.register(username, password)
            })
            .then(() => _users.findOne({ username }))
            .then(user => {
                expect(user).to.exist
                expect(user.username).to.equal(username)
                expect(user.password).to.equal(password)
                expect(user.data).to.exist
            })
    )

    it('should fail on trying to register an already registered user', () =>
        _users.insertOne({ username, password })
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