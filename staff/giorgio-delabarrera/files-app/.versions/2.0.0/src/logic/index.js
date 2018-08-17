const axios = require('axios');

const app = axios.create({
  baseURL: 'http://localhost:8080'
});

const logic = {

  // set _userUsername(userUsername) {
  //   sessionStorage.setItem('userUsername', userUsername)
  // },

  // get _userUsername() {
  //   return sessionStorage.getItem('userUsername')
  // },

  // get userUsername() {
  //   return this._userUsername
  // },

  // set _userPassword(userPassword) {
  //   sessionStorage.setItem('userPassword', userPassword)
  // },

  // get _userPassword() {
  //   return sessionStorage.getItem('userPassword')
  // },

  // get userPassword() {
  //   return this._userPassword
  // },

  // _callFilesApi(path, method = 'get', body = null, useToken = false) {
  //   const config = {
  //     method
  //   }

  //   const methodNotGet = method !== 'get'

  //   if (methodNotGet || useToken) {
  //     config.headers = {}

  //     if (methodNotGet) config.headers['content-type'] = 'application/json'

  //     // if (useToken) config.headers.authorization = 'Bearer ' + this._userToken
  //   }

  //   if (body) config.body = JSON.stringify(body)

  //   return fetch('http://localhost:8080' + path, config)
  //     .then(res => res.json())
  //     .then(res => {
  //       if (res.status === 'KO') throw Error(res.error)

  //       return res;
  //     })
  // },

  register(username, password, fields = {}) {
    return app.post('/register', { username, password, ...fields })
      .then(res => res.data.message)
      .catch(error => {
        throw Error(error.response.data.message)
      })
  },

  authenticate(username, password) {
    return app.post('/authenticate', { username, password })
      .then(res => {

        this._userUsername = username;

        return res.data.message
      })
      .catch(error => {
        throw Error(error.response.data.message)
      })
  },

  uploadFile(username, data) {

    return app.post(`/user/${username}/files`, data, {
      headers: data.getHeaders()
    })
      .then(res => res.data.message)
      .catch(error => {
        throw Error(error.response.data.message)
      })
  },

  listFile(username) {

    return app.get(`/user/${username}/files`)
      .then(res => res.data)
      .catch(error => {
        throw Error(error.response.data.message)
      })
  },

  retrieveFile(username, filename) {

    return app.get(`/user/${username}/files/${filename}`)
      .then(res => res)
      .catch(error => {
        throw Error(error.response.data.message)
      })
  },

  deleteFile(username, filename) {

    return app.delete(`/user/${username}/files/${filename}`)
      .then(res => res.data.message)
      .catch(error => {
        throw Error(error.response.data.message)
      })
  }

}

if (typeof module !== 'undefined') module.exports = logic;