'use strict'

require('dotenv').config()

const { MongoClient, ObjectId } = require('mongodb')

const { MONGO_URL } = process.env
const { logic } = require('../.')
const { expect } = require('chai')

describe('update user', () => {
    const username = 'juan' + Math.random(), password = '123'
    const newUsername = username + 'updated', newPassword = password + 'updated'
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
    after( () => _conn.close())
    beforeEach(() =>
        _users.insertOne({ username, password })
            .then(() => logic.authenticate(username, password))
            .then(id => _id = id.toString())
    )
    afterEach(() => _users.deleteMany())

    it('should update on correct credentials', () => {
        return logic.update(_id, password, newUsername, newPassword)
            .then(res => {
                expect(res).to.be.true
                return _users.findOne(ObjectId(_id))
            })
            .then(user => {
                expect(user._id.toString()).to.equal(_id)
                expect(user.username).to.equal(newUsername)
                expect(user.username).not.to.equal(username)
                expect(user.password).to.equal(newPassword)
                expect(user.password).not.to.equal(password)
            })
    })

    it('should update username with same password', () => {
        return logic.update(_id, password, newUsername, password)
            .then(res => {
                expect(res).to.be.true
                return _users.findOne(ObjectId(_id))
            })
            .then(user => {
                expect(user._id.toString()).to.equal(_id)
                expect(user.username).to.equal(newUsername)
                expect(user.username).not.to.equal(username)
                expect(user.password).not.to.equal(newPassword)
                expect(user.password).to.equal(password)
            })
    })

    it('should update password with same username', () => {
        return logic.update(_id, password, username, newPassword)
            .then(res => {
                expect(res).to.be.true
                return _users.findOne(ObjectId(_id))
            })
            .then(user => {
                expect(user._id.toString()).to.equal(_id)
                expect(user.username).not.to.equal(newUsername)
                expect(user.username).to.equal(username)
                expect(user.password).to.equal(newPassword)
                expect(user.password).not.to.equal(password)
            })
    })

    it('should fail on trying to update with an already existing username', () =>
        _users.insertOne({ username: newUsername, password })
            .then( () => {
                return logic.update(_id, password, newUsername, newPassword)
            })
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`user ${newUsername} already exists`))
    )

    it('should fail on trying to update with an undefined id', () =>
        logic.update(undefined, password, newUsername, newPassword)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid id`))
    )

    it('should fail on trying to update with an empty id', () =>
        logic.update('', password, newUsername, newPassword)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid id`))
    )

    it('should fail on trying to update with a numeric id', () =>
        logic.update(123, password, newUsername, newPassword)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid id`))
    )

    it('should fail on trying to update with an undefined password', () =>
        logic.update(_id, undefined, newUsername, newPassword)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid password`))
    )

    it('should fail on trying to update with an empty password', () =>
        logic.update(_id, '', newUsername, newPassword)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid password`))
    )

    it('should fail on trying to update with a numeric password', () =>
        logic.update(_id, 123, newUsername, newPassword)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid password`))
    )

    it('should fail on trying to update with an undefined new username', () =>
        logic.update(_id, password, undefined, newPassword)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid newUsername`))
    )

    it('should fail on trying to update with an empty new username', () =>
        logic.update(_id, password, '', newPassword)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid newUsername`))
    )

    it('should fail on trying to update with a numeric new username', () =>
        logic.update(_id, password, 123, newPassword)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid newUsername`))
    )

    it('should fail on trying to update with an undefined new password', () =>
        logic.update(_id, password, newUsername, undefined)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid newPassword`))
    )

    it('should fail on trying to update with an empty new password', () =>
        logic.update(_id, password, newUsername, '')
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid newPassword`))
    )

    it('should fail on trying to update with a numeric new password', () =>
        logic.update(_id, password, newUsername, 123)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid newPassword`))
    )
    
})