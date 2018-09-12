const logic = {
    
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
   
    //// USER ////
    
    register(username, email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('email', email)
                this._validateStringField('password', password)

                return this._call('/user/register', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ username, email, password }), 201)
                    .then(() => true)
            })
    },

    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('usermail', email)
                this._validateStringField('password', password)

                return this._call('/user/authenticate', 'POST', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ email, password }), 200)
                    .then(res => res.json())
                    .then(({ token }) => token)
            })
    },

     //// PORTFOLIO ////

    //ADD COIN
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
    updateCoin(email, coinId, newValue, newDate, newName, newQuantity, token){
        return Promise.resolve()
        .then(() => {
            return this._call(`user/${email}/portfolio/update/`, 'PATCH', { authorization: `bearer ${token}`,'content-type': 'application/json' }, JSON.stringify({coinId, newValue, newDate, newName, newQuantity}), 201)
        })
        .then(res => res.json())
    },


    //Remove Coin
    removeCoin(email, coinId, token){
        return Promise.resolve()
            .then(() => {
                return this._call(`user/${email}/portfolio/remove`, 'DELETE',
                    { authorization: `bearer ${token}`, 'content-type': 'application/json'}, JSON.stringify({ coinId }), 201)
            })
            .then(res => res.json())
    },

    //Calculate Cost Portfolio
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

    getCoins(limit = 10){
        return Promise.resolve()
            .then(() => {
                return this._call(`market/list?limit=${limit}`, 'GET', undefined, undefined, 200)
            })
            .then(res => res.json())
    },

    getCryptoNews(site){
        return Promise.resolve()   
            .then(() => {
                return this._call(`/news?site=${site}`, 'GET', undefined, undefined, 200)
            })
            .then(res => res.json())
            .then(({news}) => news)
    },

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
    getValue(coin, coin2){
        return Promise.resolve()
           .then(() => {
               return this._call(`portfolio/compare?coin=${coin}&coin2=${coin2}`, 'GET', undefined, undefined, 200)
           })
           .then(data => data.json())
    },
    
}

module.exports = logic