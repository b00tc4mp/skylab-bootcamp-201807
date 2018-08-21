'use strict'

require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const { MongoClient, ObjectId } = require('mongodb')

const { MONGO_URL } = process.env

describe('logic', () => {
    let _conn, _db, _users
    const username = 'Jack', password = '123'

    before(done => {
        MongoClient.connect(MONGO_URL, {useNewUrlParser: true}, (err, conn) => {
            if (err) return done(err)

            _conn = conn

            const db = _db = conn.db()

            logic._users = _users = db.collection('users')

            done()
        })
    })

    beforeEach(() => {
        return _users.deleteMany()
    })

    describe('_ validate string field', () => {
        it('it should fail on undefined value', () => {
            expect(() => logic._validateStringField('whatever', undefined)).to.throw(`invalid whatever`)
        })

        it('it should fail on empty value', () => {
            expect(() => logic._validateStringField('whatever', '')).to.throw(`invalid whatever`)
        })

        it('it should fail on numeric value', () => {
            expect(() => logic._validateStringField('whatever', 123)).to.throw(`invalid whatever`)
        })
    })

    describe('register', () => {
        it('should register on valid credentials', () => 
            _users.findOne({ username })
                .then(user => {
                    expect(user).to.be.null

                    return logic.register(username, password)
                })
                .then(() =>  _users.findOne({ username }))
                .then(user => {
                    expect(user).to.exist
                    expect(user.username).to.equal(username)
                    expect(user.password).to.equal(password)
                })
        )

        it('should fail on trying to register an already registered username', () =>
            _users.insertOne({username, password})
                .then(() => logic.register(username, password))
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`user ${username} already exists`))
        )

        it ('should fail on trying to register with an undefined username', () => 
            logic.register(undefined, password)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid username`))
        )

        it ('should fail on trying to register with an empty username', () => 
            logic.register('', password)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid username`))
        )

        it ('should fail on trying to register with a numeric username', () => 
            logic.register(123, password)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid username`))
        )

        it ('should fail on trying to register with an undefined password', () =>
            logic.register(username)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid password`))
        )

        it ('should fail on trying to register with an empty password', () =>
            logic.register(username, '')
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid password`))
        )

        it ('should fail on trying to register with a numeric password', () =>
            logic.register(username, 123)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid password`))
        )
    })

    describe('authenticate', () => {
        beforeEach(() => _users.insertOne({username, password}))

        it('should authenticate on correct credentials', () => 
            logic.authenticate(username, password)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on wrong credentials', () => 
            logic.authenticate('fulanito', 'notpass')
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('user fulanito does not exist'))
        )

        it('should fail on wrong password', () => 
            logic.authenticate(username, '456')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('wrong credentials'))
        )

        it('should fail on trying to authenticate with an undefined username', () => 
            logic.authenticate(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid username'))
        )

        it('should fail on trying to authenticate with an empty username', () => 
            logic.authenticate('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid username'))
        )

        it('should fail on trying to authenticate with a numeric username', () => 
            logic.authenticate(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid username'))
        )

        it('should fail on trying to authenticate with an undefined password', () => 
            logic.authenticate(username, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to authenticate with an empty password', () => 
            logic.authenticate(username, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to authenticate with a numeric password', () => 
            logic.authenticate(username, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )
    })

    describe('update password', () => {
        const newPassword = `${password}-${Math.random()}`

        beforeEach(() => _users.insertOne({ username, password }))

        it('should update password on correct credentials and new password', () =>
            logic.updatePassword(username, password, newPassword)
                .then(res => {
                    expect(res).to.be.exist

                    return _users.findOne({ username })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.username).to.equal(username)
                    expect(user.password).to.equal(newPassword)
                })
        )

        it('should fail on empty username', () => {
            logic.updatePassword('', password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on empty password', () => {
            logic.updatePassword(username, '', newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        })

        it('should fail on empty new password', () =>
            logic.updatePassword(username, password, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on numeric username', () => {
            logic.updatePassword(123, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on numeric password', () => {
            logic.updatePassword(username, 123, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        })

        it('should fail on numeric new password', () =>
            logic.updatePassword(username, password, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on undefined username', () => {
            logic.updatePassword(undefined, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on undefined password', () => {
            logic.updatePassword(username, undefined, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        })

        it('should fail on undefined new password', () =>
            logic.updatePassword(username, password, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on numeric username', () => {
            logic.updatePassword(123, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on numeric password', () => {
            logic.updatePassword(username, 123, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        })

        it('should fail on numeric new password', () =>
            logic.updatePassword(username, password, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on new password same as current password', () =>
            logic.updatePassword(username, password, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`new password cannot be same as current password`))
        )

    })

    describe('add note', () => {
        const text = 'my text note', date = new Date()

        beforeEach(() => _users.insertOne({ username, password, notes: [{ text, date, _id: '0' }] }))

        it('should add a first correct note to an existent user', () => {
            const newUserName = 'Jack Jr'

            return _users.insertOne({ username: newUserName, password })
                .then(() => logic.addNote(newUserName, text, date))
                .then(res => {
                    expect(res).to.exist

                    return _users.findOne({ username: newUserName })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.notes).to.exist
                    expect(user.notes).not.to.be.empty

                    const firstNote = user.notes[0]

                    expect(firstNote.text).to.equal(text)
                    expect((firstNote.date).getTime()).to.equal(date.getTime())  //expect(firstNote.date).to.deep.equal(date)
                })
        })

        it('should add a correct note to an existent user with more notes', () => 
            logic.addNote(username, text, date)
                .then(res => {
                    expect(res).to.exist

                    return _users.findOne({ username })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.notes).to.exist
                    expect(user.notes).not.to.be.empty

                    const firstNote = user.notes[0]

                    expect(firstNote.text).to.equal(text)
                    expect((firstNote.date).getTime()).to.equal(date.getTime())
                })
        )

        it('should fail on an empty username when trying to add a note', () => 
            logic.addNote('', text, date)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid username')
                })
        )

        it('should fail on an undefined username when trying to add a note', () => 
            logic.addNote(undefined, text, date)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid username')
                })
        )

        it('should fail on a numeric username when trying to add a note', () => 
            logic.addNote(123, text, date)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid username')
                })
        )

        it('should fail on an empty text when trying to add a note', () => 
            logic.addNote(username, '', date)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid note text')
                })
        )

        it('should fail on an undefined text when trying to add a note', () => 
            logic.addNote(username, undefined, date)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid note text')
                })
        )

        it('should fail on a numeric text when trying to add a note', () => 
            logic.addNote(username, 123, date)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid note text')
                })
        )

        it('should fail on an undefined date when trying to add a note', () => 
            logic.addNote(username, text, undefined)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid date')
                })
        )

        it('should fail on an string date when trying to add a note', () => 
            logic.addNote(username, text, '1234441111')
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid date')
                })
        )

        it('should fail on a numeric date when trying to add a note', () => 
            logic.addNote(username, text, 1234441111)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid date')
                })
        )

    })

    describe('update note', () => {
        const text = 'my text note', date = new Date(), idNote = '5b794f56a0da0925f2ba2997', newText = 'my updated text note'

        beforeEach(() => {
            return _users.insertOne({ username, password, notes: [
                { _id: ObjectId(idNote), text, date },
                { _id: ObjectId('5b794f56a0da0925f2ba2998'), text, date }
            ] })
        })

        it('should update a note on correct content and date', () => {
            return logic.updateNote(username, idNote, newText)
                .then(res => {
                    expect(res).to.exist

                    return _users.findOne({ username, 'notes._id': ObjectId(idNote) })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.notes).to.exist
                    expect(user.notes).not.to.be.empty

                    const note = user.notes[0]
                    expect(note.text).to.equal(newText)
                    expect((note.date).getTime()).to.equal(date.getTime())
                })
        })

        it('should fail on an empty username when trying to update a note', () => 
            logic.updateNote('', idNote, newText)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid username')
                })
        )

        it('should fail on an undefined username when trying to update a note', () => 
            logic.updateNote(undefined, idNote, newText)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid username')
                })
        )

        it('should fail on a numeric username when trying to update a note', () => 
            logic.updateNote(123, idNote, newText)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid username')
                })
        )

        it('should fail on an empty id note when trying to update a note', () => 
            logic.updateNote(username, '', newText)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal(`note with id: "" does not exist`)
                })
        )

        it('should fail on an undefined id note when trying to update a note', () => 
            logic.updateNote(username, undefined, newText)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal(`note with id: "undefined" does not exist`)
                })
        )

        it('should fail on a non existant id note when trying to update a note', () => 
            logic.updateNote(username, 123, newText)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal(`note with id: "123" does not exist`)
                })
        )

        it('should fail on an empty text when trying to update a note', () => 
            logic.updateNote(username, idNote, '')
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid note text')
                })
        )

        it('should fail on an undefined text when trying to update a note', () => 
            logic.updateNote(username, idNote, undefined)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid note text')
                })
        )

        it('should fail on a numeric text when trying to update a note', () => 
            logic.updateNote(username, idNote, 123)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid note text')
                })
        )
 
    })

    describe('delete note', () => {
        const text = 'my text note', date = new Date(), idNote = '5b794f56a0da0925f2ba2997'

        beforeEach(() => {
            return _users.insertOne({ username, password, notes: [
                                                                { _id: ObjectId(idNote), text, date },
                                                                { _id: ObjectId('5b794f56a0da0925f2ba2998'), text, date }
                                                            ] })
        })

        it('should delete one note on correct id', () => {
            return logic.deleteNote(username, idNote)
                .then(res => {
                    expect(res).to.exist

                    return _users.findOne({ username })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.notes).to.exist
                    expect(user.notes).not.to.be.empty

                    return _users.findOne({ username, 'notes._id': ObjectId(idNote) })
                })
                .then(user => {
                    expect(user).not.to.exist
                })
        })

        it('should fail on an empty username when trying to delete a note', () => 
            logic.deleteNote('', idNote)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid username')
                })
        )

        it('should fail on an undefined username when trying to delete a note', () => 
            logic.deleteNote(undefined, idNote)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid username')
                })
        )

        it('should fail on a numeric username when trying to delete a note', () => 
            logic.deleteNote(123, idNote)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid username')
                })
        )

        it('should fail on an empty id note when trying to delete a note', () => 
            logic.deleteNote(username, '')
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal(`note with id: "" does not exist`)
                })
        )

        it('should fail on an undefined id note when trying to delete a note', () => 
            logic.deleteNote(username, undefined)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal(`note with id: "undefined" does not exist`)
                })
        )

        it('should fail on a non existant id note when trying to delete a note', () => 
            logic.deleteNote(username, 123)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal(`note with id: "123" does not exist`)
                })
        )
 
    })

    describe('get notes by date', () => {
        const text = 'my text note', date = new Date()

        beforeEach(() => {
            return _users.insertOne({ username, password, notes: [
                                                                { _id: ObjectId('5b794f56a0da0925f2ba2997'), text, date },
                                                                { _id: ObjectId('5b794f56a0da0925f2ba2998'), text, date: new Date("2018-08-23T23:59:59.999Z") }
                                                            ] })
        })

        it('should retrieve all notes from the same day', () => {
            const day = "2018-08-21T23:59:59.999Z"
            return logic.getNotesByDate(username, day)
                .then((res) => {
debugger;
                })
        })
    })

    after(() => {
        return _users.deleteMany()
            .then(() => _conn.close())
    })
    
}

)