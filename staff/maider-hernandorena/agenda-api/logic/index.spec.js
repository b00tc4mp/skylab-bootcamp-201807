'use strict'

require('dotenv').config()

const logic = require('.')
const { expect } = require('chai')
const { MongoClient } = require('mongodb')

const { env: { mongo_path } } = process


describe('logic', () => {
    const username = 'maider', password = '123'
    let _connect, _db, _users

    before(done => {
        MongoClient.connect(mongo_path, { useNewUrlParser: true }, (err, connect) => {
            if (err) return done(err)

            _connect = connect

            const db = _db = connect.db()

            debugger
            logic._users = _users = db.collection('users')

            done()
        })
    })

    beforeEach(() => _users.deleteMany())

    describe('validate fields', () => {

        it('should give the correct value', () => {
            expect(() => logic._validateField('username', username).to.equal(username))
            expect(() => logic._validateField('email', email).to.equal(email))
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
        it('should register correctly', () =>
            _users.findOne({ username })
                .then(user => {
                    expect(user).to.be.null

                    return logic.register(username, password)
                })
                .then(() =>
                    _users.findOne({ username })
                )
                .then(user => {
                    expect(user).to.exist
                    expect(user.username).to.equal(username)
                    expect(user.password).to.equal(password)
                })
        )

        it('should fail on trying to register an already registered user', () =>
            _users.insertOne({ username,  password })
                .then(() => logic.register(username,  password))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user with ${username} username already exists`))
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
            logic.register(username, undefined)
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

    describe('login user', () => {

        beforeEach(() => _users.insertOne({ username, password }))

        it('should login correctly', () => 
            logic.login(username, password)
                .then(res => {
                    expect(res).to.be.true
                })
        )

        it('should fail on trying to login with an undefined username', () =>
            logic.login(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to login with an empty username', () =>
            logic.login('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to login with a numeric username', () =>
            logic.login(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to login with an undefined password', () =>
            logic.login(username, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login with an empty password', () =>
            logic.login(username, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login with a numeric password', () =>
            logic.login(username, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    describe('update user', () => {

        const newPassword = `${password}-${Math.random()}`

        beforeEach(() => _users.insertOne({ username, password }))

        it('should update password correctly', () => 
            logic.updatePassword(username, password, newPassword)
                .then(res => {
                    expect(res).to.be.true
                    return _users.findOne({ username })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.username).to.equal(username)
                    expect(user.password).to.equal(newPassword)
                })
        )

        it('should fail on trying to update password with an undefined username', () =>
            logic.updatePassword(undefined, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to update password with an empty username', () =>
            logic.updatePassword('', password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to update password with a numeric username', () =>
            logic.updatePassword(123, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to update password with an undefined password', () =>
            logic.updatePassword(username, undefined, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update password with an empty password', () =>
            logic.updatePassword(username, '', newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update password with a numeric password', () =>
            logic.updatePassword(username, 123, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
        
        it('should fail on trying to update password with an undefined new password', () =>
            logic.updatePassword(username, password, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on trying to update password with an empty new password', () =>
            logic.updatePassword(username, password, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on trying to update password with a numeric new password', () =>
            logic.updatePassword(username, password, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )
    })

    describe('delete user', () => {

        beforeEach(() => _users.insertOne({ username, password }))

        it('should delete user correctly', () => 
            logic.deleteUser(username, password)
                .then(res => {
                    expect(res).to.be.true
                    return _users.findOne({username})
                })
                .then(user => {
                    expect(user).not.to.exist
                })
        )

        it('should fail on trying to delete user with an undefined username', () =>
            logic.deleteUser(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to delete user with an empty username', () =>
            logic.deleteUser('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to delete user with a numeric username', () =>
            logic.deleteUser(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to delete user with an undefined password', () =>
            logic.deleteUser(username, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to delete user with an empty password', () =>
            logic.deleteUser(username, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to delete user with a numeric password', () =>
            logic.deleteUser(username, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    describe('user notes', () => {

        const title = 'my note title', note = 'my note content'

        beforeEach(() => _users.insertOne({ username, password, notes:[] }))

        it('should add user notes correctly', () => 
            logic.addNotes(username, password, title, note)
                .then(res => {
                    expect(res).to.be.true
                    return _users.findOne({username})
                })
                .then(user => {
                    expect(user.notes.length).to.equal(1)
                    expect(user.notes[0].title).to.equal(title)
                    expect(user.notes[0].note).to.equal(note)
                })
        )

        it('should fail on trying to add note with an undefined username', () =>
            logic.addNotes(undefined, password, title, note)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to add note with an empty username', () =>
            logic.addNotes('', password, title, note)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to add note with a numeric username', () =>
            logic.addNotes(123, password, title, note)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to add note with an undefined password', () =>
            logic.addNotes(username, undefined, title, note)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to add note with an empty password', () =>
            logic.addNotes(username, '', title, note)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to add note with a numeric password', () =>
            logic.addNotes(username, 123, title, note)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to add note with an undefined title', () =>
            logic.addNotes(username, password, undefined, note)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid title`))
        )

        it('should fail on trying to add note with an empty title', () =>
            logic.addNotes(username, password, '', note)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid title`))
        )

        it('should fail on trying to add note with a numeric title', () =>
            logic.addNotes(username, password, 123, note)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid title`))
        )

        it('should fail on trying to add note with an undefined note', () =>
            logic.addNotes(username, password, title, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid note`))
        )

        it('should fail on trying to add note with an empty note', () =>
            logic.addNotes(username, password, title, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid note`))
        )

        it('should fail on trying to add note with a numeric note', () =>
            logic.addNotes(username, password, title, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid note`))
        )
    })

    describe('user contacts', () => {

        const contact = 'iker', telephone = '666 222 666'

        beforeEach(() => _users.insertOne({ username, password, contacts:[] }))

        it('should add user contacts correctly', () => 
            logic.addContacts(username, password, contact, telephone)
                .then(res => {
                    expect(res).to.be.true
                    return _users.findOne({username})
                })
                .then(user => {
                    expect(user.contacts.length).to.equal(1)
                    expect(user.contacts[0].contact).to.equal(contact)
                    expect(user.contacts[0].telephone).to.equal(telephone)
                })
        )

        it('should fail on trying to add contacts with an undefined username', () =>
            logic.addContacts(undefined, password, contact, telephone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to add contacts with an empty username', () =>
            logic.addContacts('', password, contact, telephone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to add contacts with a numeric username', () =>
            logic.addContacts(123, password, contact, telephone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to add contacts with an undefined password', () =>
            logic.addContacts(username, undefined, contact, telephone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to add contacts with an empty password', () =>
            logic.addContacts(username, '', contact, telephone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to add contacts with a numeric password', () =>
            logic.addContacts(username, 123, contact, telephone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to add contacts with an undefined contact', () =>
            logic.addContacts(username, password, undefined, telephone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid contact`))
        )

        it('should fail on trying to add contacts with an empty contact', () =>
            logic.addContacts(username, password, '', telephone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid contact`))
        )

        it('should fail on trying to add contacts with a numeric contact', () =>
            logic.addContacts(username, password, 123, telephone)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid contact`))
        )

        it('should fail on trying to add contacts with an undefined telephone', () =>
            logic.addContacts(username, password, contact, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid telephone`))
        )

        it('should fail on trying to add contacts with an empty telephone', () =>
            logic.addContacts(username, password, contact, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid telephone`))
        )

        it('should fail on trying to add contacts with a numeric telephone', () =>
            logic.addContacts(username, password, contact, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid telephone`))
        )
    })

    after(() => {
        _users.deleteMany()
            .then(() => _connect.close())
    })

})