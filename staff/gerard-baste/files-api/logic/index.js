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

    authenticate(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('password', password)
                return this._users.findOne({ username })
            })
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exists`)
                if (user.password !== password) throw new LogicError('wrong credentials')
                return true
            }
     )},

     updatePassword(username, _password, newPassword) {
        return Promise.resolve()
        .then(() => {
        // this._validateStringField('username', username)
        this._validateStringField('password', _password)
        this._validateStringField('new password', newPassword)
        return this.authenticate(username, _password)
    })
            .then(() => {
                    //    return Promise.resolve() 
                    //         .then(() => {
                               return this._users.updateOne({username},{$set:{password:newPassword}})
                                    .then((res) => {
                                        if (res.result.ok) return res.result.ok
                                        else throw new LogicError
                                    })
                            })
    },

    listFiles(username) {

        return Promise.resolve()
            .then(() => {
                return new Promise((resolve, reject) => {
                    fs.readdir(`data/${username}/files`, (err, files) => {
                        if (err) return reject(err)
                        return resolve(files)
                    })
                })

            })
    } ,

    // DEPRECATED
    // TODO test!
    // getFilesFolder(username) {
    //     return `files/${username}`
    // }

    saveFile(username, filename, buffer) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('filename', filename)
                    return new Promise ((resolve, reject) => {
                        if (typeof buffer === 'undefined' || /*!(buffer instanceof Buffer)*/ !Buffer.isBuffer(buffer)) throw new LogicError('invalid buffer')
                        // this._users.findOne({ username })
                        fs.writeFileSync(`data/${username}/files/${filename}`, buffer, (err) => {
                            if (err) return reject(err)
                            return resolve(true)
                        })
                    })
            })
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