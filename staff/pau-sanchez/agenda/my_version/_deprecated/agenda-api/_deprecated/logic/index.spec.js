'use strict'

require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const { MongoClient } = require('mongodb')

const { MONGO_URL } = process.env

describe('logic', () => {
    const username = 'jack', password = '123', name = 'Sherlock', surname = 'Holmes', email = 'sherlock@holm.es'
    
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

    describe('register', () => {
        it('should register on valid credentials', () =>
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
                .then(({ message }) => expect(message).to.equal(`user ${username} already exists`))
        )
    })
        
    describe('authenticate', () => {
        beforeEach(() => 
            _users.insertOne({ username, password })
            )
        it('should authenticate on correct credentials', () => {
            return logic.authenticate(username, password)
                .then(res => expect(res).to.be.true)
            })
    })

    describe('update password', () => {
        const newPassword = `${password}-${Math.random()}`

        beforeEach(() =>
            _users.insertOne({ username, password })
        )
        it('should succeed on correct password', () => {
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
        })
        
        it('should fail on empty username', () => {
            logic.updatePassword('', password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        })

    })

    describe('save contacts', () => {

        beforeEach(() =>
            _users.insertOne({ username, password })
        )
        it('should add valid contact details', () => {

            logic.saveContacts(username, name, surname, email)
                .then(res => {
                    expect(res).to.be.true
                    return _users.findOne({ username })
                })
                .then(user => {
                    
                    expect(user).to.exist
                    expect(user.username).to.equal(username)
                    expect(user.contacts.name).to.equal(name)
                    expect(user.contacts.surname).to.equal(surname)
                    expect(user.contacts.email).to.equal(email)
                })
        
        })
            
    })

    false && describe('save notes', () => {


    })

    false && describe('list contacts', () => {


    })

    false && describe('list notes', () => {


    })

    false && describe('remove contacts', () => {


    })

    false && describe('remove notes', () => {


    })




    after(() => {
        

        return _users.deleteMany()
            .then( () => _conn.close())
    })
})
