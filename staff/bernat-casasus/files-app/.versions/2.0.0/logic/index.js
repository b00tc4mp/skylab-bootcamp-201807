'use strict'

const fs = require('fs')

if (!fs.existsSync('files'))
    fs.mkdirSync('files')

const logic = {
    _users: {},

    // TODO test!
    _persist() {
        fs.writeFileSync('data/users.json', JSON.stringify(this._users))
    },

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
    },

    _validateUserExists(username) {
        const user = this._users[username]

        if (!user) throw new Error(`user ${username} does not exist`)
    },

    register(username, password) {
        this._validateStringField('username', username)
        this._validateStringField('password', password)

        const user = this._users[username]

        if (user) throw new Error(`user ${username} already exists`)

        this._users[username] = { password, loggedIn: false }

        fs.mkdirSync(`files/${username}`)

        this._persist()
    },

    login(username, password) {
        this._validateStringField('username', username)
        this._validateStringField('password', password)

        this._validateUserExists(username)

        const user = this._users[username]

        if (user.password === password) {
            user.loggedIn = true

            this._persist()
        } else throw new Error('wrong credentials')
    },

    isLoggedIn(username) {
        this._validateStringField('username', username)

        this._validateUserExists(username)

        const user = this._users[username]

        return user.loggedIn
    },

    logout(username) {
        this._validateStringField('username', username)

        this._validateUserExists(username)

        const user = this._users[username]

        user.loggedIn = false

        this._persist()
    },

    listFiles(username) {
        this._validateStringField('username', username)

        this._validateUserExists(username)

        return fs.readdirSync(`files/${username}`)
    },

    // DEPRECATED
    // TODO test!
    // getFilesFolder(username) {
    //     return `files/${username}`
    // }

    saveFile(username, filename, buffer) {
        this._validateStringField('username', username)
        this._validateStringField('filename', filename)

        if (typeof buffer === 'undefined' || /*!(buffer instanceof Buffer)*/ !Buffer.isBuffer(buffer)) throw new Error('invalid buffer')

        this._validateUserExists(username)

        fs.writeFileSync(`files/${username}/${filename}`, buffer)
    },

    getFilePath(username, file) {
        this._validateStringField('username', username)
        this._validateStringField('file', file)

        this._validateUserExists(username)

        return `files/${username}/${file}`
    },

    removeFile(username, file) {
        this._validateStringField('username', username)
        this._validateStringField('file', file)

        this._validateUserExists(username)

        fs.unlinkSync(`files/${username}/${file}`)
    }
}

logic._users = JSON.parse(fs.readFileSync('data/users.json'))

module.exports = logic