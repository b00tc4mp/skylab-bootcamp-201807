'use strict'

const fs = require('fs')

if (!fs.existsSync('data')) {
    fs.mkdirSync('data')
}

const logic = {
    _users: null,

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new LogicError(`invalid ${fieldName}`)
    },

    _validateUserExists(username) {
        return this._users.findOne({ username })
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)

                return true
            })
    },

    register(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('password', password)

                return this._users.findOne({ username })
            })
            .then(user => {
                if (user) throw new LogicError(`user ${username} already exists`)

                const _user = { username, password }

                return this._users.insertOne(_user)
            })
            .then(() =>
                new Promise((resolve, reject) => {
                    fs.mkdir(`data/${username}`, err => {
                        if (err) return reject(err)

                        fs.mkdir(`data/${username}/files`, err => {
                            if (err) return reject(err)

                            resolve()
                        })
                    })
                })
            )
    },
////////////////////////////////////
authenticate(username, password) {
    
    return Promise.resolve()
        .then(() => {
            this._validateStringField('username', username)
            this._validateStringField('password', password)
            
            return this._validateUserExists(username)       
        })
        .then(() => this._users.findOne({ username }))
        .then(user => {
            if(!user) throw new LogicError(`user ${username} does not exist`)
            if (user.password !== password) throw new LogicError('wrong credentials')

            //const _user = { username, password }

            return true
        })
        
},

//////////////////////////////////
    /*authenticate(username, password) {
        this._validateStringField('username', username)
        this._validateStringField('password', password)

        this._validateUserExists(username)

        const user = this._users[username]

        if (user.password !== password) throw new LogicError('wrong credentials')
    },*/

    updatePassword(username, password, newPassword) {
        this.authenticate(username, password)

        this._validateStringField('new password', newPassword)

        if (password === newPassword) throw new LogicError('new password cannot be same as current password')

        const user = this._users[username]

        user.password = newPassword

        this._persist()
    },

    listFiles(username) {
        return Promise.resolve()
        .then(() => {
            this._validateStringField('username', username)

            return this._validateUserExists(username)
        })
        .then(() => {
            return new Promise((resolve, reject) => {
                fs.readdir(`data/${username}/files`, (err, files) => {
                    if (err) return reject(err)

                    return resolve(files)
                })
            })
        })
    },

    saveFile(username, filename, buffer) {
        this._validateStringField('username', username)
        this._validateStringField('filename', filename)

        if (typeof buffer === 'undefined' || /*!(buffer instanceof Buffer)*/ !Buffer.isBuffer(buffer)) throw new LogicError('invalid buffer')

        this._validateUserExists(username)

        fs.writeFileSync(`data/${username}/files/${filename}`, buffer)
    },

    getFilePath(username, file) {
        this._validateStringField('username', username)
        this._validateStringField('file', file)

        this._validateUserExists(username)

        return `data/${username}/files/${file}`
    },

    removeFile(username, file) {
        this._validateStringField('username', username)
        this._validateStringField('file', file)

        this._validateUserExists(username)

        fs.unlinkSync(`data/${username}/files/${file}`)
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }