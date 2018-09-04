'use strict'

require('dotenv').config()

const { MongoClient } = require('mongodb')

const { MONGO_URL } = process.env
const { logic } = require('../.')
const { expect } = require('chai')

describe('authenticate', () => {
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

    beforeEach(() =>
        _users.insertOne({ username, password })
    )

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