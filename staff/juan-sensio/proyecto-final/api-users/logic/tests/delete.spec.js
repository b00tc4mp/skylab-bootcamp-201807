'use strict'

require('dotenv').config()

const { MongoClient, ObjectId } = require('mongodb')

const { MONGO_URL } = process.env
const { logic } = require('../.')
const { expect } = require('chai')

describe('delete user', () => {
    const username = 'juan' + Math.random(), password = '123'
    let _conn, _db, _users, _id

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
            .then(() => logic.authenticate(username, password))
            .then(id => _id = id.toString())
    )

    it('should delete on correct credentials', () => {
        return logic.delete(_id, password)
            .then(res => {
                expect(res).to.be.true
                return _users.findOne(ObjectId(_id))
            })
            .then(user => expect(user).to.be.null)
    })

    it('should fail on trying to delete with an undefined id', () =>
        logic.delete(undefined, password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid id`))
    )

    it('should fail on trying to delete with an empty id', () =>
        logic.delete('', password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid id`))
    )

    it('should fail on trying to delete with a numeric id', () =>
        logic.delete(123, password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid id`))
    )

    it('should fail on trying to delete with an undefined password', () =>
        logic.delete(_id)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid password`))
    )

    it('should fail on trying to delete with an empty password', () =>
        logic.delete(_id, '')
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid password`))
    )

    it('should fail on trying to delete with a numeric password', () =>
        logic.delete(_id, 123)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid password`))
    )
})