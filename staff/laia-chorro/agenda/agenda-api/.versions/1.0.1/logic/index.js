'use strict'
const ObjectId = require('mongodb').ObjectID

const logic = {

    _users: null,

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new LogicError(`invalid ${fieldName}`)
    },

    _validateDate(date) {
        if (isNaN(Date.parse(date))) throw new LogicError('invalid date')
    },

    /*_findUserByUsername() {

    },*/

    register(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('password', password)

                return this._users.findOne({username})
            })
            .then(user => {
                if (user) throw new LogicError(`user ${username} already exists`)

                return this._users.insertOne({ username, password })
            })
    },

    authenticate(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('password', password)

                return this._users.findOne({username})
            })
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)

                if (user.password !== password) throw new LogicError('wrong credentials')

                return true
            })

    },

    updatePassword(username, password, newPassword) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)

                return this._users.findOne({ username })
            })
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)

                if (user.password !== password) throw new LogicError('wrong credentials')

                if (password === newPassword) throw new LogicError('new password cannot be same as current password')

                return this._users.updateOne({ _id: user._id }, { $set: { password: newPassword } })
            })
    },


    /*NOTES*/
    addNote(username, text, date) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('note text', text)

                this._validateDate(date)

                return this._users.findOne({ username })
            })
            
            .then( user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)

                return this._users.updateOne(
                    { _id: user._id },
                    { $push: { notes: { _id: ObjectId(), date: new Date(date), text } } }
                 )
            })
    },

    updateNote(username, idNote, newText) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('note text', newText)

                return this._users.findOne({ username })
            })
            .then( user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)

                if(!user.notes) throw new LogicError(`notes does not exist for user ${username}`)

                if(!(user.notes).find( note => note._id.toString() === idNote )) 
                    throw new LogicError(`note with id: "${idNote}" does not exist`)

                return this._users.updateOne(
                    { _id: user._id, 'notes._id': ObjectId(idNote) },
                    { $set: { 'notes.$.text': newText } }
                 )
            })
    },

    deleteNote(username, idNote) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)

                return this._users.findOne({ username })
            })
            .then( user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)

                if(!user.notes) throw new LogicError(`notes does not exist for user ${username}`)

                if(!(user.notes).find( note => note._id.toString() === idNote )) 
                    throw new LogicError(`note with id: "${idNote}" does not exist`)

                return this._users.updateOne(
                    { _id: user._id },
                    { $pull: { notes: { _id: ObjectId(idNote) } } }
                 )
            })
    },

    getNotesByDate(username, date) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateDate(date)

                return this._users.findOne({ username })
            })
            .then( user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)

                if (!user.notes || !user.notes.length) throw new LogicError(`user ${username} does not have any note on this date`)

                const inputDate = new Date(date),
                    inputYear = inputDate.getFullYear(),
                    inputMonth = inputDate.getMonth() + 1,
                    inputDay = inputDate.getDate(),
                    notes = []

                user.notes.forEach(note => {
                    const noteDate = new Date(note.date),
                        noteYear = noteDate.getFullYear(),
                        noteMonth = noteDate.getMonth() + 1,
                        noteDay = noteDate.getDate()

                        if (noteYear === inputYear && noteMonth === inputMonth && noteDay === inputDay)
                            notes.push(note)
                })
                
                return notes
               
            })
    },

    /*NOTES*/


    /*CONTACTS*/
    /*addContact(username, info) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('note text', text)

                //this._validateDate(date)

                return this._users.findOne({ username })
            })
            
            .then( user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)

                return this._users.updateOne(
                    { _id: user._id },
                    { $push: { contacts: { _id: ObjectId(), date: new Date(date), text } } }
                 )
            })
    },

    updateNote(username, idNote, newText) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('note text', newText)

                return this._users.findOne({ username })
            })
            .then( user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)

                if(!user.notes) throw new LogicError(`notes does not exist for user ${username}`)

                if(!(user.notes).find( note => note._id.toString() === idNote )) 
                    throw new LogicError(`note with id: "${idNote}" does not exist`)

                return this._users.updateOne(
                    { _id: user._id, 'notes._id': ObjectId(idNote) },
                    { $set: { 'notes.$.text': newText } }
                 )
            })
    },

    deleteNote(username, idNote) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)

                return this._users.findOne({ username })
            })
            .then( user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)

                if(!user.notes) throw new LogicError(`notes does not exist for user ${username}`)

                if(!(user.notes).find( note => note._id.toString() === idNote )) 
                    throw new LogicError(`note with id: "${idNote}" does not exist`)

                return this._users.updateOne(
                    { _id: user._id },
                    { $pull: { notes: { _id: ObjectId(idNote) } } }
                 )
            })
    },

    getNotesByDate(username, date) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateDate(date)

                return this._users.findOne({ username })
            })
            .then( user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)

                if (!user.notes || !user.notes.length) throw new LogicError(`user ${username} does not have any note on this date`)

                const inputDate = new Date(date),
                    inputYear = inputDate.getFullYear(),
                    inputMonth = inputDate.getMonth() + 1,
                    inputDay = inputDate.getDate(),
                    notes = []

                user.notes.forEach(note => {
                    const noteDate = new Date(note.date),
                        noteYear = noteDate.getFullYear(),
                        noteMonth = noteDate.getMonth() + 1,
                        noteDay = noteDate.getDate()

                        if (noteYear === inputYear && noteMonth === inputMonth && noteDay === inputDay)
                            notes.push(note)
                })

                return notes
            })
    },*/

    /*CONTACTS*/


}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }