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
                
                return this._call(`user/${username}/profile`, 'PATCH', {'Content-Type': 'application/json', authorization: `bearer ${token}` }, JSON.stringify({ password, newPassword }), 200)
                    .then(res => res.json())
                    .then(({message}) => message)
            })
    },

    deleteUser(username, password, token) {
        return Promise.resolve()
            .then(() => {
                this._validateField('username', username)
                this._validateField('password', password)

                return this._call(`user/${username}/profile`, 'delete', {'Content-Type': 'application/json', authorization: `bearer ${token}` }, JSON.stringify({ password}), 200)
                    .then(res => res.json())
                    .then(() => true)
            })
    },

    listNotes(username, token) {
        return Promise.resolve()
            .then(() => {
                this._validateField('username', username)

                return this._call(`user/${username}/notes`, 'get', { authorization: `bearer ${token}` }, undefined, 200)
                    .then(res => res.json())
            })
    },

    addNotes(username, title, note, token) {
        return Promise.resolve()
            .then(() => {
                this._validateField('username', username)
                this._validateField('title', title)
                this._validateField('note', note)

                return this._call(`user/${username}/notes`, 'post', {'Content-Type': 'application/json', authorization: `bearer ${token}` }, JSON.stringify({ title, note }), 200)
                    .then(res => res.json())
                    .then(({notes}) => notes)
            })
    },

    deleteNote(username, title, note, token) {
        return Promise.resolve()
            .then(() => {
                this._validateField('username', username)
                this._validateField('title', title)
                this._validateField('note', note)

                return this._call(`user/${username}/notes`, 'delete', {'Content-Type': 'application/json', authorization: `bearer ${token}` }, JSON.stringify({ title, note }), 200)
                    .then(res => res.json())
                    .then(() => true)
            })
    },

    listContacts(username, token) {
        return Promise.resolve()
            .then(() => {
                this._validateField('username', username)

                return this._call(`user/${username}/contacts`, 'get', { authorization: `bearer ${token}` }, undefined, 200)
                    .then(res => res.json())
            })
    },

    addContacts(username, contact, telephone, token) {
        return Promise.resolve()
            .then(() => {
                this._validateField('username', username)
                this._validateField('contact', contact)
                this._validateField('telephone', telephone)

                return this._call(`user/${username}/contacts`, 'post', {'Content-Type': 'application/json', authorization: `bearer ${token}` }, JSON.stringify({ contact, telephone }), 200)
                    .then(res => res.json())
                    .then(({contacts}) => contacts)
            })
    },

    deleteContact(username, contact, telephone, token) {
        return Promise.resolve()
            .then(() => {
                this._validateField('username', username)
                this._validateField('contact', contact)
                this._validateField('telephone', telephone)

                return this._call(`user/${username}/contacts`, 'delete', {'Content-Type': 'application/json', authorization: `bearer ${token}` }, JSON.stringify({ contact, telephone }), 200)
                    .then(res => res.json())
                    .then(() => true)
            })
    }
    
}

module.exports = logic