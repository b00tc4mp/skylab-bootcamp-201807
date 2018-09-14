const validate = require('./validate')

const logic = {
    // url: 'http://localhost:8080/api',
    url: 'https://fierce-depths-84732.herokuapp.com/api',

    _call(path, method, headers, body, expectedStatus) {
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

    set _user(user) {
        sessionStorage.setItem('user', JSON.stringify(user))
    },

    get _user() {
        return JSON.parse(sessionStorage.getItem('user'))
    },

    _validateStateOptions(name, field) {
        validate._stringField(name, field)
        if (!['sold', 'reserved', 'pending', 'expired', 'removed'].includes(field)) 
            throw new Error(`${name} is not a valid state for a product`)
    },

    _validateProductFilters(filters) {
        validate._objectField('product filters', filters)

        const fieldNames = Object.keys(filters)

        fieldNames.forEach(fieldName => {
            if(fieldName === 'txt' || fieldName === 'cath') { // text, cathegory
                validate._stringField(fieldName, filters[fieldName])
            } else if(fieldName === 'date') { // publication date
                validate._dateField(fieldName, filters[fieldName] ? new Date(filters[fieldName]) : filters[fieldName])
            } else if(fieldName === 'dist' || fieldName === 'maxVal' || fieldName === 'minVal') { // distance, price
                const max = fieldName === 'dist'? 400 : 30000
                validate._intField(fieldName, filters[fieldName], 0, max)
            } else if(fieldName === 'long') { // loc: [long,lat]
                validate._longitude(filters[fieldName])
            } else if(fieldName === 'lat') { // loc: [long,lat]
                validate._latitude(filters[fieldName])
            } else {
                throw new Error(`is not possible to search for any product with the filter provided in ${fieldName}`)
            }
        })
    },

    _validateGenderOptions(name, field) {
        validate._stringField(name, field)
        if (!['female', 'male', 'other'].includes(field)) throw new Error(`${name} is not a valid gender`)
    },

    _validateProfileObj(data) {
        validate._objectField('profile info data', data)

        const fieldNames = Object.keys(data)

        fieldNames.forEach(fieldName => {
            if(fieldName === 'name' || fieldName === 'surname') {
                validate._stringField(fieldName, data[fieldName])
            } else if(fieldName === 'birth') {
                validate._dateField(fieldName, data[fieldName] ? new Date(data[fieldName]) : data[fieldName])
            } else if(fieldName === 'gender') {
                this._validateGenderOptions(fieldName, data[fieldName])
            } else if(fieldName === 'longitude') { // loc: [long,lat]
                validate._longitude(data[fieldName])
            } else if(fieldName === 'latitude') { // loc: [long,lat]
                validate._latitude(data[fieldName])
            } else {
                throw new Error(`is not possible to update the user profile with the data provided in ${fieldName}`)
            }
        })
    },

    _buildQueryParams(filters) {
        const url = new URL(this.url)

        if (filters) {
            const fieldNames = Object.keys(filters)
            fieldNames.forEach(fieldName => url.searchParams.append(fieldName, filters[fieldName]))
        }

        return url.search
    },

    getUserField(nameField) {
        if (this._user && this._user[nameField]) return this._user[nameField]

        return null
    },

    get loggedIn() {
        return this._userId && this._userToken
    },

    //LOGGIN//
    register(email, password) {
        return Promise.resolve()
            .then(() => {
                validate._email(email)
                validate._stringField('password', password)

                return this._call('register', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ email, password }), 201)
                    .then(() => true)
            })
    },

    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                validate._email(email)
                validate._stringField('password', password)

                return this._call('authenticate', 'POST', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ email, password }), 200)
                    .then(res => res.json())
                    .then(({ user, token }) => {
                        this._userId = user
                        this._userToken = token
        
                        return true
                    })
            })
    },

    login(email, password) {
        return Promise.resolve()
            .then(() => this.authenticate(email, password))
            .then(() => this.getPrivateUser() )
    },

    logout() {
        this._userId = null
        this._userToken = null
        this._user = null

        sessionStorage.clear()
    },

    //USER//
    uploadUser(data) {
        return Promise.resolve()
            .then(() => {
                this._validateProfileObj(data)

                const body = { data }

                return this._call(`me/${this._userId}/profile`, 'PATCH', { 
                    'Authorization': `bearer ${this._userToken}`,
                    'Content-Type': 'application/json' 
                }, JSON.stringify(body), 200)
                    .then(() => true)
            })
    },

    uploadProfilePhoto(photo) {
        return Promise.resolve()
        .then(() => {
            validate._objectField('photo', photo)

            const body = new FormData()
            body.append('image', photo)

            return this._call(`me/${this._userId}/photo`, 'PATCH', { 
                authorization: `bearer ${this._userToken}` 
            }, body, 200)
                .then(() => true)
        })
    },

    getPrivateUser() {
        return Promise.resolve()
            .then(() => {
                return this._call(`/me/${this._userId}`, 'GET', { 
                    'Authorization': `bearer ${this._userToken}`,
                    'Content-Type': 'application/json' 
                }, undefined, 200)
                    .then(res => res.json() )
                    .then(res => {
                        this._user = res })
            })
    },

    getPublicUser(userId) {
        return Promise.resolve()
            .then(() => {
                return this._call(`/user/${userId}`, 'GET', { 
                    'Content-Type': 'application/json' 
                }, undefined, 200)
                    .then(res => res.json() )
            })
    },

    allowProdReviewToUser(user, product) {
        return Promise.resolve()
            .then(() => {
                validate._stringField('user id', user)
                validate._stringField('product id', product)

                const body = { user, product }

                return this._call(`me/${this._userId}/feedback`, 'PATCH', { 
                    'Authorization': `bearer ${this._userToken}`,
                    'Content-Type': 'application/json' 
                }, JSON.stringify(body), 200)
                    .then(() => true)
            })
    },

    //PRODUCTS//
    getSimpleProductsByFilters(filters) {
        return Promise.resolve()
            .then(() => {
                if (filters) this._validateProductFilters(filters)

                const queryParams = this._buildQueryParams(filters)
                
                return this._call(`/prod/${queryParams}`, 'GET', { 
                    'Content-Type': 'application/json' 
                }, undefined, 200)
                    .then(res => res.json())
            })
    },

    getProductDetailById(productId) {
        return Promise.resolve()
            .then(() => {
                validate._stringField('productId', productId)
                
                return this._call(`/prod/${productId}`, 'GET', { 
                    'Content-Type': 'application/json' 
                }, undefined, 200)
                    .then(res => res.json())
            })
    },

    incrementProductViewsById(productId) {
        return Promise.resolve()
        .then(() => {
            return this._call(`/prod/${productId}/views`, 'PATCH', { 
                'Authorization': `bearer ${this._userToken}`,
                'Content-Type': 'application/json'
            }, undefined, 200)
                .then(() => true)
        })
    },

    uploadProduct(title, cathegory, price, description, photos, longitude, latitude) {

        return Promise.resolve()
            .then(() => {
                validate._stringField('title', title)
                validate._stringField('cathegory', cathegory)
                validate._floatField('price', price, 0, 999999)
                validate._stringField('description', description)
                if (photos) photos.forEach((photo, index) => {
                                validate._objectField(`photo${index}`, photo)
                            })
                
                validate._longitude(longitude)
                validate._latitude(latitude)
                //validate._location([longitude, latitude])

                const body = new FormData()

                body.append('title', title)
                body.append('cathegory', cathegory)
                body.append('price', price)
                body.append('description', description)
                //body.append('image', photo)
                photos.forEach((photo, index) => {
                    body.append(`image${index}`, photo)
                })
                body.append('longitude', longitude)
                body.append('latitude', latitude)

                return this._call(`me/prod/${this._userId}`, 'POST', { 
                    authorization: `bearer ${this._userToken}` 
                }, body, 201)
                    .then(() => true)
            })
    },

    updateStateProd(productId, state) {
        return Promise.resolve()
        .then(() => {
            this._validateStateOptions('state', state)

            const body = { state }

            return this._call(`/me/${this._userId}/prod/${productId}/state`, 'PATCH', { 
                'Authorization': `bearer ${this._userToken}`,
                'Content-Type': 'application/json'
            }, JSON.stringify(body), 200)
                .then(() => true)
        })
    },

    addProductToFavourites(productId) {
        return Promise.resolve()
        .then(() => {
            return this._call(`/me/${this._userId}/prod/${productId}/favs`, 'PATCH', { 
                'Authorization': `bearer ${this._userToken}`,
                'Content-Type': 'application/json'
            }, undefined, 200)
                .then(() => true)
        })
    },

    removeProductFromFavourites(productId) {
        return Promise.resolve()
        .then(() => {
            return this._call(`/me/${this._userId}/prod/${productId}/unfavs`, 'PATCH', { 
                'Authorization': `bearer ${this._userToken}`,
                'Content-Type': 'application/json'
            }, undefined, 200)
                .then(() => true)
        })
    },



    //// CHATS //////

    addChat(product) {
        return Promise.resolve()
            .then(() => {
                validate._stringField('productId', product)

                const body = { product }

                return this._call(`me/${this._userId}/chat`, 'POST', { 
                    'Authorization': `bearer ${this._userToken}`,
                    'Content-Type': 'application/json' 
                }, JSON.stringify(body), 201)
                    .then(res => res.json())
            })
    },

    addMessageToChat(chatId, text, receiver) {
        return Promise.resolve()
            .then(() => {
                validate._stringField('chatId', chatId)
                validate._stringField('text message', text)
                validate._stringField('receiverId', receiver)

                const body = { text, receiver }

                return this._call(`me/${this._userId}/chat/${chatId}/message`, 'POST', { 
                    'Authorization': `bearer ${this._userToken}`,
                    'Content-Type': 'application/json' 
                }, JSON.stringify(body), 201)
                    .then(() => true)
            })
    },

    getChatById(chatId) {
        return Promise.resolve()
            .then(() => {
                validate._stringField('chatId', chatId)
                
                return this._call(`/me/${this._userId}/chat/${chatId}`, 'GET', {
                    'Authorization': `bearer ${this._userToken}`,
                    'Content-Type': 'application/json' 
                }, undefined, 200)
                    .then(res => res.json())
            })
    },

    listChatsByUserId() {
        return Promise.resolve()
            .then(() => {
                return this._call(`/me/${this._userId}/chat`, 'GET', { 
                    'Authorization': `bearer ${this._userToken}`,
                    'Content-Type': 'application/json' 
                }, undefined, 200)
                    .then(res => res.json())
            })
    },

    listChatsByProductId(productId) {
        validate._stringField('productId', productId)

        return Promise.resolve()
            .then(() => {
                return this._call(`/me/${this._userId}/prod/${productId}/chats`, 'GET', { 
                    'Authorization': `bearer ${this._userToken}`,
                    'Content-Type': 'application/json' 
                }, undefined, 200)
                    .then(res => res.json())
            })
    },

    listChatByProductAndUserId(productId) {
        return Promise.resolve()
            .then(() => {
                validate._stringField('productId', productId)
                
                return this._call(`/me/${this._userId}/prod/${productId}/chat`, 'GET', {
                    'Authorization': `bearer ${this._userToken}`,
                    'Content-Type': 'application/json' 
                }, undefined, 200)
                    .then(res => res.json())
            })
    },

    //// REVIEWS //////

    addReview(userTo, score, idProd, description) {
        return Promise.resolve()
            .then(() => {
                validate._stringField('userTo', userTo)
                validate._stringField('idProd', idProd)
                validate._intField('score', score, 0, 5)
                validate._stringField('description', description)

                const body = { userTo, score, idProd, description }

                return this._call(`me/${this._userId}/review`, 'POST', { 
                    'Authorization': `bearer ${this._userToken}`,
                    'Content-Type': 'application/json' 
                }, JSON.stringify(body), 201)
                    .then(() => true)
            })
    },    

}

module.exports = logic