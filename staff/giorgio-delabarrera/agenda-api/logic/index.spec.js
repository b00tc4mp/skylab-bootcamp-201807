'use strict'

require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const { MongoClient } = require('mongodb')

const { env: { MONGO_URL } } = process

describe('logic', () => {
    const username = `maider-${Math.random()}@mail.com`, password = `123-${Math.random()}`
    let _connect, _db, _users, _notes
    let usersCount

    before(done => {
        MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, connect) => {
            if (err) return done(err)

            _connect = connect

            const db = _db = connect.db()

            logic._users = _users = db.collection('users')
            logic._notes = _notes = db.collection('notes')

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

        beforeEach(() => _users.insertOne({ username, password }))

        it('should succeed on correct data', () =>
            logic.addNote(username, date, text)
                .then(res => {
                    expect(res).to.be.true

                    return _users.findOne({ username })
                })
                .then(user => {
                    return _notes.find({ user_id: user._id }).toArray()
                })
                .then(notes => {
                    expect(notes.length).to.equal(1)

                    const [note] = notes

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

    describe('list notes', () => {

        beforeEach(() => {

            const notes = [
                { date: new Date('2018-08-20T12:10:15.474Z'), text: 'text 1' },
                { date: new Date('2018-08-23T13:00:00.000Z'), text: 'cumple jordi' },
                { date: new Date('2018-08-24T13:15:00.000Z'), text: 'pizza' },
                { date: new Date('2018-08-24T13:19:00.000Z'), text: 'la china' },
                { date: new Date('2018-08-24T13:21:00.000Z'), text: 'party hard' }
            ]

            return _users.insertOne({ username, password })
                .then(() => _users.findOne({ username }))
                .then(user => notes.forEach(note => note.user_id = user._id))
        })

        it('should list all user notes', () => {
            return logic.listNotes(username, new Date('2018-08-24'))
                .then(notes => {

                    const expectedNotes = notes.slice(2)

                    expect(notes.length).to.equal(expectedNotes.length)

                    const normalizedNotes = expectedNotes.map(note => {
                        note.id = note._id.toString()

                        delete note._id

                        return note
                    })

                    expect(notes).to.deep.equal(normalizedNotes)
                })
        })
    })

    false && describe('remove note', () => {
        const notes = [
            { _id: ObjectId(), date: new Date(), text: 'text 1' },
            { _id: ObjectId(), date: new Date(), text: 'text 2' },
            { _id: ObjectId(), date: new Date(), text: 'text 3' },
            { _id: ObjectId(), date: new Date(), text: 'text 4' }
        ]

        beforeEach(() => _users.insertOne({ email, password, notes }))

        it('should succeed on correct note id', () =>
            logic.removeNote(email, notes[0]._id.toString())
                .then(res => {
                    expect(res).to.be.true

                    return _users.findOne({ email })
                })
                .then(user => {
                    expect(user.notes.length).to.equal(3)

                    expect(user.notes).to.deep.equal(notes.slice(1))
                })
        )

        it('should fail on non existing note', () => {
            const nonExistingId = ObjectId()

            return logic.removeNote(email, nonExistingId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`note with id ${nonExistingId} does not exist`))
        })
    })

    after(() => {
        _users.deleteMany()
            .then(() => _connect.close())
    })
})

