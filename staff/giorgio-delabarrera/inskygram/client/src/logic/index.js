
const logic = {

  url: 'http://localhost:8080/api',

  _buildUri(parameters) {
    let uri = ''

    for (let key in parameters) {
      if (parameters.hasOwnProperty(key)) {
        const value = parameters[key]
        uri += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&'
      }
    }

    if (uri.length > 0) uri = uri.substring(0, uri.length - 1)

    return uri;
  },

  _httpClient(path, method, headers, body, expectedStatus) {
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

  _validateBooleanField(fieldName, fieldValue) {
    if (typeof fieldValue !== 'boolean') throw new Error(`invalid ${fieldName}`)
  },

  register(username, email, password) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)
        this._validateStringField('email', email)
        this._validateStringField('password', password)

        return this._httpClient('register', 'POST', {
          'Content-Type': 'application/json'
        }, JSON.stringify({ username, email, password }), 201)
          .then(() => true)
      })
  },

  authenticate(username, password) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)
        this._validateStringField('password', password)

        return this._httpClient('auth', 'POST', {
          'Content-Type': 'application/json'
        }, JSON.stringify({ username, password }), 200)
          .then(res => res.json())
          .then(({ token }) => token)
      })
  },

  retrieveUser(username = '', targetUsername = '', token = '') {
    return Promise.resolve()
      .then(() => {
        if (!username && !targetUsername) throw new Error('invalid username and target username')

        if (username && !targetUsername) {
          this._validateStringField('username', username)
          this._validateStringField('token', token)

          return this._httpClient(`me`, 'GET', { authorization: `bearer ${token}` }, undefined, 200)
            .then(res => res.json())

        } else if (!username && targetUsername) {
          this._validateStringField('target username', targetUsername)

          return this._httpClient(`users/${targetUsername}`, 'GET', undefined, undefined, 200)
            .then(res => res.json())

        } else {
          this._validateStringField('username', username)
          this._validateStringField('target username', targetUsername)
          this._validateStringField('token', token)

          return this._httpClient(`users/${targetUsername}`, 'GET', { authorization: `bearer ${token}` }, undefined, 200)
            .then(res => res.json())
        }
      })
  },

  updateUser(username, newEmail, name, website, phoneNumber, gender, biography, privateAccount, token) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)

        if (newEmail) this._validateStringField('newEmail', newEmail)
        if (name) this._validateStringField('name', name)
        if (website) this._validateStringField('website', website)
        if (phoneNumber) this._validateStringField('phoneNumber', phoneNumber)
        if (gender) {
          this._validateStringField('gender', gender)
          if (['male', 'female'].includes(gender) === false) throw new Error(`invalid gender`);
        }
        if (biography) this._validateStringField('biography', biography)
        if (privateAccount) this._validateBooleanField('privateAccount', privateAccount)

        this._validateStringField('token', token)

        const user = { newEmail, name, website, phoneNumber, gender, biography, privateAccount }

        return this._httpClient('me', 'PUT', {
          authorization: `bearer ${token}`,
          'Content-Type': 'application/json'
        }, JSON.stringify(user), 200)
          .then(() => true)
      })
  },

  updateUserPassword(username, password, newPassword, token) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)
        this._validateStringField('password', password)
        this._validateStringField('newPassword', newPassword)
        this._validateStringField('token', token)

        const headers = { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }

        const body = JSON.stringify({ password, newPassword })

        return this._httpClient('me/actions/update-password', 'PATCH', headers, body, 200)
          .then(() => true)
      })
  },

  updateUserAvatar(username, file, token) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)
        if (typeof file !== 'object') throw new Error('invalid file')
        this._validateStringField('token', token)

        const body = new FormData()

        body.append('avatar', file)

        return this._httpClient('me/actions/update-avatar', 'PATCH', { authorization: `bearer ${token}` }, body, 200)
          .then(() => true)
      })
  },

  createPost(username, file, caption = '', token) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)
        if (typeof file !== 'object') throw new Error('invalid file')
        if (caption) this._validateStringField('caption', caption)
        this._validateStringField('token', token)

        const body = new FormData()

        body.append('image', file)
        if (caption) body.append('caption', caption)

        return this._httpClient('posts', 'POST', { authorization: `bearer ${token}` }, body, 201)
          .then(() => true)
      })
  },

  retrievePost(postId, username = '', token = '') {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('post id', postId)

        const headers = {}

        if (username) {
          this._validateStringField('username', username)
          this._validateStringField('token', token)

          headers.authorization = `bearer ${token}`
        }

        return this._httpClient(`posts/${postId}`, 'GET', headers, undefined, 200)
      })
      .then(res => res.json())
  },

  listUserPosts(username = '', targetUsername = '', token = '') {
    return Promise.resolve()
      .then(() => {
        if (!username && !targetUsername) throw new Error('invalid username and target username')

        if (username && !targetUsername) {
          this._validateStringField('username', username)
          this._validateStringField('token', token)

          return this._httpClient(`me/posts`, 'GET', { authorization: `bearer ${token}` }, undefined, 200)
            .then(res => res.json())

        } else if (!username && targetUsername) {
          this._validateStringField('target username', targetUsername)

          return this._httpClient(`users/${targetUsername}/posts`, 'GET', undefined, undefined, 200)
            .then(res => res.json())

        } else {
          this._validateStringField('username', username)
          this._validateStringField('target username', targetUsername)
          this._validateStringField('token', token)

          return this._httpClient(`users/${targetUsername}/posts`, 'GET', { authorization: `bearer ${token}` }, undefined, 200)
            .then(res => res.json())
        }
      })
  },

  listUserWall(token, username, perPage = 10, page = 0) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('token', token)
        this._validateStringField('username', username)

        const uri = this._buildUri({ per_page: perPage, page })

        return this._httpClient(`me/wall?${uri}`, 'GET', { authorization: `bearer ${token}` }, undefined, 200)
          .then(res => res.json())
      })
  },

  listExplorePosts(token, username, perPage = 10, page = 0) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('token', token)
        this._validateStringField('username', username)

        const uri = this._buildUri({ per_page: perPage, page })

        return this._httpClient(`me/explore?${uri}`, 'GET', { authorization: `bearer ${token}` }, undefined, 200)
          .then(res => res.json())
      })
  }
}

module.exports = logic