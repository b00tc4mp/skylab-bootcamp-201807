const { Product, User, Bid } = require('../data/models')
const { validate } = require('../utils/validate')

const logic = {
    /**
     * Registers a new user in the database.
     * 
     * @param {string} email 
     * @param {string} password 
     * @param {string} name 
     * @param {string} surname 
     * 
     */
    register(email, password, name, surname) {
        return Promise.resolve()
            .then(() => {
                validate._validateEmail(email)
                validate._validateStringField('password', password)
                validate._validateStringField('name', name)
                validate._validateStringField('surname', surname)

                return User.findOne({ email })
            })
            .then(user => {
                if (user) throw new Error(`${email} already exists`)

                return User.create({ email, password, name, surname })
            })
            .then(() => true)
    },

    /**
     * Allows you to retrieve a userId of a user.
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     */
    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                validate._validateEmail(email)
                validate._validateStringField('password', password)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new Error(`${email} does not exists`)
                if (user.password !== password) throw new Error('Wrong password')

                return user
            })
    },

    /**
     * Allows you to retrieve all bids of a user.
     * 
     * @param {string} userId 
     * 
     */
    listUserBiddedProducts(userId) {
        return Promise.resolve()
            .then(() => {
                validate._validateStringField('id user', userId)

                return User.findOne({ '_id': userId }).populate('bidded')
            })
            .then(user => {
                if (!user) throw new Error(`user does not exist`)
                if (!user.bidded.length) throw new Error('this user did not make any bid')


                return user.bidded.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj['title']).indexOf(obj['title']) === pos;
                });

                // return user.bidded
            })
    },

    /**
     * Allows you to retrieve all wishes of a user.
     * 
     * @param {string} userId 
     * 
     */
    listUserWishes(userId) {
        return Promise.resolve()
            .then(() => {
                validate._validateStringField('id user', userId)

                return User.findOne({ '_id': userId }).populate('wishes')
            })
            .then(user => {
                if (!user) throw new Error(`user does not exist`)
                if (!user.wishes.length) throw new Error('this user did not add any wish')

                return user.wishes
            })
    },

    /**
     * Allows you to retrieve products by query and category.
     * If you don't give any param it will show all products.
     * 
     * @param {string} query optional
     * @param {string} category optional 
     * 
     */
    listProducts(query, category) {
        return Promise.resolve()
            .then(() => {
                let filter = {}

                if (query) {
                    validate._validateQueryString('query', query)

                    filter.title = {
                        $regex: query,
                        $options: 'i'
                    }
                }
                if (category) {
                    validate._validateStringField('category', category)
                    filter.category = category
                }
                return Product.find({ finalDate: { $lt: Date.now() } })
                    .then(res => {
                        res.forEach(product => {
                            return Product.findByIdAndUpdate(product._id.toString(), { closed: true })
                                .then(res => res)
                        })
                    })
                    .then(() => {
                        return Product.find(filter, { __v: 0 }, {
                            sort: {
                                finalDate: 1
                            }
                        })
                            .then(products => {
                                if (!products.length) throw new Error(`products not found`)
                                return products
                            })
                    })
            })
    },

    /**
     * Allows you to retrieve product details.
     * 
     * @param {string} productId 
     * 
     */
    retrieveProduct(productId) {
        return Promise.resolve()
            .then(() => Product.find({ finalDate: { $lt: Date.now() } })
                .then(res => {
                    res.forEach(product => {
                        return Product.findByIdAndUpdate(product._id.toString(), { closed: true })
                            .then(res => res)
                    })
                }))
            .then(() => {
                validate._validateStringField('product id', productId)

                return Product.findOne({ '_id': productId })
            })
            .then(product => {
                if (!product) throw new Error('product does not exist')
                debugger
                delete product._id

                return product
            })
    },

    /**
     * Allows you to retrieve user details.
     * 
     * @param {string} idUser 
     * 
     */
    retrieveUser(idUser) {
        return Promise.resolve()
            .then(() => {
                validate._validateStringField('user id', idUser)

                return User.findOne({ '_id': idUser }, { __v: 0, _id: 0 })
            })
            .then(user => {
                if (!user) throw new Error('user does not exist')

                delete user._id

                return user
            })
    },

    /**
     * Allows you to add a bid.
     * 
     * @param {string} productId 
     * @param {string} userId 
     * @param {number} price 
     * 
     */
    addBid(productId, userId, price) {
        return Promise.resolve()
            .then(() => {
                validate._validateStringField('product id', productId)
                validate._validateStringField('user id', userId)
                validate._validateNumber(price)
                return User.findOne({ '_id': userId })
                    .then(user => {
                        if (!user) throw Error(`no user found with this id`)

                        return Product.find({ finalDate: { $lt: Date.now() } })
                                .then(res => {
                                    res.forEach(product => {
                                        return Product.findByIdAndUpdate(product._id.toString(), { closed: true })
                                            .then(res => res)
                                    })
                                })
                            .then(() => Product.findOne({ '_id': productId })) 
                            .then(productMatch => {
                                if (!productMatch) throw Error(`no product found with id`)
                                if (productMatch.closed) throw Error('Product closed')
                                let minPrice
                                if (productMatch.bids.length) minPrice = productMatch.bids[productMatch.bids.length - 1].price
                                else minPrice = productMatch.initialPrice
                                if (minPrice >= price) throw Error('The price of the bid should be higher than the current price')

                                const bid = new Bid({ price, date: Date.now(), user: userId })

                                return Product.findByIdAndUpdate(productId, { $push: { bids: bid } })
                                    .then(() => {
                                        user.bidded.push(productId)
                                        return user.save()
                                    })
                            })
                            .then(() => true)
                    })
            })
    },

    /**
     * Allows you to add a wish.
     * 
     * @param {string} productId 
     * @param {string} userId 
     * 
     */
    addWish(productId, userId) {
        return Promise.resolve()
            .then(() => {
                validate._validateStringField('product id', productId)
                validate._validateStringField('user id', userId)

                return User.findOne({ '_id': userId })
                    .then(user => {
                        if (!user) throw Error(`no user found with this id`)

                        return Product.findOne({ '_id': productId })
                            .then(productMatch => {
                                if (!productMatch) throw Error(`no product found with id`)
                                if (productMatch.closed) throw Error('Product closed')
                                if (user.wishes.indexOf(productMatch._id) != -1) throw Error('You cannot add a product twice to de wish list')
                                user.wishes.push(productMatch._id)
                                return user.save()
                            })
                            .then(() => true)
                    })
            })
    },

    /**
     * Allows you to delete a wish.
     * 
     * @param {string} productId 
     * @param {string} userId 
     * 
     */
    deleteWish(productId, userId) {
        return Promise.resolve()
            .then(() => {
                validate._validateStringField('product id', productId)
                validate._validateStringField('user id', userId)

                return User.findOne({ '_id': userId })
                    .then(user => {
                        if (!user) throw Error(`no user found with this id`)
                        return Product.findOne({ '_id': productId })
                            .then(productMatch => {
                                if (!productMatch) throw Error(`no product found with id`)
                                if (user.wishes.indexOf(productId) < 0) throw Error('You cannot delete a product that is not in your wish list')

                                let idPosition = user.wishes.indexOf(productId)
                                user.wishes.splice(idPosition, 1)

                                return user.save()
                            })
                            .then(() => true)
                    })
            })
    }

}


module.exports = { logic }