'use strict'

require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const fs = require('fs')
const { MongoClient } = require('mongodb')

const { MONGO_URL } = process.env

describe('logic', () => {
    const name= 'carlota', surname='vicens', password= '123', email ='krlota.barna'
    let _conn, _db, _users
    //start mongodb
    before(done => {
        MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, conn) => {
            if (err) return done(err)

            _conn = conn

            const db = _db = conn.db()

            logic._users = _users = db.collection('users')

            done()
        })
    })

    //register user
    describe('register user', () => {
        it('should register on correct credentials', () => {
            _users.findOne({ email })
                .then(user => {
                    expect(email).to.be.null
                    return logic.register(email, name, surname, password)
                })
        })
        it('should fail on trying to register an already registered user', () => {
            _users.findOne({ email })
                .then(user => logic.register(email, name, surname, password))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user with email ${email} already exist`))
        })
        it('should fail on trying to register an empty email', () => {
            logic.register('', name, surname, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        })
        it('should fail on trying to register an undefined email', () => {
            logic.register(undefined, name, surname, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        })
        it('should fail on trying to register a numeric email', () => {
            logic.register(123, name, surname, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        })
        it('should fail on trying to register with an empty password', () => {
            logic.register(email, name, surname, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        })
        it('should fail on trying to register with a numeric password', () => {
            logic.register(email, name, surname, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        })
        it('should fail on trying to register with an undefined password', () => {
            logic.register(email, name, surname, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        })
    })

    //authenticate user
    describe('authenticate user', () => {
        beforeEach(() => {
            _users.insertOne({ email, name, surname, password })
        })
        it('should autenticat on correct credentials', () => {
            logic.authenticate(email, password)
                .then(res => expect(res).to.be.true)
        })
        it('should fail if user is not registered', () => {
            logic.authenticate(email, password)
                .then(res => expect(res).to.be.null)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user with email ${email} is not registered`))
        })
        it('should fail if wrong password', () => {
            logic.authenticate(email, '456')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('wrong password'))
        })
        it('should fail on trying to authenticate with an undefined username', () => {
            return logic.authenticate(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid username'))
        })
        it('should fail on trying to authenticate with an empty username', () => {
            return logic.authenticate('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid username'))
        })

        it('should fail on trying to authenticate with a numeric username', () => {
            return logic.authenticate(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid username'))
        })

        it('should fail on trying to authenticate with an undefined password', () => {
            return logic.authenticate(username, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        })

        it('should fail on trying to authenticate with an empty password', () => {
            return logic.authenticate(username, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        })

        it('should fail on trying to authenticate with a numeric password', () => {
            return logic.authenticate(username, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        })

    })

    //add note
    /* describe('add note', () => {
         const date=
         beforeEach(()=>{
             _users.insertOne({email, name, surname, password, notes:[notes], contacts:[contacts]})
         })
         it('should insert a note with correct info', () => {
             return logic.addNote(email)
             .then()
         })
     })*/



})