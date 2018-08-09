'use strict'

const logic = {
    _users: {},

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
    },

    register(username, password) {
        this._validateStringField('username', username)
        this._validateStringField('password', password)

        const user = this._users[username]

        if (user) throw new Error(`user ${username} already exists`)

        this._users[username] = { password, loggedIn: false }
    },

    login(username, password) {
        this._validateStringField('username', username)
        this._validateStringField('password', password)

        const user = this._users[username]

        if (!user) throw new Error(`user ${username} does not exist`)

        if (user.password === password)
            user.loggedIn = true
        else throw new Error('wrong credentials')
    },

    isLoggedIn(username) {
        this._validateStringField('username', username)


        const user = this._users[username]

        if (!user) throw new Error(`user ${username} does not exist`)

        return user.loggedIn
    },

    logout(username) {
        this._validateStringField('username', username)


        const user = this._users[username]

        if (!user) throw new Error(`user ${username} does not exist`)

        user.loggedIn = false
    }
}

module.exports = logic