'use strict'

const logic = require('.')
const { expect } = require('chai')
const fs = require('fs')

describe('logic', () => {

    describe('register', () => {

        it('should register on valid credentials', () => {
            const username = 'sergio' + Math.random(), password = '123'
            return logic.registerUser(username,password)
                .then(message => {
                    expect(message).to.equal("user registered");
                }) 
        })
        it('should give an error of invalid username', () => {
            const username = '', password = '123'
            return logic.registerUser(username,password)
                .then(message => {
                    expect(message).to.equal("invalid username");
                }) 
        })
        it('should give an error', () => {
            const username = 'sergio' + Math.random(), password = ''
            return logic.registerUser(username,password)
                .then(message => {
                    expect(message).to.equal("invalid password");
                }) 
        })

        it('should give an error', () => {
            const username = '', password = ''
            return logic.registerUser(username,password)
                .then(message => {
                    expect(message).to.equal("invalid username");
                }) 
        })
    })

    describe('authenticate', () => {
        const username = 'sergio' + Math.random(), password = '123'

        beforeEach(() => {
            logic.registerUser(username,password)
        })

        it('should authenticate user', () => {
            
            return logic.authUser(username,password)
                .then(message => {
                    expect(message).to.equal("user authenticated");
                }) 
        })

        it('should give an error of username', () => {
            
            return logic.authUser('',password)
                .then(message => {
                    expect(message).to.equal("invalid username");
                }) 
        })
        it('should give an error of password', () => {
            
            return logic.authUser(username,'')
                .then(message => {
                    expect(message).to.equal("invalid password");
                }) 
        })
        it('should give an error of username and password', () => {
            
            return logic.authUser('','')
                .then(message => {
                    expect(message).to.equal("invalid username");
                }) 
        })

        it('should give an error of username and password', () => {
            
            return logic.authUser(username,'342')
                .then(message => {
                    expect(message).to.equal("wrong credentials");
                }) 
        })

        it('should give an error of username and password', () => {
            const username2= 'javito'
            return logic.authUser(username2,password)
                .then(message => {
                    expect(message).to.equal(`user ${username2} does not exist`);
                }) 
        })
    })

    // describe('listFiles', () => {
    //     const username = 'sergio' + Math.random(), password = '123'
    //     beforeEach(() => {
            
    //         logic.registerUser(username,password)
    //         logic.authUser(username,password)
    //     })

    //     it('Should return a files list', () => {
    //         return logic.listFiles(username)
    //             .then(res => {
    //                 expect(res).to.have.members([])
    //             })
    //     })
    // })

    // describe('deleteUserFiles', () => {
    //     const username = 'sergio' + Math.random(), password = '123'
    //     beforeEach(() => {
            
    //         logic.registerUser(username,password)
    //         logic.authUser(username,password)
    //     })

    //     it('Should delete files', () => {
    //         return logic.deleteUserFiles(username)
    //             .then(res => {
    //                 expect(message).to.equal("invalid username");
    //             })
    //     })
    // })
})