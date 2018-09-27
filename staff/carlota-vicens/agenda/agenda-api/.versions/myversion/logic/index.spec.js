
'use strict'

require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const { MongoClient } = require('mongodb')

const { MONGO_URL } = process.env

describe('logic', () => {
    let usermail, password = "123"
    let _conn, _users, _notes

    before(done => {
        MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, conn) => {
            if (err) return done(err)

            _conn = conn

            const db = conn.db()

            logic._users = _users = db.collection('users')
            logic._notes = _notes = db.collection('notes')

            done()
        })
    })

    // beforeEach(() => {
    //     return _users.deleteMany()
    // })

    describe('register user', () => {
        usermail = `gerard${Math.random()}@gmail.com`
        it('should user register correctly', () => {
            return logic.register(usermail, password)
                .then((res) => expect(res).to.be.true)
                .then(() => {
                    return _users.findOne({ email: usermail })
                        .then(res => expect(res).to.exist)
                })
        })
        it('should fail on already register user', () => {
            return logic.register(usermail, password)
                .catch(({ message }) => message)
                .then((message) => expect(message).to.equal(`user ${usermail} already exists`))
        })
        it('should fail on empty email', () => {
            return logic.register("", password)
                .catch((err) => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))

        })
        it('should fail on empty password', () => {
            return logic.register(usermail, 123)
                .catch((err) => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))

        })
    })


    describe('login user', () => {
        beforeEach(() => {
            usermail = `gerard${Math.random()}@gmail.com`
            _users.insertOne({ email: usermail, password })
        })

        it('should authenticate user with right credentials', () => {
            return logic.login(usermail, password)
                .then((res) => expect(res).to.be.true)
        })

        it('should fail login with wrong password', () => {
            return logic.login(usermail, "asddsa")
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('wrong credentials'))
        })
        it('should fail login with invalid credentials', () => {
            return logic.login(usermail, 68678768)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        })
        it('should fail on non existing user', () => {
            return logic.login("juan@palomo.com", "yomeloguiso")
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('user juan@palomo.com does not exist'))
        })

    })

    describe('Notes', () => {
        let usermail, title, content, noteId, date, day, month, year
        beforeEach(() => {
            usermail = `gerard123@gmail.com`
            title = 'a' + Math.random(), content = "lorem blah blah"
            day = Math.floor(Math.random() * 31) + 1
            month = Math.floor(Math.random() * 12) + 1
            year = 2018
            date = day + '-' + month + '-' + year
        })

        it('should create a new note correctly', () => {
            _notes.insertOne({ email: usermail, password, notes: [] })
            return logic.addNote(usermail, title, content, date)
                .then(id => {
                    expect(id).to.exist
                    noteId = id
                })
        })
        it('should delete a note correctly', () => {

            return _notes.findOne({ email: usermail })
                .then((res) => {
                    expect(res.notes.length).to.equal(1)
                    return logic.deleteNote(usermail, noteId)
                        .then(() => {
                            return _notes.findOne({ email: usermail })
                                .then(res => expect(res.notes.length).to.equal(0))
                        })
                })
            // return logic.deleteNote(usermail,id)

        })
        it('delete a note should fail on non existing note', () => {
            return logic.deleteNote("juan@palomo.com", "RANDOMID")
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`note RANDOMID does not exist`))
        })
        it('adding a note should fail on non existing user', () => {
            return logic.addNote("juan@palomo.com", title, content)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('user juan@palomo.com does not exist'))
        })
    })

    describe('updateNotes', () => {
        const usermail = 'arantxa@gmail.com',
            password = '123',
            id = "7d449d66",
            notes = [{ "id": "7d449d66", "title": "a0.3019", "content": "lorem blah blah", "date": "1-4-2018" }]

        beforeEach(() => {
            _notes.insertOne({ email: usermail, password, notes })
        })
        afterEach(() => {
            return _notes.deleteMany()
        })
        it('should update a note correctly', () => {

            return _notes.findOne({ notes: { $elemMatch: { id } } })
                .then((res) => {
                    const note = res.notes.filter(note => {
                        return note.id === id
                    })
                    expect(note[0]).to.deep.equal(notes[0])
                    return logic.updateNote(usermail, id, "hola123", "hola345", "23-08-2018")
                })
                .then(() => {
                    return _notes.findOne({ notes: { $elemMatch: { id } } })
                        .then((res) => {
                            const note = res.notes.filter(note => {
                                return note.id === id
                            })
                            expect(note[0].title).to.equal("hola123")
                            expect(note[0].content).to.equal("hola345")
                        })
                })
        })
        it('should fail on retrieving a non existing note', () => {

            return logic.updateNote(usermail, "963r9rw987", "hola", "mundo", "15-06-2018")
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('note 963r9rw987 does not exist'))
        })
    })

    describe('list user notes', () => {
        const usermail = 'arantxa@gmail.com',
            password = '123',
            id = "7d449d66",
            notes = [{ "id": "7d449d66", "title": "1", "content": "lorem blah blah", "date": "1-4-2018" }, { "id": "7d449d67", "title": "2", "content": "lorem blah blah", "date": "1-4-2018" }, { "id": "7d449d68", "title": "3", "content": "lorem blah blah", "date": "1-4-2018" }, { "id": "7d449d69", "title": "4", "content": "lorem blah blah", "date": "1-4-2018" }]

        beforeEach(() => {
            _notes.insertOne({ email: usermail, password, notes })
        })

        it('should list all user notes', () => {
            return logic.listNotes(usermail)
                .then(userNotes => {

                    expect(userNotes.length).to.equal(notes.length)
                })
        })


    })

    describe('Contacts', () => {
        const name = "peter"
        const surname = "pan"
        const phone = '898765408'
        const contactmail = "nuncajamas@gmail.com"
        const address = "calle estrella a la derecha"
        let contactId
        const contacts = [{ id: "abcde1234", name, surname, phone, contactmail, address }]

        beforeEach(() => {

            return _users.insertOne({ email: usermail, password })

        })

        it('should create a new contact correctly', () => {
            return logic.addContact(usermail, name, surname, phone, contactmail, address)
                .then(id => {
                    contactId = id
                    return expect(id).to.exist
                })
        })
        it('should delete a contact correctly', () => {
            return _users.findOne({ email: usermail })
                .then((res) => {
                    expect(res.contacts.length).to.equal(1)
                    return logic.deleteContact(usermail, contactId)
                        .then(() => {
                            return _users.findOne({ email: usermail })
                                .then(res => expect(res.contacts.length).to.equal(0))
                        })
                })
            // return logic.deleteNote(usermail,id)

        })

        it('should list all user contacts', () => {
            return _users.updateOne({ email: usermail }, { $push: { contacts: { id: contactId, name, surname, phone, contactmail, address } } })
                .then(() => {
                    return logic.listContacts(usermail)
                        .then(userContacts => {
                            expect(userContacts.length).to.equal(contacts.length)
                        })
                })
        })

        it('should update a contact correctly', () => {
            return _users.findOne({ contacts: { $elemMatch: { id: contactId } } })
                .then((res) => {
                    const contact = res.contacts.filter(contact => {
                        return contact.id === contactId
                    })
                    // expect(contact[0]).to.deep.equal(contacts[0])
                    expect(contact[0].name).to.equal(contacts[0].name)
                    expect(contact[0].surname).to.equal(contacts[0].surname)
                    return logic.updateContact(usermail, contactId, "hola123", "hola345", phone, contactmail, address)
                })
                .then(() => {
                    return _users.findOne({ contacts: { $elemMatch: { id: contactId } } })
                        .then((res) => {
                            const contact = res.contacts.filter(contact => {
                                return contact.id === contactId
                            })
                            expect(contact[0].name).to.equal("hola123")
                            expect(contact[0].surname).to.equal("hola345")
                        })
                })
        })
    })
    true && describe('add contact', () => {
        let contact
        beforeEach(() => {
            contact = {
                email: 'contact@mail.com',
                name: 'contact-name',
                surname: 'contact-surname',
                phone: '123456789'
            }
            return User.create({ email, password })
        })

        it('should add a contact', () => {
            return logic.saveContact(email, contact)
                .then(() => User.findOne({ email }))
                .then(user => {
                    const _contact = user._doc.contacts[0]._doc
                    delete _contact._id
                    expect(_contact).to.deep.equal(contact)
                })
        })

    })

    true && describe('list contacts', () => {
        let contacts = []
        beforeEach(() => {
            let cnt = 10
            while (cnt--) {
                let contact = {
                    email: `contact-${cnt}@mail.com`,
                    name: 'contact-name',
                    surname: 'contact-surname',
                    phone: '123456789'
                }
                contacts.push(new Contact(contact))
            }
            return User.create({ email, password })
                .then(user => {
                    user.contacts = contacts
                    return user.save()
                })
        })

        it('should suceed to list all contacts', () => {

            return logic.listContacts(email)
                .then(_contacts => {
                    _contacts.forEach((contact, index) => {
                        const testContact = contacts[index]._doc
                        delete testContact._id
                        expect(contact).to.deep.equal(testContact)
                    })
                })
        })

    })

    true && describe('delete a contact', () => {
        let contacts = []
        beforeEach(() => {
            let cnt = 10
            while (cnt--) {
                let contact = {
                    email: `contact-${cnt}@mail.com`,
                    name: 'contact-name',
                    surname: 'contact-surname',
                    phone: '123456789'
                }
                contacts.push(new Contact(contact))
            }
            return User.create({ email, password })
                .then(user => {
                    user.contacts = contacts
                    return user.save()
                })
        })

        it('should suceed to delete a contact', () => {
            const contactEmail = 'contact-0@mail.com'
            return logic.deleteContact(email, contactEmail)
                .then(res => {
                    expect(res).to.be.true
                    return User.findOne({ email })
                })
                .then(user => {
                    const _contacts = user._doc.contacts.map(contact => contact._doc.email)
                    debugger
                    expect(_contacts.length).to.equal(9)
                    expect(_contacts.indexOf(contactEmail)).to.equal(-1)
                })
        })

        it('should fail to delete an invalid contact', () => {
            const contactEmail = 'contact-11@mail.com'
            return logic.deleteContact(email, contactEmail)
                .catch(err => err)
                .then(({ message }) => {
                    expect(message).to.equal(`contact with ${contactEmail} email was not found`)

                })
        })

    })

    after(() => {
        return _users.deleteMany()
            .then(() => _conn.close())

        // _conn.close()
    })

})

