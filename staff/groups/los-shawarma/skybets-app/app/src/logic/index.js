const logic = {
    
    _callKiwiApi(fromIata, toIata, inputDateFrom, inputDateTo) {
               
        return fetch(`https://api.skypicker.com/flights?flyFrom=${fromIata}&to=${toIata}&dateFrom=${inputDateFrom}&dateTo=${inputDateFrom}&returnFrom=${inputDateTo}&returnTo=${inputDateTo}&directFlights=1&partner=picky`)
        .then(res => res.json())
        .then(res => {
            if (res.error) throw Error('request error, status ' + res.error.status);
            return res.data;
        });
    },

    _callBetsApi() {
        return fetch(`https://api.apify.com/v1/3cDx9TdjGYyCq44si/crawlers/GBGompQciL2Efj47F/lastExec/results?token=ssBaHmGdctZLmuRpreLPNnoEH`)
        .then(res => res.json())
        .then(res => {
            if (res.error) throw Error('request error, status ' + res.error.status);
            return res[0].pageFunctionResult;
        });
    },

    set _userId(userId) {
        sessionStorage.setItem('userId', userId)
    },

    get _userId() {
        return sessionStorage.getItem('userId')
    },

    set _userToken(userToken) {
        sessionStorage.setItem('userToken', userToken)
    },

    get _userToken() {
        return sessionStorage.getItem('userToken')
    },

    set _userUsername(userUsername) {
        sessionStorage.setItem('userUsername', userUsername)
    },

    get userUsername() {
        return sessionStorage.getItem('userUsername')
    },

    set _userPassword(userPassword) {
        sessionStorage.setItem('userPassword', userPassword)
    },

    get _userPassword() {
        return sessionStorage.getItem('userPassword')
    },

    set _userFavorites(userFavorites) {
        sessionStorage.setItem('userFavorites', JSON.stringify(userFavorites))
    },

    get _userFavorites() {
        return JSON.parse(sessionStorage.getItem('userFavorites')) || []
    },

     
    _callUsersApi(path, method = 'get', body, useToken) {
        const config = {
            method
        }

        const methodNotGet = method !== 'get'

        if (methodNotGet || useToken) {
            config.headers = {}

            if (methodNotGet) config.headers['content-type'] = 'application/json'

            if (useToken) config.headers.authorization = 'Bearer ' + this._userToken
        }

        if (body) config.body = JSON.stringify(body)

        return fetch('https://skylabcoders.herokuapp.com/api' + path, config)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'KO') throw Error(res.error)

                return res;
            })
    },

    registerUser(username, password) {
        return this._callUsersApi('/user', 'post', { username, password })
            .then(res => res.data.id)
    },

    loginUser(username, password) {
        return this._callUsersApi('/auth', 'post', { username, password })
            .then(({ data: { id, token } }) => {
                this._userId = id
                this._userToken = token
                this._userUsername = username
                this._userPassword = password // IDEAL encrypt it!

                // return true
                return this._callUsersApi(`/user/${this._userId}`, 'get', undefined, true)
            })
            .then(({ data }) => {
                this._userFavorites = data.favorites || []

                return true
            })
    },



    logout() {
        this._userId = null
        this._userToken = null
        this._userUsername = null

        sessionStorage.clear()
    },

    get loggedIn() {
        return this._userId && this._userToken && this.userUsername
    },

    updateUser(password, newUsername, newPassword) {
        const data = {
            username: this.userUsername,
            password
        }

        if (newUsername) data.newUsername = newUsername

        if (newPassword) data.newPassword = newPassword

        return this._callUsersApi(`/user/${this._userId}`, 'put', data, true)
            .then(() => {
                if (newUsername) this._userUsername = newUsername

                return true
            })
    },

    updateFavs(currentBet, currentFlight) {
        

        const newFavorites = [...this._userFavorites, {bet: currentBet,
            flight: currentFlight}]

        this._userFavorites = newFavorites

        const data = {
            username: this.userUsername,
            password: this._userPassword,
            favorites: this._userFavorites
        }

        return this._callUsersApi(`/user/${this._userId}`, 'put', data, true)
            .then(() => {
                return true
            })
    },

    unregisterUser(password) {
        return this._callUsersApi(`/user/${this._userId}`, 'delete', {
            username: this.userUsername,
            password
        }, true)
            .then(() => true)
    }

    
}

//export default logic;
if (typeof module !== 'undefined') module.exports = logic;
