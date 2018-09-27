const validate = require('./validate.js')
const LogicError = require('./LogicError.js')
const logicCloudinary = require('./cloudinary.js')
const { Review, User, Product } = require('../data/models')

const userLogic = {

    /**
     * Validate that the field is a valid gender defined as an enum in the User Schema
     * 
     * @param {String} name
     * @param {String} field
     */
    _validateGenderOptions(name, field) {
        validate._stringField(name, field)
        if (!['female', 'male', 'other'].includes(field)) throw new LogicError(`${name} is not a valid gender`)
    },

    _validateProfileObj(data) {
        if (!data) throw new LogicError('data for the profile updating is not defined')

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
                throw new LogicError(`is not possible to update the user profile with the data provided in ${fieldName}`)
            }
        })
    },

    _parseUserItems(user) {
        let reviews = [], products = [], favs = [], feedbacks = [], total_score = 0

        user.id = user._id.toString()
        delete user._id

        if (user.reviews && user.reviews.length) {
            user.reviews.forEach( review => {
                review.id = review._id.toString()
                review.productId = review.product.toString()
                review.userId_from = review.user_from.toString()
            
                delete review._id
                delete review.product
                delete review.user_from

                reviews.push(review)

                total_score += review.score
            })

            user.reviews = reviews
        }

        user.avg_score = total_score / (reviews.length || 1)


        if (user.products && user.products.length) {
            user.products.forEach( product => {
                product.id = product._id.toString()
                delete product._id

                products.push(product)
            })

            user.products = products
        }

        if (user.favs && user.favs.length) {
            user.favs.forEach( fav => {
                fav.id = fav._id.toString()
                delete fav._id

                favs.push(fav)
            })

            user.favs = favs
        }

        if (user.feedbacks && user.feedbacks.length) {
            user.feedbacks.forEach( feedback => {
                feedback.id = feedback._id.toString()
                delete feedback._id

                feedbacks.push(feedback)
            })

            user.feedbacks = feedbacks
        }

        if (user.name && user.surname) {
            user.public_name = `${user.name} ${user.surname.charAt(0)}.`
        } else if (user.email) {
            user.public_name = user.email.substring(0, user.email.lastIndexOf("@"))
        }

        return user
    },

    register(email, password) {
        return Promise.resolve()
            .then(() => {
                validate._email(email)
                validate._password('password', password)

                return User.findOne({ email })
            })
            .then(user => {
                if (user) throw new LogicError(`user with ${email} email already exist`)

                return User.create({ email, password })
            })
            .then(() => true)
    },

    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                validate._email(email)
                validate._password('password', password)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                return user.id
            })
    },

    updatePassword(user, password, newPassword) {
        return Promise.resolve()
            .then(() => {
                validate._stringField('user', user)
                validate._password('password', password)
                validate._password('new password', newPassword)

                return User.findById(user)
            })
            .then(_user => {
                if (!_user) throw new LogicError(`user with id: ${user} does not exist`)

                if (_user.password !== password) throw new LogicError(`wrong password`)

                if (password === newPassword) throw new LogicError('new password must be different from old password')

                _user.password = newPassword

                return _user.save()
            })
            .then(() => true)
    },

    // TODO: send email to the new adress to check if it exists
    updateEmail(user, email, newEmail) {
        return Promise.resolve()
            .then(() => {
                validate._stringField('user', user)
                validate._email(email)
                validate._email(newEmail)

                return User.findById(user)
            })
            .then(_user => {
                if (!_user) throw new LogicError(`user with id: ${user} does not exist`)

                if (_user.email !== email) throw new LogicError(`wrong email`)

                if (email === newEmail) throw new LogicError('new email must be different from old email')

                _user.email = newEmail

                return _user.save()
            })
            .then(() => true)
    },

    /**
     * Update more info provided by the user himself to have a more complete profile.
     * Not all possible fields to update the profile must be provided.
     * Param "data" object can contain as maximum this properties: "name", "surname", "birth", "gender", "location"
     *
     * Profile photo, email and new password are updated separately
     *  
     * @param {ObjectId} userId 
     * @param {Object} data 
     */
    updateProfile(userId, data) {
        return Promise.resolve()
            .then(() => {
                validate._stringField('user', userId)
                this._validateProfileObj(data)

                return User.findById(userId)
            })
            .then(user => {
                if (!user) throw new LogicError(`user with id: ${userId} does not exist`)

                Object.keys(data).forEach(field => {
                    if (field === 'longitude') {
                        user.location.set(0, Number(data[field]))
                    } else if (field === 'latitude') {
                        user.location.set(1, Number(data[field]))
                    } else if (!user[field] || user[field] !== data[field]) {
                        user[field] = data[field]
                    }
                })

                return user.save()
            })
            .then(() => true)
    },


   /**
    * Update the profile photo of the user who is logged in and owns the account.
    * 
    * @param {ObjectId} userId 
    * @param {String} base64Image 
    */
   updateProfilePhoto(userId, imgName, imgBuffer) {
        return Promise.resolve()
        .then(() => {
            validate._objectId('user', userId)
            //validate._stringField('base64Image', base64Image)
            //validate._base64Image('image', base64Image)
            if (!imgBuffer) throw new LogicError('image is not defined')

            return User.findById(userId)
        })
        .then(user => {
            if (!user) throw new LogicError(`user with id: ${userId} does not exist`)

            return logicCloudinary.uploadBuffer(imgName, imgBuffer)
                .then(urlCloudinary => {
                    user.photo = urlCloudinary

                    return user.save()
                })
        })
        .then( _user => _user.photo )
    },

    /**
     * Remove the User from the database.
     * 
     * @param {String} email 
     * @param {String} password 
     */
    // TODO: remove all his products aswell?
    unregisterUser(email, password) {
        return Promise.resolve()
            .then(() => {
                validate._email(email)
                validate._password('password', password)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                return User.deleteOne({ _id: user._id })
            })
            .then(() => true)
    },

    /**
     * User it's allowed to add a review of a product that she has bought
     * 
     * @param {String} userId 
     * @param {String} productId 
     */
    allowFeedback(userId, productId) {
        return Promise.resolve()
            .then(() => {
                validate._objectId('user', userId)
                validate._objectId('product', productId)

                return Product.findById(productId)
            })
            .then(prod => { 
                if (!prod) throw new LogicError(`product with id: ${productId} does not exist`)

                return User.findById(userId)
            })
            .then(user => {
                if (!user) throw new LogicError(`user with id: ${userId} does not exist`)

                user.feedbacks.push(productId)

                return user.save()
            })
            .then(() => true)
    },

    /**
     * User has add a review of a product that she has bought and we remove 
     * thisr pendent feeback from the array
     * 
     * @param {String} userId 
     * @param {String} productId 
     */
    removeFeedback(userId, productId) {
        return Promise.resolve()
            .then(() => {
                validate._objectId('user', userId)
                validate._objectId('product', productId)

                return Product.findById(productId)
            })
            .then(prod => { 
                if (!prod) throw new LogicError(`product with id: ${productId} does not exist`)

                return User.findByIdAndUpdate(userId, 
                    { '$pull': { 'feedbacks': productId } }, 
                    { 'new': true })
            })
            .then(() => true)
    },


    /**
     * Save a new user's review writted by another user who has bought a product from him.
     * 
     * @param {ObjectId} userFrom 
     * @param {ObjectId} userTo 
     * @param {Integer} _score 
     * @param {ObjectId} idProd 
     * @param {String} desc 
     */
    // TODO: check that a product doesn't have more than one review
    addReview(userFrom, userTo, _score, idProd, desc) {
        const score = _score ? parseFloat(_score) : _score
        return Promise.resolve()
            .then(() => {
                validate._objectId('userFrom', userFrom)
                validate._objectId('userTo', userTo)
                validate._objectId('idProd', idProd)
                validate._intField('score', score, 1, 5)
                validate._stringField('description', desc)

                return Product.findById(idProd)
            })
            .then(prod => { 
                if (!prod) throw new LogicError(`product with id: ${idProd} does not exist`)

                return User.findById(userFrom)
            })
            .then(_userFrom => { 
                if (!_userFrom) throw new LogicError(`user with id: ${userFrom} does not exist`)

                return User.findById(userTo)
            })
            .then(user => {
                if (!user) throw new LogicError(`user with id: ${userTo} does not exist`)

                const review = { user_from: userFrom, score, product: idProd, description: desc },
                    reviewModel = new Review(review)

                user.reviews.push(reviewModel)

                return user.save()
            })
            .then(() => true)
    },


    /**
     * List the info about another user when logged from the owner's account. 
     * Only public info should be listed.
     * 
     * @param {ObjectId} userId 
     */
    listPublicUser(userId) {
        return Promise.resolve()
        .then(() => {
                validate._objectId('user', userId)

                return User.
                    findById(userId).
                    select('email name surname reviews products photo location feedbacks').
                    populate([{
                        path: 'products'
                        , select: 'title description price state cathegory location photos num_favs num_views created_at'
                        , match: { state: { $in: ['pending', 'sold', 'reserved'] }}
                        , options: { sort: { created_at: -1 }, lean: true}
                    },
                    {
                        path: 'feedbacks'
                        , select: 'title photos user'
                        , match: { state: { $in: ['sold'] }}
                        , options: { sort: { created_at: -1 }, lean: true}
                    }]).
                    lean()
            })
            .then(user => {
                if (!user) throw new LogicError(`user with id: ${userId} does not exist`)

                return this._parseUserItems(user)
            })
    },

    /**
     * List the info about the user who is logged in and owns the account. 
     * User profile owner can see all the private info about herself
     * 
     * @param {ObjectId} userId 
     */
    // TODO: add populate of favs
   listPrivateUser(userId) {
        return Promise.resolve()
            .then(() => {
                validate._objectId('user', userId)

                return User.
                    findById(userId).
                    select('email name surname photo birth gender location favs products reviews feedbacks').
                    populate([{
                        path: 'products'
                        , select: 'title description price state cathegory location photos num_favs num_views created_at'
                        , match: { state: { $in: ['pending', 'sold', 'reserved'] }}
                        , options: { sort: { created_at: -1 }, lean: true}
                    },
                    {
                        path: 'favs'
                        , select: 'title description price state cathegory location photos num_favs num_views created_at'
                        , match: { state: { $in: ['pending', 'sold', 'reserved'] }}
                        , options: { sort: { created_at: -1 }, lean: true}
                    },
                    {
                        path: 'feedbacks'
                        , select: 'title photos user'
                        , match: { state: { $in: ['sold'] }}
                        , options: { sort: { created_at: -1 }, lean: true}
                    }]).
                    lean()
            })
            .then(user => {
                if (!user) throw new LogicError(`user with id: ${userId} does not exist`)

                return this._parseUserItems(user)
            })
    },

    addFavourite(userId, productId) {
        return Promise.resolve()
        .then(() => {
            validate._objectId('user', userId)
            validate._objectId('product', productId)

            return Product.findById(productId)
        })
        .then(product => {
            if (!product) throw new LogicError(`product with id ${productId} does not exist`)

            return User.findById(userId)
        })
        .then(user => {
            if (!user) throw new LogicError(`user with id: ${userId} does not exist`)

            user.favs.push(productId)

            return user.save()
        })
        .then(user => user.id)
    },

    removeFavourite(userId, productId) {
        return Promise.resolve()
        .then(() => {
            validate._objectId('user', userId)
            validate._objectId('product', productId)

            return Product.findById(productId)
        })
        .then(product => {
            if (!product) throw new LogicError(`product with id ${productId} does not exist`)

            return User.findById(userId)
        })
        .then(user => {
            if (!user) throw new LogicError(`user with id: ${userId} does not exist`)

            user.favs.pull(productId)

            return user.save()
        })
        .then(user => user.id)
    },

    addProduct(userId, productId) {
        return Promise.resolve()
        .then(() => {
            validate._objectId('user', userId)
            validate._objectId('product', productId)

            return Product.findById(productId)
        })
        .then(product => {
            if (!product) throw new LogicError(`product with id ${productId} does not exist`)
            
            return User.findById(userId)
        })
        .then(user => {
            if (!user) throw new LogicError(`user with id: ${userId} does not exist`)

            user.products.push(productId)

            return user.save()
        })
        .then(() => productId)
    },

}

module.exports = userLogic