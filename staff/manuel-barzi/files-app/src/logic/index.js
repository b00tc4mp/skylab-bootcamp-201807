const logic = {
    url: 'http://localhost:8080/register',

    register(username, password) {
        return fetch(this.url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.status === 201)
    }
}

module.exports = logic