'use strict'


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

  updateNote(userID,note) {
    return this._users.updateOne({userID, _id:note._id}, {$set: {"notes.$.text": note.text}})

      .then(res => {
        if (res.result.nModified === 0) throw new LogicError('error updating note')
        else return true
      })
  },

  getAllNotes(userID,date) {

    return this._notes.find({userID,date},{_id: 0}).toArray()

  }

}

class LogicError extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = {notesLogic}