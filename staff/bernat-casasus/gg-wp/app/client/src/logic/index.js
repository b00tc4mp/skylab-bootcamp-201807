const logic = {

    url:'https://enigmatic-lake-31886.herokuapp.com/api',

    set _userToken(userToken) {
        sessionStorage.setItem('userToken', userToken)
    },

    get _userToken() {
        return sessionStorage.getItem('userToken')
    },

    set _userEmail(userEmail) {
        sessionStorage.setItem('userEmail', userEmail)
    },

    get userEmail() {
        return sessionStorage.getItem('userEmail')
    },

    // set _searchData(data) {
    //     return sessionStorage.setItem('searchData', data)
    // },
    // get searchData() {
    //     return sessionStorage.getItem('searchData')
    // },

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

        return fetch(`${this.url}/user/${path}`, config)
            .then(res => res.json())
            .then(res => {
                if (res.code) {
                    if (res.code === 500) throw Error('Ups! We are having troubles, please try again later!')
                    throw Error(res.message)
                }

                return res;
            })

    },

    _callLolApi(path) {

        return fetch(`${this.url}/game/${path}`)
            .then(res => res.json())
            .then(res => {
                console.log('calllolApi',res)
                if (res.code) {
         
                    if (res.code === 500) {
                        if(res.message === 'Rate limit exceeded')throw Error('Hey slow down! You are making to many requests, please try again later!')
                        throw Error('Ups! We are having troubles, please try again later!')
                    }
                    throw Error(res.message)

                }

                return res
            })
    },

    //GG-WP API

    getSummonerSumaryBySummonerName(summonerName) {
        return this._callLolApi(`summary/${summonerName}`)
            .then(res => {
                return res
            })
    },

    getSummaryPreviewBySummonerId(summonerId) {
 
        return this._callLolApi(`summary/preview/${summonerId}`)
            .then(res => res)
    },

    getLeagueByLeagueId(leagueId) {
        return this._callLolApi(`league/${leagueId}`)
            .then(res => res)
    },

    getLiveGameBySummonerId(summonerId) {
        return this._callLolApi(`live/${summonerId}`)
            .then(res => res)
    },
    getSpectateGameBySummonerId(summonerId) {
        return this._callLolApi(`spectate/${summonerId}`)
            .then(res => res)
    },

    // USERS

    registerUser(email, password) {
        return this._callUsersApi('register', 'POST', { email, password })
            .then(() => true)
    },

    loginUser(email, password) {
        return this._callUsersApi('authenticate', 'POST', { email, password })
            .then(({ email, token }) => {
                this._userToken = token
                this._userEmail = email

                return true
            })
    },

    logout() {
        sessionStorage.clear()
    },

    updateUserPassword(email, password, newPassword) {
        return this._callUsersApi(email, 'PATCH', { password, newPassword }, true)
            .then(() => true)
    },

    deleteUserAccount(email, password) {
        return this._callUsersApi(email, 'DELETE', { password }, true)
            .then(() => true)
    },

    followPlayer(id) {
        return this._callUsersApi(this.userEmail, 'POST', { id }, true)
            .then(() => true)
    },

    listFollows() {
 
        return this._callUsersApi(this.userEmail, 'GET', null, true)
    },

    unFollowPlayer(summonerId) {
        return this._callUsersApi(`${this.userEmail}/summoner/${summonerId}`, 'DELETE', null, true)
            .then((res) => res)
    },

    get isLoggedIn() {
        return !!(this._userToken && this.userEmail)
    },

};

//export default logic;
if (typeof module !== 'undefined') module.exports = logic;