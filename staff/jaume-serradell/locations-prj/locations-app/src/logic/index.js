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

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
    },

    register(email, password, name) {
        return Promise.resolve()
            .then(() => {
                // this._validateEmail(email)
                this._validateStringField('name', name)
                this._validateStringField('password', password)

                return this._call('register', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ email, password, name }), 201)
                    .then(() => true)
            })
    },

    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                // this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call('authenticate', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ email, password }), 200)
                    .then(res => res.json())
                    .then(({ token }) => token)
            })

    },

    updatePassword(email, password, newPassword, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)

                return this._call(`owner/${email}/update`, 'patch', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, JSON.stringify({ email, password, newPassword }), 200)
            })
            .then(res => res.json())

    },

    unregisterOwner(email, password, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call(`owner/${email}/unregister`, 'delete', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, JSON.stringify({ email, password }), 200)
            })
            .then(res => res.json())
    },

    addProperty(email, title, subtitle, photo, description, dimentions, categories, type, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('title', title)
                this._validateStringField('photo', photo)
                this._validateNumberField('dimentions', dimentions)
                this._validateStringField('type', type)
                if (!(categories instanceof Array)) throw new Error('invalid categories')

                return this._call(`owner/${email}/property`, 'post', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, JSON.stringify({ email, title, subtitle, photo, description, dimentions, categories, type }), 200)
            })
            .then(res => res.json())
    },

    listPropertyByQuery(type, categories) {
        return Promise.resolve()
            .then(() => {
                return this._call(`listProperties/?type=${type}&categories=${categories}`, 'get', undefined, undefined, 200)
            })
            .then(res => res.json())
    },

    deletePropertyById(email, propertyId, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateObjectId(propertyId)
                
                return this._call(`owner/${email}/property/${propertyId}`, 'delete', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, JSON.stringify({ email, propertyId }), 200)
            })
            .then(res => res.json())
    }
}

module.exports = logic
