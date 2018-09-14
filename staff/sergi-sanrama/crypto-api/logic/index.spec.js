'use strict'

require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { User, Portfolio } = require('../data/models')

const { env: { MONGO_URL } } = process

describe('logic', () => {
    const name = 'bitcoin'
    const quantity = 10
    const value = 1000
    const date = new Date()

    const symbol = 'BTC'

    const username = 'sergi'
    const email = `sergi@gmail.com`
    const password = `1234`
    let _connection

    before(() =>
        mongoose.connect(MONGO_URL, {useNewUrlParser: true})
            .then(conn => _connection = conn)
            .then(console.log('mongoose connect'))
    )

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            // Portfolio.deleteMany()
        ])
    )

    true && describe('validate fields', () => {
       it('should succeed on correct value', () => {
            expect(() => logic._validateStringField('username', username).to.equal(username))
            expect(() => logic._validateStringField('email', email).to.equal(email))
            expect(() => logic._validateStringField('password', password).to.equal(password))
        })

        it('should fail on undefined value', () => {
            expect(() => logic._validateStringField('username', undefined)).to.throw(`invalid username`)
            expect(() => logic._validateStringField('email', undefined)).to.throw(`invalid email`)
            expect(() => logic._validateStringField('password', undefined)).to.throw(`invalid password`)
        })

        it('should fail on empty value', () => {
            expect(() => logic._validateStringField('username', '')).to.throw(`invalid username`)
        })

        it('should fail on numeric value', () => {
            expect(() => logic._validateStringField('username', 123)).to.throw(`invalid username`)
        })
    })

    true && describe('register user', () => {
        it('should register correctly', () =>
            User.findOne({email})    
                .then(user => {
                    expect(user).to.be.null
                    return logic.register(username, email, password)
                })
                .then(() =>
                    User.findOne({email})    
                )
                .then(user => {
                    expect(user).to.exist
                    expect(user.username).to.equal(username)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                })
        )

        it('should fail on trying to register an already registered user', () =>
            User.create({ username, email, password })
                .then(() => logic.register(username, email, password))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user with ${email} email already exist`))
        )

        it('should fail on trying to register with an undefined email', () =>
        logic.register(username, undefined, password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid ${undefined}`))
        )

        it('should fail on trying to register with an empty email', () =>
        logic.register(username, '', password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid ${email}`))
        )

        it('should fail on trying to register with a numeric email', () =>
        logic.register(username, 123, password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid ${email}`))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.register(username, email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.register(username, email, 123456)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.register(username, email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.register(username, email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid ${name}`))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.register(username, email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid ${name}`))
        )

        it('should fail on trying to register with an empty username', () =>
        logic.register('', email, password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to register with an numeric username', () =>
        logic.register(123, email, password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to register with an numeric username', () =>
        logic.register(undefined, email, password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

    })

    true && describe('authenticate user', () =>{
        beforeEach(() => User.create({username, email, password }))

        it('should authenticate correctly', () =>
            logic.authenticate(email, password)
                .then(res => {
                    expect(res).to.be.true
                })
        )

        it('should fail on trying login with a undefined email', () => {
            return logic.authenticate(undefined, password)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid email'))
        })

        it('should fail on trying to login with an empty email', () =>
            logic.authenticate(username, '', password)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`invalid ${email}`))
        )

        it('should fail on trying to login with a numeric email', () =>
            logic.authenticate(username, 123, password)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal(`User does not exist or email and/or password invalid`))
        )
    })

    
    true && describe('add coin', () => {
        beforeEach(() => User.create({username, email, password}))
        
        it('should add coin correctly', () => {
            return logic.addCoin(email, name, quantity, value)
            .then(res =>{
                expect(res).to.be.true

                return User.findOne({email})
            })
            .then(user => {
                expect(user.portfolio.length).to.equal(1)
                    expect (user.portfolio[0].name).to.equal(name)
                    expect (user.portfolio[0].quantity).to.equal(quantity)
                    expect (user.portfolio[0].value).to.equal(value)
                })
            })
            
        it('should fail on trying to add a coin with a undefined quantity', () =>{
            return logic.addCoin(email, name, undefined, value)
            .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`Quantity undefined must be a valid number`))
            })
        })

        true && describe('list coins', () => {
            beforeEach(() => 
            User.create({username, email, password})
            .then(user => {
                    const coin1 = { name, value, date: new Date('2018-09-02'), quantity }
                    const coin2 = { name, value, date, quantity }
                    user.portfolio.push(coin1, coin2)
                    
                    return user.save()
                })
        )
        
        it('should list correctly', () => {
            
            return logic.listCoins(email)
            .then(coins => {
                
                })
            })
        })


        true && describe('update coin quantity', () => {
            const coinId = "123456"
            const newDate = new Date()
        const newValue = 5000
        const newName = "ETH"
        const newQuantity = 15
        beforeEach(() => {
            return User.create({username, email, password, portfolio: {name, quantity, value, date, coinId}})
        })

        it('should update a coin correctly', () =>{
            return logic.updateCoin(email, coinId, newValue, newDate, newName, newQuantity)
                .then(res => {
                    expect(res).to.be.true
                    
                    return User.findOne({email})
                })
                .then(user => {
                    expect(user.portfolio.length).to.equal(1)
                    expect(user.portfolio[0].quantity).to.equal(newQuantity)
                    expect(user.portfolio[0].name).to.equal(newName)
                    expect(user.portfolio[0].value).to.equal(newValue)
                    expect(user.portfolio[0].date).to.deep.equal(newDate)
                })
        })
    })
    
    true && describe('remove coin', () => {
        const coinId = "123456"
        beforeEach(() => {
            return User.create({username, email, password, portfolio: {name, quantity, value, date, coinId}})
        })
        
        it('should remove coin correctly', () => {
            return logic.removeCoin(email, coinId)
                .then(res => {
                    expect(res).to.be.true
                })
            })
    })
    
    
    // Api's//
    
    true && describe('get coin', () => {
        it('retrieve coins correctly', () => {
            return logic.getCoins()
            .then(res => {
                expect(res).to.be.true
            })
        })
    })

    true & describe('get global crypto market data', () => {
        it ('retrieve data correctly', () => {
            return logic.getGlobalMarketData()
            .then(res => {
                expect(res).to.be.true
            })
        })
    })

    
    true && describe('get crypto news', () => {
        it('retrieve news correctly', () =>{
            return logic.getCryptoNews('cointelegraph')
            .then(res => {
                expect(res).to.exist
            })
        })
    })

    true && describe('check symbol correctly', () => {
        it('retrieve symbol correctly', () => {
            return logic.checkValidateCoin(symbol)
            .then(res => {
                expect(res).to.exist
            })
        })
    })
    
    true && describe('get global stats crypto correctly', () => {
        it('retrieve global stats correctly', () => {
            return logic.getGlobalStats()
            .then(res =>  {
                expect(res).to.exist
            })
        })
    })
    
    !true && describe('update user', () =>{
        const newPassword = `${password} 123-${Math.random()}`
        
        beforeEach(() => User.create({username, email, password}))
        
        it('should update password correctly', () => {
            return logic.updatePassword(email, password, newPassword)
            .then(res => {
                expect(res).to.be.true
                return User.findOne({email})
            })
            .then(user => {
                expect(user).to.exist
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(newPassword)
            })
        })
        
        it('should fail on trying update password with an undefined email', () =>{
            return logic.updatePassword(undefined, password, newPassword)
            .catch(err => err)
            .then(({message}) => expect(message).to.equal('invalid email')) 
        })
    })
    
    !true && describe('unregister user', () => {
        beforeEach(() => User.create({username, email, password}))
        
        it('should unregister user correctly', () =>{
            return logic.unregisterUser(email, password)
            .then(res => {
                expect(res).to.be.true
                
                return User.findOne({email})
            })
            .then(user => {
                expect(user).not.to.exist
            })
        })
        
        it('should fail on trying to unregister user with an undefined email', () =>{
            return logic.unregisterUser(undefined, password)
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal(`invalid email`))
        })
    })
    
    after(() =>
    Promise.all([
        User.deleteMany(),
        // Portfolio.deleteMany()
    ])
            .then(() => _connection.disconnect())
            .then(console.log('mongoose disconnect'))
            )
})