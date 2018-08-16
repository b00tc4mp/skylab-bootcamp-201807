const axios = require('axios')

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

    _callAxios(path, method, headers, body, expectedStatus,responseType) {
        const config = { method }
        if (headers) config.headers = headers
        if (body) config.data = body
        config.url = `${this.url}/${path}`
       config.responseType = "stream"

        return axios( config)
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

                return this._call('register', 'POST', {
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

                return this._call('authenticate', 'POST', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ username, password }), 200)
                    .then(res => res.json())
                    .then(({ token }) => token)
            })
    },

    saveFile(username, file, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)

                if (typeof file !== 'object') throw new Error('invalid file')

                const body = new FormData()

                body.append('upload', file)

                return this._call(`user/${username}/files`, 'POST', { authorization: `bearer ${token}` }, body, 201)
                    .then(() => true)
            })
    },

    retrieveFile(username, file, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('file', file)

                return this._call(`user/${username}/files/${file}`, 'GET', { authorization: `bearer ${token}` }, undefined, 200)
                    .then(res => res.body)
            })
    },

    listFiles(username, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)

                return this._call(`user/${username}/files`, 'GET', { authorization: `bearer ${token}` }, undefined, 200)
                    .then(res => res.json())
            })
    },

    removeFile(username, file, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('file', file)
                return this._call(`user/${username}/files/${file}`, 'DELETE', { authorization: `bearer ${token}` }, undefined, 200)
                    .then(res => res.body)
            })
    },

  updatePassword(username,newpwd,token) {

      return Promise.resolve()
        .then(() => {
          this._validateStringField('username', username)
          this._validateStringField('newpwd', newpwd)
          const body = JSON.stringify({newpwd})
          return this._call(`user/${username}/updatepassword`, 'PATCH', { authorization: `bearer ${token}`,'Content-Type': 'application/json' }, body, 200)
            .then(res => true)
        })
  }
}

module.exports = logic