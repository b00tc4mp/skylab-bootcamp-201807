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
            .then((res) => {
                this._validateStringField('username', username)
                this._validateStringField('password', password)
                 
                return this._users.findOne({ username })
            })
            .then(user=>{
                if(!user) throw new LogicError(`user ${username} not found`)
            
                if(user.password !== password) throw new LogicError("wrong password")

                return true
            })
    },

    updatePassword(username, _password, newPassword) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('password', _password)
                this._validateStringField('new password', newPassword)
                return this.authenticate(username, _password)
            })
            .then(() => {
                return this._users.updateOne({username},{$set:{password:newPassword}})
                    .then((res) => {
                        if (res.result.ok) return res.result.ok
                        else throw new LogicError
                    })
            })
    },

    listFiles(username) {
        return Promise.resolve()
            .then(()=> {
                this._validateStringField('username', username)
                this._validateUserExists(username)
            })
            .then(()=>{
                return new Promise((resolve,reject)=>{
                    fs.readdir(`data/${username}/files`,(err,res) => {
                        if(err) return reject(err)
                        return resolve(res)
                    })
                })
            }) 
    },

    saveFile(username, filename, buffer) {
        return Promise.resolve()
            .then(()=> {
                this._validateStringField('username', username)
                this._validateStringField('filename', filename)
            })
            .then(() => {
                if (typeof buffer === 'undefined' || /*!(buffer instanceof Buffer)*/ !Buffer.isBuffer(buffer)) throw new LogicError('invalid buffer')
                this._validateUserExists(username)
                fs.writeFile(`data/${username}/files/${filename}`, buffer)
                resolve()
            })
        // this._validateStringField('username', username)
        // this._validateStringField('filename', filename)
        // if (typeof buffer === 'undefined' || /*!(buffer instanceof Buffer)*/ !Buffer.isBuffer(buffer)) throw new LogicError('invalid buffer')
        // this._validateUserExists(username)
        // fs.writeFileSync(`data/${username}/files/${filename}`, buffer)
    },

    getFilePath(username, file) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('file', file)
        
                this._validateUserExists(username)
            })
            .then(() => {
                return `data/${username}/files/${file}`
            })
    },

    removeFile(username, file) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('file', file)

                return this._users.findOne({ username })
            })
            .then(user => {
                if (user) throw new LogicError(`user ${username} not found`)

                new Promise((resolve,reject)=>{
                fs.unlink(`data/${username}/files/${file}`,(err) => {
                    if (err) return reject(err)
                        resolve()
                })
            })
    })
}
}
class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }