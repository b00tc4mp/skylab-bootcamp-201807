const fetch = require('node-fetch')
const FormData = require('form-data')

const logic = {

    _callUsersApi(path, method = 'get', body) {
        const config = {
            method
        }

        const methodNotGet = method !== 'get'

        if (methodNotGet) {
            config.headers = {}

            if (methodNotGet) config.headers['content-type'] = "application/json"

        }

         if (body && !(body instanceof FormData)) {
            config.body = JSON.stringify(body)
        } 
         else if(body) {
             config.body = body
             delete config.headers
         }

        return fetch('http://localhost:8080' + path, config)
            .then(res => res.json())
            .then(res => {
                if (res.status === 500) throw Error(res.message)

                return res;
            })
            .catch(err => {throw Error(err.message)})
    },

    registerUser(username, password) {
        return this._callUsersApi('/register', 'post', { username, password })
            .then(res => res)
    },

    authUser(username, password) {
        return this._callUsersApi('/authenticate', 'post', { username, password })
            .then(res => res)
    },
    uploadFile(username,data){
        const payload = new FormData()
        // payload.append("name",name)
        payload.append("upload", data)
        return this._callUsersApi(`/user/${username}/files`,'post', payload)
    },
}

module.exports = logic
