'use strict'

const logic = require('.')
const { expect } = require('chai')

describe('logic', () => {
    beforeEach(() => {
        logic.users = {}
    })

    describe('register', () => {
        const username = 'jack', password = '123'

        it('should register', () => {
            expect(logic.users[username]).not.to.exist

            logic.register(username, password)

            const user = logic.users[username]

            expect(user).to.exist
            expect(user.password).to.equal(password)
        })

        it('should thow a register error', () => {
            expect(logic.users[username]).to.exist
            let error
            try{
                logic.register(username, password)
            }catch({message}){
                error = message
            }
            expect(error).to.equal(`user ${username} already exists`)


        })
    })

    describe('login', () => {
        const username = 'jack', password = '123'

        beforeEach(() => {
            logic.register(username, password)
        })

        it('should login', () => {
            expect(logic.users[username]).to.exist

            logic.login(username, password)

            expect(logic.isLoggedIn(username)).to.be.true
        })
    })

    describe('logout', () => {
        const username = 'jack', password = '123'

        beforeEach(() => {
            logic.register(username, password)
            expect(logic.users[username]).to.exist

            logic.login(username, password)
        })

        it('should logout', () => {

            logic.logout(username)
            expect(logic.isLoggedIn(username)).to.be.undefined
        })
    })
})