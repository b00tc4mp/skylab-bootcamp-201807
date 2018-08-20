'use strict'

require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const { MongoClient } = require('mongodb')

const { env: { MONGO_URL } } = process

describe('logic', () => {
    const username = `maider-${Math.random()}@mail.com`, password = `123-${Math.random()}`
    let _connect, _db, _users
    let usersCount

    before(done => {
        MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, connect) => {
            if (err) return done(err)

            _connect = connect

            const db = _db = connect.db()

            logic._users = _users = db.collection('users')

            done()
        })
    })

    beforeEach(() =>
        _users.deleteMany()
            .then(() => {
                let count = Math.floor(Math.random() * 100)

                // const insertions = []

                // while (count--) insertions.push(_users.insertOne({ username: `other-${Math.random()}@mail.com`, password: `123-${Math.random()}` }))

                // if (usersCount = insertions.length)
                //     return Promise.all(insertions)

                const users = []

                while (count--) users.push({ username: `other-${Math.random()}@mail.com`, password: `123-${Math.random()}` })

                if (usersCount = users.length)
                    return _users.insertMany(users)
            })
    )

    describe('validate fields', () => {
        it('should give the correct value', () => {
            expect(() => logic._validateStringField('username', username).to.equal(username))
            expect(() => logic._validateStringField('password', password).to.equal(password))
        })

        it('should fail on undefined value', () => {
            expect(() => logic._validateStringField('name', undefined)).to.throw(`invalid name`)
        })

        it('should fail on empty value', () => {
            expect(() => logic._validateStringField('name', '')).to.throw(`invalid name`)
        })

        it('should fail on numeric value', () => {
            expect(() => logic._validateStringField('name', 123)).to.throw(`invalid name`)
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
            _users.insertOne({ username, password })
                .then(() => logic.register(username, password))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user with ${username} username already exist`))
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

    describe('authenticate user', () => {

        beforeEach(() => _users.insertOne({ username, password }))

        it('should login correctly', () =>
            logic.authenticate(username, password)
                .then(res => {
                    expect(res).to.be.true
                })
        )

        it('should fail on trying to login with an undefined username', () =>
            logic.authenticate(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to login with an empty username', () =>
            logic.authenticate('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to login with a numeric username', () =>
            logic.authenticate(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to login with an undefined password', () =>
            logic.authenticate(username, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login with an empty password', () =>
            logic.authenticate(username, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login with a numeric password', () =>
            logic.authenticate(username, 123)
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

                    return _users.findOne({ username })
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

    describe('add note', () => {
        const date = new Date(), text = 'my note'

        beforeEach(() => {
            _users.insertOne({ username, password })
        })

        it('should succeed on correct data', () =>
            logic.addNote(username, date, text)
                .then(res => {
                    expect(res).to.be.true

                    return _users.findOne({ username })
                })
                .then(user => {
                    expect(user.notes.length).to.equal(1)

                    const [note] = user.notes

                    expect(note.text).to.equal(text)
                    expect(note.date).to.deep.equal(date)
                })
        )

        it('should fail on trying to add note with an undefined username', () =>
            logic.addNote(undefined, date, text)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to add note with an empty username', () =>
            logic.addNote('', date, text)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to add note with a numeric username', () =>
            logic.addNote(123, date, text)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to add note with an undefined date', () =>
            logic.addNote(username, undefined, text)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid date'))
        )

        it('should fail on trying to add note with an empty date', () =>
            logic.addNote(username, '', text)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid date'))
        )

        it('should fail on trying to add note with a numeric date', () =>
            logic.addNote(username, 123, text)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid date'))
        )

        it('should fail on trying to add note with an undefined text', () =>
            logic.addNote(username, date, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid text'))
        )

        it('should fail on trying to add note with an empty text', () =>
            logic.addNote(username, date, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid text'))
        )

        it('should fail on trying to add note with a numeric text', () =>
            logic.addNote(username, date, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid text'))
        )
    })

    false && describe('user contacts', () => {

        const contact = 'iker', telephone = '666 222 666'

        beforeEach(() => _users.insertOne({ username, password, contacts: [] }))

        it('should add user contacts correctly', () =>
            logic.addContacts(username, password, contact, telephone)
                .then(res => {
                    expect(res).to.be.true
                    return _users.findOne({ username })
                })
                .then(user => {
                    expect(user.contacts.length).to.equal(1)
                    expect(user.contacts[0].contact).to.equal(contact)
                    expect(user.contacts[0].contact).to.equal('iker')
                    expect(user.contacts[0].telephone).to.equal(telephone)
                    expect(user.contacts[0].telephone).to.equal('666 222 666')
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

