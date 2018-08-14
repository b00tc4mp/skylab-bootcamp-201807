const logic = {
    url: 'http://localhost:8080',

    _post(path, headers, body, expectedStatus) {
        return fetch(`${this.url}/${path}`, {
            method: 'post',
            headers,
            body
        })
            .then(res => {
                if (res.status === expectedStatus) {
                    return true
                } else
                    return res.json()
                        .then(({ message }) => {
                            throw new Error(message)
                        })
            })
    },

    register(username, password) {
        return this._post('register', {
            'Content-Type': 'application/json'
        }, JSON.stringify({ username, password }), 201)
    },

    authenticate(username, password) {
        return this._post('authenticate', {
            'Content-Type': 'application/json'
        }, JSON.stringify({ username, password }), 200)
    },

    saveFile(username, file) {
        const body = new FormData()

        body.append('upload', file)

        return this._post(`user/${username}/files`, undefined, body, 201)
    },

    retrieveFile(username, file) {
        const path = `user/${username}/files/${file}`
        const expectedStatus = 200

        return fetch(`${this.url}/${path}`, {
            method: 'get'
        })
            .then(res => {
                if (res.status === expectedStatus) {
                    return res.body
                } else
                    return res.json()
                        .then(({ message }) => {
                            throw new Error(message)
                        })
            })
    }
}

module.exports = logic