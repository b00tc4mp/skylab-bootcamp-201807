require('dotenv').config()


require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
const jwt = require('jsonwebtoken')

describe('logic', () => {
    const { JWT_SECRET } = process.env
    let usermail, password
    const title = 'title 1', content = 'content content content', date= 8 + '-' + 10 + '-' +2018
    const name = 'name', surname = 'surname', phone = 'mytelephone', contactmail = 'gerard@gmail.com', address = 'mi calle'
    


    beforeEach(() => {
        
        usermail = `user${Math.random()}@gmail.com`, password = '123'
    })

    describe('register user', () => {
        it('should succeed on new user', () =>
            logic.register(usermail, password)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on already existing user', () =>
            logic.register(usermail, password)
                .then(() => logic.register(usermail, password))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`user ${usermail} already exists`)
                })
        )

        it('should fail on empty usermail', () =>
            logic.register('', password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid usermail')
                })
        )

        it('should fail on empty password user', () =>
            logic.register(usermail, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid password')
                })
        )

        it('should fail on undefined password', () =>{
            logic.register(usermail, undefined)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid password')
                })
        })

        it('should fail on undefined usermail', () =>{
            logic.register(undefined, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid usermail')
                })
        })
    })
    
    describe('login user', () => {
        it('should succeed on existing user', () =>
            logic.register(usermail, password)
                .then(() => logic.login(usermail, password))
                .then(token => {
                    expect(token).to.be.a('string')

                    let payload

                    expect(() => payload = jwt.verify(token, JWT_SECRET)).not.to.throw()
                    expect(payload.sub).to.equal(usermail)
                })
        )

        it('should fail on unregistered user', () =>
            logic.login(usermail, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`user ${usermail} does not exist`)
                })
        )

        it('should fail on empty usermail', () =>
            logic.login('', password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid usermail`)
                })
        )

        it('should fail on password user', () =>
            logic.login(usermail, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        )
    })
    describe('add notes', () => {
        it('should add notes', () => {
            return logic.register(usermail, password)
                .then(() => logic.login(usermail,password))
                .then(token => token)
                .then((token) => {
                    return logic.addNotes(usermail,title,content,date,token)
                        .then(({message}) => expect(message).to.equal('Note added correctly'))

                })

                // .catch(res => res)
                // .then(res => expect(res).to.be.true)
        })

        it('should return an error at adding notes with an empty title',() => {
            return logic.register(usermail, password)
                .then(() => logic.login(usermail,password))
                .then(token => logic.addNotes(usermail,'',content,date,token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err).to.throw
                    expect(err.message).to.equal('invalid title')
                })
           
        })
        it('should return an error at adding notes with an empty content',() => {
            return logic.register(usermail, password)
                .then(() => logic.login(usermail,password))
                .then(token => logic.addNotes(usermail,title,'',date,token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err).to.throw
                    expect(err.message).to.equal('invalid content')
                })
           
        })
    })

    describe('delete notes', () => {

        it('should delete note', ()=> {
           return logic.register(usermail, password)
            .then(() => logic.login(usermail, password))
            .then(token => logic.addNotes(usermail,title,content,date,token)
                .then(({id}) => {
                    return logic.deleteNote(usermail,id,token)
                        .then(({message}) => expect(message).to.equal('Note deleted correctly'))
                })
            )
       })
       it('should fail deleting a non-existing note', () => {
           let id = 'pepito'
            return logic.register(usermail, password)
            .then(() => logic.login(usermail, password))
                .then((token) => {
                    return logic.deleteNote(usermail,id,token)
                        .catch(({message}) => message)
                        .then((message) => expect(message).to.equal(`note ${id} does not exist`))
                })
       })
    })

    describe('edit notes', () => {
        const newTitle = 'title2',newContent = 'content2 content2 content2'
        it('should edit a note correctly', () => {
            return logic.register(usermail, password)
            .then(() => logic.login(usermail,password))
            .then((token) => {
                return logic.addNotes(usermail,title,content,date,token)
                    .then(({id}) => {
                        return logic.updateNotes(usermail,id,newTitle,newContent,token)
                    })
                    .then(({message}) => expect(message).to.equal('Note updated successfully!') )
            })
        })
    })

    describe('list notes', () =>{
        it('should list all notes of a user', () => {
            return logic.register(usermail, password)
                .then(() => logic.login(usermail,password))
                .then((token) => {
                    return logic.addNotes(usermail,title,content,date,token)
                        .then(() => {
                            return logic.listNotes(usermail,token)
                        })
                        .then((res) => {
                            return expect(res.length).to.equal(1) 
                        })
                })
        })
    })



    
    describe('add contact', () => {
        const newName = 'name1', newSurname = 'surname1', newPhone = '123124342', newContactmail = 'asdasd@gmail.com', newAddress = 'calle1'
        it('should add contact', () => {
            return logic.register(usermail, password)
                .then(() => logic.login(usermail,password))
                .then(token => token)
                .then((token) => {
                    return logic.addContact(usermail, name, surname, phone, contactmail, address, token)
                        .then(({message}) => expect(message).to.equal('Contact added correctly'))

                })

                // .catch(res => res)
                // .then(res => expect(res).to.be.true)
        })

         it('should return an error at adding contacts with an empty name',() => {
             return logic.register(usermail, password)
                 .then(() => logic.login(usermail,password))
                 .then(token => logic.addContact(usermail, '', surname, phone, contactmail, address, token))
                 .catch(err => err)
                 .then(err => {
                     expect(err).to.exist
                     expect(err).to.throw
                     expect(err.message).to.equal('invalid name')
                 })      
         })

         it('should return an error at adding contacts with an empty surname',() => {
            return logic.register(usermail, password)
                .then(() => logic.login(usermail,password))
                .then(token => logic.addContact(usermail, name, '', phone, contactmail, address, token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err).to.throw
                    expect(err.message).to.equal('invalid surname')
                })      
        })

        it('should return an error at adding contacts with an empty phone',() => {
            return logic.register(usermail, password)
                .then(() => logic.login(usermail,password))
                .then(token => logic.addContact(usermail, name, surname, '', contactmail, address, token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err).to.throw
                    expect(err.message).to.equal('invalid phone')
                })      
        })

        it('should return an error at adding contacts with an empty contactmail',() => {
            return logic.register(usermail, password)
                .then(() => logic.login(usermail,password))
                .then(token => logic.addContact(usermail, name, surname, phone, '', address, token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err).to.throw
                    expect(err.message).to.equal('invalid contactmail')
                })      
        })

        it('should return an error at adding contacts with an empty address',() => {
            return logic.register(usermail, password)
                .then(() => logic.login(usermail,password))
                .then(token => logic.addContact(usermail, name, surname, phone, contactmail, '', token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err).to.throw
                    expect(err.message).to.equal('invalid address')
                })      
        })
    })
    
    describe('delete contacts', () => {

        it('should delete contact', ()=> {
           return logic.register(usermail, password)
            .then(() => logic.login(usermail, password))
            .then(token => logic.addContact(usermail, name, surname, phone, contactmail, address, token)
                .then(({id}) => {
                    debugger
                    return logic.deleteContact(usermail,id,token)
                        .then(({message}) => expect(message).to.equal('Contact deleted correctly'))
                })
            )
       })
       it('should fail deleting a non-existing contact', () => {
           let id = 'pepito'
            return logic.register(usermail, password)
            .then(() => logic.login(usermail, password))
                .then((token) => {
                    return logic.deleteContact(usermail,id,token)
                        .catch(({message}) => message)
                        .then((message) => expect(message).to.equal(`contact ${id} does not exist`))
                })
       })
    })

    describe('edit contacts', () => {
        it('should edit a contact correctly', () => {
            return logic.register(usermail, password)
            .then(() => logic.login(usermail,password))
            .then((token) => {
                return logic.addContact(usermail, name, surname, phone, contactmail, address, token)
                    .then(({id}) => {
                        debugger
                        return logic.updateContact(usermail, id ,"name", surname, phone, contactmail, address, token)
                    })
                    .then(({message}) => expect(message).to.equal('Contact updated successfully!') )
            })
        })
    })

    describe('list contacts', () =>{
        it('should list all contacts of a user', () => {
            return logic.register(usermail, password)
                .then(() => logic.login(usermail,password))
                .then((token) => {
                    return logic.addContact(usermail, name, surname, phone, contactmail, address, token)
                        .then(() => {
                            return logic.listContact(usermail,token)
                        })
                        .then((res) => {
                            debugger
                            return expect(res.contacts.length).to.equal(1) 
                        })
                })
        })
    })
})