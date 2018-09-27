'use strict'


const logic = {
    _users: null,

    register(username, password) {
        return Promise.resolve()
            .then(() => {
                
                return this._users.findOne({ username })
            })
            .then(user => {
                if (user) throw new LogicError(`user ${username} already exists`)

                const _user = { username, password }

                return this._users.insertOne(_user)
            })
            
    },
    
    authenticate(username, password){
        return Promise.resolve()
            .then(() => {
                return this._users.findOne({ username })
            })
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                if (user.password !== password) throw new LogicError ('wrong credentials')
                return true
            })
    },

    updatePassword(username, password, newPassword) {
        return Promise.resolve()
            .then(() => {
                return this._users.findOne({ username })
            })
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                if (user.password !== password) throw new LogicError('wrong credentials')
                if (password === newPassword) throw new LogicError('new password cannot be the same as the current password')
            
                return this._users.updateOne({ _id: user.id }, { $set: { password: newPassword}})
            })
    },
    
    saveContacts(username, name, surname, email) {
        return Promise.resolve()
            .then(() => {
                return this._users.findOne({ username })
            })
            .then(user => {
                this._users.insertOne({ _id: user.id },{$set: {contacts: [] }})
                return this._users.contacts.insertOne({ _id: user.id }, { $set: { name: name, surname: surname, email: email}})
            })
    },
    
    
    

    
    /*
    saveNotes(){

    },

    listContacts(){

    },

    listNotes(){

    },

    removeContacts(){

    },

    removeNotes(){

    }
    */
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }