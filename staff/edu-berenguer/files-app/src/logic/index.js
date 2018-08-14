const fetch = require('isomorphic-fetch')
var FormData = require('form-data');
var fs = require('fs');

const logic = {

    _username: '',

    _callFilesApi(path, method = 'get', body) {
        const config = {
            method
        }

        const methodNotGet = method !== 'get'

        if (methodNotGet) {
            config.headers = {}
            config.headers['content-type'] = 'application/json'

            // if (useToken) config.headers.authorization = 'Bearer ' + this._userToken
        }

        if (body) config.body = JSON.stringify(body)

        return fetch('http://localhost:8080' + path, config)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'KO') throw Error(res.error)
                return res;
            })
    },

    registerUser(username, password) {
        return this._callFilesApi('/register', 'post', { username, password})
            .then(res => res.message)
    },

    authUser(username,password){
        return this._callFilesApi('/authenticate', 'post', { username, password})
            .then(res => {
               return res.message
                // this._username = {username:username} 
            })

    },

    // uploadUserFiles(username){
    //     return this._callFilesApi(`/user/${username}/files`,'post')
    //         .then(res => res)
    // },

    // listFiles(username){
    //     return this._callFilesApi(`/user/${username}/files`)
    //         .then(res => res)
    // },

    // deleteUserFiles(username,file){
    //     return this._callFilesApi(`/user/${username}/files/${files}`,'delete')
    //         .then(res => res)
    // }
}

if (typeof module !== 'undefined') module.exports = logic;