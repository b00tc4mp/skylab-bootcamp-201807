'use strict'

const fetch = require('isomorphic-fetch')


const logic = {
    _callFilesApi(path, method = 'get', body){
        const config = {
            method
        }

        const methodNotGet = method !== 'get'

        if (methodNotGet){
            config.headers = {}
            config.headers['content-type'] = 'application/json'
        }

        if (body) config.body = JSON.stringify(body)
            return fetch('http://localhost:8080' + path, config)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'KO') throw Error(res.error)

                return res;
            })

    },

    registerUser(username, password){
        return this._callFilesApi('/register', 'post', { username, password})
            .then(res => res.message)
    },

    authUser(username, password){
        return this._callFilesApi('/authenticate', 'post', { username, password})
            .then(res => res.message)
    },

    uploadUserFiles(username){
        return this._callFilesApi(`/user/${username}/files`, 'post', )
    },

    listFiles(username){
        return this._callFilesApi(`/user/${username}/files`)
        .then(res => res)
    }

}

if (typeof module !== 'undefined') module.exports = logic