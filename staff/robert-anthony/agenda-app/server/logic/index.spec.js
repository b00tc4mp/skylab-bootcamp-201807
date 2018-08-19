'use strict'

require('dotenv').config()

const {logic} = require('.')
const {expect} = require('chai')
const fs = require('fs')
const {MongoClient} = require('mongodb')

const {MONGO_URL} = process.env

describe('logic', () => {
    const username = 'bobo', password = '123'
    let _conn, _db, _users

    before(done => {
        MongoClient.connect(MONGO_URL, {useNewUrlParser: true}, (err, conn) => {
            if (err) return done(err)

            _conn = conn

            const db = _db = conn.db()

            logic._users = _users = db.collection('agenda')

            done()
        })
    })


    beforeEach(() => _users.deleteMany())

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
            _users.findOne({username})
                .then(user => {
                    expect(user).to.be.null

                    return logic.register(username, password)
                })
                .then(() =>
                    _users.findOne({username})
                )
                .then(user => {
                    expect(user).to.exist

                    expect(user.username).to.equal(username)
                    expect(user.password).to.equal(password)

                })
        )

        it('should fail on trying to register an already registered user', () =>
            _users.insertOne({username, password})
                .then(() => logic.register(username, password))
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`user ${username} already exists`))
        )

        it('should fail on trying to register with an undefined username', () =>
            logic.register(undefined, password)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to register with an empty username', () =>
            logic.register('', password)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to register with a numeric username', () =>
            logic.register(123, password)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.register(username)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.register(username, '')
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.register(username, 123)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid password`))
        )
    })

    describe('authenticate', () => {
        beforeEach(() => _users.insertOne({username, password}))

        it('should authenticate on correct credentials', () => {
            return logic.authenticate(username, password)
                .then(res => expect(res).to.be.true)
        })

        it('should fail on wrong credentials', () => {
            return logic.authenticate('pepito', 'grillo')
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('user pepito does not exist'))
        })

        it('should fail on wrong password', () => {
            return logic.authenticate(username, '456')
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('wrong credentials'))
        })

        it('should fail on trying to authenticate with an undefined username', () => {
            return logic.authenticate(undefined, password)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid username'))
        })

        it('should fail on trying to authenticate with an empty username', () => {
            return logic.authenticate('', password)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid username'))
        })

        it('should fail on trying to authenticate with a numeric username', () => {
            return logic.authenticate(123, password)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid username'))
        })

        it('should fail on trying to authenticate with an undefined password', () => {
            return logic.authenticate(username, undefined)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid password'))
        })

        it('should fail on trying to authenticate with an empty password', () => {
            return logic.authenticate(username, '')
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid password'))
        })

        it('should fail on trying to authenticate with a numeric password', () => {
            return logic.authenticate(username, 123)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid password'))
        })
    })

    describe('add contact', () => {
        let _contact, _contact2, _contact3

        beforeEach(() => {
            return _users.insertOne({username, password})
                .then(_ => {
                    _contact = {
                        firstname: "robbie",
                        surname: "x",
                        address: {
                            street: "Calle whatever",
                            city: "Madrid",
                            postcode: 13828,
                            country: "Spain"
                        },
                        telephone: "+34 2342 423 232"
                    }
                    _contact2 = {
                        firstname: "sally",
                        surname: "y",
                        address: {
                            street: "Calle youp",
                            city: "Barcelona",
                            postcode: 42323,
                            country: "Spain"
                        },
                        telephone: "+34 54 75 54"
                    }

                    _contact3 = {
                        firstname: "robbie",
                        surname: "x",
                        address: {
                            street: "Calle plloop",
                            city: "Barcelona",
                            postcode: 99392,
                            country: "Spain"
                        },
                        telephone: "+34 111 44 234"
                    }
                })

        })

        it('should insert new contact when no contacts exist', () => {
            return logic.addContact(username, _contact)
                .then(res => {
                    expect(res).to.be.true
                })
                .then(_ => _users.findOne({username}))
                .then(user => {
                    let contacts = user.contacts
                    expect(contacts).to.exist
                    expect(contacts).to.be.an('array')
                    expect(contacts.length).to.equal(1)
                    return contacts[0]
                })
                .then(contact => {
                    expect(contact).to.be.an('object')
                    expect(contact).to.deep.equal(_contact)
                })
        })

        it('should insert new contact with different contact name when contacts array exist', () => {
            return logic.addContact(username, _contact)
                .then(() => logic.addContact(username, _contact2))
                .then(res => expect(res).to.be.true)
                .then(_ => _users.findOne({username}, {contacts: 1}))
                .then(user => {
                    let contacts = user.contacts
                    expect(contacts).to.exist
                    expect(contacts).to.be.an('array')
                    expect(contacts.length).to.equal(2)
                    expect(contacts[0]).to.be.an('object')
                    expect(contacts[0]).to.deep.equal(_contact)
                    expect(contacts[1]).to.be.an('object')
                    expect(contacts[1]).to.deep.equal(_contact2)
                })

        })


        it('should fail on duplicate contact', () =>
             logic.addContact(username, _contact)
                .then(_=>logic.addContact(username, _contact))
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('error adding contact')
                })
        )


        it('should fail on non-existent user', () =>
             logic.addContact("bippy", _contact)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('user bippy does not exist'))
        )

        it('should fail on missing contact info', () =>
             logic.addContact(username,undefined)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid contact information')})
        )

        it('should fail on string contact info', () =>
             logic.addContact(username, "abc")
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid contact information'))
        )

        it('should fail on numeric contact info', () =>
             logic.addContact(username, 234)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid contact information'))
        )

        it('should fail on null contact info', () =>
             logic.addContact(username, null)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid contact information'))
        )

        it('should fail on missing user name', () =>
             logic.addContact(undefined, _contact)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid username'))
        )


        it('should fail on numeric user name', () =>
             logic.addContact(234, _contact)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid username'))
        )

    })

  describe('update contact', () => {
    const _contact = {
        firstname: "robbie",
        surname: "x",
        address: {
          street: "Calle whatever",
          city: "Madrid",
          postcode: 13828,
          country: "Spain"
        },
        telephone: "+34 2342 423 232",
        id:"robbiex"
      },
      _modifiedContact = {
        firstname: "robbie",
        surname: "x",
        address: {
          street: "Calle youp",
          city: "Barcelona",
          postcode: 42323,
          country: "Spain"
        },
        telephone: "+34 54 75 54",
        id:"robbiex"
      },

      _badContact = {
        firstname: "robbie",
        surname: "xx",
        address: {
          street: "Calle plloop",
          city: "Barcelona",
          postcode: 99392,
          country: "Spain"
        },
        telephone: "+34 111 44 234"
      }

    beforeEach(() => {

      return _users.insertOne({username, password,"contacts":[_contact]})

    })

    it('should update existing contact', () => {
      return logic.updateContact(username, _modifiedContact)
        .then(res => {
          expect(res).to.be.true
        })
        .then(_ => _users.findOne({username}))
        .then(user => {
          let contacts = user.contacts
          expect(contacts).to.exist
          expect(contacts).to.be.an('array')
          expect(contacts.length).to.equal(1)
          return contacts[0]
        })
        .then(contact => {
          expect(contact).to.be.an('object')
          expect(contact).to.deep.equal(_modifiedContact)
        })
    })




    it('should fail on contact with no id', () =>
      logic.updateContact(username, _badContact)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal('invalid contact id'))
    )
    it('should fail on non-existent user', () =>
      logic.updateContact("bippy", _contact)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal('user bippy does not exist'))
    )

    it('should fail on missing contact info', () =>
      logic.updateContact(username,undefined)
        .catch(err => err)
        .then(({message}) => {
          expect(message).to.equal('invalid contact information')})
    )

    it('should fail on string contact info', () =>
      logic.updateContact(username, "abc")
        .catch(err => err)
        .then(({message}) => expect(message).to.equal('invalid contact information'))
    )

    it('should fail on numeric contact info', () =>
      logic.updateContact(username, 234)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal('invalid contact information'))
    )

    it('should fail on null contact info', () =>
      logic.updateContact(username, null)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal('invalid contact information'))
    )

    it('should fail on missing user name', () =>
      logic.updateContact(undefined, _contact)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal('invalid username'))
    )


    it('should fail on numeric user name', () =>
      logic.updateContact(234, _contact)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal('invalid username'))
    )

  })

  /*  describe('update note', () => {
        let _note

        beforeEach(() => {
            return _users.insertOne({username, password})
                .then(_note = {
                    date: "YYYY-MM-DD ",
                    contents: "some data",
                })

        })

        it('should insert new note', () => {
            return logic.updateNote(username, _contact)
                .then(res => expect(res).to.be.true)
                .then(_ => _users.findOne({username}, {notes: 1}))
                .then(notes => {
                    expect.notes.to.exist
                    expect.notes.to.be.an('array')
                    expect(notes.length).to.equal(1)
                    return notes[0]
                })
                .then(note => {
                    expect(note).to.be.an('object')
                    expect.note.to.deep.equal(_note)
                })
        })

        it('should fail on non-existent user', () => {
            return logic.updateNote("bippy", _contact)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('user bippy does not exist'))
        })

        it('should fail on missing contact info', () => {
            return logic.updateNote(username)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid contact information'))
        })

        it('should fail on string contact info', () => {
            return logic.updateNote(username, "abc")
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid contact information'))
        })

        it('should fail on numeric contact info', () => {
            return logic.updateNote(username, 234)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid contact information'))
        })

        it('should fail on null contact info', () => {
            return logic.updateNote(username, null)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid contact information'))
        })

        it('should fail on missing user name', () => {
            return logic.updateNote(undefined, _contact)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid username'))
        })


        it('should fail on numeric user name', () => {
            return logic.addContact(234, _contact)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid username'))
        })

    })*/

    describe('update password', () => {
        const newPassword = `456`

        beforeEach(() =>
            _users.insertOne({username, password})
        )

        it('should succeed on correct passwords', () => {
          return  logic.updatePassword(username, password, newPassword)
                .then(res => {
                    expect(res).to.equal(true)
                  debugger
                    return _users.findOne({username})
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
                .then(({message}) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on empty password', () => {
            logic.updatePassword(username, '', newPassword)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid password`))
        })

        it('should fail on empty new password', () =>
            logic.updatePassword(username, password, '')
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on numeric username', () => {
            logic.updatePassword(123, password, newPassword)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on numeric password', () => {
            logic.updatePassword(username, 123, newPassword)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid password`))
        })

        it('should fail on numeric new password', () =>
            logic.updatePassword(username, password, 123)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on undefined username', () => {
            logic.updatePassword(undefined, password, newPassword)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on undefined password', () => {
            logic.updatePassword(username, undefined, newPassword)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid password`))
        })

        it('should fail on undefined new password', () =>
            logic.updatePassword(username, password, undefined)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on numeric username', () => {
            logic.updatePassword(123, password, newPassword)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on numeric password', () => {
            logic.updatePassword(username, 123, newPassword)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid password`))
        })

        it('should fail on numeric new password', () =>
            logic.updatePassword(username, password, 123)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on new password same as current password', () =>
            logic.updatePassword(username, password, password)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`new password cannot be same as current password`))
        )
    })


    after(() => {

        return _users.deleteMany()
            .then(() => _conn.close())
    })
})