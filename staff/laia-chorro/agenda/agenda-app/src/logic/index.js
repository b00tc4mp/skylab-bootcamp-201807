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
                    .then(res => res.json())
                    .then(({ token }) => token )
            })
    },

    getNotesByDate(username, date, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)

                return this._call(`/user/${username}/notes/?date=${date}`, 'get', { 
                    'Content-Type': 'application/json',
                    authorization: `bearer ${token}` 
                }, undefined, 200)
                    .then(res => res.json())
            })
    },

    addNote(username, text, date, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('text', text)

                return this._call(`/user/${username}/notes`, 'post', { 
                    'Content-Type': 'application/json', 
                    authorization: `bearer ${token}` 
                }, JSON.stringify({ text, date }), 201)
                    .then(() => true)
            })
    },

    /*router.post('/user/:username/notes', [validateJwt, jsonBodyParser], (req, res) => {
        const { params: { username }, body: { text, date } } = req
    
        logic.addNote(username, text, date)
            .then(() => res.json({ message: 'note created' }))
            .catch(err => {
                const { message } = err
    
                res.status(err instanceof LogicError ? 400 : 500).json({ message })
            })
    })*/

    updateNote(username, id, newText, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('new text', newText)

                return this._call(`/user/${username}/notes/${id}`, 'patch', {
                    'Content-Type': 'application/json', 
                    authorization: `bearer ${token}` 
                }, JSON.stringify({ text: newText }), 201)
                    .then(() => true)
            })
    },

    /*router.patch('/user/:username/notes/:id', [validateJwt, jsonBodyParser], (req, res) => {
        const { params: { username, id }, body: { newText } } = req
    
        logic.updateNote(username, id, newText)
            .then(() => res.json({ message: 'note updated' }))
            .catch(err => {
                const { message } = err
    
                res.status(err instanceof LogicError ? 400 : 500).json({ message })
            })
    })*/

    removeNote(username, id, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                
                return this._call(`/user/${username}/notes/${id}`, 'delete', { 
                    'Content-Type': 'application/json', 
                    authorization: `bearer ${token}` 
                }, undefined, 200)
                    .then(res => res.body)
            })
    }
    
    /*router.delete('/user/:username/notes/:id', validateJwt, (req, res) => {
        const { params: { username, id } } = req
    
        logic.deleteNote(username, id)
            .then(() => res.json({ message: 'note deleted' }))
            .catch(err => {
                const { message } = err
    
                res.status(err instanceof LogicError ? 400 : 500).json({ message })
            })
    })*/

    /*saveFile(username, file, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)

                if (typeof file !== 'object') throw new Error('invalid file')

                const body = new FormData()

                body.append('upload', file)

                return this._call(`user/${username}/files`, 'post', { authorization: `bearer ${token}` }, body, 201)
                    .then(() => true)
            })
    },

    retrieveFile(username, file, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('file', file)

                return this._call(`user/${username}/files/${file}`, 'get', { authorization: `bearer ${token}` }, undefined, 200)
                    .then(res => res.body)
            })
    },

    listFiles(username, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)

                return this._call(`user/${username}/files`, 'get', { authorization: `bearer ${token}` }, undefined, 200)
                    .then(res => res.json())
            })
    },

    removeFile(username, file, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('file', file)

                return this._call(`user/${username}/files/${file}`, 'delete', { authorization: `bearer ${token}` }, undefined, 200)
                    .then(res => res.body)
            })
    }*/
}

module.exports = logic