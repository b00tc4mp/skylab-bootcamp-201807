'use strict'

//const validateBase64Image = require('../utils/validate-base64-img')
const validate = require('./validate.js')
const LogicError = require('./LogicError.js')
const logicCloudinary = require('./cloudinary.js')
const { User, Product } = require('../data/models')


const productLogic = {

    /**
     * Validate that the field is a valid state defined as an enum in the Product Schema
     * 
     * @param {String} name 
     * @param {String} field 
     */
    _validateStateOptions(name, field) {
        validate._stringField(name, field)
        if (!['sold', 'reserved', 'pending', 'expired', 'removed'].includes(field)) 
            throw new LogicError(`${name} is not a valid state for a product`)
    },

    /**
     * Validate that at least one photo is provided to upload a product, 
     * and that the format of all of the photos are in correct base 64.
     * 
     * @param {String} name 
     * @param {Array} images 
     */
    _validatePhotos(images) {
        if (!images || !images.length) throw new LogicError('at least one image must be provided in order to upload a product')
        if (!images.length > 4) throw new LogicError('the maximum number of images required are 4')
    },
    /*_validatePhotos(name, photos) {
        if (!photos || !photos.length) throw new LogicError(`at least one photo must be provided in ${name}`)
        if (!photos.every(photo => validateBase64Image(photo))) throw new LogicError(`invalid base 64 format in some images from ${name}`)
    },*/

    _parseProductItems(product) {
        let numReviews = 0, avgReviews = 0

        product.id = product._id.toString()
        delete product._id
        delete product.__v

        if (product.user) {
            const { user } = product

            if (user.name && user.surname) {
                product.user_name = `${user.name} ${user.surname.charAt(0)}.`
            } else if (user.email) {
                product.user_name = user.email.substring(0, user.email.lastIndexOf("@"))
            }

            if (user.products) product.user_products = user.products.filter(prod => prod.state ==='pending' || prod.state === 'reserved').length || 0

            if (user.reviews && user.reviews.length) {
                numReviews = user.reviews.length
                avgReviews = user.reviews.reduce((sum, review) => sum + parseFloat(review.score), 0) / numReviews
            }

            product.user_photo = user.photo
            product.user_id = user._id.toString()

            delete product.user
        }

        product.user_reviews = numReviews
        product.user_avg_score = avgReviews

        return product
    },

    /**
     * Check that the data object has all the required properties: 
     * "title", "description", "price", "cathegory", "location" and "photos"
     * And validate each property in the data object
     * 
     * @param {Object} data 
     */
    //TODO: validate cathegory
    _validateProductData(data) {
        if (!data) throw new LogicError('data for the product uploading is not defined')

        validate._stringField('title', data.title)
        validate._stringField('description', data.description)
        validate._stringField('cathegory', data.cathegory)  // TODO: Better enum or string?
        validate._location(data.location)
        validate._floatField('price', data.price, 0, 30000)
        //this._validatePhotos('image', data.photos)
    },

    _validateProductFilters(filters) {
        if (!filters) throw new LogicError('filters for the product search are not defined')

        validate._objectField('product search filters', filters)

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
                throw new LogicError(`is not possible to search for any product with the filter provided in ${fieldName}`)
            }
        })
    },

    // TODO: filter between two prices (minVal - maxVal)
    _buildQueryFilters(filters) {
        let parsedFilters = {}

        if (filters) {
            const fieldNames = Object.keys(filters)

            fieldNames.forEach(fieldName => {
                if(fieldName === 'txt') {
                    parsedFilters['$text'] = { $search: filters.txt }
                } else if(fieldName === 'cath') {
                    parsedFilters.cathegory = filters.cath.toLowerCase()
                } else if(fieldName === 'date') {
                    parsedFilters.created_at = { $gte: filters.date }
                } else if(fieldName === 'dist') {
                    parsedFilters.location = {
                        $near: {
                            $geometry: { type: 'Point',  coordinates: [filters.long, filters.lat] }, // [long,lat]
                            $maxDistance: filters.dist
                        }
                    }
                } else if(fieldName === 'maxVal' || fieldName === 'minVal') { //price
                    parsedFilters.price = { $lte: filters.maxVal, $gte: filters.minVal }
                }
            })
        }

        parsedFilters.state = { $in: ['sold', 'reserved', 'pending'] }

        return parsedFilters
    },

    /**
     * Create a new product uploaded by the user.
     * Required info must be provided in data object: "title", "description", "price", "cathegory", "location" and "photos"
     * The number of photos that can be passed is between 1 and 4
     * 
     * @param {ObjectId} userId 
     * @param {Object} data 
     * @param {Array} images
     */
    addProduct(userId, data, images) {
        return Promise.resolve()
            .then(() => {
                validate._objectId('user', userId)
                this._validateProductData(data)
                this._validatePhotos('images', images)

                return User.findById(userId)
            })
            .then(user => {
                if (!user) throw new LogicError(`user with id: ${userId} does not exist`)

                let uploadsToCloudinary = images.map(image => logicCloudinary.uploadBuffer(image.name, image.buffer))
                
                return Promise.all(uploadsToCloudinary)
            })
            .then(urlsCloudinary => {
                data.cathegory = data.cathegory.toLowerCase()
                const { title, description, price, cathegory, location } = data

                return Product.create({ user: userId, title, description, price, cathegory, location, photos: urlsCloudinary })
            })
            .then(product => product.id)
    },

    
    /*****TODO: editProduct   */
    /****************** */

    /**
     * List info about a product by id. 
     * A user doesn't need to be logged in to access to the product, so any validation in user needs to be done
     * 
     * @param {ObjectId} productId 
     */
    // TODO don't show removed or expired products
    listProductById(productId) {
        return Promise.resolve()
            .then(() => {
                validate._objectId('product', productId)

                return Product.
                    findById(productId).
                    where('state').in(['sold', 'reserved', 'pending']).
                    populate({
                        path: 'user'
                        , select: 'email name surname photo products reviews'
                        , options: { lean: true}
                        , populate: {
                            path: 'products'
                            , select: 'state'
                            , where: { 'state': { '$in': ['sold', 'reserved', 'pending']}}
                            , options: { lean: true}
                        }
                    }).
                    lean()
            })
            .then(product => {
                if (!product) throw new LogicError(`product with id: ${productId} does not exist`)

                return this._parseProductItems(product)
            })
    },

    /**
     * Update state product to  'sold', 'reserved', 'pending', 'expired' or 'removed'
     * In case the "removed" state is passed, we still mantain the id from products array in User Schema.
     * We only do a "logical" removing while user exists
     * 
     * @param {ObjectId} userId
     * @param {ObjectId} productId
     * @param {String} state
     */
    updateStateProd(userId, productId, state) {
        return Promise.resolve()
            .then(() => {
                validate._objectId('user', userId)
                validate._objectId('product', productId)
                this._validateStateOptions('state', state)

                return User.findById(userId)
            })
            .then((user) => {
                if (!user) throw new LogicError(`user with id: ${userId} does not exist`)

                return Product.findById(productId)    
            })
            .then(product => {
                if (!product) throw new LogicError(`product with id ${productId} does not exist`)

                if (product.user.toString() !== userId) throw new LogicError('product does not belong to user')

                product.state = state

                return product.save()
            })
            .then(product => product.id)
    },

    /**
     * 
     * Remove a product permanently from the database, and also the id from products array in User Schema.
     * This method will be used only after a user is unregistered and eliminated
     * 
     * @param {ObjectId} userId 
     * @param {ObjectId} productId
     */
    // TODO: what happens with the reviews pointed to the user or the products that are no longer there?
    removeProd(userId, productId) {
        return Promise.resolve()
            .then(() => {
                validate._objectId('user', userId)
                validate._objectId('product', productId)

                return User.findById(userId)
            })
            .then((user) => {
                if (user) throw new LogicError(`user with id: ${userId} must be removed before deleting his products`)

                return Product.findById(productId)
            })
            .then(product => {
                if (!product) throw new LogicError(`product with id ${productId} does not exist`)

                if (product.user.toString() !== userId) throw new LogicError('product does not belong to user')

                return Product.deleteOne({ _id: productId })
            })
            .then(product => product.id)
    },


    incrementFavs(userId, productId) {
        return Promise.resolve()
            .then(() => {
                validate._objectId('user', userId)
                validate._objectId('product', productId)

                return User.findById(userId)
            })
            .then(user => {
                if (!user) throw new LogicError(`user with id: ${userId} does not exist`)

                return Product.findById(productId)
            })
            .then(product => {
                if (!product) throw new LogicError(`product with id ${productId} does not exist`)

                product.num_favs++

                return product.save()
            })
            .then(product => product.id)
    },

    decrementFavs(userId, productId) {
        return Promise.resolve()
            .then(() => {
                validate._objectId('user', userId)
                validate._objectId('product', productId)

                return User.findById(userId)
            })
            .then(user => {
                if (!user) throw new LogicError(`user with id: ${userId} does not exist`)

                return Product.findById(productId)
            })
            .then(product => {
                if (!product) throw new LogicError(`product with id ${productId} does not exist`)

                if (product.num_favs) product.num_favs--

                return product.save()
            })
            .then(product => product.id)
    },

    incrementViews(productId) {
        return Promise.resolve()
            .then(() => {
                validate._objectId('product', productId)

                return Product.findById(productId)
            })
            .then(product => {
                if (!product) throw new LogicError(`product with id ${productId} does not exist`)

                product.num_views++

                return product.save()
            })
            .then(product => product.id)
    },

    listFilteredProducts(filters) {
        return Promise.resolve()
            .then(() => {
                this._validateProductFilters(filters)

                const parsedFilters = this._buildQueryFilters(filters)

                return Product.
                            find(parsedFilters).
                            limit(40).
                            sort({ location: -1, updated_at: -1 }).
                            select({ title: 1, description: 1, photos: 1, state: 1, price: 1 }).
                            lean()
            })
            .then(products => {
                if (!products) throw new LogicError('undefined products after a filtered search')
                if (!products.length) return products

                const parsedProducts = products.map(product => this._parseProductItems(product))

                return parsedProducts
            })
    }
}

module.exports = productLogic