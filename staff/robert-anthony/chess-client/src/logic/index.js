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
                }, JSON.stringify({username, password}), 201)
                    .then(() => true)
            })
    },

    authenticate(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('password', password)

                return this._call('authenticate', 'POST', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({username, password}), 200)
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

                }, JSON.stringify({username, password, newPassword}), 200)
                    .then(res => res.json())
                    .then(res => res)
            })
    },


    updateContact(username, contact,token) {

        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)

                return this._call(`user/${username}/contact`, 'PATCH', {
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token}`

                }, JSON.stringify({username, contact}), 200)
                    .then(res => res.json())
                    .then(res => res)
            })
    },

    addContact(username, contact,token) {
      console.log("token",token)
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)

                return this._call(`user/${username}/contact`, 'POST', {
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token}`

                }, JSON.stringify({username, contact}), 200)
                    .then(res => res.json())
                    .then(res => res)
            })
    },


    updateNote(username, note,token) {

        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)

                return this._call(`user/${username}/note`, 'PATCH', {
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token}`

                }, JSON.stringify({note}), 200)
                    .then(res => res.json())
                    .then(res => res)
            })
    },



  deleteNote(username, note,token) {

    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)

        return this._call(`user/${username}/note`, 'DELETE', {
          'Content-Type': 'application/json',
          'authorization': `bearer ${token}`

        }, JSON.stringify({note}), 200)
          .then(res => res.json())
          .then(res => res)
      })
  },


  addNote(username, note,token) {

        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)

                return this._call(`user/${username}/note`, 'POST', {
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token}`

                }, JSON.stringify({note}), 200)
                    .then(res => res.json())
                    .then(res => res)
            })
    },



    getAllNotes(username,date,token) {

        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)

                return this._call(`user/${username}/notes`, 'POST', {
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token}`

                }, JSON.stringify({"date":date}), 200)
                    .then(res => res.json())
                    .then(res => res)
            })
    },


    getAllContacts(username,token) {

        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)

                return this._call(`user/${username}/contacts`, 'GET', {
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token}`
                },undefined, 200)
                    .then(res => res.json())
                    .then(res => res)
            })
    }


}

module.exports = logic