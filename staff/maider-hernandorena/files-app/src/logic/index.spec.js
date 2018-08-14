'use strict'
const logic = require('.')
const {expect} = require('chai')

describe('logic', () => {
    
    describe('register', () => {

        const username = 'Maider' + Math.random(), password = "123"

        it('should register on valid credentials',() =>{
            return logic.register(username, password).then(res => {
                // expect(username).to.equal(username)
                expect(res).to.equal('user registered')
            })
        })
    })

    describe('login', () => {

        const username = 'Maider' + Math.random(), password = "123"

        it('should login corretly',() =>{
            return logic.register(username, password)
                .then(() => logic.login(username, password))
                .then(res => {               
                    expect(logic._userUsername).to.equal(username)
                    expect(res).to.equal('user authenticated')
                })
        })
    })

    describe('upload file', () => {
        const username = 'Maider' + Math.random(), password = "123"
        const file = 'text.txt'

        beforeEach('should be registered and logged in', () => {
            return logic.register(username, password)
                .then(() => logic.login(username, password))
                .then(res => {               
                    expect(logic._userUsername).to.equal(username)
                    expect(res).to.equal('user authenticated')
                })
        })
        it('should upload file correctly', () => {
            return logic.uploadFile(username, file)
                .then(res => {
                    expect(res).to.be.exist()
                })
        })
    })

    // describe('download file', () => {

    //     const username = 'Maider' + Math.random(), password = "123"
    //     const file = 'text.txt'

    //     beforeEach('should be registered and logged in', () => {
    //         return logic.register(username, password)
    //             .then(() => logic.login(username, password))
    //             .then(res => {               
    //                 expect(logic._userUsername).to.equal(username)
    //                 expect(res).to.equal('user authenticated')
    //             })
    //     })

    //     it('should download file correctly',() =>{
    //         return logic.downloadFile(username, file)
    //             .then(res => {
    //                 expect(res).to.equal('text.txt')
    //             })
    //     })
    // })
})