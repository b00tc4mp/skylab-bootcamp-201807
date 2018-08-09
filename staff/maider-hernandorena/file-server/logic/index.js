'use strict'

const logic = {
    _users: {},

    register(username, password) {
        if (typeof username !== 'string' || !username.length) throw new Error('username no valid')
        if (typeof password !== 'string' || !password.length) throw new Error('password no valid')

        const user = this._users[username]

        if (user) throw new Error(`user ${username} already exists`)
        this._users[username] = { password }
    },

    login(username, password) {
        if (typeof username !== 'string' || !username.length) throw new Error('wrong username')
        if (typeof password !== 'string' || !password.length) throw new Error('wrong password')

        const user = this._users[username]

        if (!user) throw new Error(`user ${username} does not exist`)
        if (user.password === password) user.loggedIn = true
        else throw new Error('wrong username and/or password')
    },

    isLoggedIn(username) {
        if (typeof username !== 'string' || !username.length) throw new Error('wrong username')

        const user = this._users[username]

        if (!user) throw new Error(`user ${username} does not exist`)
        return user.loggedIn
    },

    logout(username) {
        if (typeof username !== 'string' || !username.length) throw new Error('wrong username')

        const user = this._users[username]

        if (!user) throw new Error(`user ${username} does not exist`)
        user.loggedIn = false
    }
}

module.exports = logic