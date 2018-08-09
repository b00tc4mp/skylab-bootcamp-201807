'use strict'

const logic = {
    users: {},

    register(username, password) {
        const user = this.users[username]

        if (user) throw new Error(`user ${username} already exists`)

        this.users[username] = { password }
    },

    login(username, password) {
        const user = this.users[username]

        if (user)
            user.loggedIn = user.password === password
    },

    isLoggedIn(username) {
        return this.users[username] && this.users[username].loggedIn
    },

    logout(username) {
        // TODO
    }
}

module.exports = logic