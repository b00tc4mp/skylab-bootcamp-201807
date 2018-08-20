const uuidv4 = require('uuid/v4')

const logic = {

    _users: null,

    _validateField(name, value) {
        if(typeof value !== 'string' || !value.length) throw new Error(`invalid ${name}`)
    },

    register(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateField('username', username)
                this._validateField('password', password)

                return this._users.findOne({ username })
            })
            .then(user => {
                if(user) throw new Error(`user with ${username} username already exist`)
                
                const _user = {username, password, notes:[]}
                return this._users.insertOne(_user)
            })
    },

    login(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateField('username', username)
                this._validateField('password', password)

                return this._users.findOne({ username })
            })
            .then(user => {
                if(!user) throw new Error(`user with ${username} username does not exist`)
                if(user.password !== password) throw new Error(`wrong password`)

                return true
            })
    },

    updatePassword(username, password, newPassword) {
        return Promise.resolve()
            .then(() => {
                this._validateField('username', username)
                this._validateField('password', password)
                this._validateField('new password', newPassword)

                return this._users.findOne({ username })
            })
            .then(user => {
                if(!user) throw new Error(`user with ${username} username does not exist`)
                if(user.password !== password) throw new Error(`wrong password`)
                if(password === newPassword) throw new Error('new password must be different to old password')
            
                return this._users.updateOne({_id: user._id}, {$set: {password: newPassword}})
            })
            .then(() => {
                return true
            })
    },

    deleteUser(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateField('username', username)
                this._validateField('password', password)

                return this._users.findOne({ username })
            })
            .then(user => {
                if(!user) throw new Error(`user with ${username} username does not exist`)
                if(user.password !== password) throw new Error(`wrong password`)

                return this._users.deleteOne({_id: user._id})
            })
            .then(() => {
                return true
            })
    },

    addNotes(username, title, note) {
        return Promise.resolve()
            .then(() => {
                this._validateField('username', username)
                this._validateField('title', title)
                this._validateField('note', note)

                return this._users.findOne({ username })
            })
            .then(user => {
                if(!user) throw new Error(`user with ${username} username does not exist`)
                const id = uuidv4()
                const notes = [...user.notes, {id, title, note}]
                return this._users.updateOne({_id: user._id}, {$set: {notes}})
            })
            .then(() => {
                return true
            })
    },

    addContacts(username, contact, telephone) {
        return Promise.resolve()
            .then(() => {
                this._validateField('username', username)
                this._validateField('contact', contact)
                this._validateField('telephone', telephone)

                return this._users.findOne({ username })
            })
            .then(user => {
                if(!user) throw new Error(`user with ${username} username does not exist`)
                const contacts = [{contact, telephone}]
                return this._users.updateOne({_id: user._id}, {$set: {contacts}})
            })
            .then(() => true)
    }
}

module.exports = logic