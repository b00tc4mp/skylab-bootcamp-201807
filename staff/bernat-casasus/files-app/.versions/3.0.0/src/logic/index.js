const nodefetch = require('node-fetch')
const logic = {

    _callUsersApi(path, method = 'get', body) {
        const config = {
            method
        }

        const methodNotGet = method !== 'get'

        if (methodNotGet || useToken) {
            config.headers = {}

            if (methodNotGet) config.headers['content-type'] = 'application/json'

        }

        if (body) config.body = JSON.stringify(body)

        return nodefetch('http://localhost:8080' + path, config)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'KO') throw Error(res.error)

                return res;
            })
    },

    resgisterUser(username, password) {
        return this._callUsersApi('/register', 'post', { username, password })
            .then(res => res.message)
            // .then(res => res["message"])
    },

    authUser(username, password) {
        return this._callUsersApi('/authenticate', 'post', { username, password })
            .then(res => res.message)
    }
}

if (typeof module !== 'undefined') module.exports = logic;