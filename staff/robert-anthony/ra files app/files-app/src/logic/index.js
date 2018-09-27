const axios = require('axios');


const logic = {
  url: 'http://localhost:8080',
  /*
      _call(path, method, headers, body, expectedStatus) {
          const config = { method,responseType:'stream', url: `${this.url}/${path}`}

          if (headers) config.headers = headers
          if (body) config.data = body

          return axios( config)
              .then(res => {
                  if (res.status === expectedStatus) {
                      return res
                  } else
                      return res
                          .then(({ message }) => {
                              throw new Error(message)
                          })
              })
      },*/
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

        return this._call('register', 'post', {
          'Content-Type': 'application/json'
        }, JSON.stringify({username, password}), 201)
          .then((res) => {
            true
          })
      })
  },

  authenticate(username, password) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)
        this._validateStringField('password', password)

        return this._call('authenticate', 'post', {
          'Content-Type': 'application/json'
        }, JSON.stringify({username, password}), 200)
          .then(res => res.json())
          .then(json => json.token)
      })
  },

  saveFile(username, file, token) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)

        if (typeof file !== 'object') throw new Error('invalid file')

        const body = new FormData()

        body.append('upload', file)

        return this._call(`user/${username}/files`, 'post', {authorization: `Bearer ${token}`}, body, 201)
          .then(() => true)
      })
  },

    retrieveFile(username, file,token)
    {
      return Promise.resolve()
        .then(() => {
          this._validateStringField('username', username)
          this._validateStringField('file', file)

          return this._call(`user/${username}/files/${file}`, 'get', {authorization:`Bearer ${token}`}, undefined, 200)
            .then(res => res.body)
        })
    }
  ,

    listFiles(username,token)
    {
      return Promise.resolve()
        .then(() => {
          this._validateStringField('username', username)

          return this._call(`user/${username}/files`, 'get', {authorization:`Bearer ${token}`}, undefined, 200)
            .then(res => res.json())
        })
    }
  ,

    removeFile(username, file,token)
    {
      return Promise.resolve()
        .then(() => {
          this._validateStringField('username', username)
          this._validateStringField('file', file)

          return this._call(`user/${username}/files/${file}`, 'delete', {authorization:`Bearer ${token}`}, undefined, 200)
            .then(res => res.body)
        })
    }
  }

  module.exports = logic