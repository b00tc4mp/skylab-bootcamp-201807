'use strict'

require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const { MongoClient, ObjectId } = require('mongodb')

const { env: { MONGO_URL } } = process

// TODOs
// test cases where email is not a valid e-mail

describe('logic', () => {
    const email = `maider-${Math.random()}@mail.com`, password = `123-${Math.random()}`
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
        _notes.deleteMany()
            .then(() =>
                _users.deleteMany()
                    .then(() => {
                        let count = Math.floor(Math.random() * 100)

                        // const insertions = []

                        // while (count--) insertions.push(_users.insertOne({ email: `other-${Math.random()}@mail.com`, password: `123-${Math.random()}` }))

                        // if (usersCount = insertions.length)
                        //     return Promise.all(insertions)

                        const users = []

                        while (count--) users.push({ email: `other-${Math.random()}@mail.com`, password: `123-${Math.random()}` })

                        if (usersCount = users.length)
                            return _users.insertMany(users)
                    })
            )
    )

    true && describe('validate fields', () => {
        it('should give the correct value', () => {
            expect(() => logic._validateStringField('email', email).to.equal(email))
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

    true && describe('register user', () => {
        it('should register correctly', () =>
            _users.findOne({ email })
                .then(user => {
                    expect(user).to.be.null

                    return logic.register(email, password)
                })
                .then(() =>
                    _users.findOne({ email })
                )
                .then(user => {
                    expect(user).to.exist
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)

                    return _users.find().toArray()
                })
                .then(users => expect(users.length).to.equal(usersCount + 1))
        )

        it('should fail on trying to register an already registered user', () =>
            _users.insertOne({ email, password })
                .then(() => logic.register(email, password))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user with ${email} email already exist`))
        )

        it('should fail on trying to register with an undefined email', () =>
            logic.register(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with an empty email', () =>
            logic.register('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with a numeric email', () =>
            logic.register(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.register(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.register(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.register(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    true && describe('authenticate user', () => {
        beforeEach(() => _users.insertOne({ email, password }))

        it('should login correctly', () =>
            logic.authenticate(email, password)
                .then(res => {
                    expect(res).to.be.true
                })
        )

        it('should fail on trying to login with an undefined email', () =>
            logic.authenticate(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to login with an empty email', () =>
            logic.authenticate('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to login with a numeric email', () =>
            logic.authenticate(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to login with an undefined password', () =>
            logic.authenticate(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login with an empty password', () =>
            logic.authenticate(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login with a numeric password', () =>
            logic.authenticate(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    true && describe('update user', () => {
        const newPassword = `${password}-${Math.random()}`

        beforeEach(() => _users.insertOne({ email, password }))

        it('should update password correctly', () =>
            logic.updatePassword(email, password, newPassword)
                .then(res => {
                    expect(res).to.be.true
                    return _users.findOne({ email })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(newPassword)
                })
        )

        it('should fail on trying to update password with an undefined email', () =>
            logic.updatePassword(undefined, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update password with an empty email', () =>
            logic.updatePassword('', password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update password with a numeric email', () =>
            logic.updatePassword(123, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update password with an undefined password', () =>
            logic.updatePassword(email, undefined, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update password with an empty password', () =>
            logic.updatePassword(email, '', newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update password with a numeric password', () =>
            logic.updatePassword(email, 123, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update password with an undefined new password', () =>
            logic.updatePassword(email, password, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on trying to update password with an empty new password', () =>
            logic.updatePassword(email, password, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on trying to update password with a numeric new password', () =>
            logic.updatePassword(email, password, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )
    })

    true && describe('unregister user', () => {
        beforeEach(() => _users.insertOne({ email, password }))

        it('should unregister user correctly', () =>
            logic.unregisterUser(email, password)
                .then(res => {
                    expect(res).to.be.true

                    return _users.findOne({ email })
                })
                .then(user => {
                    expect(user).not.to.exist
                })
        )

        it('should fail on trying to unregister user with an undefined email', () =>
            logic.unregisterUser(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to unregister user with an empty email', () =>
            logic.unregisterUser('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to unregister user with a numeric email', () =>
            logic.unregisterUser(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to unregister user with an undefined password', () =>
            logic.unregisterUser(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to unregister user with an empty password', () =>
            logic.unregisterUser(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to unregister user with a numeric password', () =>
            logic.unregisterUser(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    true && describe('add note', () => {
        const date = new Date(), text = 'my note'

        beforeEach(() => {
            _users.insertOne({ email, password })
        })

        it('should succeed on correct data', () =>
            logic.addNote(email, date, text)
                .then(res => {
                    expect(res).to.be.true

                    return _users.findOne({ email })
                })
                .then(user => {
                    return _notes.find({ user: user._id }).toArray()
                })
                .then(notes => {
                    expect(notes.length).to.equal(1)

                    const [note] = notes

                    expect(note.text).to.equal(text)
                    expect(note.date).to.deep.equal(date)
                })
        )

        it('should fail on trying to add note with an undefined email', () =>
            logic.addNote(undefined, date, text)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add note with an empty email', () =>
            logic.addNote('', date, text)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add note with a numeric email', () =>
            logic.addNote(123, date, text)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add note with an undefined date', () =>
            logic.addNote(email, undefined, text)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid date'))
        )

        it('should fail on trying to add note with an empty date', () =>
            logic.addNote(email, '', text)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid date'))
        )

        it('should fail on trying to add note with a numeric date', () =>
            logic.addNote(email, 123, text)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid date'))
        )

        it('should fail on trying to add note with an undefined text', () =>
            logic.addNote(email, date, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid text'))
        )

        it('should fail on trying to add note with an empty text', () =>
            logic.addNote(email, date, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid text'))
        )

        it('should fail on trying to add note with a numeric text', () =>
            logic.addNote(email, date, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid text'))
        )
    })

    true && describe('list notes', () => {
        const notes = [
            { date: new Date('2018-08-20T12:10:15.474Z'), text: 'text 1' },
            { date: new Date('2018-08-23T13:00:00.000Z'), text: 'cumple jordi' },
            { date: new Date('2018-08-24T13:15:00.000Z'), text: 'pizza' },
            { date: new Date('2018-08-24T13:19:00.000Z'), text: 'la china' },
            { date: new Date('2018-08-24T13:21:00.000Z'), text: 'party hard' }
        ]

        beforeEach(() =>
            _users.insertOne({ email, password })
                .then(res => {
                    const userId = res.ops[0]._id

                    notes.forEach(note => note.user = userId)

                    return _notes.insertMany(notes)
                })
        )

        it('should list all user notes', () => {
            return logic.listNotes(email, new Date('2018-08-24'))
                .then(_notes => {
                    const expectedNotes = notes.slice(2)

                    expect(_notes.length).to.equal(expectedNotes.length)

                    const normalizedNotes = expectedNotes.map(note => {
                        note.id = note._id.toString()

                        delete note._id

                        delete note.user

                        return note
                    })

                    expect(_notes).to.deep.equal(normalizedNotes)
                })
        })
    })

    true && describe('remove note', () => {
        const notes = [
            { date: new Date(), text: 'text 1' },
            { date: new Date(), text: 'text 2' },
            { date: new Date(), text: 'text 3' },
            { date: new Date(), text: 'text 4' }
        ]

        let noteId

        beforeEach(() =>
            _users.insertOne({ email, password })
                .then(res => {
                    const userId = res.ops[0]._id

                    notes.forEach(note => note.user = userId)

                    return _notes.insertMany(notes)
                })
                .then(res => noteId = res.ops[0]._id.toString())
        )

        it('should succeed on correct note id', () =>
            logic.removeNote(email, noteId)
                .then(res => {
                    expect(res).to.be.true

                    return _users.findOne({ email })
                })
                .then(user => {
                    return _notes.find({ user: user._id }).toArray()
                })
                .then(_notes => {
                    const expectedNotes = notes.slice(1)

                    expect(_notes.length).to.equal(expectedNotes.length)

                    expect(_notes).to.deep.equal(expectedNotes)
                })
        )

        it('should fail on non existing note', () => {
            const nonExistingId = ObjectId().toString()

            return logic.removeNote(email, nonExistingId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`note with id ${nonExistingId} does not exist`))
        })
    })

    after(() => {
        debugger
        
        _notes.deleteMany()
            .then(() => _users.deleteMany())
            .then(() => _connect.close())
    })
})