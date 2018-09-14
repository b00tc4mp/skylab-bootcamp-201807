
   
const logic = {
    
     /** This is the function to call the User's api
     * @param {string} path - The api endpoint
     * @param {string} method - The call method
     * @param {object} headers - The headers of the call
     * @param {object} body - The body of the call
     * @param {string} expectedStatus - Status return
     * @return {promise} - The fetch to the api
     */

    url: 'http://localhost:8080/api',

    _call(path, method, headers, body, expectedStatus) {
        const config = { method }
        if (headers) config.headers = headers
        if (body) config.body = body

        return fetch(`${this.url}/${path}`, config)
            .then(res => {
                if (res.status === expectedStatus) {
                    return res
                } else {
                    return res.json()
                        .then(({ message }) => {
                            throw new Error(message)
                        })
                }
            })
    },

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
    },

    _validateSymbol(symbol) {
       return this.getValue(symbol, 'USD')
            .catch(() => {
                throw Error(`${symbol} is not valid`)
            })
    },
   
   
     // user's
    /** This is the function to register a user 
     * @param {string} username - The user username
     * @param {string} username - The user username
     * @param {string} password - The user password
     * @return {function} - Call to the users api
     */
    register(username, email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('email', email)
                this._validateStringField('password', password)

                return this._call('user/register', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ username, email, password }), 201)
                    .then(() => true)
            })
    },

    /** This is the function to login a user
    * @param {string} email - The user email
    * @param {string} password - The user password
    * @return {function} - Call to the users api
    */
    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('usermail', email)
                this._validateStringField('password', password)

                return this._call('user/authenticate', 'POST', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ email, password }), 200)
                    .then(res => res.json())
                    .then(({ token }) => token)
            })
    },

    // updatePassword(email, password, newPassword, token) {
    //     return Promise.resolve()
    //         .then(() => {
    //             this._validateStringField('password', password)
    //             this._validateStringField('new password', newPassword)

    //             return this._call(`user/profile/${email}`, 'POST', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, JSON.stringify({ password, newPassword }), 200)
    //                 .then(res => res.json())
    //         })
    // },
    // //Check...
    // unregister(email, password){
    //     return Promise.resolve()
    //         .then(() => {
               
    //             return this._call(`user/unregister`, 'POST', { 'content-type': 'application/json' }, JSON.stringify({ email, password }), 200)
    //             .then(res => res.json())
    //         })
    // },

    //// PORTFOLIO ////

    /** This is the function to add an Coin to api
     * @param {string} email - The user email
     * @param {string} name - The coin name
     * @param {string} quantity - The quantity of coins
     * @param {string} value - The value of coin
     * @param {date} date - The date of the add
     * @param {string} token - The token api
     * @return {function} - Call to api
     */
    addCoin(email, name, quantity, value, date, token){
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)

                name = name.toUpperCase()

                return this._validateSymbol(name)
            })
            .then(() => {
                return this._call(`user/${email}/portfolio/add`,'POST',
                    { authorization: `bearer ${token}`,'content-type': 'application/json' }
                    , JSON.stringify({ email, name, quantity, value, date }), 201)
                .then(res => res.json())
            })
    },

    //List Coins
    /** This is the function to list the user coins api
     * @param {string} email - The user email
     * @param {string} token - The token api
     * @return {function} - Call to api
     */
    listCoins(email, token){
        return Promise.resolve()
            .then(() => {           
                return this._call(`user/${email}/portfolio/list`, 'GET',
                    { authorization: `bearer ${token}` }, undefined, 200)
            })
            .then(res => res.json())
            .then(({ portfolio }) => {
                return portfolio
            })
    },

    // Update Coin
    /** This is the function to update a coin
     * @param {string} email - The user email
     * @param {string} coinId - The coin ID
     * @param {string} newValue - The new coin value
     * @param {date} newValue - The new coin date
     * @param {string} newName - The new coin name
     * @param {string} newQuantity - The new coin quantity
     * @param {string} token - The token api
     * @return {function} - Call to api
     */
    updateCoin(email, coinId, newValue, newDate, newName, newQuantity, token){
        return Promise.resolve()
        .then(() => {
            return this._call(`user/${email}/portfolio/update/`, 'PATCH', { authorization: `bearer ${token}`,'content-type': 'application/json' }, JSON.stringify({coinId, newValue, newDate, newName, newQuantity}), 201)
        })
        .then(res => res.json())
    },


    //Remove Coin
     /** This is the function to delete a coin
     * @param {string} email - The user email
     * @param {string} coinId - The coin ID
     * @param {string} token - The token api
     * @return {function} - Call to api
     */
    removeCoin(email, coinId, token){
        return Promise.resolve()
            .then(() => {
                return this._call(`user/${email}/portfolio/remove`, 'DELETE',
                    { authorization: `bearer ${token}`, 'content-type': 'application/json'}, JSON.stringify({ coinId }), 201)
            })
            .then(res => res.json())
    },

    //Calculate Cost Portfolio
    /** This is the function to calculate de total portfolio value each coin
     * @param {array} transactions - The user transactions
     */
    calculatePortfolioInvestment(transactions){
        return Promise.resolve().then(() => {
            const ordered = transactions.sort((a, b) => a.name > b.name)
            
            const result = {}
            
            let val = 0
            let quantity = 0
            let prev = ordered[0].name
            ordered.forEach(transaction => {
                if (transaction.name !== prev) {
                    prev = transaction.name
                    val = 0
                    quantity = 0
                }

                quantity += transaction.quantity
                
                val += transaction.value * transaction.quantity

                result[transaction.name] = {
                    val,
                    quantity
                }
            })
            
            return result
        })
    },
   

    //// Market ////
    //TODO with $limits
    /** This function retrieve coins api coinmarketcap
     * @param {string} limit - The number coin to retrieve
     * @return {function} - Call to api
     */
    getCoins(limit = 100){
        return Promise.resolve()
            .then(() => {
                return this._call(`market/list?limit=${limit}`, 'GET', undefined, undefined, 200)
            })
            .then(res => res.json())
    },
    /** This function retrieve the news
     * @param {string} limit - The number coin retrieve to api coinmarketcap
     * @return {function} - Call to api cryptocompare
     */
    getCryptoNews(site){
        return Promise.resolve()   
            .then(() => {
                return this._call(`/news?site=${site}`, 'GET', undefined, undefined, 200)
            })
            .then(res => res.json())
            .then(({news}) => news)
    },
    /** This function retrieve the global stats
     * @param {string} limit - The number coin retrieve to api coinmarketcap
     *  * @return {function} - Call to api coinmarketcap
     */
    getGlobalStats(){
        return Promise.resolve()
            .then(() => {
                return this._call(`market/stats`, 'GET', undefined, undefined, 200)
            })
            .then(stats => {
                return stats.json()
            })
    },


    //// Portfolio ////

    //COMPARE CURRENCIES
    /** This function to get value each coin
     * * @param {string} coin - The first coin to compare
     * * @param {string} coin2 - The reference coin
     * @param {string} limit - Call to api cryptocompare
     */
    getValue(coin, coin2){
        return Promise.resolve()
           .then(() => {
               return this._call(`portfolio/compare?coin=${coin}&coin2=${coin2}`, 'GET', undefined, undefined, 200)
           })
           .then(data => data.json())
    },
    
}

module.exports = logic