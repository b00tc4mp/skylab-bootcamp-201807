const logic = {
    url: 'http://localhost:8080/api',

    _call(path, method, headers, body, expectedStatus) {
        const config = { method }

        if (headers) config.headers = headers
        if (body) config.body = body

        return fetch(`${this.url}/${path}`, config)
            .then(res => {
                if(res.status === expectedStatus) {
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

                return this._call('register', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ username, password }), 201)
                    .then(() => true)
            })
    }
}

module.exports = logic