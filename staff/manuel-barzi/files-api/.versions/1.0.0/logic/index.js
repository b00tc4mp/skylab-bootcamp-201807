'use strict'

const fs = require('fs')

if (!fs.existsSync('data')) {
    fs.mkdirSync('data')

    fs.writeFileSync('data/users.json', '{}')
}

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

        this._users[username] = { password }

        fs.mkdirSync(`data/${username}`)
        fs.mkdirSync(`data/${username}/files`)

        this._persist()
    },

    authenticate(username, password) {
        this._validateStringField('username', username)
        this._validateStringField('password', password)

        this._validateUserExists(username)

        const user = this._users[username]

        if (user.password !== password) throw new Error('wrong credentials')
    },

    listFiles(username) {
        this._validateStringField('username', username)

        this._validateUserExists(username)

        return fs.readdirSync(`data/${username}/files`)
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

logic._users = JSON.parse(fs.readFileSync('data/users.json'))

module.exports = logic