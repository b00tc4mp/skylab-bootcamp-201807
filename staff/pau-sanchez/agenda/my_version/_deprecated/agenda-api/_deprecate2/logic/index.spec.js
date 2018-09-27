'use strict'

require('dotenv').config()

const logic = require('.')
const { expect } = require ('chai')
const { MongoClient } = require ('mongodb')

const { MONGO_URL } = process.env

describe ('logic' ,() => {
    let usermail, password="123"
    let _conn, _users

    before(done => {
        MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, conn) => {
            // if (err) return done(err)

            _conn = conn

            const db = conn.db()

            logic._users = _users = db.collection('users')

            done()
        })
    })

    beforeEach(() => {
        // return _users.deleteMany()
    })

   describe('register user', () => {
        usermail = `sherlock${Math.random()}@gmail.com`
        it('should user register correctly', () => {
           return logic.register(usermail, password)
                .then((res) => expect(res).to.be.true)
                .then(() => {
                    return _users.findOne({ email:usermail })
                        .then(res => expect(res).to.exist)
                })
       })
       it('should fail on already register user', () => {
        return logic.register(usermail, password)
            .catch(({message}) => message)
            .then((message) => expect(message).to.equal(`user ${usermail} already exists`)) 
       })
       it('should fail on empty email', () => {
                return logic.register("", password)
                    .catch((err) => err)
                    .then(({message}) => expect(message).to.equal(`invalid email`))
                    
            })
       it('should fail on empty password', () => {
                return logic.register(usermail, 123)
                    .catch((err) => err)
                    .then(({message}) => expect(message).to.equal(`invalid password`))
                    
            })
       })


   describe ('login user', () => {
        beforeEach(() => {
            usermail = `sherlock${Math.random()}@gmail.com`
            _users.insertOne({email:usermail,password})
        })

        it('should authenticate user with right credentials', () => {
            return logic.login(usermail,password)
                .then((res) => expect(res).to.be.true)
        })

        it('should fail login with wrong password', () => {
            return logic.login(usermail,"asddsa")
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('wrong credentials'))
        })
        it('should fail login with invalid credentials', () => {
            return logic.login(usermail,68678768)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid password'))
        })
        it('should fail on non existing user', () => {
            return logic.login("juan@palomo.com","yomeloguiso")
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('user juan@palomo.com doesnt exist'))
        })

   })

   describe('Notes', () => {
    let usermail,title,content,noteId
       beforeEach(() => {
            usermail = `sherlock@gmail.com`
            title = 'a' + Math.random(), content = "lorem blah blah"
        })

        it('should create a new note correctly', () => {
            _users.insertOne({email:usermail,password,notes:[]})
            return logic.addNote(usermail,title,content)
                .then(id => {
                    expect(id).to.exist
                    noteId = id
                })
        })
        it('should delete a note correctly', () => {
            return _users.findOne({email:usermail})
                .then((res) => {
                    expect(res.notes.length).to.equal(1)
                    return logic.deleteNote(usermail,noteId)
                        .then(() => {
                            return _users.findOne({email:usermail})
                                .then(res => expect(res.notes.length).to.equal(0))
                        })
                })
            // return logic.deleteNote(usermail,id)

        })
        it('delete a note should fail on non existing user', () => {
            debugger
            return logic.deleteNote("juan@palomo.com","RANDOMID")
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('user juan@palomo.com doesnt exist'))
        })
        it('adding a note should fail on non existing user', () => {
            debugger
            return logic.addNote("juan@palomo.com",title,content)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('user juan@palomo.com doesnt exist'))
        })
   })


    after(() => {
        return _users.deleteMany()
             .then (() => _conn.close())
            // _conn.close()
    })




})

