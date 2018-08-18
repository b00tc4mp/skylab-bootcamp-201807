const logic = {
    url: 'http://localhost:8080/api',

    _call(path, method, headers, body, expectedStatus) {
        const config = { method }

        if (headers) config.headers = headers
        if (body) config.body = body

        return fetch(`${this.url}/${path}`, config)
            .then(res => {
                if (res.status === expectedStatus) {
                    return res
                } else
                    return res.json()
                        .then(({ message }) => {
                            throw new Error(message)
                        })
            })
    },

    _validateField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new Error(`invalid ${name}`)
    },

    register(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateField('username', username)
                this._validateField('password', password)

                return this._call('register', 'post', {'Content-Type': 'application/json'}, JSON.stringify({ username, password }), 201)
                    .then(() => true)
            })
    },

    login(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateField('username', username)
                this._validateField('password', password)

                return this._call('login', 'post', {'Content-Type': 'application/json'}, JSON.stringify({ username, password }), 200)
                    .then(res => res.json())
                    .then(({ token }) => token)
            })
    },

    updatePassword(username, password, newPassword, token) {
        return Promise.resolve()
            .then(() => {
                this._validateField('username', username)
                this._validateField('password', password)
                this._validateField('new password', newPassword)
                
                return this._call(`user/${username}`, 'patch', {'Content-Type': 'application/json', authorization: `bearer ${token}` }, JSON.stringify({ password, newPassword }), 200)
                    .then(res => res.json())
                    .then(() => true)
            })
    },

    deleteUser(username, password, token) {
        return Promise.resolve()
            .then(() => {
                this._validateField('username', username)
                this._validateField('password', password)

                return this._call(`user/${username}`, 'delete', {'Content-Type': 'application/json', authorization: `bearer ${token}` }, JSON.stringify({ password}), 200)
                    .then(res => res.json())
                    .then(() => true)
            })
    }

    
}

module.exports = logic