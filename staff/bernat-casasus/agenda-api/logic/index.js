'use strict'

const logic = {
    _users: null,

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new LogicError(`invalid ${fieldName}`)
    },
    _validateNumericField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'number') throw new LogicError(`invalid ${fieldName}`)
    },
    _validateEmailField(email) {
        this._validateStringField('email', email)

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email) === false) throw new LogicError(`invalid email`)
    },

    register(name, surname, email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)
                this._validateStringField('surname', surname)
                this._validateEmailField(email)
                this._validateStringField('password', password)

                return this._users.findOne({ email })
            })
            .then(user => {
                if (user) throw new LogicError(`email ${email} is already in use`)

                return this._users.insertOne({ name, surname, email, password, notes: [], contacts: [] })
            })
            .then(() => true)
    },

    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmailField(email)
                this._validateStringField('password', password)

                return this._users.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with email ${email} does not exist`)
                if (user.password !== password) throw new LogicError('wrong credentials')

                return true
            })

    },

    updateUserSettings() {
        //TODO allow the user to update name, surname, email and password  
    },

    listNotes(email, date) {
        return Promise.resolve()
            .then(() => {
                this._validateEmailField(email)
                this._validateStringField('date', date)

                return this._users.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with email ${email} does not exist`)

                let result = user.notes.filter((note) => {
                    return note.date === date
                })

                return result
            })
    },

    saveNote(email, date, text) {
        return Promise.resolve()
            .then(() => {
                this._validateEmailField(email)
                this._validateStringField('date', date)
                this._validateStringField('text', text)

                if (text.length > 350) throw new LogicError('text can not have more than 350 characters')

                return this._users.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with email ${email} does not exist`)

                const notes = user.notes
                const note = { date, text }

                notes.push(note)

                return this._users.updateOne({ email }, { $set: { notes } })
            })
            .then(() => true)
    },

    deleteNote(email, date, text) {
        return Promise.resolve()
            .then(() => {
                this._validateEmailField(email)
                this._validateStringField('date', date)
                this._validateStringField('text', text)

                if (text.length > 350) throw new LogicError('text can not have more than 350 characters')

                return this._users.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with email ${email} does not exist`)

                let notes = user.notes.filter((note) => {
                    return !(note.date === date && note.text === text)
                })

                return this._users.updateOne({ email }, { $set: { notes } })
            })
            .then(() => true)

    },

    listContacts(email) {
        return Promise.resolve()
            .then(() => {
                this._validateEmailField(email)

                return this._users.findOne({ email })
            })
            .then((user) => {
                if (!user) throw new LogicError(`user with email ${email} does not exist`)

                return user.contacts
            })
    },

    saveContact(userEmail, name, surname, phone, email, address) {
        return Promise.resolve()
            .then(() => {
                this._validateEmailField(userEmail)
                this._validateStringField('contact name', name)
                this._validateStringField('contact surname', surname)
                this._validateNumericField('contact phone', phone)
                this._validateStringField('contact email', email)
                this._validateStringField('contact address', address)

                return this._users.findOne({ email: userEmail })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with email ${userEmail} does not exist`)

                const contacts = user.contacts
                contacts.push({ name, surname, phone, email, address })

                return this._users.updateOne({ email: userEmail }, { $set: { contacts } })
            })
            .then(() => true)

    },

    deleteContact(email, cemail, cphone) {
        return Promise.resolve()
            .then(() => {
                this._validateEmailField(email)
                this._validateEmailField(cemail)
                this._validateNumericField('contact phone', cphone)

                return this._users.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with email ${email} does not exist`)

                let contacts = user.contacts.filter((contact) => {
                    return !(contact.email === cemail && contact.phone === cphone)
                })

                return this._users.updateOne({ email }, { $set: { contacts } })
            })
            .then(() => true)

    },

}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }