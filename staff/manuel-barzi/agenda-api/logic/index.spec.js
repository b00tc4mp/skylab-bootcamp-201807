require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose
const { Contact, Note, User } = require('../data/models')

const { env: { MONGO_URL } } = process

describe('logic', () => {
    const email = `maider-${Math.random()}@mail.com`, password = `123-${Math.random()}`
    let _connection
    let usersCount = 0

    before(() =>
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )

    beforeEach(() =>
        Promise.all([
            Note.deleteMany(),
            User.deleteMany()
        ])
            .then(() => {
                let count = Math.floor(Math.random() * 100)

                const creations = []

                while (count--) creations.push({ email: `other-${Math.random()}@mail.com`, password: `123-${Math.random()}` })

                if (usersCount = creations.length)
                    return User.create(creations)
            })
    )

    true && describe('validate fields', () => {
        it('should succeed on correct value', () => {
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
            User.findOne({ email })
                .then(user => {
                    expect(user).to.be.null

                    return logic.register(email, password)
                })
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)

                    return User.find()
                })
                .then(users => expect(users.length).to.equal(usersCount + 1))
        )

        it('should fail on trying to register an already registered user', () =>
            User.create({ email, password })
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
        beforeEach(() => User.create({ email, password }))

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

        beforeEach(() => User.create({ email, password }))

        it('should update password correctly', () =>
            logic.updatePassword(email, password, newPassword)
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
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
        beforeEach(() => User.create({ email, password }))

        it('should unregister user correctly', () =>
            logic.unregisterUser(email, password)
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
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

        beforeEach(() => User.create({ email, password }))

        it('should succeed on correct data', () =>
            logic.addNote(email, date, text)
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    return Note.find({ user: user.id })
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

    true && describe('list notes by date', () => {
        let notes = [
            { date: new Date('2018-08-20T12:10:15.474Z'), text: 'text 1' },
            { date: new Date('2018-08-23T13:00:00.000Z'), text: 'cumple jordi' },
            { date: new Date('2018-08-24T13:15:00.000Z'), text: 'pizza' },
            { date: new Date('2018-08-24T13:19:00.000Z'), text: 'la china' },
            { date: new Date('2018-08-24T13:21:00.000Z'), text: 'party hard' }
        ]

        beforeEach(() =>
            new User({ email, password }).save()
                .then(user => {
                    const userId = user.id

                    notes.forEach(note => note.user = userId)

                    return Note.insertMany(notes)
                })
                .then(_notes => notes = _notes.map(note => note._doc))
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

                        delete note.__v

                        return note
                    })

                    expect(_notes).to.deep.equal(normalizedNotes)
                })
        })
    })

    true && describe('remove note', () => {
        let notes = [
            { date: new Date(), text: 'text 1' },
            { date: new Date(), text: 'text 2' },
            { date: new Date(), text: 'text 3' },
            { date: new Date(), text: 'text 4' }
        ]

        let noteId

        beforeEach(() =>
            new User({ email, password }).save()
                .then(user => {
                    const userId = user.id

                    notes.forEach(note => note.user = userId)

                    return Note.insertMany(notes)
                })
                .then(_notes => {
                    notes = _notes.map(note => note._doc)

                    noteId = notes[0]._id.toString()
                })
        )

        it('should succeed on correct note id', () =>
            logic.removeNote(email, noteId)
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    return Note.find({ user: user.id }).lean()
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

    true && describe('add contact', () => {
        const contact = { email: 'jd@mail.com', name: 'John', surname: 'Doe', phone: '123-456-789' }

        beforeEach(() => User.create({ email, password }))

        it('should succeed on correct data', () =>
            logic.addContact(email, contact.email, contact.name, contact.surname, contact.phone)
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user.contacts.length).to.equal(1)

                    const [_contact] = user.contacts

                    expect(_contact.email).to.equal(contact.email)
                    expect(_contact.name).to.equal(contact.name)
                    expect(_contact.surname).to.equal(contact.surname)
                    expect(_contact.phone).to.equal(contact.phone)
                })
        )
    })

    true && describe('list contacts by letter', () => {
        let contacts

        beforeEach(() => {
            contacts = [
                { email: `jd@mail.com`, name: 'John', surname: 'Doe', phone: '123-456-789' },
                { email: `ef@mail.com`, name: 'Ele', surname: 'Fante', phone: '123-456-789' },
                { email: `cd@mail.com`, name: 'Coco', surname: 'Drilo', phone: '123-456-789' },
                { email: `jf@mail.com`, name: 'Jira', surname: 'Fa', phone: '123-456-789' },
                { email: `ml@mail.com`, name: 'Murcie', surname: 'Lago', phone: '123-456-789' },
                { email: `hp@mail.com`, name: 'Hipo', surname: 'Potamo', phone: '123-456-789' },
                { email: `og@mail.com`, name: 'Oran', surname: 'Gutan', phone: '123-456-789' },
                { email: `mr@mail.com`, name: 'Mama', surname: 'Racho', phone: '123-456-789' },
                { email: `pr@mail.com`, name: 'Paja', surname: 'Rito', phone: '123-456-789' }
            ]

            return new User({ email, password }).save()
                .then(user => {
                    contacts.map(contact => new Contact(contact)).forEach(contact => user.contacts.push(contact))
                
                    return user.save()
                })
                .then(user => {
                    contacts = user.contacts.map(({_doc}) => {
                        const { _id, email, name, surname, phone } = _doc

                        return { id: _id.toString(), email, name, surname, phone }
                    })
                })
        })

        it('should succeed on correct data', () => {
            return logic.listContacts(email, 'M')
                .then(_contacts => {
                    const expectedContacts = [contacts[4], contacts[7]]

                    expect(_contacts).to.deep.equal(expectedContacts)
                })
        })
    })

    true && describe('remove contact', () => {
        // TODO
    })

    after(() =>
        Promise.all([
            Note.deleteMany(),
            User.deleteMany()
        ])
            .then(() => _connection.disconnect())
    )
})