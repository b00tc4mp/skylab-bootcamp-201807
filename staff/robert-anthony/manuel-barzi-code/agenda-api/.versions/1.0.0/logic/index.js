'use strict'

const validateEmail = require('../utils/validate-email')
const { ObjectId } = require('mongodb')

const logic = {
    _users: null,

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
                this._validateStringField('email', email)
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._users.findOne({ email })
            })
            .then(user => {
                if (user) throw new LogicError(`user with ${email} email already exist`)

                const _user = { email, password, notes: [] }
                return this._users.insertOne(_user)
            })
    },

    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('email', email)
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._users.findOne({ email })
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
                this._validateStringField('email', email)
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)

                return this._users.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)
                if (user.password !== password) throw new LogicError(`wrong password`)
                if (password === newPassword) throw new LogicError('new password must be different to old password')

                return this._users.updateOne({ _id: user._id }, { $set: { password: newPassword } })
            })
            .then(() => {
                return true
            })
    },

    unregisterUser(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('email', email)
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._users.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)
                if (user.password !== password) throw new LogicError(`wrong password`)

                return this._users.deleteOne({ _id: user._id })
            })
            .then(() => {
                return true
            })
    },

    addNote(email, date, text) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('email', email)
                this._validateDateField('date', date)
                this._validateStringField('text', text)

                return this._users.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                // const notes = user.notes || []

                // notes.push({ date, text })

                // return this._users.updateOne({ _id: user._id }, { $set: { notes } })

                // ...

                // const note = { date, text }

                // return this._users.updateOne({ _id: user._id }, { $push: { notes: note } })

                // ...

                const note = { date, text }

                return this._users.updateOne({ _id: user._id }, { $addToSet: { notes: note } })
            })
            .then(res => {
                if (res.result.nModified === 0) throw new LogicError('fail to add note')

                return true
            })
    },

    listNotes(email, date) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)

                return this._users.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user ${user} does not exist`)

                if (user.notes) {
                    user.notes = user.notes.filter(({ date: _date }) => date.getFullYear() === _date.getFullYear() && date.getMonth() === _date.getMonth() && date.getDate() === _date.getDate())

                    user.notes.forEach(note => {
                        note.id = note._id.toString()

                        delete note._id
                    })
                }

                return user.notes || []
            })
    },

    removeNote(email, noteId) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)

                return this._users.findOne({ email, 'notes._id': ObjectId(noteId) })
            })
            .then((user) => {
                if (!user) throw new LogicError(`note with id ${noteId} does not exist`)

                return this._users.updateOne({ email }, { $pull: { notes: { _id: ObjectId(noteId) } } })
            })
            .then(res => {
                if (res.result.nModified === 0) throw new LogicError('fail to remove note')

                return true
            })
    }

}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }