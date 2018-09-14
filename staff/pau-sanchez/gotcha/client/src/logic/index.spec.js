'use strict'

require('dotenv').config()

require('isomorphic-fetch')
const { expect } = require('chai')
const {logic, LogicError} = require('.')
const jwt = require('jsonwebtoken')

describe('logic', () => {
    const { JWT_SECRET } = process.env
    
    const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
    const newPassword = 'newPassword'
    
     describe('register user', () => {
        //@@should succedd on new user
        it('should succedd on new user', () => 
             logic.register(email, password, name)
            .then(res => expect(res).to.be.true)
        )
        //@@should fail on already existing user
        it('should fail on already existing user', () => 
            logic.register(email, password, name)
                .then(() => logic.register(email, password, name))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`user with ${email} email already exist`)
                })
        )
        //@@should fail on empty name
        it('should fail on empty name', () =>
            logic.register(email, password, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid name')
                })
        )
        //@@should fail on empty password
        it('should fail on empty password', () => 
            logic.register(email, '', name)
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid password')
            })
        )
        //@@should fail on empty email
        it('should fail on empty email', () => 
            logic.register('', password, name)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        )
    })

     describe('authenticate user', () => {
        const noRegisteredEmail = 'email@email.com', noRegisteredPassword = 'fakepass'

        //@@should succed on authentic user with correct data
        it('should succed on authentic user with correct data', () => {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    expect(res.message).to.equal('user authenticated')
                    let payload
                    expect(() => payload = jwt.verify(res.token, JWT_SECRET)).not.to.throw()
                })
        })
        //@@should fail on unregistered user
        it('should fail on unregistered user', () => 
            logic.authenticate( noRegisteredEmail, noRegisteredPassword)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`user with ${noRegisteredEmail} email does not exist`)
                }) 
        )
        //@@should fail on empty email
        it('should fail on empty email', () => 
            logic.authenticate('', password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        )
        //@@should fail on empty password
        it('should fail on empty password', () =>
            logic.authenticate(email, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid password')
                })
        )
     })



    
    //@@update user Password
    //@@logic.updatePassword
     describe('update user Password', () => { 
        
        //@@should update password correctly
        it('should update password correctly', () => {
        const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, newPassword = `pass${Math.random()}`,name = `name${Math.random()}`
        return logic.register(email, password, name)
            
            .then(() => logic.authenticate(email, password))
            .then(res => {
                const userId = res.id
                const token = res.token
                return logic.updatePassword(email, password, newPassword, userId, token)
            })
            .then(res => {
                expect(res).to.be.true
            })

        })

        
    
    
    //@@should fail on trying to update password with an undefined email
    it('should fail on trying to update password with an undefined email', () => {
        
        const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, newPassword = `pass${Math.random()}`,name = `name${Math.random()}`
        return logic.register(email, password, name)
            
            .then(() => logic.authenticate(email, password))
            .then(res => {
                const userId = res.id
                const token = res.token
                const undefinedEmail = undefined
                return logic.updatePassword(undefinedEmail, password, newPassword, userId, token)
            })
            .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })

        })
    
    //@@should fail on trying to update password with an empty email
    it('should fail on trying to update password with an empty email', () => {
        
        const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, newPassword = `pass${Math.random()}`,name = `name${Math.random()}`
        return logic.register(email, password, name)
            
            .then(() => logic.authenticate(email, password))
            .then(res => {
                const userId = res.id
                const token = res.token
                return logic.updatePassword('', password, newPassword, userId, token)
            })
            .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })

    })
    
    //@@should fail on trying to update password with a numeric email
    it('should fail on trying to update password with a numeric email', () => {
        
        const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, newPassword = `pass${Math.random()}`,name = `name${Math.random()}`
        return logic.register(email, password, name)
            
            .then(() => logic.authenticate(email, password))
            .then(res => {
                const numericEmail = 123456
                const userId = res.id
                const token = res.token
                return logic.updatePassword(numericEmail, password, newPassword, userId, token)
            })
            .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })

        })
    
    //@@should fail on trying to update password with an undefined password
    it('should fail on trying to update password with an undefined password', () => {
        
        const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, newPassword = `pass${Math.random()}`,name = `name${Math.random()}`
        return logic.register(email, password, name)
            
            .then(() => logic.authenticate(email, password))
            .then(res => {
                const userId = res.id
                const token = res.token
                const undefinedPassword = undefined
                return logic.updatePassword(email, undefinedPassword, newPassword, userId, token)
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid password')
            })

        })
    
    //@@should fail on trying to update password with an empty password
    it('should fail on trying to update password with an empty password', () => {
        
        const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, newPassword = `pass${Math.random()}`,name = `name${Math.random()}`
        return logic.register(email, password, name)
            
            .then(() => logic.authenticate(email, password))
            .then(res => {
                const userId = res.id
                const token = res.token
                const emptypassword = ''
                return logic.updatePassword(email, emptypassword, newPassword, userId, token)
            })
            .catch(err => err)
            .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid password')
            })

        })
    
    //@@should fail on trying to update password with an undefined new password
    it('should fail on trying to update password with an undefined new password', () => {
        
        const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, newPassword = `pass${Math.random()}`,name = `name${Math.random()}`
        return logic.register(email, password, name)
            
            .then(() => logic.authenticate(email, password))
            .then(res => {
                const userId = res.id
                const token = res.token
                const undefinedNewPassword = undefined
                return logic.updatePassword(email, password, undefinedNewPassword, userId, token)
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid new password')
            })

        })
    
    //@@should fail on trying to update password witn an empty new password
    it('should fail on trying to update password witn an empty new password',() => {
        
        const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, newPassword = `pass${Math.random()}`,name = `name${Math.random()}`
        return logic.register(email, password, name)
            
            .then(() => logic.authenticate(email, password))
            .then(res => {
                const userId = res.id
                const token = res.token
                const emptyNewPassword = '' 
                return logic.updatePassword(email, password, emptyNewPassword, userId, token)
            })
            .catch(err => err)
            .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid new password')
            })

        

        })
    
    })
    


    

    //@@unregister user
    //@@logic.unresgisterUser

     describe('unregister user', () => { 
        //@@should unregister user correctly
        it('should unregister user correctly', () => {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            
            return logic.register(email, password, name)
            
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    const userId = res.id
                    const token = res.token
                    return logic.unregister(email, password, userId, token)
                })
                .then(res => {
                    expect(res).to.be.true
                })

        })

        
        //@@should fail on trying to unregister user with an undefined email
        it('should fail on trying to unregister user with an undefined email', () => 

            logic.register(email, password, name)
            
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    const userId = res.id
                    const token = res.token
                    return logic.unregister(undefined, password, userId, token)
                })
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                })
            )
        
        //@@should fail on trying to unregister user with an empty email
        it('should fail on trying to unregister user with an empty email', () =>
    
            logic.register(email, password, name)
                
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    const userId = res.id
                    const token = res.token
                    return logic.unregister('', password, userId, token)
                })
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                })
            )
    
        //@@should fail on trying to unregister user with a numeric email
        it('should fail on trying to unregister user with a numeric email', () =>
        
            logic.register(email, password, name)
                
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    const userId = res.id
                    const token = res.token
                    return logic.unregister(1213132, password, userId, token)
                })
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                })
            )

        //@@should fail on trying to unregister user with an undefiend password
        it('should fail on trying to unregister user with an undefined password', () =>
    
            logic.register(email, password, name)
                    
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    const userId = res.id
                    const token = res.token
                    return logic.unregister(email, undefined, userId, token)
                })
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                })
            )

        //@@should fail on trying to unregister user with an empty password
        it('should fail on trying to unregister user with an empty password', () => 
    
        logic.register(email, password, name)
                    
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    const userId = res.id
                    const token = res.token
                    return logic.unregister(email,'', userId, token)
                })
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                })
             )
    })


    

    


    
    //@@create notebook
    //@@logic.createNotebook

     describe('create notebook', () => {
        
        //@@should create a notebook succesfully with correct data
        it('should create a notebook succesfully with correct data', () => {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            const notebooktitle = "notebooktitletext", videourl = "https://www.youtube.com/watch?v=R54neaLznFA"
            let token
            let userId
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    token = res.token
                    userId = res.id
                    return logic.createNotebook(userId, notebooktitle, videourl, token)
                })
                .then(res => {
                    expect(res.message).to.equal('Notebook created correctly')
                })

        })
        
        //@@should fail to create a notebook without userid
        it('should fail to create a notebook without userid', () => {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            const notebooktitle = "notebooktitletext", videourl = "https://www.youtube.com/watch?v=R54neaLznFA"
            let token
            let userId
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    token = res.token
                    userId = ''
                })
                .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.type).to.equal('invalid-json')
                })
                

        })
        
        //@@should fail to create a notebook without notebooktitle
        it('should fail to create a notebook without notebooktitle', () => {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            const notebooktitle = '', videourl = "https://www.youtube.com/watch?v=R54neaLznFA"
            let token
            let userId
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    token = res.token
                    userId = res.id
                })
                .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid notebooktitle')
                })
                

        })
        
    //@@should fail to create a notebook without videourl
    it('should fail to create a notebook without videourl', () => {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            const notebooktitle = "notebook title", videourl = ''
            let token
            let userId
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    token = res.token
                    userId = res.id
                })
                .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                })
                

        })
    
    //@@should fail to create a notebook with a none youtube url
    it('should fail to create a notebook without videourl', () => {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            const notebooktitle = "notebook title", videourl = "http://www.vimeo.com/watch?v=54neaLznFA"
            let token
            let userId
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    token = res.token
                    userId = res.id
                })
                .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                })
                

        })
    
    
    })

    
    //@@list notebook
    //@@logic.listNotebook

     describe('list notebook', () => {
        
        //@@should list all user notebooks
        it('should list all user notebooks', () =>  {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            const notebooktitle = "notebook title", videourl = "https://www.youtube.com/watch?v=jHPOzQzk9Qo"
            let token
            let userId
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    token = res.token
                    userId = res.id
                })
                .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
                .then(() => logic.listNotebooks(userId, token))
                .then(res => {
                    expect(res[0].notebooktitle).to.equal(notebooktitle)
                    expect(res[0].videourl).to.equal(videourl)
                    expect(res[0].videoid).to.equal('jHPOzQzk9Qo')
                    expect(res[0].videotitle).to.equal('Monty Python - Always Look on the Bright Side of Life')
                })
        })
    })


    
    //@@list notebook by id
    //@@logic.listNotebookById

     describe('list notebook by id', () => { 

        //@@should list a notebook by its id
        it('should list a notebook by its id', () =>  {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            const notebooktitle = "notebook title", videourl = "https://www.youtube.com/watch?v=jHPOzQzk9Qo"
            let token
            let userId
            let notebookid
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    token = res.token
                    userId = res.id
                })
                .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
                .then(res => {
                    notebookid = res.notebookdId
                })
                .then(() => logic.listNotebooksByNotebookId(userId, notebookid))
                .then(res => {
                    expect(res.notebooktitle).to.equal(notebooktitle)
                    expect(res.videourl).to.equal(videourl)
                    expect(res.videoid).to.equal('jHPOzQzk9Qo')
                    expect(res.videotitle).to.equal('Monty Python - Always Look on the Bright Side of Life')
                })
        })

    })
    
    //@@update notebook
    //@@logic.updateNotebook
     describe('update notebook title', () => {
        

        //@@should update title with correct id and title
        it('should update title with correct id and title', () => {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            const notebooktitle = "notebook title", videourl = "https://www.youtube.com/watch?v=jHPOzQzk9Qo"
            const newnotebooktitle = "new notebook title"
            let token
            let userId
            let sessionuserid
            let notebookid
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    token = res.token
                    userId = res.id
                    sessionuserid = res.id
                })
                .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
                .then(res => notebookid = res.notebookdId)
                .then(() => logic.updateNotebook(userId, sessionuserid, notebookid, newnotebooktitle, token))
                .then(res => {
                    expect(res.notebooktitle).to.equal(newnotebooktitle)
                })  
        })
        //@@should fail to update without a different user
        it('should fail to update with a different user', () => {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            const notebooktitle = "notebook title", videourl = "https://www.youtube.com/watch?v=jHPOzQzk9Qo"
            const newnotebooktitle = "new notebook title"
            let token
            let userId
            let sessionuserid = 121313113
            let notebookid
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    token = res.token
                    userId = res.id
                    
                })
                .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
                .then(res => notebookid = res.notebookdId)
                .then(() => logic.updateNotebook(userId, sessionuserid, notebookid, newnotebooktitle, token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('Permission Not Granted')
                })  
        })


    })

    
    //@@remove notebook
    //@@logic.deleteNotebook

     describe('remove notebook by id', () => {

    //@@should remove a notebook correctly with the correct id
    it('should remove a notebook correctly with the correct id', () => {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            const notebooktitle = "notebook title", videourl = "https://www.youtube.com/watch?v=jHPOzQzk9Qo"
            const newnotebooktitle = "new notebook title"
            let token
            let userId
            let sessionuserid
            let notebookid
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    token = res.token
                    userId = res.id
                    sessionuserid = res.id
                })
                .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
                .then(res => {
                    notebookid = res.notebookdId
                })
                .then(() => logic.removeNotebook(userId, sessionuserid, notebookid, token))    
                .then(() => logic.listNotebooksByNotebookId(userId, notebookid))
                .then(res => {
                    expect(res).to.be.null
                })

    })
    //@@should fail to remove a notebook with a different user
    it('should fail to remove a notebook with a different user', () => {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            const notebooktitle = "notebook title", videourl = "https://www.youtube.com/watch?v=jHPOzQzk9Qo"
            const newnotebooktitle = "new notebook title"
            let token
            let userId
            let sessionuserid = 123465789
            let notebookid
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    token = res.token
                    userId = res.id
                })
                .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
                .then(res => {
                    notebookid = res.notebookdId
                })
                .then(() => logic.removeNotebook(userId, sessionuserid, notebookid, token))    
                .then(() => logic.listNotebooksByNotebookId(userId, notebookid))
                .catch(err => err)
                .then(err => {
                    expect(err.message).to.equal('Permission Not Granted')
                })

    })

    })

    

    //@@create note
    //@@logic.createNote

     describe('create note', () => { 

    //@@should create a note with the correct data
    it('should create a note with the correct data',  () => {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            const notebooktitle = "notebook title", videourl = "https://www.youtube.com/watch?v=jHPOzQzk9Qo"
            const seconds = 23, notetitle = "note title", notetext = "note text"
            let token
            let userId
            let notebookid
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    token = res.token
                    userId = res.id
                })
                .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
                .then(res => {
                    notebookid = res.notebookdId
                })
                .then(() => logic.createNote(seconds, notetitle, notetext, notebookid, userId, token))
                .then(res => {
                    expect(res.message).to.equal('Note created correctly')
                })

        })

    //@@should fail to create a note without a title
    it('should fail to create a note without a title', () => {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            const notebooktitle = "notebook title", videourl = "https://www.youtube.com/watch?v=jHPOzQzk9Qo"
            const seconds = 23, notetitle = '', notetext = "note text"
            let token
            let userId
            let notebookid
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    token = res.token
                    userId = res.id
                })
                .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
                .then(res => {
                    notebookid = res.notebookdId
                })
                .then(() => logic.createNote(seconds, notetitle, notetext, notebookid, userId, token))
                .catch(err => err)
                .then(err => {
                    expect(err.message).to.equal('Note validation failed: notetitle: Path `notetitle` is required.')
                })
        })
    

    
    })   
    
    //@@list note by user id
    //@@logic.listNotes

     describe('list notes by user id', () => { 

    //@@should list the notes by user id correctly
    it('should list the notes by user id correctly', () => {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            const notebooktitle = "notebook title", videourl = "https://www.youtube.com/watch?v=jHPOzQzk9Qo"
            const seconds = 23, notetitle = 'note title', notetext = 'note text'
            let token
            let userId
            let notebookid
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    token = res.token
                    userId = res.id
                })
                .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
                .then(res => {
                    notebookid = res.notebookdId
                })
                .then(() => logic.createNote(seconds, notetitle, notetext, notebookid, userId, token))
                .then(() => logic.listNotesbyUser(userId, token))
                .then(res => {
                    expect(res[0].seconds).to.equal(23)
                    expect(res[0].notetitle).to.equal('note title')
                    expect(res[0].notetext).to.equal('note text')
                })
    })

    })


    
    //@@list note by notebookid
    //@@logic.listNotebyNotebookId

     describe('list notes by notebook id', () => { 

        //@@should list the notes by notebook id correctly
        it('should list the notes by notebook id correctly', () => {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            const notebooktitle = "notebook title", videourl = "https://www.youtube.com/watch?v=jHPOzQzk9Qo"
            const seconds = 23, notetitle = 'note title', notetext = 'note text'
            let token
            let userId
            let notebookid
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    token = res.token
                    userId = res.id
                })
                .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
                .then(res => {
                    notebookid = res.notebookdId
                })
                .then(() => logic.createNote(seconds, notetitle, notetext, notebookid, userId, token))
                .then(() => logic.listNotebyNotebookId(userId, notebookid))
                .then(res => {
                    expect(res[0].seconds).to.equal(23)
                    expect(res[0].notetitle).to.equal('note title')
                    expect(res[0].notetext).to.equal('note text')
                })
        })


    })


    
    //@@list note by noteid
    //@@logic.listNotesbyNoteId

     describe('list notes by noteId', () => {  

        //@@should list the notes by note id correctly
        it('should list the notes by note id correctly', () => {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            const notebooktitle = "notebook title", videourl = "https://www.youtube.com/watch?v=jHPOzQzk9Qo"
            const seconds = 23, notetitle = 'note title', notetext = 'note text'
            let token
            let userId
            let notebookid
            let noteId
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    token = res.token
                    userId = res.id
                })
                .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
                .then(res => {
                    notebookid = res.notebookdId
                })
                .then(() => logic.createNote(seconds, notetitle, notetext, notebookid, userId, token))
                .then(res => {
                    noteId = res.noteId
                })
                .then(() => logic.listNotesbyNoteId(userId, noteId))
                .then(res => {
                    expect(res.seconds).to.equal(23)
                    expect(res.notetitle).to.equal('note title')
                    expect(res.notetext).to.equal('note text')
                })
        })



    })


    

    //@@remove note
    //@@logic.deleteNote

     describe('remove by noteId', () => { 

    //@@should remove note correctly
    it('should list the notes by note id correctly', () => {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            const notebooktitle = "notebook title", videourl = "https://www.youtube.com/watch?v=jHPOzQzk9Qo"
            const seconds = 23, notetitle = 'note title', notetext = 'note text'
            let token
            let userId
            let notebookid
            let noteId
            let sessionuserid
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    token = res.token
                    userId = res.id
                    sessionuserid = res.id
                })
                .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
                .then(res => {
                    notebookid = res.notebookdId
                })
                .then(() => logic.createNote(seconds, notetitle, notetext, notebookid, userId, token))
                .then(res => {
                    noteId = res.noteId
                })
                .then(() => logic.removeNote(userId, sessionuserid, noteId, token))
                .then(() => logic.listNotesbyNoteId(userId, noteId))
                .then(res => {
                    expect(res).to.be.null
                    
                })
        })

    })

    
    
    //@@update note
    //@@logic.updateNote

    true && describe('update note', () => {  

    //@@should update a note correctly
    it('should update a note correctly', () => {
            const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
            const notebooktitle = "notebook title", videourl = "https://www.youtube.com/watch?v=jHPOzQzk9Qo"
            const seconds = 23, notetitle = 'note title', notetext = 'note text'
            let token
            let userId
            let notebookid
            let noteId
            let sessionuserid
            const newNoteTitle = 'new note title', newNoteText = 'new note text'
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    token = res.token
                    userId = res.id
                    sessionuserid = res.id
                })
                .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
                .then(res => {
                    notebookid = res.notebookdId
                })
                .then(() => logic.createNote(seconds, notetitle, notetext, notebookid, userId, token))
                .then(res => {
                    noteId = res.noteId
                })
                .then(() => logic.updateNote(userId, sessionuserid, noteId, newNoteTitle, newNoteText, token))
                .then(() => logic.listNotesbyNoteId(userId, noteId))
                .then(res => {
                    expect(res.notetitle).to.equal(newNoteTitle)
                    expect(res.notetext).to.equal(newNoteText)
                    
                })
        })

    
    //@@should update only the title of the note correctly
    it('should update only the title of the note correctly', () => {
        const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
        const notebooktitle = "notebook title", videourl = "https://www.youtube.com/watch?v=jHPOzQzk9Qo"
        const seconds = 23, notetitle = 'note title', notetext = 'note text'
        let token
        let userId
        let notebookid
        let noteId
        let sessionuserid
        const newNoteTitle = 'new note title', newNoteText = ''
        return logic.register(email, password, name)
            .then(() => logic.authenticate(email, password))
            .then(res => {
                token = res.token
                userId = res.id
                sessionuserid = res.id
            })
            .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
            .then(res => {
                notebookid = res.notebookdId
            })
            .then(() => logic.createNote(seconds, notetitle, notetext, notebookid, userId, token))
            .then(res => {
                noteId = res.noteId
            })
            .then(() => logic.updateNote(userId, sessionuserid, noteId, newNoteTitle, newNoteText, token))
            .then(() => logic.listNotesbyNoteId(userId, noteId))
            .then(res => {
                expect(res.notetitle).to.equal(newNoteTitle)
                               
            })
    })
    //@@should update only the text of the note correctly
    it('should update only the text of the note correctly', () => {
        const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
        const notebooktitle = "notebook title", videourl = "https://www.youtube.com/watch?v=jHPOzQzk9Qo"
        const seconds = 23, notetitle = 'note title', notetext = 'note text'
        let token
        let userId
        let notebookid
        let noteId
        let sessionuserid
        const newNoteTitle = '', newNoteText = 'new note text'
        return logic.register(email, password, name)
            .then(() => logic.authenticate(email, password))
            .then(res => {
                token = res.token
                userId = res.id
                sessionuserid = res.id
            })
            .then(() => logic.createNotebook(userId, notebooktitle, videourl, token))
            .then(res => {
                notebookid = res.notebookdId
            })
            .then(() => logic.createNote(seconds, notetitle, notetext, notebookid, userId, token))
            .then(res => {
                noteId = res.noteId
            })
            .then(() => logic.updateNote(userId, sessionuserid, noteId, newNoteTitle, newNoteText, token))
            .then(() => logic.listNotesbyNoteId(userId, noteId))
            .then(res => {
                expect(res.notetext).to.equal(newNoteText)
                
            })
    
    })
})
})


