'use strict'

const axios = require('axios')
const FormData = require('form-data')


const logic = {
  _endpointBase: "http://localhost:8080/",
  /*_ _username: "",
   _password: "",

  set username(username) {
    _username = username
  },


  get username() {
    return _username
  },

  set password(password) {
    _password = password
  },


  get password() {
    return _password
  },


   callFilesAPI(path, method = 'get', body) {
     const config = {
       method
     }

     const methodNotGet = method !== 'get'

     if (methodNotGet) {
       config.headers = {}
       config.headers['content-type'] = 'application/json'
     }

     if (body) config.body = JSON.stringify(body)

     return fetch(`${this._endpointBase}${path}`, config)
       .then(res => res.json())
   },


   _callFilesAPIForFormPost(path, body) {
     const config = {
       method: "POST",
     }

     config.headers = {}
     config.headers['content-type'] = 'multipart/form-data'

     if (body) config.body = body

     return fetch(`${this._endpointBase}${path}`, config)
       .then(res => res.json())
   },
 */

  _axiosGet(path) {
    const config = {}

    return axios.get(`${this._endpointBase}${path}`, config)

  },

  _axiosPost(path, body) {
    const config = {
      // method: "post"
    }

    return axios.post(`${this._endpointBase}${path}`, body)

  },

  _axiosPostForm(path, body) {
    const config = {
      method: "POST",
    }

    config.headers = {}
    config.headers['content-type'] = 'form-data'

    if (body) config.data = body


    return axios.post(`${this._endpointBase}${path}`, config)
      .then(res => res.json())
  },

  register(username, password) {

    return this._axiosPost('register', {username, password})
      .then(res => {
        return (res.status === 201)
      })
      .catch(err => {
        throw new Error(`Request failed with status code ${err.response.status}`)
      })
  },

  authenticate(username, password) {
    return this._axiosPost('authenticate', {username, password})
      .then(res => {
        return (res.status === 200)
      })

  },

  uploadFile(username, buffer, filename) {

    const fd = new FormData
    fd.append("upload", buffer, filename)
    return axios.post(`${this._endpointBase}user/${username}/files`, fd, {
      headers: fd.getHeaders(),
    }).then(result => {
      // Handle result…
      return result.data === 201
    })
  },




}

if (typeof module !== 'undefined') module.exports = logic;