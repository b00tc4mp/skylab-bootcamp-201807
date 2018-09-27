'use strict'

require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')

const { MongoClient } = require('mongodb')
const { MONGO_URL } = process.env

describe('logic', () => {
    const email = 'bernat@world.com', password = '123', name = 'bernat', surname = 'casasus', notes = [], contacts = []
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

    beforeEach(() => {
        return _users.deleteMany()
    })

    describe('register a user', () => {
        it('should register on correct data', () =>
            _users.findOne({ email })
                .then(user => {
                    expect(user).to.be.null
                    return logic.register(name, surname, email, password)
                })
                .then(res => {
                    expect(res).to.be.true
                    return _users.findOne({ email })
                })
                .then(user => {
                    expect(user).to.exist

                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)

                })
        )

        it('should fail if the user already exists', () =>
            _users.insertOne({ name, surname, email, password, notes, contacts })
                .then(() => _users.findOne({ email }))
                .then(user => {
                    expect(user).to.exist
                    expect(user.email).to.equal(email)

                    return logic.register(name, surname, email, password)
                })
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`email ${email} is already in use`))
        )
    })

    describe('authenticate a user', () => {
        beforeEach(() => {
            _users.insertOne({ name, surname, email, password, notes, contacts })
        })

        it('should login on correct credentials', () =>
            logic.authenticate(email, password)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on worng credentias', () =>
            logic.authenticate('miquel@alex.com', 'nohagascasoaalex')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('user with email miquel@alex.com does not exist'))
        )
    })

    //TODO UPDATE USER CREDENTIALS
    false && describe('update credentials', () => {

    })

    describe('list notes', () => {
        beforeEach(() => {
            _users.insertOne({
                name, surname, email, password,
                notes: [{ date: '2018/08/19', text: 'if it is rainny, go to the museum' }, { date: '2018/08/18', text: 'send an email to Jhon' }],
                contacts
            })
        })

        it('should list notes if they exists', () =>
            logic.listNotes(email, '2018/08/19')
                .then(notes => {
                    expect(notes).to.exist
                    expect(notes[0].text).to.equal('if it is rainny, go to the museum')
                })
        )

    })

    describe('save notes', () => {
        beforeEach(() => {
            _users.insertOne({ name, surname, email, password, notes, contacts })
        })

        it('should save notes', () => {
            const text = 'pick up kids from the school'
            const dateObj = new Date();
            const month = dateObj.getUTCMonth() + 1; //months from 1-12
            const day = dateObj.getUTCDate();
            const year = dateObj.getUTCFullYear();
            const date = year + "/" + month + "/" + day;


            return logic.saveNote(email, date, text)
                .then(res => {
                    expect(res).to.be.true
                    return _users.findOne({ email })
                })
                .then(user => {
                    expect(user.notes[0].text).to.equal('pick up kids from the school')
                    expect(user.notes[0].date).to.equal(date)
                })
        })
    })

    describe('delete notes', () => {
        const date = '2018/08/19', text = 'if it is rainny, go to the museum'
        beforeEach(() => {
            _users.insertOne({
                name, surname, email, password,
                notes: [{ date: '2018/08/19', text: 'if it is rainny, go to the museum' }, { date: '2018/08/19', text: 'send an email to Jhon' }],
                contacts
            })
        })

        it('should delte notes', () =>
            logic.deleteNote(email, date, text)
                .then(res => {
                    expect(res).to.be.true
                    return _users.findOne({ email })
                })
                .then(user => {
                    expect(user.notes[0].text).to.equal('send an email to Jhon')
                    expect(user.notes[0].date).to.equal(date)
                })
        )
    })

    describe('list contacts', () => {
        beforeEach(() => {
            _users.insertOne({
                name, surname, email, password, notes,
                contacts: [
                    { name: 'jhon', surname: 'doe', phone: 626738912, email: 'jhondoe@microsoft.com', address: 'Washington, DC 20521-2050' },
                    { name: 'mikel', surname: 'smith', phone: 602384721, email: 'mikelsmith@apple.com', address: 'Mankato Mississippi 96522' }
                ]
            })
        })

        it('should list user contacts if they exist', () =>
            logic.listContacts(email)
                .then(contacts => {
                    expect(contacts).to.exist
                    expect(contacts[0].name).to.equal('jhon')
                    expect(contacts[1].name).to.equal('mikel')
                })
        )

        it('should send an empty array if no contacts exists', () =>
        logic.listContacts(email)
            .then(contacts => {
                expect(contacts).to.exist
                expect(contacts.length).to.equal(0)
            })
    )
    })

    describe('save contacts', () => {
        const contactName = 'alex',
            contactSurname = 'owingh',
            contactPhone = 606738499,
            contactEmail = 'aowingh@atom.com',
            contactAddress = 'Corona New Mexico 08219'

        beforeEach(() => {
            _users.insertOne({ name, surname, email, password, notes, contacts })
        })

        it('should save contact on correct data', () =>
            logic.saveContact(email, contactName, contactSurname, contactPhone, contactEmail, contactAddress)
                .then(res => {
                    expect(res).to.be.true

                    return _users.findOne({ email })
                })
                .then(user => {
                    expect(user.contacts[0].name).to.equal('alex')
                })
        )
    })

    describe('delete contacts', () => {
        beforeEach(() => {
            _users.insertOne({
                name, surname, email, password, notes,
                contacts: [
                    { name: 'jhon', surname: 'doe', phone: 626738912, email: 'jhondoe@microsoft.com', address: 'Washington, DC 20521-2050' },
                    { name: 'mikel', surname: 'smith', phone: 602384721, email: 'mikelsmith@apple.com', address: 'Mankato Mississippi 96522' }
                ]
            })
        })

        it('should delte contacts', () =>
            logic.deleteContact(email, 'jhondoe@microsoft.com', 626738912)
                .then(res => {
                    expect(res).to.be.true
                    return _users.findOne({ email })
                })
                .then(user => {
                    expect(user.contacts[0].email).to.equal('mikelsmith@apple.com')
                    expect(user.contacts[0].phone).to.equal(602384721)
                })
        )
    })

    after(() => {
        return _users.deleteMany()
            .then(() => _conn.close())
        // _conn.close()
    })
})