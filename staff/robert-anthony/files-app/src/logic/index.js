const axios = require('axios')

const logic = {
  _endpointBase: "http://localhost:8080/",
  _username: "",
  _password: "",


  /*_callFilesAPI(path, method = 'get', body) {
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

  register(username, password) {

    return this._axiosPost('register', {username, password})
      .then(res => {
        console.log(res)
       return (res.status === 201)
      })
      .catch(err => false)
  },

  authenticate(username, password) {
    return this._axiosPost('authenticate',  {username, password})

  },

  uploadFile(username, upload) {
    const files = {upload}
    const fd = new FormData
    fd.append("files", files)
    return this._axiosPostForm(`user/${username}/files`, fd)
  }


}

if (typeof module !== 'undefined') module.exports = logic;