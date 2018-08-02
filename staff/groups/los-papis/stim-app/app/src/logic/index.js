const logic = {

    mostPlayedGames() {
        return fetch('https://skylabcoders.herokuapp.com/proxy?url=https://steamspy.com/api.php?request=top100in2weeks')
            .then(res => res.json())
    },

    newsForGame(appid, newsCount = 1, newsLength = 50) {
        return fetch(`https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${appid}&count=${newsCount}&maxlength=${newsLength}&format=json`)
            .then(res => res.json())
            .then(res => res.appnews.newsitems[0])
    },

    newsMostPlayedGames() {
        return logic.mostPlayedGames()
            .then(res => {
                let results =[] 
                for(let game in res) {
                    results.push(logic.newsForGame(res[game].appid))
                }
                return Promise.all(results)
            })
    },

    getAllGames() {
        return fetch('https://api.apify.com/v1/execs/6haWBTzqc9yoPHFHB/results')
            .then(res => res.json())
            .then(res => res[0].pageFunctionResult)

    },

    getGamesByName(name) {
        return logic.getAllGames()
            //
            //
            .then(res => res.filter(({ title }) => {
                return title.toLowerCase().includes((name.toLowerCase()))
            })
            )
    },

    getGamesById(gameid) {
        return logic.getAllGames()
            //
            //
            .then(res => res.filter(({ id }) => {
                return Number(id) === gameid
            })
            )
    },

    getStatsForGame (appid){
         return fetch(`https://skylabcoders.herokuapp.com/proxy?url=http://steamspy.com/api.php?request=appdetails&appid=${appid}`)
            .then(res => res.json())
            .then (res => res)
            // .then(res => Object.keys(res).map(i => 
            //     {
            //         if(i !== 19) res[i]
            //         else Object.keys.map(j => res[i][j] )
            //     }))
    },

    //cloudinary



    //userLogic

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

    get _userUsername() {
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
        return !!(this._userId && this._userToken && this._userUsername)
    },

    updateUser(password, newUsername, newPassword) {
        const username = this._userUsername
        return this._callUsersApi(`/user/${this._userId}`, 'put', { username, newUsername, password, newPassword }, true)
            .then(() => {
                this._userUsername = newUsername
                this._userPassword = newPassword
                return true
            })
    },

    unregisterUser(password) {
        return this._callUsersApi(`/user/${this._userId}`, 'delete', {
            username: this._userUsername,
            password
        }, true)
            .then(() => true)
    },

    retrieveUser() {
        

        return this._callUsersApi(`/user/${this._userId}`, 'get', undefined, true)
            .then(({ data }) => {
                this._userUsername = data.username
                return true
            })

    },

    isFavorite(id) {
        return this._userFavorites.includes(id)
    },

    toggleGameFavorite(id) {
        const favorites = this._userFavorites
        
        const index = favorites.indexOf(id)

        if (index > -1) {
            favorites.splice(index, 1)
        } else {
            favorites.push(id)
        }

        const data = {
            username: this._userUsername,
            password: this._userPassword,
            favorites
        }

        return this._callUsersApi(`/user/${this._userId}`, 'put', data, true)
            .then(() => {
                this._userFavorites = favorites
                
                return true
            })
    },

    updateFavorites(password,id) {
        const username = this._userUsername
        const favorites = this._userFavorites
        return this._callUsersApi(`/user/${this._userId}`, 'put', { username, password,id }, true)
            .then(() => {
                favorites.push(id)
                this._userFavorites = favorites
                return true
            })
    },

}

export default logic;

