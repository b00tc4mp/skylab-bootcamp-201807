const logic = {
/**
 * Returns a list of the most played games
 * @returns {promise} promise with a result of a list of the most played games
 */
    mostPlayedGames() {
        return fetch('https://skylabcoders.herokuapp.com/proxy?url=https://steamspy.com/api.php?request=top100in2weeks')
            .then(res => res.json())
    },

    /**
     * Returns news for a certain gameid
     * @param {number} appid - The id of the game
     * @param {number} newsCount - The number of news to return
     * @param {number} newsLength - The length of the news
     * @returns {array} News of a certain game
    */

    newsForGame(appid, newsCount = 1, newsLength = 50) {
        return fetch(`https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${appid}&count=${newsCount}&maxlength=${newsLength}&format=json`)
            .then(res => res.json())
            .then(res => res.appnews.newsitems[0])
    },

    /**
     * Returns news for the most played games
     * @returns {promise} A promise with a result that gives news of the most played games
    */

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

    /**
     * Returns an array of objects of all games  
     * @returns {array} An array of objects with all games
    */

    getAllGames() {
        return fetch('https://api.apify.com/v1/execs/6haWBTzqc9yoPHFHB/results')
            .then(res => res.json())
            .then(res => res[0].pageFunctionResult)

    },

    /**
     * Returns a promise with games matching the query 
     * @returns {promise} A promise which result is an array of objects of all the games matching the query
    */

    getGamesByName(name) {
        return logic.getAllGames()
            .then(res => res.filter(({ title }) => {
                return title.toLowerCase().includes((name.toLowerCase()))
            })
        )
    },

    /**
     * Returns a promise with the game matching the id
     * @returns {promise} A promise which result is an array of an object with the game info
    */  

    getGamesById(gameid) {
        return logic.getAllGames()
            //
            //
            .then(res => res.filter(({ id }) => {
                return Number(id) === gameid
            })
        )
    },

    /**
     * Returns a promise which results are the stats for the game given
     * @param {number} appid - The id of the game to look for
     * @returns {promise} A promise which result is an array of an object with the game stats
    */ 

    getStatsForGame (appid){
         return fetch(`https://skylabcoders.herokuapp.com/proxy?url=http://steamspy.com/api.php?request=appdetails&appid=${appid}`)
            .then(res => res.json())
            .then (res => res)
    },
    /**
     * Returns a boolean that indicates if an id is present within the favorites array
     * @param {number} id - the id of the game to check 
     * @returns {boolean} Returns a boolean that indicates if an id is present within the favorites array
    */ 
    isFavorite(id) {
        return this._userFavorites.includes(id)
    },

    /**
     * Toggles the favorite games
     * @param {number} id - the id of the game to check 
     * @returns {promise} Returns a promise which result is a boolean that indicates if the toggle has been successful
    */ 

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

    /**
     * Calls the user API
     * @param {string} path - The API endpoint
     * @param {string} method - The request method
     * @param {object} body - The body of the request
     * @param {boolean} useToken - Determines if the token is necessary for a certain request
     * @returns {promise} Returns a promise which result is a boolean that indicates if the call has been successful
    */ 

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
    
    /**
     * Register User
     * @param {string} username - the username
     * @param {number} password -the password
     * @returns {promise} Returns a promise which result is a id of user.
    */ 

    
    registerUser(username, password) {
        return this._callUsersApi('/user', 'post', { username, password })
            .then(res => res.data.id)
    },

    /**
     * Login User
     * @param {string} username - the username
     * @param {number} password -the password
     * @returns {promise} Returns a promise which result is a boolean that indicates if  has been successful .
    */ 

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

    /**
     * Logout clear the session storage
     * 
     * 
     */
    

    logout() {
        this._userId = null
        this._userToken = null
        this._userUsername = null

        sessionStorage.clear()
    },

    get loggedIn() {
        return !!(this._userId && this._userToken && this._userUsername)
    },
    
    
    /**
     * UpdateUser
     * @param {number} password -the password
     * @param {string} newUsername - the new username
     *
     * @returns {promise} Returns a promise which result is a boolean that indicates if  has been successful .
    */ 
    updateUser(password, newUsername, newPassword) {
        return this._callUsersApi(`/user/${this._userId}`,'put',{
            username: this._userUsername,
            password,
            // password:newPassword,
            // username: newUsername
            newPassword,
            newUsername
            
        }, true)
            .then(() => {
                    if(newUsername !== null)this._userUsername = newUsername
                    if(newPassword !== null)this._userPassword = newPassword
                    return true
                }
            )
    },

    /**
     * UnregisterUser
     * @param {number} password -the password
     *
     *  @returns {promise} Returns a promise which result is a boolean that indicates if  has been successful .
    */ 

    unregisterUser(password) {
        return this._callUsersApi(`/user/${this._userId}`, 'delete', {
            username: this._userUsername,
            password
        }, true)
            .then(() => true)
    },

    /**
     * Retrieve User
     *      
     *  @returns {promise} Returns a promise which result is a boolean that indicates if  has been successful .
    */ 
    retrieveUser() {
        

        return this._callUsersApi(`/user/${this._userId}`, 'get', undefined, true)
            .then(({ data }) => {
                this._userUsername = data.username
                return true
            })

    }

}

export default logic


