'use strict'

const { ObjectId } = require('mongodb')
const uuidv1 = require('uuid/v1');


const notesLogic = {
  _notes: null,

  _validateStringField(fieldName, fieldValue) {
    if (typeof fieldValue !== 'string' || !fieldValue.length) throw new LogicError(`invalid ${fieldName}`)
  },

  addNote(userID,note) {
    note.userID = userID
    return this._notes.insertOne(note)
      .then(res => {
        if (res.result.nModified === 0) throw new LogicError('error adding note to collection')
         return true
      })

  },

  deleteNote(userID,note) {
    let noteID = ObjectId(note.id)
    return this._notes.deleteOne({userID, _id:noteID})

      .then(res => {
        if (res.result.nModified === 0) throw new LogicError('error deleting note')
         return true
      })
  },

  updateNote(userID,note) {
    let noteID = ObjectId(note.id)
    return this._notes.updateOne({userID, _id:noteID}, {$set: {text: note.text}})

      .then(res => {
        if (res.result.nModified === 0) throw new LogicError('error updating note')
        else return true
      })
  },

  getAllNotes(userID,date) {

    return this._notes.find({userID,date},{projection:{userID: 0}}).toArray()

  }

}

class LogicError extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = {notesLogic}