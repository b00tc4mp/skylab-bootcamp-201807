'use strict'

const logic = {
    _users: {},

    _validateField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
    },

    register(username, password) {
        this._validateField('username', username)
        this._validateField('password', password)

        const user = this._users[username]

        if (user) throw new Error(`user ${username} already exists`)
        this._users[username] = { password, loggedIn: false }
    },

    login(username, password) {
        this._validateField('username', username)
        this._validateField('password', password)

        const user = this._users[username]

        if (!user) throw new Error(`user ${username} does not exist`)
        if (user.password === password) user.loggedIn = true
        else throw new Error('wrong username and/or password')
    },

    isLoggedIn(username) {
        this._validateField('username', username)

        const user = this._users[username]

        if (!user) throw new Error(`user ${username} does not exist`)
        return user.loggedIn
    },

    logout(username) {
        this._validateField('username', username)

        const user = this._users[username]

        if (!user) throw new Error(`user ${username} does not exist`)
        return user.loggedIn = false
    }
}

module.exports = logic