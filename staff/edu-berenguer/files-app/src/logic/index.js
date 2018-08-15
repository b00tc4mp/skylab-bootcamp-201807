const logic = {
    url: 'http://localhost:8080',

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

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
    },

    register(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('password', password)

                return this._call('register', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ username, password }), 201)
                    .then(() => true)
            })
    },

    authenticate(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('password', password)

                return this._call('authenticate', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ username, password }), 200)
                    .then(() => true)
            })
    },

    saveFile(username, file) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)

                if (typeof file !== 'object') throw new Error('invalid file')

                const body = new FormData()

                body.append('upload', file)

                return this._call(`user/${username}/files`, 'post', undefined, body, 201)
                    .then(() => true)
            })
    },

    retrieveFile(username, file) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('file', file)

                return this._call(`user/${username}/files/${file}`, 'get', undefined, undefined, 200)
                    .then(res => res.body)
            })
    },

    listFiles(username) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)

                return this._call(`user/${username}/files`, 'get', undefined, undefined, 200)
                    .then(res => res.json())
            })
    },

    removeFile(username, file) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('file', file)

                return this._call(`user/${username}/files/${file}`, 'delete', undefined, undefined, 200)
                    .then(res => res.body)
            })
    }
}

module.exports = logic