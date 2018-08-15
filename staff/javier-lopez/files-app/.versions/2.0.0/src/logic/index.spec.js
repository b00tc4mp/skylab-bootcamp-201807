'use strict'

const logic = require('.')
const {expect} = require('chai')


describe('users logic', () => {
    describe('register user', () => {
        
        it('should register a user', () => {
            const username = 'jack'+ Math.random(), password = '123'
            return logic.registerUser(username, password)
                .then(message =>{
                    expect(message).to.be.equal('user registered')
                } )
        })

        it('should give an error of invalid username', () => {
            const username = '', password = '123'
            return logic.registerUser(username, password)
                .then(message =>{
                    expect(message).to.be.equal('invalid username')
                } )
        })

        it('should give an error of invalid password', () => {
            const username = 'jack'+ Math.random(), password = ''
            return logic.registerUser(username, password)
                .then(message =>{
                    expect(message).to.be.equal('invalid password')
                } )
        })

        it('should give an error of invalid username', () => {
            const username = '', password = ''
            return logic.registerUser(username, password)
                .then(message =>{
                    expect(message).to.be.equal('invalid username')
                } )
        })


    })
    
    describe('auth user', () => {       
        const username = 'jack'+ Math.random(), password = '123'
        beforeEach(() => {
            logic.registerUser(username, password)
        })

        it('should authenticate a user', () => {
            return logic.authUser(username, password)
                .then(message =>{
                    expect(message).to.be.equal('user authenticated')
                } )
        })

        it('should give an error of username', () => {
            return logic.authUser('', password)
                .then(message =>{
                    expect(message).to.be.equal('invalid username')
                } )
        })

        it('should give an error of password', () => {
            return logic.authUser(username, '')
                .then(message =>{
                    expect(message).to.be.equal('invalid password')
                } )
        })

        it('should give an error of username and password', () => {
            return logic.authUser('', '')
                .then(message =>{
                    expect(message).to.be.equal('invalid username')
                } )
        })
        
        it('should give an error of password', () => {
            return logic.authUser(username, '456')
                .then(message =>{
                    expect(message).to.be.equal('wrong credentials')
                } )
        })

        it('should give an error of password', () => {
            const user = 'pepe'
            return logic.authUser(user, password)
                .then(message =>{
                    expect(message).to.be.equal(`user ${user} does not exist`)
                } )
        })
    })

    // describe('list files', () => {
    //     const username = 'jack'+ Math.random(), password = '123'
    //     beforeEach(() => {
    //         logic.registerUser(username, password)
    //         logic.authUser(username, password)
    //     })
    //     it('should return list of files', () => {
    //         logic.listFiles(username)
    //             .then(res => {
    //                 expect(res).to.have.members([])
    //             })
    //     })
    // })
})