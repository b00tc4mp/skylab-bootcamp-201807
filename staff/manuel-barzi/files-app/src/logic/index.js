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
            .then(res => {
                if (res.status === 201) {
                    return true
                } else
                    return res.json()
                        .then(({ message }) => {
                            throw new Error(message)
                        })
            })
    }
}

module.exports = logic