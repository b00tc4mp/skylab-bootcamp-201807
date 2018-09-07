const validateEmail = require('../utils/validate-email')
const moment = require('moment')
const { Contact, Note, User } = require('../data/models')

const logic = {
    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
    },

    _validateEmail(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },

    _validateDateField(name, field) {
        if (!(field instanceof Date)) throw new LogicError(`invalid ${name}`)
    },

    register(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return User.findOne({ email })
            })
            .then(user => {
                if (user) throw new LogicError(`user with ${email} email already exist`)

                return User.create({ email, password })
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

    addContact(userEmail, email, name, surname, phone) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(userEmail)
                this._validateEmail(email)

                if (typeof name !== 'undefined') this._validateStringField('name', name)
                if (typeof surname !== 'undefined') this._validateStringField('surname', surname)
                if (typeof phone !== 'undefined') this._validateStringField('phone', phone)

                return User.findOne({ email: userEmail })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                const contact = { email }

                if (name) contact.name = name
                if (surname) contact.surname = surname
                if (phone) contact.phone = phone

                user.contacts.push(new Contact(contact))

                return user.save()
            })
            .then(() => true)
    },

    listContacts(email, startWith) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('start-with text', startWith)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new Error(`user with ${email} email does not exist`)

                let contacts = user.contacts.map(contact => contact._doc)

                contacts = contacts.filter(({ email, name, surname }) => {
                    if (name) return name.startsWith(startWith)

                    if (surname)  return surname.startsWith(startWith)

                    return email.startsWith(startWith)
                })

                return contacts.map(contact => {
                    contact.id = contact._id.toString()

                    delete contact._id

                    return contact
                })
            })
    },

    removeContact(email, contactId) {
        // TODO
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }