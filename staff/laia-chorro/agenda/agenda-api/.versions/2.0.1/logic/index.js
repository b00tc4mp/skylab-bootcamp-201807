'use strict'
const ObjectId = require('mongodb').ObjectID

const logic = {

    _users: null,

    _notes: null,

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new LogicError(`invalid ${fieldName}`)
    },

    _validateDate(date) {
        if (isNaN(Date.parse(date))) throw new LogicError('invalid date')
    },

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

                const userId = user._id

                return this._notes.insertOne({ date: new Date(date), text, userId })
            })
            .then((res) => {
                if (res.result.nModified === 0) throw new Error('fail to add note')

                return true
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

                if (!idNote) throw new LogicError('invalid id note')

                 const userId = user._id

                 return this._notes.findOne({ _id: ObjectId(idNote), userId })
            })
            .then(note => {
                if(!note) throw new LogicError(`note with id: "${idNote}" does not exist`)

                return this._notes.updateOne({ _id: ObjectId(idNote) }, { $set: { text: newText } })
            })
            .then((res) => {
                if (res.result.nModified === 0) throw new Error('fail to update note')

                return true
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

                if (!idNote) throw new LogicError('invalid id note')

                const userId = user._id

                return this._notes.findOne({ _id: ObjectId(idNote), userId })
            })
            .then(note => {
                if(!note) throw new LogicError(`note with id: "${idNote}" does not exist`)

                return this._notes.deleteOne({ _id: ObjectId(idNote) })
            })
            .then((res) => {
                if (res.result.nModified === 0) throw new Error('fail to delete note')

                return true
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

                /*const userId = user._id,
                    timestampDate = new Date(date).getTime(),
                    fullDayInMiliSecs = 24 * 60 * 60 * 1000,
                    dayBefore = timestampDate - fullDayInMiliSecs,
                    dayAfter = timestampDate + fullDayInMiliSecs

                return this._notes.find({ userId, date: { 
                                        $gt: new Date(dayBefore), 
                                        $lt: new Date(dayAfter) } }).toArray() || []*/


                const userId = user._id,
                    dayBefore = new Date(date),
                    dayAfter = new Date(date)

                    dayBefore.setDate(dayBefore.getDate() - 1)
                    dayAfter.setDate(dayAfter.getDate() + 1)

                return this._notes.find({ userId, date: { 
                                        $gt: dayBefore, 
                                        $lt: dayAfter } }).toArray() || []
            })
            .then(notes =>  
                notes.map(note => {
                    const oldName = '_id', newName = 'id'

                    if (note.hasOwnProperty(oldName)) {
                        note[newName] = (note[oldName]).toString();

                        delete note[oldName];
                    }
                    return note;
                })
            )
    },

    /*NOTES*/


    /*CONTACTS*/

    /*CONTACTS*/

}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }