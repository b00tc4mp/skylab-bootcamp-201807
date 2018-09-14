require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose
const { User, Notebook, Note } = require('../data/models')

const { env: { MONGO_URL } } = process

//@@ Test Logic

describe('logic', () => {
    
    const email = `gotcha${Math.random()}@mail.com`, password = `pass${Math.random()}`, name = `name${Math.random()}`
    let _connection
    let usersCount = 0

    const url1 = "https://www.youtube.com/watch?v=R54neaLznFA"
    const url2 = "http://youtu.be/cCnrX1w5luM"
    const url3 = "http://youtube/cCnrX1w5luM"
    const url4 = "www.youtube.com/cCnrX1w5luM "
    const url5 = "youtu.be/cCnrX1w5luM"
    
    const url6 = "https://www.youtube.com/watch?v=R54neaLznFA"
    const url7 = "http://youtu.be/cCnrX1w5lu"
    const url8 = "http://youtbe/cCnrX1w5luM"
    const url9 = "wwwyoutube.com/cCnrX1w5luM "
    const url10 = "youtu.be/cCrX1w5luM"

    //@@before test connect to mongodb

    before(() =>
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )

    //@@before each test delete content in collections and generate random users

    beforeEach(() =>
        Promise.all([
            Notebook.deleteMany(),
            Note.deleteMany(),
            User.deleteMany()
        ])
            .then(() => {
                let count = Math.floor(Math.random() * 100)

                const creations = []
                
                while (count--) creations.push({ email: `other-${Math.random()}@mail.com`, password: `123-${Math.random()}`, name : `name${Math.random()}` })

                if (usersCount = creations.length)
                    return User.create(creations)
            })
    )

    //@@validate fields
    //@@logic._validateField
    //@@logic._validatEmail
    //@@logic._validateNamefield
    //@@logic._validateYouTube

    true && describe('validate fields', () => {
        
        //@@should succed on correct value
        it('should succeed on correct value', () => {
            
            expect(() => logic._validateStringField('email', email).to.equal(email))
            expect(() => logic._validateEmail('email', email).to.equal(email))
            expect(() => logic._validateStringField('password', password).to.equal(password))
            expect(() => logic._validateNameField('name', name).to.equal(name))
            
        })
        //@@should succed on undefined value
        it('should fail on undefined value', () => {
            expect(() => logic._validateStringField('name', undefined)).to.throw(`invalid name`)
        })
        //@@sould fail on empty value
        it('should fail on empty value', () => {
            expect(() => logic._validateStringField('name', '')).to.throw(`invalid name`)
        })
        //@@should fail on numeric value
        it('should fail on numeric value', () => {
            expect(() => logic._validateStringField('name', 123)).to.throw(`invalid name`)
        })
        //@@should succedd on correct youtube url
        it('should succeed on correct youtube url', () => {
            expect(() => logic._validateYouTube(url1).to.equal(url1))
            expect(() => logic._validateYouTube(url2).to.equal(url2))
            expect(() => logic._validateYouTube(url3).to.equal(url3))
            expect(() => logic._validateYouTube(url4).to.equal(url4))
            expect(() => logic._validateYouTube(url5).to.equal(url5))
        })
        //@@should fail on incorrect youtube url
        it('should fail on incorrect youtube url', () => {
            expect(() => logic._validateYouTube(url6).to.throw(`invalid Youtube url`))
            expect(() => logic._validateYouTube(url7).to.throw(`invalid Youtube url`))
            expect(() => logic._validateYouTube(url8).to.throw(`invalid Youtube url`))
            expect(() => logic._validateYouTube(url9).to.throw(`invalid Youtube url`))
            expect(() => logic._validateYouTube(url10).to.throw(`invalid Youtube url`))
        })
    })

    

    //@@register user
    //@@logic.register

    true && describe('register user', () => {
        it('should register correctly', () =>
            User.findOne({ email })
                .then(user => {
                    expect(user).to.be.null

                    return logic.register(email, password, name)
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
        //@@should fail on trying to register on already registered user
        it('should fail on trying to register an already registered user', () =>
            User.create({ email, password, name })
                .then(() => logic.register(email, password, name))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user with ${email} email already exist`))
        )
        //@@should fail on trying to register with undefined email
        it('should fail on trying to register with an undefined email', () =>
            logic.register(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )
        //@@should fail on trying to register with an empty email
        it('should fail on trying to register with an empty email', () =>
            logic.register('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )
        //@@should fail on trying to register with a numeric email
        it('should fail on trying to register with a numeric email', () =>
            logic.register(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )
        //@@should fail on trying to register with an undefined password
        it('should fail on trying to register with an undefined password', () =>
            logic.register(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
        //@@should fail on trying to register with an empty password
        it('should fail on trying to register with an empty password', () =>
            logic.register(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
        //@@should fail on trying to register with a numeric password
        it('should fail on trying to register with a numeric password', () =>
            logic.register(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    //@@authenticate user
    //@@logic.authenticate

    true && describe('authenticate user', () => {
        beforeEach(() => User.create({ email, password, name }))
        let userid

        //@@should login correctly
        it('should login correctly', () =>
            logic.authenticate(email, password)
                
                .then(res => {
                    
                    userid = res._id.toString()
                })
                .then( ()=> {
                    return User.findOne({ email})
                })
                .then( res => {
                    expect(res._id.toString()).to.equal(userid)
                })
                
        )
        //@@should fail on trying to login with an undefined email
        it('should fail on trying to login with an undefined email', () =>
            logic.authenticate(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )
        
        //@@should fail on trying to login with an empty email
        it('should fail on trying to login with an empty email', () =>
            logic.authenticate('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )
        //@@should fail on trying to login with a numeric email
        it('should fail on trying to login with a numeric email', () =>
            logic.authenticate(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )
        //@@should fail on trying to login with an undefined password
        it('should fail on trying to login with an undefined password', () =>
            logic.authenticate(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
        //@@should fail on trying to login with an empty password
        it('should fail on trying to login with an empty password', () =>
            logic.authenticate(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
        //@@should fail on trying to login with a numeric password
        it('should fail on trying to login with a numeric password', () =>
            logic.authenticate(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    //@@update user Password
    //@@logic.updatePassword

    true && describe('update user', () => {
        const newPassword = `${password}-${Math.random()}`

        beforeEach(() => User.create({ name, email, password }))

        //@@should update password correctly
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

        //@@should fail on trying to update password witn an undefined email
        it('should fail on trying to update password with an undefined email', () =>
            logic.updatePassword(undefined, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        //@@should fail on trying to update password with an empty email
        it('should fail on trying to update password with an empty email', () =>
            logic.updatePassword('', password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        //@@should fail on trying to update password witn a numeric email
        it('should fail on trying to update password with a numeric email', () =>
            logic.updatePassword(123, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        //@@should fail on trying to update password with an undefined password
        it('should fail on trying to update password with an undefined password', () =>
            logic.updatePassword(email, undefined, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        //@@should fail on trying to update password witn an empty password
        it('should fail on trying to update password with an empty password', () =>
            logic.updatePassword(email, '', newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        //@@should fail on trying to update password with a numeric password
        it('should fail on trying to update password with a numeric password', () =>
            logic.updatePassword(email, 123, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        //@@should fail on trying to update password with an undefined new password
        it('should fail on trying to update password with an undefined new password', () =>
            logic.updatePassword(email, password, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        //@@should fail on trying to update password witn an emty new password
        it('should fail on trying to update password with an empty new password', () =>
            logic.updatePassword(email, password, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        //@@should fail on trying to update password with a numeric new password
        it('should fail on trying to update password with a numeric new password', () =>
            logic.updatePassword(email, password, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )
    })

    //@@unregister user
    //@@logic.unresgisterUser

    true && describe('unregister user', () => {
        const numericEmail = 123
        beforeEach(() => User.create({ email, password, name }))

        //@@should unregister user correctly
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

        //@@should fail on trying to unregister user with an undefined email
        it('should fail on trying to unregister user with an undefined email', () =>
            logic.unregisterUser(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        //@@should fail on trying to unregister user with an empty email
        it('should fail on trying to unregister user with an empty email', () =>
            logic.unregisterUser('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        //@@should fail on trying to unregister user with a numeric email
        it('should fail on trying to unregister user with a numeric email', () =>
            logic.unregisterUser(numericEmail, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user with ${numericEmail} email does not exist`))
        )

        //@@should fail on trying to unregister user with an undefined password
        it('should fail on trying to unregister user with an undefined password', () =>
            logic.unregisterUser(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
        
        //@@should fail on trying to unregister user with an empty password
        it('should fail on trying to unregister user with an empty password', () =>
            logic.unregisterUser(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        
    })

    //@@create notebook
    //@@logic.createNotebook

    true && describe('create notebook', () => {
        const notebooktitle = "notebooktitletext", videoid = "R54neaLznFA", videourl = "https://www.youtube.com/watch?v=R54neaLznFA", date = new Date()
        let userid
        beforeEach(() => {
            return User.create({ email, password, name})
            .then( res => {
                userid = res._id.toString() 
            })
        })

        //@@should create a notebook succesfully on correct data
        it('should create a notebook succesfully on correct data', () => 
            logic.createNotebook( userid, notebooktitle, videourl)
                .then(res => {
                    expect(res._doc.notebooktitle).to.equal(notebooktitle)

                    return User.findOne({ _id: res._doc.user })
                })
                .then(user => {
                    return Notebook.find({ user: user.id})
                })
                .then(notebooks => {
                    expect(notebooks.length).to.equal(1)

                    const [notebook] = notebooks

                    
                    expect(notebook.videotitle).to.equal("Learn The MERN Stack [3] - Client Setup & Reactstrap")
                    expect(notebook.videoid).to.equal(videoid)
                    expect(notebook.videourl).to.equal(videourl)
                    
                })

        
    )})

    //@@list notebook
    //@@logic.listNotebook

    true && describe('list notebook', () => {
        let notebooks = [
            {notebooktitle : "notebooktitletext1", videotitle : "videotitletext1", videoid : "123abc1", videourl : "https://www.youtube.com/watch?v=R54neaLznFA", videothumbnail: "http://img.youtube.com/vi/R54neaLznFA/0.jpg",date: new Date('2018-02-20T12:10:15.474Z')},
            {notebooktitle : "notebooktitletext2", videotitle : "videotitletext2", videoid : "123abc2", videourl : "http://youtu.be/cCnrX1w5luM", videothumbnail: "http://img.youtube.com/vi/R54neaLznFA/0.jpg",date: new Date('2018-02-20T12:10:15.474Z')},
            {notebooktitle : "notebooktitletext3", videotitle : "videotitletext3", videoid : "123abc3", videourl : "http://youtube/cCnrX1w5luM", videothumbnail: "http://img.youtube.com/vi/R54neaLznFA/0.jpg",date: new Date('2018-02-20T12:10:15.474Z')},
            {notebooktitle : "notebooktitletext4", videotitle : "videotitletext4", videoid : "123abc4", videourl : "www.youtube.com/cCnrX1w5luM ", videothumbnail: "http://img.youtube.com/vi/R54neaLznFA/0.jpg",date: new Date('2018-02-20T12:10:15.474Z')},
            {notebooktitle : "notebooktitletext5", videotitle : "videotitletext5", videoid : "123abc5", videourl : "youtu.be/cCnrX1w5luM", videothumbnail: "http://img.youtube.com/vi/R54neaLznFA/0.jpg",date: new Date('2018-02-20T12:10:15.474Z')}
        ]
        let userId
    

        beforeEach(() =>
            new User({ email, password, name }).save()
                .then(user => {
                    
                    userId = user.id
                    
                    notebooks.forEach(notebook => notebook.user = userId)

                    return Notebook.insertMany(notebooks)
                })
                //.then(_notebooks => notebooks = _notebooks.map(notebook => notebook._doc))
        )
        //@@should list all user notebooks
        it('should list all user notebooks', () => {
            return logic.listNotebooks( userId )
                .then(_notebooks => {

                    expect(_notebooks.length).to.equal(notebooks.length)
                    
                })
        })

    })

    //@@list notebook by id
    //@@logic.listNotebookById

    true && describe('list notebook by id', () => {
        let _notebook = [{notebooktitle : "notebooktitletext1", videotitle : "videotitletext1", videoid : "123abc1", videourl : "https://www.youtube.com/watch?v=R54neaLznFA", videothumbnail: "http://img.youtube.com/vi/R54neaLznFA/0.jpg",date: new Date('2018-02-20T12:10:15.474Z')}]
        let _notebookid
        let userId

        beforeEach(() =>
            new User({ email, password, name}).save()
                .then(user => {
                    userId = user.id
                    _notebook.forEach(_notebook => _notebook.user = userId)
                    return Notebook.create(_notebook)
                })
                .then(_notebook => {
                    _notebook = _notebook.map(notebooks => notebooks._doc)
                    _notebookid = _notebook[0]._id.toString()
                })
            )
        //@@should list a notebook by its id
        it('should list a notebook by its id', () => {
            return logic.listNotebooksByNotebookId(userId, _notebookid)
                .then(notebook => {
                    expect(notebook).to.exist
                    expect(notebook.notebooktitle).to.equal(_notebook[0].notebooktitle)
                    expect(notebook.videotitle).to.equal(_notebook[0].videotitle)
                    expect(notebook.videoid).to.equal(_notebook[0].videoid)
                    expect(notebook.videourl).to.equal(_notebook[0].videourl)
                    expect(notebook.date).to.deep.equal(_notebook[0].date)
                })
        })
    })

    //@@update notebook
    //@@logic.updateNotebook
    //€€
    true && describe('update notebook title', () => {

        let _notebook = [{notebooktitle : "notebooktitletext1", videotitle : "videotitletext1", videoid : "123abc1", videourl : "https://www.youtube.com/watch?v=R54neaLznFA", videothumbnail: "http://img.youtube.com/vi/R54neaLznFA/0.jpg",date: new Date('2018-02-20T12:10:15.474Z')}]
        const newTitle = "new title"
        let _notebookid
        let userId
        let sessionUserId

        beforeEach(() =>
            new User({ email, password, name}).save()
                .then(user => {
                   userId = user.id
                    _notebook.forEach(_notebook => _notebook.user = userId)
                    return Notebook.create(_notebook)
                })
                .then(_notebook => {
                    _notebook = _notebook.map(notebooks => notebooks._doc)
                    _notebookid = _notebook[0]._id.toString()
                })
            )
        //@@should update title with correct id and title
        it('should update title with correct id and title', () => {
            sessionUserId = userId
            return logic.updateNotebook(userId, sessionUserId, _notebookid, newTitle)
                .then( () => {
                    return Notebook.findOne({ _id: _notebookid})
                })
                .then( res => {
                    expect(res.notebooktitle).to.equal(newTitle)
                })
        })
        

    })

    //@@remove notebook
    //@@logic.deleteNotebook
    //€€
    true && describe('remove notebook by id', () => {

        let notebook = [{notebooktitle : "notebooktitletext1", videotitle : "videotitletext1", videoid : "123abc1", videourl : "https://www.youtube.com/watch?v=R54neaLznFA", videothumbnail: "http://img.youtube.com/vi/R54neaLznFA/0.jpg",date: new Date('2018-02-20T12:10:15.474Z')}]
        let notebookid
        let userId
        let sessionUserId

        beforeEach(() =>
            new User({ email, password, name}).save()
                .then(user => {
                    userId = user.id
                    notebook.forEach(notebook => notebook.user = userId)
                    return Notebook.create(notebook)
                    
                })
                .then(_notebook => {
                   notebookid = _notebook[0]._doc._id.toString()
                })
        )
        //@@should remove a notebook correctly with the correct id
        it('should remove a notebook correctly with the correct id', () => {
            sessionUserId = userId
            return logic.removeNotebook(userId, sessionUserId, notebookid)
                .then(res => {
                    expect(res).to.be.true
                 })
                .then( () => {
                    return Notebook.findOne({notebookid})
                })
                .then(res =>{
                    expect(res).to.equal(null)
                })
        })
        
    })

     

    //@@create note
    //@@logic.createNote


    true && describe('create note', () => {

        let _notebook = [{notebooktitle : "notebooktitletext1", videotitle : "videotitletext1", videoid : "123abc1", videourl : "https://www.youtube.com/watch?v=R54neaLznFA", videothumbnail: "http://img.youtube.com/vi/R54neaLznFA/0.jpg",date: new Date('2018-02-20T12:10:15.474Z')}]
        let _notebookid
        let _note = [{seconds: 23, notetitle: "Note Title Test", notetext: "Note Text Title"}]
        let userId
        const noTitle = ''

        beforeEach(() => 
            
            new User({ email, password, name}).save()
                .then(user => {
                    userId = user.id
                    _notebook.forEach(_notebook => _notebook.user = userId)
                    return Notebook.create(_notebook)
                })
                .then(_notebook => {
                    _notebook = _notebook.map(notebooks => notebooks._doc)
                    _notebookid = _notebook[0]._id.toString()
                    _note.forEach(_note => _note.notebook = _notebookid)
                    _note.forEach(_note => _note.user = userId)
                })
            )
            //@@should create a note with the correct data
            it('should create a note with the correct data', () => {
                return logic.createNote(_note[0].seconds, _note[0].notetitle, _note[0].notetext, _notebookid, userId)
                
                    .then( res => {
                        expect(res._doc.seconds).to.equal(_note[0].seconds)
                        expect(res._doc.notetitle).to.equal(_note[0].notetitle)
                        expect(res._doc.notetext).to.equal(_note[0].notetext)
                        expect(res._doc.notebook.toString()).to.equal(_notebookid)
                        expect(res._doc.user.toString()).to.equal(userId)


                    })
            })
            //@@should fail to create a note without a title
            it('should fail to create a note without a title', () => { 
            return logic.createNote(_note[0].seconds, noTitle, _note[0].notetext, _notebookid, userId)
                    .catch(err => err)
                    .then( err => {
                        expect(err).to.exist
                    })
            })
        
    })

    //@@list note by user id
    //@@logic.listNotes

    true && describe('list notes by user id', () => {

        let _notebook = [{notebooktitle : "notebooktitletext1", videotitle : "videotitletext1", videoid : "123abc1", videourl : "https://www.youtube.com/watch?v=R54neaLznFA", videothumbnail: "http://img.youtube.com/vi/R54neaLznFA/0.jpg",date: new Date('2018-02-20T12:10:15.474Z')}]
        let _notebookid
        let _note = [{seconds: 23, notetitle: "Note Title Test", notetext: "Note Text Title"}]
        let _noteid
        let userId

        beforeEach(() => 
            
            new User({ email, password, name}).save()
                .then(user => {
                    userId = user.id
                    _notebook.forEach(_notebook => _notebook.user = userId)
                    return Notebook.create(_notebook)
                })
                .then(_notebook => {
                    _notebook = _notebook.map(notebooks => notebooks._doc)
                    _notebookid = _notebook[0]._id.toString()
                    _note.forEach(_note => _note.notebook = _notebookid)
                    _note.forEach(_note => _note.user = userId)
                    return Note.create(_note[0])
                })
                .then(note => {
                    _noteid = note._id.toString()
                })
                
        )
        //@@should list the notes by user id correctly
        it('should list the notes by user id correctly', () => {
            return logic.listNotesbyUser(userId)
                .then( res => {
                    expect(res[0]._doc.seconds).to.equal(_note[0].seconds)
                    expect(res[0]._doc.notetitle).to.equal(_note[0].notetitle)
                    expect(res[0]._doc.notetext).to.equal(_note[0].notetext)
                    expect(res[0]._doc._id.toString()).to.equal(_noteid)
          
                })
        })

    })

    //@@list note by notebookid
    //@@logic.listNotebyNotebookId

                   
    true && describe('list notes by notebookid', () => {

        let _notebook = [{notebooktitle : "notebooktitletext1", videotitle : "videotitletext1", videoid : "123abc1", videourl : "https://www.youtube.com/watch?v=R54neaLznFA", videothumbnail: "http://img.youtube.com/vi/R54neaLznFA/0.jpg",date: new Date('2018-02-20T12:10:15.474Z')}]
        let _notebookid
        let _note = [{seconds: 23, notetitle: "Note Title Test", notetext: "Note Text Title"}]
        let _noteid
        let userId

        beforeEach(() => 
            
            new User({ email, password, name}).save()
                .then(user => {
                    userId = user.id
                    _notebook.forEach(_notebook => _notebook.user = userId)
                    return Notebook.create(_notebook)
                })
                .then(_notebook => {
                    _notebook = _notebook.map(notebooks => notebooks._doc)
                    _notebookid = _notebook[0]._id.toString()
                    _note.forEach(_note => _note.notebook = _notebookid)
                    _note.forEach(_note => _note.user = userId)
                    return Note.create(_note[0])
                })
                .then(note => {
                    _noteid = note._id.toString()
                })
                
        )
        //@@list the notes by notebooid correctly
        it('should list the notes by notebookid correctly', () => {
            return logic.listNotebyNotebookId(_notebookid)
                .then( res => {
                    expect(res[0]._doc.seconds).to.equal(_note[0].seconds)
                    expect(res[0]._doc.notetitle).to.equal(_note[0].notetitle)
                    expect(res[0]._doc.notetext).to.equal(_note[0].notetext)
                    expect(res[0]._doc._id.toString()).to.equal(_noteid)
          
                })
        })

    })

    //@@list note by noteid
    //@@logic.listNotesbyNoteId


    true && describe('list notes by noteId', () => {

        let _notebook = [{notebooktitle : "notebooktitletext1", videotitle : "videotitletext1", videoid : "123abc1", videourl : "https://www.youtube.com/watch?v=R54neaLznFA", videothumbnail: "http://img.youtube.com/vi/R54neaLznFA/0.jpg",date: new Date('2018-02-20T12:10:15.474Z')}]
        let _notebookid
        let _note = [{seconds: 23, notetitle: "Note Title Test", notetext: "Note Text Title"}]
        let _noteid
        let userId

        beforeEach(() => 
            
            new User({ email, password, name}).save()
                .then(user => {
                    userId = user.id
                    _notebook.forEach(_notebook => _notebook.user = userId)
                    return Notebook.create(_notebook)
                })
                .then(_notebook => {
                    _notebook = _notebook.map(notebooks => notebooks._doc)
                    _notebookid = _notebook[0]._id.toString()
                    _note.forEach(_note => _note.notebook = _notebookid)
                    _note.forEach(_note => _note.user = userId)
                    return Note.create(_note[0])
                })
                .then(note => {
                    _noteid = note._id.toString()
                })
                
        )
        //@@should list the notes by noteid correctly
        it('should list the notes by noteid correctly', () => {
            return logic.listNotesbyNoteId(_noteid)
                .then( res => {
                    expect(res._doc.seconds).to.equal(_note[0].seconds)
                    expect(res._doc.notetitle).to.equal(_note[0].notetitle)
                    expect(res._doc.notetext).to.equal(_note[0].notetext)
                    expect(res._doc._id.toString()).to.equal(_noteid)
          
                })
        })

    })

        
    //@@remove note
    //@@logic.deleteNote

    //€€
    true && describe('remove by noteId', () => {

        let _notebook = [{notebooktitle : "notebooktitletext1", videotitle : "videotitletext1", videoid : "123abc1", videourl : "https://www.youtube.com/watch?v=R54neaLznFA", videothumbnail: "http://img.youtube.com/vi/R54neaLznFA/0.jpg",date: new Date('2018-02-20T12:10:15.474Z')}]
        let _notebookid
        let _note = [{seconds: 23, notetitle: "Note Title Test", notetext: "Note Text Title"}]
        let _noteid
        let userId
        let sessionUserId

        beforeEach(() => 
            
            new User({ email, password, name}).save()
                .then(user => {
                    userId = user.id
                    _notebook.forEach(_notebook => _notebook.user = userId)
                    return Notebook.create(_notebook)
                })
                .then(_notebook => {
                    _notebook = _notebook.map(notebooks => notebooks._doc)
                    _notebookid = _notebook[0]._id.toString()
                    _note.forEach(_note => _note.notebook = _notebookid)
                    _note.forEach(_note => _note.user = userId)
                    return Note.create(_note[0])
                })
                .then(note => {
                    _noteid = note._id.toString()
                })
                
        )

        //@@should remove note correctly
        it('should remove note correctly', () => {
            sessionUserId = userId
            return logic.removeNote(userId, sessionUserId, _noteid)
                .then( res => {
                    expect(res).to.be.true         
                    
                    return Note.findOne({ _id : _noteid })
                })
                .then( note => {
                    expect(note).to.equal(null)
                })
        })
        

    })


    //@@update note
    //@@logic.updateNote    
    //€€
    true && describe('update note', () => {

        let _notebook = [{notebooktitle : "notebooktitletext1", videotitle : "videotitletext1", videoid : "123abc1", videourl : "https://www.youtube.com/watch?v=R54neaLznFA", videothumbnail: "http://img.youtube.com/vi/R54neaLznFA/0.jpg",date: new Date('2018-02-20T12:10:15.474Z')}]
        let _notebookid
        let _note = [{seconds: 23, notetitle: "Note Title Test", notetext: "Note Text Title"}]
        let _noteid
        const newNoteTitle = "newNoteTitle Text"
        const newNoteText = "newNoteText Text"
        let userId
        let sessionUserId
        let inputEmpty = ''
        let inputUndefined = undefined
        let inputNull = null

        beforeEach(() => 
            
            new User({ email, password, name}).save()
                .then(user => {
                    userId = user.id
                    _notebook.forEach(_notebook => _notebook.user = userId)
                    return Notebook.create(_notebook)
                })
                .then(_notebook => {
                    _notebook = _notebook.map(notebooks => notebooks._doc)
                    _notebookid = _notebook[0]._id.toString()
                    _note.forEach(_note => _note.notebook = _notebookid)
                    _note.forEach(_note => _note.user = userId)
                    return Note.create(_note[0])
                })
                .then(note => {
                    _noteid = note._id.toString()
                })
                
        )
        
        //@@should update a note correctly
        it('should update a note correctly', () => {
            sessionUserId = userId
            return logic.updateNote(userId, sessionUserId, _noteid, newNoteTitle, newNoteText)
            .then( res => {
                expect(res[0]._doc.notetitle).to.equal(newNoteTitle)       
                expect(res[0]._doc.notetext).to.equal(newNoteText) 
            })            
        })
        
        //@@should update only the title (& text empty) of the note correctly
        it('should update only the title (& text empty) of the note correctly', () => {
            sessionUserId = userId
            return logic.updateNote(userId, sessionUserId, _noteid, newNoteTitle, inputEmpty)
            .then( res => {
                
                expect(res[0]._doc.notetitle).to.equal(newNoteTitle)       
                expect(res[0]._doc.notetext).to.equal(_note[0].notetext) 
            })            
        })
        
        //@@should update a only the text (& title empty) of the note correctly
        it('should update a only the text (& title empty) of the note correctly', () => {
            sessionUserId = userId
            return logic.updateNote(userId, sessionUserId, _noteid, inputEmpty, newNoteText)
            .then( res => {
                expect(res[0]._doc.notetitle).to.equal(_note[0].notetitle)       
                expect(res[0]._doc.notetext).to.equal(newNoteText) 
            })            
        })

        //@@should update only the title (& text undefined) of the note correctly
        it('should update only the title (& text undefined) of the note correctly', () => {
            sessionUserId = userId
            return logic.updateNote(userId, sessionUserId, _noteid, newNoteTitle, inputUndefined)
            .then( res => {
                
                expect(res[0]._doc.notetitle).to.equal(newNoteTitle)       
                expect(res[0]._doc.notetext).to.equal(_note[0].notetext) 
            })            
        })
        
        //@@should update a only the text (& title undefined) of the note correctly
        it('should update a only the text (& title undefined) of the note correctly', () => {
            sessionUserId = userId
            return logic.updateNote(userId, sessionUserId, _noteid, inputUndefined, newNoteText)
            .then( res => {
                expect(res[0]._doc.notetitle).to.equal(_note[0].notetitle)       
                expect(res[0]._doc.notetext).to.equal(newNoteText) 
            })            
        })

        //@@should update only the title (& text null) of the note correctly
        it('should update only the title (& text null) of the note correctly', () => {
            sessionUserId = userId
            return logic.updateNote(userId, sessionUserId, _noteid, newNoteTitle, inputNull)
            .then( res => {
                
                expect(res[0]._doc.notetitle).to.equal(newNoteTitle)       
                expect(res[0]._doc.notetext).to.equal(_note[0].notetext) 
            })            
        })
        
        //@@should update a only the text (& title null) of the note correctly
        it('should update a only the text (& title null) of the note correctly', () => {
            sessionUserId = userId
            return logic.updateNote(userId, sessionUserId, _noteid, inputNull, newNoteText)
            .then( res => {
                expect(res[0]._doc.notetitle).to.equal(_note[0].notetitle)       
                expect(res[0]._doc.notetext).to.equal(newNoteText) 
            })            
        })
        

    })
    


    

    //@@after Clean collections & disconnect

    after(() =>
        Promise.all([
            Notebook.deleteMany(),
            Note.deleteMany(),
            User.deleteMany()
        ])
            .then(() => _connection.disconnect())
    )
})