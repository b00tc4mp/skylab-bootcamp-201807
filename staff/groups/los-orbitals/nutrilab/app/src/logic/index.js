const logic = {
    _CallUSerApi (path, method='get',body, useToken){
        const config = {
            method
        }
        const notMethodIncluded = method !== 'get'
        if (notMethodIncluded || useToken) {
            config.headers = {}

            if (notMethodIncluded) config.headers['content-type'] = 'application/json'

            if (useToken) config.headers.authorization = 'Bearer ' + this._userToken
        }
        if (body) config.body=JSON.stringify(body)

        return fetch('https://skylabcoders.herokuapp.com/api' + path, config)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'KO') throw Error(res.error)
                return res;
            })
    },

    registerUser (username, password) {
        return this._CallUSerApi(username, password)
            .then()

    },

    _callNutritionApi(path) {
        return fetch('https://api.nutritionix.com/v1_1/' + path, {
            headers: {
                authorization: 'Bearer ' + this.spotifyToken
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error('request error, status ' + res.error.status);
                return res;
            });
    },
}