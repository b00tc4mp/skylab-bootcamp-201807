'use strict'

const validateEmail = require('../utils/validate-email')
const { User } = require('../data/models')
var uuid = require('uuid4')
const axios = require('axios')

const logic = {
    _users: null,

    _validateStringField(name, value){
        if(typeof value !== 'string' || !value.length) throw new LogicError (`invalid ${name}`)
    },

    _validateEmail(email){
        if(!validateEmail(email)) throw new LogicError(`invalid ${email}`)
    },

    _validateDateField(name, field) {
        if (!(field instanceof Date) || isNaN(field.valueOf())) throw new LogicError (`invalid ${name}`)
    },


    ///////////////
    //LOGIC USER//
    /////////////

    //REGISTER
    register(username, email, password){
        return Promise.resolve()
            .then(() =>{
                this._validateStringField('username', username)
                this._validateStringField('password', password)
                this._validateEmail(email)
                this._validateStringField('email', email)   

                return User.findOne({email})
            })
            .then(user =>{
                if (user) throw new LogicError (`user with ${email} email already exist`)
                const _user = {username, email, password}
                
                return User.create(_user)
            })
            .then(() => true)
    },

    //AUTHENTICATE USER
    authenticate(email, password){
        return Promise.resolve()
            .then(() => {
                this._validateStringField('email', email)
                this._validateEmail(email)
                this._validateStringField('password', password)

                return User.findOne({email})
            })
            .then(user => {
                if (!user || user.password !== password) throw new LogicError(`User does not exist or email and/or password invalid`)

                return true
            })
    },

    //UPDATE PASSWORD
    updatePassword(email, password, newPassword){
        return Promise.resolve()
            .then(() => {
                this._validateStringField('email', email)
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('newPassword', newPassword)

                return User.findOne({email})
            })
            .then(user => {
                if (!user) throw new LogicError(`This user ${user} doesnt exist`)
                if (user.password !== password) throw new LogicError('wrong password')
                if (password === newPassword) throw new LogicError('Hey, the new password must be different to old password')

                user.password = newPassword
                
                return user.save()
            })
            .then(() =>{
                return true
            })
    },

    //UNREGISTER USER
    unregisterUser(email, password) {
        return Promise.resolve()
            .then(() =>{
                this._validateEmail(email)
                this._validateStringField('email', email)
                this._validateStringField('password', password)

                return User.findOne({email})
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)
                if (user.password !== password) throw new LogicError('wrong password')

                return User.deleteOne({_id: user._id})
            })
            .then(() =>{
                return true
            })
    },


    ////////////////////
    //LOGIC PORTFOLIO//
    //////////////////

    //ADD A COIN TO PORTFOLIO
    addCoin(email, name, quantity, value, date){
        
        return Promise.resolve()
        .then(() => {
            
            this._validateEmail(email)
            this._validateStringField('name', name)
            
            return User.findOne({email})
        })
        .then(user => {
            
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                let coinId = uuid();
                
                let _coin = {name, quantity, date: date || Date.now(), value, coinId}
                
                user.portfolio.push(_coin)

                return user.save()
            })
            .then(() => {
                return true
            })
    },

    //LIST THE CURRENCIES OF THE PORTFOLIO
    listCoins(email){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)

                return User.findOne({email}).sort({'portfolio.date': 1})
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                return user.portfolio
            })
    },

    //UPDATE COIN AMOUNT
    updateCoin(email, coinId, newValue, newDate, newName, newQuantity){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                
                return User.findOne({email})
            })
            .then((user) => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                user.portfolio.forEach(coin => {
                    if(coin.coinId === coinId) {
                        coin.quantity = newQuantity
                        coin.value = newValue
                        coin.date = newDate
                        coin.name = newName
                    }
                })

                return user.save()
            })
            .then(() => true)
    },

    //REMOVE A COIN
    removeCoin(email, coinId) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)

                return User.findOne({email})
            })
            .then((user) => {
                if (!user) throw new LogicError(`user with ${user} email does not exist`)

                user.portfolio.forEach((coin, index, arr) => {
                    if(coin.coinId === coinId){
                        arr.splice(index, 1)
                    }
                })
                
                return user.save()
            })
            .then(() => true)
    },
    
    
    //////////////////////
    //COINMARKETCAP API//
    ////////////////////

    // GET MARKET COINS
    getCoins(limit) {
       return axios.get(`https://api.coinmarketcap.com/v1/ticker/?limit=${limit}`)
            .then(res => {
                return res.data
            })
            .then(res => {
                if (!res.data) throw new LogicError(`Something has failed, it was not possible to load the ${limit} cryptocurrencies, try later`)
            })
            .then(() => true)
    },

    ///////////////////////
    //CRYPTOCOMPARE API///
    /////////////////////

    //PORTFOLIO CKECK
    checkValidateCoin(symbol){
        return axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbol}&tsyms=USD`)
            .then(res => {
                const result = res.map((results) => {
                    const { symbol } = results
                    debugger
                    return symbol
                })
                .then(res => {
                    if (result.length) throw new LogicError(`query with ${name} failed`)
                })
                // return res.data
            })
    },
    // https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,BTC&tsyms=USD


    //COMPARE CURRENCIES
    getValue(coin, fiduciary){
        return axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=${fiduciary}`)
            .then(res => {
                return res.data
            })
            .then(res => {
                if (!res.data) throw new LogicError(`Something has failed, it was not possible to get the value: ${coin} vs ${fiduciary}, try later`)
            })
    },

    //GET CRYPTO NEWS
    //example site: cryptocompare, cointelegraph, coindesk
    getCryptoNews(site){
        return axios.get(`https://min-api.cryptocompare.com/data/v2/news/?feeds=${site}`)
            .then(res => {
                const cryptoNews = res.data.Data.map((news) => {

                    const {imageurl, title, url, body, source} = news

                    return { title, imageurl, url, body, source}
                })

                if(!cryptoNews.length) throw new LogicError(`Right now no news are available in this site: ${site}, try later`)
                
                return cryptoNews
            }) 
    }
}

class LogicError extends Error {
    constructor(message){
        super(message)
    }
}

module.exports = { logic, LogicError }