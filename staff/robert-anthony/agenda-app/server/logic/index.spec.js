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
                .then(_ => logic.addContact(username, _contact))
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
            logic.addContact(username, undefined)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid contact information')
                })
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
                id: "robbiex"
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
                id: "robbiex"
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

            return _users.insertOne({username, password, "contacts": [_contact]})

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
            logic.updateContact(username, undefined)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid contact information')
                })
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

    describe('add note', () => {
        const note1 = {
                date: new Date(),
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed risus non metus dapibus vehicula. Cras posuere ex mauris. Fusce tempus lorem elit, ac iaculis est porta ut. Nam orci velit, egestas non orci in, ultrices condimentum risus. Vivamus ultricies urna et tempor vehicula. Fusce bibendum magna nibh, vel ornare urna accumsan at. Mauris mattis dui nec nisi condimentum molestie. Maecenas vitae blandit nisl. "
            },
            note2 = {
                date: new Date(),
                text: "Some text"
            }

        beforeEach(() => {
            return _users.insertOne({username, password})
        })

        it('should insert new note when no notes exist', () => {
            return logic.addNote(username, note1)
                .then(res => {
                    expect(res).to.be.true
                })
                .then(_ => _users.findOne({username}))
                .then(user => {
                    let notes = user.notes
                    expect(notes).to.exist
                    expect(notes).to.be.an('array')
                    expect(notes.length).to.equal(1)
                    return notes[0]
                })
                .then(note => {
                    expect(note).to.be.an('object')
                    expect(note).to.deep.equal(note1)
                })
        })

        it('should insert new note when notes array exists', () => {
            return logic.addNote(username, note1)
                .then(_ => logic.addNote(username, note2))
                .then(res => {
                    expect(res).to.be.true
                })
                .then(_ => _users.findOne({username}))
                .then(user => {
                    let notes = user.notes
                    expect(notes).to.exist
                    expect(notes).to.be.an('array')
                    expect(notes.length).to.equal(2)
                    return notes[1]
                })
                .then(note => {
                    expect(note).to.be.an('object')
                    expect(note).to.deep.equal(note2)
                })

        })

        it('should fail on non-existent user', () =>
            logic.addNote("bippy", note1)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('user bippy does not exist'))
        )

        it('should fail on missing note info', () =>
            logic.addNote(username, undefined)
                .catch(err => err)
                .then(({message}) => {
                    expect(message).to.equal('invalid note information')
                })
        )

        it('should fail on string note info', () =>
            logic.addNote(username, "abc")
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid note information'))
        )

        it('should fail on numeric note info', () =>
            logic.addNote(username, 234)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid note information'))
        )

        it('should fail on null note info', () =>
            logic.addNote(username, null)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid note information'))
        )

        it('should fail on missing user name', () =>
            logic.addNote(undefined, note1)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid username'))
        )


        it('should fail on numeric user name', () =>
            logic.addNote(234, note1)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid username'))
        )

    })



      describe('update note', () => {
          let id
          const username2 = "zozo"
        const note1 = {
            date: new Date(),
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed risus non metus dapibus vehicula. Cras posuere ex mauris. Fusce tempus lorem elit, ac iaculis est porta ut. Nam orci velit, egestas non orci in, ultrices condimentum risus. Vivamus ultricies urna et tempor vehicula. Fusce bibendum magna nibh, vel ornare urna accumsan at. Mauris mattis dui nec nisi condimentum molestie. Maecenas vitae blandit nisl. "
          }, note2 = {
          date: new Date(),
          text: "Wie gehts?"
        }

        beforeEach(() => {

            return _users.insertOne({username, password})
                .then(_ => logic.addNote(username, note1))
                .then(_ => _users.findOne({username}))
                .then(user => {
                    id = user.notes[0].id
                    note1.text= "wie geht es?"
                })
                .then(_ => _users.insertOne({username:username2, password}))
        })

        it('should update existing note', () => {
          return logic.updateNote(username, note1)
            .then(res => {
              expect(res).to.be.true
            })
            .then(_ => _users.findOne({username}))
            .then(user => {
              let notes = user.notes
              expect(notes).to.exist
              expect(notes).to.be.an('array')
              expect(notes.length).to.equal(1)
              return notes[0]
            })
            .then(note => {
              expect(note).to.be.an('object')
              expect(note.id).to.equal(note1.id)
             // expect(note.date).to.equal(note1.date)
              expect(note.text).to.equal(note1.text)
            })
        })



        it('should fail on non-existent user', () =>
          logic.updateNote("bippy", note1)
            .catch(err => err)
            .then(({message}) => expect(message).to.equal('user bippy does not exist'))
        )

        it('should fail on missing note info', () =>
          logic.updateNote(username, undefined)
            .catch(err => err)
            .then(({message}) => {
              expect(message).to.equal('invalid note information')
            })
        )

        it('should fail on string note info', () =>
          logic.updateNote(username, "abc")
            .catch(err => err)
            .then(({message}) => expect(message).to.equal('invalid note information'))
        )

        it('should fail on numeric note info', () =>
          logic.updateNote(username, 234)
            .catch(err => err)
            .then(({message}) => expect(message).to.equal('invalid note information'))
        )

        it('should fail on null note info', () =>
          logic.updateNote(username, null)
            .catch(err => err)
            .then(({message}) => expect(message).to.equal('invalid note information'))
        )

        it('should fail on missing user name', () =>
          logic.updateNote(undefined, note1)
            .catch(err => err)
            .then(({message}) => expect(message).to.equal('invalid username'))
        )


        it('should fail on numeric user name', () =>
          logic.updateNote(234, note1)
            .catch(err => err)
            .then(({message}) => expect(message).to.equal('invalid username'))
        )

      })


    describe('get note by id', () => {
        let id
        const username2 = "biffy"
        const note = {
            date: new Date(),
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed risus non metus dapibus vehicula. Cras posuere ex mauris. Fusce tempus lorem elit, ac iaculis est porta ut. Nam orci velit, egestas non orci in, ultrices condimentum risus. Vivamus ultricies urna et tempor vehicula. Fusce bibendum magna nibh, vel ornare urna accumsan at. Mauris mattis dui nec nisi condimentum molestie. Maecenas vitae blandit nisl. "
        }

        beforeEach(() => {

                return _users.insertOne({username, password})
                    .then(_ => logic.addNote(username, note))
                    .then(_ => _users.findOne({username}))
                    .then(user => {
                        id = user.notes[0].id
                    })
                    .then(_ => _users.insertOne({username:username2, password}))
            }
        )

        it('should get note correctly by id', () => {
            return logic.getNoteByID(username, id)
                .then(res => {
                    expect(res).to.exist
                    expect(res).to.be.an('object')
                    expect(res.text).to.equal(note.text)
                    expect(res.date).to.deep.equal(note.date)
                })

        })


        it('should fail on empty username', () => {
            logic.getNoteByID('', id)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on missing id', () => {
            logic.getNoteByID(username, undefined)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid note id`))
        })

        it('should fail on empty id', () =>
            logic.getNoteByID(username, '')
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid note id`))
        )

        it('should fail on numeric username', () => {
            logic.getNoteByID(123, id)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on numeric id', () => {
            logic.getNoteByID(username, 123)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid note id`))
        })


        it('should fail on undefined username', () => {
            logic.getNoteByID(undefined, id)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid username`))
        })


        it('should fail on numeric username', () => {
            logic.getNoteByID(123, password)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid username`))
        })


        it('should fail on bad id', () =>
            logic.getNoteByID(username, "xxx")
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`note with id xxx does not exist`))
        )

        it('should fail on when user has no notes', () =>
            logic.getNoteByID(username2, id)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`user ${username2} has no notes`))
        )

    })


    describe('get contact by id', () => {
        let id
        const username2 = "biffy"
        const contact = {
           firstname:"kim",
            surname:"fagerstam",
            address:"Copenhagen"
        }

        beforeEach(() => {

                return _users.insertOne({username, password})
                    .then(
                      _ => logic.addContact(username, contact))
                    .then(_ => _users.findOne({username}))
                    .then(user => {
                        id = user.contacts[0].id
                    })
                    .then(_ => _users.insertOne({username:username2, password}))
            }
        )

        it('should get note correctly by id', () => {
            return logic.getContactByID(username, id)
                .then(res => {
                    expect(res).to.exist
                    expect(res).to.be.an('object')
                    expect(res.firstname).to.equal(contact.firstname)
                    expect(res.surname).to.equal(contact.surname)
                    expect(res.address).to.equal(contact.address)
                })

        })


        it('should fail on empty username', () => {
            logic.getContactByID('', id)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on missing id', () => {
            logic.getContactByID(username, undefined)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid contact id`))
        })

        it('should fail on empty id', () =>
            logic.getContactByID(username, '')
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid contact id`))
        )

        it('should fail on numeric username', () => {
            logic.getContactByID(123, id)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on numeric id', () => {
            logic.getContactByID(username, 123)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid contact id`))
        })


        it('should fail on undefined username', () => {
            logic.getContactByID(undefined, id)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid username`))
        })


        it('should fail on numeric username', () => {
            logic.getContactByID(123, password)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid username`))
        })


        it('should fail on bad id', () =>
            logic.getContactByID(username, "xxx")
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`contact with id xxx does not exist`))
        )

        it('should fail on when user has no notes', () =>
            logic.getContactByID(username2, id)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`user ${username2} has no contacts`))
        )

    })


    describe('update password', () => {
        const newPassword = `456`

        beforeEach(() =>
            _users.insertOne({username, password})
        )

        it('should succeed on correct passwords', () => {
            return logic.updatePassword(username, password, newPassword)
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

  // todo TEST     getAllContacts(username) {
  // todo TEST     getAllNotes(username) {



    after(() => {

        return _users.deleteMany()
            .then(() => _conn.close())
    })
})