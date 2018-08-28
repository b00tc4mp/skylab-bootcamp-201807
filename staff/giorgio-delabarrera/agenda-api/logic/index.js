'use strict'

const validateEmail = require('../utils/validate-email')

const logic = {
    _users: null,
    _notes: null,

    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new Error(`invalid ${name}`)
    },

    _validateEmail(email) {
        if (!validateEmail(email)) throw new Error('invalid email')
    },

    _validateDateField(name, field) {
        if (!(field instanceof Date)) throw new Error(`invalid ${name}`)
    },

    register(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateEmail(username)
                this._validateStringField('password', password)

                return this._users.findOne({ username })
            })
            .then(user => {
                if (user) throw new Error(`user with ${username} username already exist`)

                const _user = { username, password, notes: [] }
                return this._users.insertOne(_user)
            })
    },

    authenticate(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateEmail(username)
                this._validateStringField('password', password)

                return this._users.findOne({ username })
            })
            .then(user => {
                if (!user) throw new Error(`user with ${username} username does not exist`)
                if (user.password !== password) throw new Error(`wrong password`)

                return true
            })
    },

    updatePassword(username, password, newPassword) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateEmail(username)
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)

                return this._users.findOne({ username })
            })
            .then(user => {
                if (!user) throw new Error(`user with ${username} username does not exist`)
                if (user.password !== password) throw new Error(`wrong password`)
                if (password === newPassword) throw new Error('new password must be different to old password')

                return this._users.updateOne({ _id: user._id }, { $set: { password: newPassword } })
            })
            .then(() => {
                return true
            })
    },

    deleteUser(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateEmail(username)
                this._validateStringField('password', password)

                return this._users.findOne({ username })
            })
            .then(user => {
                if (!user) throw new Error(`user with ${username} username does not exist`)
                if (user.password !== password) throw new Error(`wrong password`)

                return this._users.deleteOne({ _id: user._id })
            })
            .then(() => {
                return true
            })
    },

    addNote(username, date, text) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateDateField('date', date)
                this._validateStringField('text', text)

                return this._users.findOne({ username })
            })
            .then(user => {
                if (!user) throw new Error(`user with ${username} username does not exist`)

                return this._notes.insertOne({ date, text, user_id: user._id })
            })
            .then(res => {
                if (!res.insertedId) throw new Error('fail to add note')
                return true
            })
    },

    listNotes(username, date) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(username)

                return this._users.findOne({ username })
            })
            .then(user => {
                if (!user) throw new LogicError(`user ${user} does not exist`)

                return this._notes.find({ user_id: user._id }).toArray()
            })
            .then(notes => {

                debugger

                let filteredNotes = []

                if (notes) {
                    filteredNotes = notes.filter(({ date: _date }) => date.getFullYear() === _date.getFullYear() && date.getMonth() === _date.getMonth() && date.getDate() === _date.getDate())

                    filteredNotes.forEach(note => {
                        note.id = note._id.toString()

                        delete note._id
                    })
                }

                return filteredNotes
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