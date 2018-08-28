const validateEmail = require('../utils/validate-email')
const validateYouTube = require('../utils/validate-youtubeurl')
const moment = require('moment')
const { User, Notebook, Note } = require('../data/models')

const logic = {
    
    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
    },

    _validateNameField(name, value) {
        if ( !value.length ) throw new LogicError(`invalid name`)
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

                return true
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

                user.password = newPassword

                return user.save()
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

    createNotebook( email, notebooktitle, videotitle, videoid, videourl, date) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                /*TODO ADD VALIDATIONS*/
                this._validateStringField('notebooktitle',notebooktitle)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exists`)

                const notebook = { notebooktitle, videotitle, videoid, videourl, date, user: user.id }

                return Notebook.create(notebook)
            })
            .then(() => true)
        
    },

    listNotebooks (email) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exists`)

                return Notebook.find({ user: user._id})
            })
    },

    listNotebookById (notebookid) {
        return Promise.resolve()
            .then(() => {
                if(!notebookid) throw new LogicError(`notebook does not exist`)

                return Notebook.findOne({ _id: notebookid})
            })

    },

    updateTitleNotebook (notebookid, newNotebookTitle) {
        return Promise.resolve()
            .then(() => {
                if(!notebookid) throw new LogicError(`notebook does not exist`)

                return Notebook.findOne({ _id: notebookid})
            })
            .then(notebook => {

                if(newNotebookTitle.length = 0) throw new LogicError (`not a valid title`)

                notebook.notebooktitle = newNotebookTitle
                
                return notebook.save()

            })
    },
    
    removeNotebook(notebookid) {
        return Promise.resolve()
            .then(() => {
                return Notebook.findOne({ _id: notebookid })
            })
            .then(notebook => {
                if(!notebook) throw new LogicError(`notebook does not exist`)

                return Notebook.deleteOne({ _id: notebookid})
            })
            .then(() => true)
    },
    
    /*
    addNote(email, date, text) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateDateField('date', date)
                this._validateStringField('text', text)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                const note = { date, text, user: user.id }

                return Note.create(note)
            })
            .then(() => true)
    },

    listNotes(email, date) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                const mDate = moment(date)

                const minDate = mDate.startOf('day').toDate()
                const maxDate = mDate.endOf('day').toDate()

                return Note.find({ user: user._id, date: { $gte: minDate, $lte: maxDate } }, { __v: 0 }).lean()
            })
            .then(notes => {
                if (notes) {
                    notes.forEach(note => {
                        note.id = note._id.toString()

                        delete note._id

                        delete note.user
                    })
                }

                return notes || []
            })
    },

    removeNote(email, noteId) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)

                return User.findOne({ email })
            })
            .then((user) => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                return Note.findOne({ _id: noteId })
                    .then(note => {
                        if (!note) throw new LogicError(`note with id ${noteId} does not exist`)

                        if (note.user.toString() !== user.id) throw new LogicError('note does not belong to user')

                        return Note.deleteOne({ _id: noteId })
                    })
            })
            .then(() => true)
    },

    

    addContact(email, contactEmail, name, surname, phone){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(contactEmail)
                this._validateStringField('name', name)
                this._validateStringField('surname', surname)
                this._validateStringField('phone', phone)
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} does not exist`)
                const newContact = {contactEmail, name, sruname, phone}
                return User.Contact.push(newContact)
            })
            .then((res)=> {
                debugger
                return true
            })
    }


    
    listContacts(email, contactEmail, name, surname, phone)

    removeContact(email, contactId)



    */

}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }