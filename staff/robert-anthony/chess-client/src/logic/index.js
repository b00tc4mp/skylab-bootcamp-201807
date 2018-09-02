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

    register(email,nickname, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('email', email)
                this._validateStringField('nickname', nickname)
                this._validateStringField('password', password)

                return this._call('register', 'POST', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({email,nickname, password}), 201)
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

  updatePassword(nickname, password, newPassword, token) {

        return Promise.resolve()
            .then(() => {
                this._validateStringField('nickname', nickname)
                this._validateStringField('password', password)
                this._validateStringField('newPassword', password)

                return this._call(`user/${nickname}`, 'POST', {
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token}`

                }, JSON.stringify({nickname: nickname, password, newPassword}), 200)
                    .then(res => res.json())
                    .then(res => res)
            })
    },


  getUsersForString(nickname,str, token) {

    return Promise.resolve()
      .then(() => {
        return this._call(`user/${nickname}/users?term=${str}`, 'GET', {
          'Content-Type': 'application/json',
          'authorization': `bearer ${token}`

        }, undefined, 200)
          .then(res => res.json())
          .then(res => res)
      })
  },

  getLastRequester( nickname,token) {

    return Promise.resolve()
      .then(() => {


        return this._call(`user/${nickname}/lastrequester`, 'GET', {
          'Content-Type': 'application/json',
          'authorization': `bearer ${token}`

        }, undefined, 200)
          .then(res => res.json())
          .then(res => res)
      })
  },

  requestGame( nickname,opponent, token) {
    return Promise.resolve()
      .then(() => {

        return this._call(`user/${nickname}/gamerequest`, 'POST', {
          'Content-Type': 'application/json',
          'authorization': `bearer ${token}`
        },  JSON.stringify({opponent}), 200)
          .then(res => res.json())
          .then(res => res)
      })
  },

  respondToGameRequest(nickname, destination, gameID,answer, token) {
    return Promise.resolve()
      .then(() => {
        return this._call(`user/${nickname}/respondtorequest`, 'POST', {
          'Content-Type': 'application/json',
          'authorization': `bearer ${token}`
        },  JSON.stringify({destination,answer,gameID}), 200)
          .then(res => res.json())
          .then(res => res)
      })
  },

 getLastGameRequestResponse( nickname, token) {
    return Promise.resolve()
      .then(() => {

        return this._call(`user/${nickname}/reqresponse`, 'GET', {
          'Content-Type': 'application/json',
          'authorization': `bearer ${token}`
        },  undefined, 200)
          .then(res => res.json())
          .then(res => res)
      })
  },

  getGamesForUser( nickname,token) {

    return Promise.resolve()
      .then(() => {
        return this._call(`user/${nickname}/games`, 'GET', {
          'Content-Type': 'application/json',
          'authorization': `bearer ${token}`

        }, undefined, 200)
          .then(res => res.json())
          .then(res => res)
      })
  },


  makeAGameMove(nickname, opponent, move, gameID, token) {
    return Promise.resolve()
      .then(() => {
        return this._call(`user/${nickname}/game/${gameID}`, 'POST', {
          'Content-Type': 'application/json',
          'authorization': `bearer ${token}`
        },  JSON.stringify({ move, opponent}), 200)
          .then(res => res.json())
          .then(res => res)
      })
  },



}

module.exports = logic