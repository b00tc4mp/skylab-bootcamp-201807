require('dotenv').config()
const { env: { videokey } } = process

const validateEmail = require('../utils/validate-email')
const validateYouTube = require('../utils/validate-youtubeurl')
const moment = require('moment')
const { User, Notebook, Note } = require('../data/models')

const axios = require('axios')

const logic = {

    /**
     * @description Validate input is a string
     * 
     * @param {string} name
     * @param {string} value
     * 
     */

    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
    },

    /**
     * @description Validate input is a valid name
     * 
     * @param {string}  name
     * @param {string} value
     * 
     */

    _validateNameField(name, value) {
        if (!value.length) throw new LogicError(`invalid name`)
    },

    /**
     * @description Validate input is a valid email
     * 
     * @param {string} email
     * 
     */

    _validateEmail(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },

    /**
     * @description Validate input is a valid date
     * 
     * @param {string} name
     * @param {string} field
     * 
     */

    _validateDateField(name, field) {
        if (!(field instanceof Date)) throw new LogicError(`invalid ${name}`)
    },

    /**
     * @description Validate input is a valid Youtube url
     * 
     * @param {string} url
     * 
     */

    _validateYouTube(url) {
        if (!validateYouTube) throw new LogicError(`invalid Youtube url`)
    },

    /**
     * @description Register user
     * 
     * @param {string} email
     * @param {string} password
     * @param {string} name
     * 
     */

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

    /**
     * @description Authenticate user
     * 
     * @param {string} email
     * @param {string} password
     * 
     */

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

    /**
     * @description Update user password
     * 
     * @param {string} email
     * @param {string} password
     * @param {string} newPassword
     * 
     */

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

                return User.findByIdAndUpdate({ "_id": user.id }, { "password": newPassword })
            })
            .then(() => true)
    },

    /**
     * @description Unregister user
     * 
     * @param {string} email
     * @param {string} password
     * 
     */

    unregisterUser(email, password) {
        return Promise.resolve()
            .then(() => {
                if (email === undefined) throw new LogicError(`invalid email`)
                if (password === undefined) throw new LogicError(`invalid password`)

                if (email === '') throw new LogicError(`invalid email`)
                if (password === '') throw new LogicError(`invalid password`) 
                
                if (email instanceof Number) throw new LogicError(`invalid email`)
                

            })        
            .then(() => {    
                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                return User.deleteOne({ _id: user._id })
            })
            .then(() => true)
    },

    /**
     * @description Create notebook
     * 
     * @param {string} userid
     * @param {string} notebooktitle
     * @param {string} videourl
     * 
     */

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
    },

    /**
     * @description List user's notebooks
     * 
     * @param {string} userId
     * 
     */

    listNotebooks(userId) {
        return Promise.resolve()
            .then(() => {
                return User.findOne({ _id: userId })
            })
            .then(user => {
                if (!user) throw new LogicError(`user does not exists`)

                return Notebook.find({ user: user._id }).sort({ date: -1 })
            })
    },

    /**
     * @description List notebook by notebook id
     * 
     * @param {string} userId
     * @param {string} notebookid
     * 
     */

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

    //€€
    /**
     * @description Update notebook title, only allowing user's creator
     * 
     * @param {string} userId
     * @param {string} sessionUserId
     * @param {string} notebookid
     * @param {string} newnotebooktitle
     * 
     */

    updateNotebook(userId, sessionUserId, notebookid, newnotebooktitle) {
        return Promise.resolve()
            .then(() => {
                if(userId !== sessionUserId) throw new LogicError(`Permission Not Granted`)
            })
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

    /**
     * @description Remove notebook
     * 
     * @param {string} id
     * @param {string} sessionUserId
     * @param {string} notebookid 
     * 
     */
    
    removeNotebook(id, sessionUserId, notebookid) {
        return Promise.resolve()
            .then(() => {
                if(id !== sessionUserId) throw new LogicError(`Permission Not Granted`)
            })
            .then(() => {
                return Notebook.findOne({ _id: notebookid })
            })
            .then(notebook => {
                if (!notebook) throw new LogicError(`notebook does not exist`)

                return Notebook.deleteOne({ _id: notebookid })
            })
            .then(() => true)
    },

    /**
     * @description Create note
     * 
     * @param {number} seconds
     * @param {string} notetitle
     * @param {string} notetext
     * @param {string} notebook
     * @param {string} user
     * 
     */
    
    createNote(seconds, notetitle, notetext, notebook, user) {
        return Promise.resolve()
            .then(() => {
                return Notebook.findOne({ _id: notebook })
            })
            .then(res => {
                if (!res) throw new LogicError(`notebook does not exists`)
                const note = { seconds, notetitle, notetext, notebook, user }
                return Note.create(note)
            })
    },

   /**
     * @description List notes by user
     * 
     * @param {string} 
     * 
     */

   listNotesbyUser(userId) {
        return Promise.resolve()
            .then(() => {
                return User.findOne({ _id: userId })
            })
            .then(user => {
                if (!user) throw new LogicError(`user does not exists`)
                
                let notesByUser = Note.find({ user: userId })
                
                return notesByUser
            })
    },
    
    /**
     * @description List note by note id
     * 
     * @param {string} notebookid
     * 
     */
    
    listNotebyNotebookId(notebookid) {
        return Promise.resolve()
            .then(() => {

                return Notebook.findOne({ _id: notebookid })
            })
            .then(notebook => {

                if (!notebook) throw new LogicError(`notebook does not exists`)

                let notesbynotebooksids = Note.find({ notebook: notebook.id }).sort({ seconds: 1})

                return notesbynotebooksids
            })
    },
    
    /**
     * @description List note by note id
     * 
     * @param {string} noteId
     * 
     */

    listNotesbyNoteId(noteId) {
        return Promise.resolve()
            .then(() => {
                return Note.findOne({ _id: noteId })
            })
    },

    /**
     * @description Remove note
     * 
     * @param {string} id
     * @param {string} sessionUserId
     * @param {string} noteId
     * 
     */
    
    removeNote(id, sessionUserId, noteId) {
        return Promise.resolve()
            .then(() => {
                if(id !== sessionUserId) throw new LogicError(`Permission Not Granted`)
            })
            .then(() => {
                return Note.deleteOne({ _id: noteId })
            })
            .then(() => true)
    },

    
    /**
     * @description Remove all notes in a notebook by notebook id
     * 
     * @param {string} id
     * @param {string} sessionUserId
     * @param {string} notebookid
     * 
     */
    
    removeNotebooksNotes(id, sessionUserId, notebookid) {
        return Promise.resolve()
            .then(() => {
                if(id !== sessionUserId) throw new LogicError(`Permission Not Granted`)
            })
            .then(() => {
                return Note.deleteMany({notebook : notebookid})
                //return Note.deleteOne({ _id: noteId })
            })
            .then(() => true)
    },

    /**
     * @description Update title or and text of a note
     * 
     * @param {string} id
     * @param {string} sessionUserId
     * @param {string} noteId
     * @param {string} newnotetitle
     * @param {string} newnotetext
     * 
     */
    
    updateNote(id, sessionUserId, noteId, newnotetitle, newnotetext) {
        let updatetitle
        let updatetext
        
        return Promise.resolve()
            
            .then(() => {
                if(id !== sessionUserId) throw new LogicError(`Permission Not Granted`)
            })
            .then(() => {
                return Note.findOne({ _id: noteId })
            })
            .then(note => {
                
                if (newnotetitle === '') {
                    updatetitle = note.notetitle
                } else if (newnotetitle === undefined) {
                    updatetitle = note.notetitle
                } else if (newnotetitle === null) {
                    updatetitle = note.notetitle
                } else if (newnotetitle === note.notetitle) {
                    updatetitle = note.notetitle
                } else {updatetitle = newnotetitle}

                if (newnotetext === '') {
                    updatetext = note.notetext
                } else if (newnotetext === undefined) {
                    updatetext = note.notetext
                } else if (newnotetext === null) {
                    updatetext = note.notetext
                } else if (newnotetext === note.notetext) {
                    updatetext = note.notetext
                } else { updatetext = newnotetext}
                
                return Note.findByIdAndUpdate({ "_id": noteId }, { "notetitle": updatetitle, "notetext": updatetext})
                
            })
            .then(() => {
                return Note.find({"_id": noteId})
            })
            
            

    },


}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }