const logic = {
    url: 'http://localhost:8080',

    _call(path, mothod, headers, body, expectedStatus){
        const config = { method }

        if (headers) config.headers = headers
        if (body) config.body = body

        return fetch(`${this.url}/${path}`, config)
        .then(res => {
            if (res.status === expectedStatus) {
                return res
            } else
                return res.json()
                    .then(({ message }) => {
                        throw new Error(message)
                    })
        })
    }
}