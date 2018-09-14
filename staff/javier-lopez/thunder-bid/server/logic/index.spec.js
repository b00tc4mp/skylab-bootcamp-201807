'use strict'
require('dotenv').config()


const { logic } = require('.')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { models: { Product, User, Bid } } = require('../data')


const { env: { MONGO_URL } } = process

describe('logic', () => {
    let _connection

    const email = 'javier@gmail.com', password = '123', name = 'Javi', surname = 'Lopez', role = 'client'

    before(() =>
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )


    beforeEach(() => {
        return Promise.all([Product.remove(), User.remove(), Bid.remove()])
    })

    !true && describe('register user', () => {
        it('should register correctly', () =>
            User.findOne({ email })
                .then(user => {
                    expect(user).to.be.null

                    return logic.register(email, password, name, surname)
                })
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    return User.find()
                })
        )

        it('should fail on trying to register an already registered user', () =>
            User.create({ email, password, name, surname })
                .then(() => {
                    return logic.register(email, password, name, surname)
                })
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`${email} already exists`))
        )

        it('should fail on trying to register with an undefined email', () =>
            logic.register(undefined, password, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to register with an empty email', () =>
            logic.register('', password, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to register with a numeric email', () =>
            logic.register(123, password, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to register with a space as email', () =>
            logic.register(' ', password, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to register with a space on the start of the email', () =>
            logic.register(' ' + email, password, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to register with a space on the end of the email', () =>
            logic.register(email + ' ', password, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.register(email, undefined, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.register(email, '', name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.register(email, 123, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to register with a space as password', () =>
            logic.register(email, ' ', name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to register with a space at the begining of the password', () =>
            logic.register(email, ' ' + password, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to register with a space at the end of the password', () =>
            logic.register(email, password + ' ', name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )


        it('should fail on trying to register with an undefined name', () =>
            logic.register(email, password, undefined, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid name'))
        )

        it('should fail on trying to register with an empty name', () =>
            logic.register(email, password, '', surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid name'))
        )

        it('should fail on trying to register with a numeric name', () =>
            logic.register(email, password, 123, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid name'))
        )

        it('should fail on trying to register with a space as name', () =>
            logic.register(email, password, ' ', surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid name'))
        )

        it('should fail on trying to register with a space at the begining of the name', () =>
            logic.register(email, password, ' ' + name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid name'))
        )

        it('should fail on trying to register with a space at the end of the name', () =>
            logic.register(email, password, name + ' ', surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid name'))
        )


        it('should fail on trying to register with an undefined surname', () =>
            logic.register(email, password, name, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid surname'))
        )

        it('should fail on trying to register with an empty surname', () =>
            logic.register(email, password, name, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid surname'))
        )

        it('should fail on trying to register with a numeric surname', () =>
            logic.register(email, password, name, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid surname'))
        )

        it('should fail on trying to register with a space as surname', () =>
            logic.register(email, password, name, ' ')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid surname'))
        )

        it('should fail on trying to register with a space at the begining of the surname', () =>
            logic.register(email, password, name, ' ' + surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid surname'))
        )

        it('should fail on trying to register with a space at the end of the surname', () =>
            logic.register(email, password, name, surname + ' ')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid surname'))
        )

    })

    !true && describe('authenticate', () => {
        const notExistingEmail = 'jlb@gmail.com', incorrectPassword = '123456', email = 'javier@gmail.com', password = '123', name = 'Javi', surname = 'Lopez'


        beforeEach(() => User.create({ email, password, name, surname }))

        it('should login correctly', () =>
            logic.authenticate(email, password)
                .then(res => {
                    expect(res.email).to.equal(email)
                    expect(res.name).to.equal(name)
                    expect(res.surname).to.equal(surname)
                })
        )

        it('should fail on trying to login with an undefined email', () =>
            logic.authenticate(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to login with an empty email', () =>
            logic.authenticate('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to login with a numeric email', () =>
            logic.authenticate(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to login with a username', () =>
            logic.authenticate('jlb', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to login with a space as email', () =>
            logic.authenticate(' ', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on trying to login with a not existing email', () =>
            logic.authenticate(notExistingEmail, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`${notExistingEmail} does not exists`))
        )

        it('should fail on trying to login with an undefined password', () =>
            logic.authenticate(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login with an empty password', () =>
            logic.authenticate(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login with a numeric password', () =>
            logic.authenticate(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login without a string as a password', () =>
            logic.authenticate(email, ' ')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        )

        it('should fail on trying to login with an incorrect password', () =>
            logic.authenticate(email, incorrectPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('wrong password'))
        )

    })

    !true && describe('list user bids', () => {
        const user = new User({ email, password, role, name, surname })

        const bid = new Bid({ price: 500, date: new Date(), user: user._id })
        const bid2 = new Bid({ price: 690, date: new Date(), user: user._id })

        const product = new Product({
            title: 'Thanos infinity gauntlet',
            description: 'Original gauntlet used on the movie infinity war, with all the infinite stones',
            initialDate: '2018-08-27T10:18:00',
            finalDate: '2018-08-30T10:18:00',
            initialPrice: 800,
            closed: false,
            image: 'https://i.pinimg.com/originals/fb/c3/9a/fbc39a8147a728afd55f7fb21154d605.png',
            category: 'Marvel',
            bids: [bid, bid2]
        })

        const product2 = new Product({
            title: 'Marshmello',
            description: 'Original head used on tomorrowland',
            initialDate: '2018-08-27T10:18:00',
            finalDate: '2018-08-30T10:18:00',
            initialPrice: 800,
            closed: false,
            image: 'https://i.pinimg.com/originals/fb/c3/9a/fbc39a8147a728afd55f7fb21154d605.png',
            category: 'Marvel',
            bids: [bid]
        })

        user.bidded.push(product._id, product2._id)

        beforeEach(() =>
            Promise.all([
                user.save(),
                bid.save(),
                product.save(),
                product2.save()
            ])
        )

        it('should list user products correctly', () => {
            const id = user._id.toString()
            return logic.listUserBiddedProducts(id)
                .then(products => {

                    expect(products[0].title).to.equal('Thanos infinity gauntlet')
                    expect(products[0].closed).to.be.false
                    expect(products[0].initialPrice).to.equal(800)
                })
        })

        it('should fail at showing user products of a user that does not exist', () => {
            return logic.listUserBiddedProducts('5b87d9c92b4f452dc8500d26')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user does not exist`))
        })
    })

    !true && describe('list user wishes', () => {
        const user = new User({ email, password, role, name, surname })

        const product = new Product({
            title: 'Thanos infinity gauntlet',
            description: 'Original gauntlet used on the movie infinity war, with all the infinite stones',
            initialDate: '2018-08-27T10:18:00',
            finalDate: '2018-08-30T10:18:00',
            initialPrice: 800,
            closed: false,
            image: 'https://i.pinimg.com/originals/fb/c3/9a/fbc39a8147a728afd55f7fb21154d605.png',
            category: 'Marvel',
            bids: []
        })

        user.wishes.push(product._id)


        beforeEach(() =>{
            Promise.all([
                user.save(),
                product.save()
            ])
    })

        it('should list user products correctly', () => {
            const id = user._id.toString()
            return logic.listUserWishes(id)
                .then(products => {
                    expect(products[0].title).to.equal('Thanos infinity gauntlet')
                    expect(products[0].closed).to.be.false
                    expect(products[0].initialPrice).to.equal(800)
                })
        })
    })

    !true && describe('list all products', () => {
        const product = new Product({
            title: 'Thanos infinity gauntlet',
            description: 'Original gauntlet used on the movie infinity war, with all the infinite stones',
            initialDate: '2018-08-27T10:18:00',
            finalDate: '2018-10-30T10:18:00',
            initialPrice: 800,
            closed: false,
            image: 'https://i.pinimg.com/originals/fb/c3/9a/fbc39a8147a728afd55f7fb21154d605.png',
            category: 'Marvel',
            bids: []
        })

        beforeEach(() =>
            Promise.resolve()
                .then(() => product.save())
        )

        it('should succeed on correct data', () =>
            logic.listProducts(undefined, 'Marvel')
                .then(products => {
                    expect(products[0].title).to.equal('Thanos infinity gauntlet')
                    expect(products[0].closed).to.be.false
                    expect(products[0].initialPrice).to.equal(800)
                })
        )

        it('should fail on space as a query', () =>
            logic.listProducts(' ')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid query'))
        )

        it('should fail on a query starting with a space', () =>
            logic.listProducts(' thanos')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid query'))
        )

        it('should fail on a query that does not exist', () =>
            logic.listProducts('almendruco')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('products not found'))
        )

        it('should fail on a category without products', () =>
            logic.listProducts(undefined, 'Music')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('products not found'))
        )
    })

    !true && describe('retrieve product', () => {
        const product = new Product({
            title: 'Thanos infinity gauntlet',
            description: 'Original gauntlet used on the movie infinity war, with all the infinite stones',
            initialDate: '2018-08-27T10:18:00',
            finalDate: '2018-08-30T10:18:00',
            initialPrice: 800,
            closed: false,
            image: 'https://i.pinimg.com/originals/fb/c3/9a/fbc39a8147a728afd55f7fb21154d605.png',
            category: 'Marvel',
            bids: []
        })

        beforeEach(() =>
            Promise.resolve()
                .then(() => product.save())
        )

        it('should succeed on correct data', () => {
            const productId = product._id.toString()
            logic.retrieveProduct(productId)
                .then(products => {
                    expect(products.title).to.equal('Thanos infinity gauntlet')
                    expect(products.closed).to.be.false
                    expect(products.initialPrice).to.equal(800)
                })
        })

        it('should fail on space as id', () =>
            logic.retrieveProduct(' ')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid product id'))
        )


    })

    !true && describe('retrieve user', () => {
        const user = new User({ email, password, role, name, surname })

        beforeEach(() =>
            Promise.resolve()
                .then(() => user.save())
        )

        it('should succeed on correct data', () => {
            const userId = user._id.toString()
            logic.retrieveUser(userId)
                .then(user => {
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.role).to.equal(role)
                })
        })

        it('should fail on space as id user', () =>
            logic.retrieveUser(' ')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid user id'))
        )


    })

    !true && describe('add bid', () => {

        const user = new User({ email, password, role, name, surname })
        const bid = new Bid({ price: 900, date: new Date(), user: user._id })
        const product = new Product({
            title: 'Thanos infinity gauntlet',
            description: 'Original gauntlet used on the movie infinity war, with all the infinite stones',
            initialDate: '2018-08-27T10:18:00',
            finalDate: '2018-08-30T10:18:00',
            initialPrice: 800,
            closed: false,
            image: 'https://i.pinimg.com/originals/fb/c3/9a/fbc39a8147a728afd55f7fb21154d605.png',
            category: 'Marvel',
            bids: [bid]
        })

        const idUser = user._id.toString()
        const idProduct = product._id.toString()

        beforeEach(() => {
            user.isNew=true
            product.isNew=true
            bid.isNew=true

            return Promise.all([
                user.save(),
                bid.save(),
                product.save()
            ])
        })
        

        it('should add a bid', () => {
            return logic.addBid(idProduct, idUser, 1000)
                .then(res => {
                    expect(res).to.be.true
                    return User.findOne({ '_id': idUser })
                })
                .then(res => {
                    expect(res.bidded.length).to.equal(1)
                })
        })

        it('should fail with a string as a price', () => {
            return logic.addBid(idProduct, idUser, '1000')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('the value is not a number'))
        })

        it('should fail with a space as a price', () => {
            return logic.addBid(idProduct, idUser, ' ')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('the value is not a number'))
        })

        it('should fail with a lower price', () => {
            return logic.addBid(idProduct, idUser, 100)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('the price of the bid should be higher than the current price'))

        })

        it('should fail with an empty price', () => {
            return logic.addBid(idProduct, idUser, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('the value is not a number'))

        })

        it('should fail with bidding with the same current price', () => {
            return logic.addBid(idProduct, idUser, 900)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('the price of the bid should be higher than the current price'))

        })
    })

    !true && describe('add wish', () => {
        const user = new User({ email, password, role, name, surname })
        const product = new Product({
            title: 'Thanos infinity gauntlet',
            description: 'Original gauntlet used on the movie infinity war, with all the infinite stones',
            initialDate: '2018-08-27T10:18:00',
            finalDate: '2018-08-30T10:18:00',
            initialPrice: 800,
            closed: false,
            image: 'https://i.pinimg.com/originals/fb/c3/9a/fbc39a8147a728afd55f7fb21154d605.png',
            category: 'Marvel',
            bids: []
        })

        const idUser = user._id.toString()
        const idProduct = product._id.toString()

        beforeEach(() => {
            user.isNew=true
            product.isNew=true

            return Promise.all([
                user.save(),
                product.save()
            ])
        })

        it('should add a wish', () => {
            return logic.addWish(idProduct, idUser)
                .then(res => {
                    expect(res).to.be.true
                    return User.findOne({ '_id': idUser })
                })
                .then(res => {
                    expect(res.wishes.length).to.equal(1)
                })
        })

        
        it('should fail at adding the same product two times', () => {
            return logic.addWish(idProduct, idUser)
                .then(() => {
                    return logic.addWish(idProduct, idUser)
                })
                .catch(res => res)
                .then(({ message }) => expect(message).to.equal('you cannot add a product twice to de wish list'))
        })
    })

    !true && describe('delete wish', () => {
        const product = new Product({
            title: 'Thanos infinity gauntlet',
            description: 'Original gauntlet used on the movie infinity war, with all the infinite stones',
            initialDate: '2018-08-27T10:18:00',
            finalDate: '2018-08-30T10:18:00',
            initialPrice: 800,
            closed: false,
            image: 'https://i.pinimg.com/originals/fb/c3/9a/fbc39a8147a728afd55f7fb21154d605.png',
            category: 'Marvel',
            bids: []
        })
        const user = new User({ email, password, role, name, surname, wishes: [product._id]})

        beforeEach(() => {
            user.isNew=true
            product.isNew=true

            return Promise.all([
                user.save(),
                product.save()
            ])
        })

        const productId = product._id.toString()
        const userId = user._id.toString()

        it('should delete a wish correctly', () => 
            logic.deleteWish(productId, userId)
                .then(res =>{ 
                    expect(res).to.be.true
                    return User.findOne({ '_id' : userId})
                })
                .then(user =>
                    expect(user.wishes.length).to.equal(0)
                )
        )

        it('should fail at deleting a wish that does not exist', () => 
            logic.deleteWish(productId, userId)
                .then(() => 
                    logic.deleteWish(productId, userId)
                )
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('you cannot delete a product that is not in your wish list'))
        )
    })

    after(() =>
        /*Promise.all([
            Product.deleteMany(),
            User.deleteMany()
        ])
        .then(() =>*/ _connection.disconnect()//)
    )

})