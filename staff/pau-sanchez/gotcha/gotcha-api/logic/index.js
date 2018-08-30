require('dotenv').config()
const { env: { videokey } } = process

const validateEmail = require('../utils/validate-email')
const validateYouTube = require('../utils/validate-youtubeurl')
const moment = require('moment')
const { User, Notebook, Note } = require('../data/models')

const axios = require('axios')

const logic = {

    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
    },

    _validateNameField(name, value) {
        if (!value.length) throw new LogicError(`invalid name`)
    },

    _validateEmail(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },

    _validateDateField(name, field) {
        if (!(field instanceof Date)) throw new LogicError(`invalid ${name}`)
    },

    _validateYouTube(url) {
        if (!validateYouTube) throw new LogicError(`invalid Youtube url`)
    },

    register(email, password, name) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('name', name)

                return User.findOne({ email })
            })
            .then(user => {
                if (user) throw new LogicError(`user with ${email} email already exist`)

                return User.create({ email, password, name })
            })
            .then(() => true)
    },

    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                return user._id/*true*/
            })
    },

    updatePassword(email, password, newPassword) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                if (password === newPassword) throw new LogicError('new password must be different to old password')

                //user.password = newPassword

                //return user.save
                return User.findByIdAndUpdate({ "_id": user.id }, { "password": newPassword })
            })
            .then(() => true)
    },

    unregisterUser(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                return User.deleteOne({ _id: user._id })
            })
            .then(() => true)
    },

    //@@create notebook
    //@@logic.createNotebook
    
    createNotebook(userid, notebooktitle, videourl) {
        let videotitle
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = videourl.match(regExp);
        const videoid = (match&&match[7].length==11)? match[7] : false
        let videothumbnail = `http://img.youtube.com/vi/${videoid}/0.jpg`
        return Promise.resolve()
            .then(() => {
                this._validateStringField('notebooktitle', notebooktitle)
                return User.findOne({ _id: userid })
            })
            .then(user => {
                if (!user) throw new LogicError(`user does not exists`)
            })
            .then(() => {
                return axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoid}&key=${videokey}&fields=items(id,snippet(title))&part=snippet,statistics`)
            })
            .then(res => {
                videotitle = res.data.items[0].snippet.title
                const notebook = { notebooktitle, videotitle, videoid, videourl, videothumbnail, user: userid }
                return Notebook.create(notebook)
            })
            .then(() => true)
    },

    //@@list user notebooks
    //@@logic.listeNotebooks

    listNotebooks(userId) {
        return Promise.resolve()
            .then(() => {
                //this._validateEmail(email)
                //debugger
                return User.findOne({ _id: userId })

            })
            .then(user => {
                if (!user) throw new LogicError(`user does not exists`)

                return Notebook.find({ user: user._id }).sort({ date: -1 })
            })
    },

    listNotebooksByNotebookId(userId, notebookid) {
        return Promise.resolve()
            .then(() => {
                return User.findOne({ _id: userId })
            })
            .then(user => {
                if (!user) throw new LogicError(`user does not exists`)
            })
            .then(() => {
                if (!notebookid) throw new LogicError(`notebook does not exist`)

                return Notebook.findOne({ _id: notebookid })
            })
    },

    updateNotebook(userId, notebookid, newnotebooktitle) {
        return Promise.resolve()
            .then(() => {
                return User.findOne({ _id: userId })

            })
            .then(user => {
                if (!user) throw new LogicError(`user does not exists`)
            })
            .then(() => {
                if (!notebookid) throw new LogicError(`notebook does not exist`)

                return Notebook.findOne({ _id: notebookid })
            })
            .then(() => {
                if (newnotebooktitle.length = 0) throw new LogicError(`not a valid title`)

                return Notebook.findByIdAndUpdate({ "_id": notebookid }, { "notebooktitle": newnotebooktitle })
            })
    },

    removeNotebook(id, notebookid) {
        return Promise.resolve()
            .then(() => {
                return Notebook.findOne({ _id: notebookid })
            })
            .then(notebook => {
                if (!notebook) throw new LogicError(`notebook does not exist`)

                return Notebook.deleteOne({ _id: notebookid })
            })
            .then(() => true)
    },

    //@@create note
    //@@logic.createNote

    createNote(seconds, notetitle, notetext, notebook) {
        return Promise.resolve()
            .then(() => {
                return Notebook.findOne({ _id: notebook })
            })
            .then(notebook => {
                if (!notebook) throw new LogicError(`notebook does not exists`)
                const note = { seconds, notetitle, notetext, notebook }
                return Note.create(note)
            })
            .then(() => true)

    },

    //@@list note by user
    //@@logic.listNotesbyUser
    
   listNotesbyUser(userId) {
    let notebooksids = []
    let notes = []
       return Promise.resolve()
        .then(() => {
            return User.findOne({ _id: userId })
        })
        .then(user => {
            if (!user) throw new LogicError(`user does not exists`)
            return Notebook.find({ user: user._id })
        })
        .then(_notebooks => {
            (_notebooks).forEach(elem => notebooksids.push(elem._id))
        })
        .then(() => {

            let notebooksbyids = notebooksids.map(elem => Note.find({ notebook: elem }))

            return Promise.all(notebooksbyids)
        }).then(res => {
            let mergedNotes = [].concat.apply([], res)
            return mergedNotes
        })

             
},

    //@@list note by noteid
    //@@logic.listNotebyNotebookId

    listNotebyNotebookId(notebookid) {
        return Promise.resolve()
            .then(() => {

                return Notebook.findOne({ _id: notebookid })
            })
            .then(notebook => {

                if (!notebook) throw new LogicError(`notebook does not exists`)

                let notesbynotebooksids = Note.find({ notebook: notebook.id })

                return notesbynotebooksids
            })

    },


    //@@list note by noteid
    //@@logic.listNotesbyNoteId

    listNotesbyNoteId(noteId) {
        return Promise.resolve()
            .then(() => {
                return Note.findOne({ _id: noteId })
            })
    },


    //@@remove note
    //@@logic.deleteNote

    removeNote(noteId) {
        return Promise.resolve()
            .then(() => {
                return Note.deleteOne({ _id: noteId })
            })
            .then(() => true)
    },

    //@@update note
    //@@logic.updateNote 

    updateNote(noteId, newnotetitle, newnotetext) {
        let updatetitle
        let updatetext
        
        return Promise.resolve()
            .then(() => {
                return Note.findOne({ _id: noteId })
            })
            .then(note => {
                updatetitle = (note.notetitle === newnotetitle) ? note.notetitle : newnotetitle

                updatetext = (note.notetext === newnotetext) ? note.notetext : newnotetext

                return Note.findByIdAndUpdate({ "_id": noteId }, { "notetitle": updatetitle, "notetext": updatetext})
                
            })
            .then(() => {

                return true
            })

    },











}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }