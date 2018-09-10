const logic = {
  //  url: 'https://tranquil-ridge-60570.herokuapp.com/api',
   url:process.env.REACT_APP_API_SERVER_URL,

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

  _validateEmail(email) {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)
  },


  register(email, nickname, password) {
    return Promise.resolve()
      .then(() => {
        this._validateEmail('email', email)
        this._validateStringField('nickname', nickname)
        this._validateStringField('password', password)

        return this._call('register', 'POST', {
          'Content-Type': 'application/json'
        }, JSON.stringify({email, nickname, password}), 201)
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

  /*updatePassword(nickname, password, newPassword, token) {

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
  },*/


  getUsersForString(nickname, str, token) {

    return Promise.resolve()
      .then(() => {
        this._validateStringField('nickname', nickname)
        if (str !== '') this._validateStringField('str', str) //-- empty string is permitted!
        this._validateStringField('token', token)
        return this._call(`user/${nickname}/users?term=${str}`, 'GET', {
          'Content-Type': 'application/json',
          'authorization': `bearer ${token}`

        }, undefined, 200)
          .then(res => res.json())
          .then(res => res)
      })
  },
  /*
    getLastRequester(nickname, token) {

      return Promise.resolve()
        .then(() => {
          this._validateStringField('nickname', nickname)
          this._validateStringField('token', token)
          return this._call(`user/${nickname}/lastrequester`, 'GET', {
            'Content-Type': 'application/json',
            'authorization': `bearer ${token}`

          }, undefined, 200)
            .then(res => res.json())
            .then(res => res)
        })
    },*/

  requestGame(nickname, opponent, token) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('nickname', nickname)
        this._validateStringField('opponent', opponent)
        this._validateStringField('token', token)
        return this._call(`user/${nickname}/gamerequest`, 'POST', {
          'Content-Type': 'application/json',
          'authorization': `bearer ${token}`
        }, JSON.stringify({opponent}), 200)
          .then(res => res.json())
          .then(res => res)
      })
  },

  respondToGameRequest(nickname, destination, gameID, answer, token) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('nickname', nickname)
        this._validateStringField('destination', destination)
        this._validateStringField('gameID', gameID)
        this._validateStringField('token', token)
        if (typeof answer !== 'boolean') throw new Error('answer is not type boolean')

        return this._call(`user/${nickname}/respondtorequest`, 'POST', {
          'Content-Type': 'application/json',
          'authorization': `bearer ${token}`
        }, JSON.stringify({destination, answer, gameID}), 200)
          .then(res => res.json())
          .then(res => res)
      })
  },
  /*

    getLastGameRequestResponse(nickname, token) {
      return Promise.resolve()
        .then(() => {
          this._validateStringField('nickname', nickname)
          this._validateStringField('token', token)
          return this._call(`user/${nickname}/reqresponse`, 'GET', {
            'Content-Type': 'application/json',
            'authorization': `bearer ${token}`
          }, undefined, 200)
            .then(res => res.json())
            .then(res => res)
        })
    },
  */

  getGamesForUser(nickname, token) {

    return Promise.resolve()
      .then(() => {
        this._validateStringField('nickname', nickname)
        this._validateStringField('token', token)
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
        this._validateStringField('nickname', nickname)
        this._validateStringField('opponent', opponent)
        this._validateStringField('gameID', gameID)
        this._validateStringField('token', token)
        if (move === undefined || typeof move !== 'object' || !move.from || !move.to || !move.promotion) throw new Error('move is of wrong format')
        return this._call(`user/${nickname}/game/${gameID}`, 'POST', {
          'Content-Type': 'application/json',
          'authorization': `bearer ${token}`
        }, JSON.stringify({move, opponent}), 200)
          .then(res => res.json())
          .then(res => res)
      })
  },


  onAcknowledgeGameOver(nickname, gameID, token) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('nickname', nickname)
        this._validateStringField('gameID', gameID)
        this._validateStringField('token', token)
        return this._call(`user/${nickname}/game/${gameID}`, 'PATCH', {
          'Content-Type': 'application/json',
          'authorization': `bearer ${token}`
        }, undefined, 200)
          .then(res => res.json())
          .then(res => res)
      })
  },


}

module.exports = logic