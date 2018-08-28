const logic = {
    url: 'http://localhost:8080/api',

    _call(path, method, headers, body, expectedStatus) {
        const config = {method}

        if (headers) config.headers = headers
        if (body) config.body = body

        return fetch(`${this.url}/${path}`, config)
            .then(res => {
                if (res.status === expectedStatus) {
                    return res
                } else
                    return res.json()
                        .then(({message}) => {
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

                return this._call('register', 'POST', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({username: nickname, password}), 201)
                    .then(() => true)
            })
    },

    authenticate(nickname, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('nickname', nickname)
                this._validateStringField('password', password)

                return this._call('authenticate', 'POST', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({nickname, password}), 200)
                    .then(res => res.json())
                    .then(({token}) => token)
            })
    },

    updatePassword(username, password, newPassword, token) {

        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('password', password)
                this._validateStringField('newPassword', password)

                return this._call(`user/${username}`, 'POST', {
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token}`

                }, JSON.stringify({username: nickname, password, newPassword}), 200)
                    .then(res => res.json())
                    .then(res => res)
            })
    },



}

module.exports = logic