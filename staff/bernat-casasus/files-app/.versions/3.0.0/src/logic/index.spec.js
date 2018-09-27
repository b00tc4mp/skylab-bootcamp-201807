'use strict'

const logic = require('.')
const { expect } = require('chai')


describe('logic', () => {
    const username = 'jack'+Math.random(), password = '123', wrongUsername= ' '

    describe('register', () => {
        it('should register on valid credentials', () => {
           return logic.resgisterUser(username, password)
            .then(message => expect(message).to.be.equal('user registered'))
        })

        it('should fail on repeted credentials', () => {
            return logic.resgisterUser(username, password)
             .then(message => expect(message).to.be.equal(`user ${username} already exists`))
         })


    })

    describe('login', () => {
        it('should auth on valid credentials', () => {
            return logic.authUser(username, password)
            .then(message => expect(message).to.be.equal('user authenticated'))
        })

        it('should fail on invalid username', () => {
            return logic.authUser(123, password)
             .then(message => expect(message).to.be.equal('invalid username'))
         })

        it('should fail on wrong type', () => {
            return logic.authUser(username, 321)
             .then(message => expect(message).to.be.equal('invalid password'))
         })

         it('should fail on wrong credentials', () => {
            return logic.authUser(username, "321")
             .then(message => expect(message).to.be.equal('wrong credentials'))
         })

        it('should fail on unexistent user', () => {
            return logic.authUser("ygd", password)
             .then(message => expect(message).to.be.equal('user ygd does not exist'))
         })
    })

    // describe('upload', () => {
    //     it('should upload a file', () => {
    //         return logic.resgisterUser(username, password)
    //         .then(message => expect(message).to.be.equal('user registered'))
    //     })

    //     // it('should fail on repeted credentials', () => {
    //     //     logic.resgisterUser(username, password)
    //     //      .then(message => expect(message).to.be.equal(`user ${username} already exists`))
    //     //  })


    // })
})

