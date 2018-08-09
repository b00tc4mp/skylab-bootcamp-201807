'use strict'

const logic = require('.')
const { expect } = require('chai')

describe('logic', () => {
    const username = 'jack', password = '123'

    beforeEach(() => {
        logic._users = {}
    })

    describe('register', () => {

        it('should register correctly', () => {
            expect(logic._users[username]).not.to.exist

            logic.register(username, password)

            const user = logic._users[username]
            expect(user).to.exist
            expect(user.password).to.equal(password)
        })

        it('should fail on registering a user which exists', () => {
            logic.register(username, password)
            expect(() => logic.register(username, password)).to.throw(`user ${username} already exists`)
        })

        it('should not accept undefined or empty username', () => {
            expect(() => logic.register(undefined, password)).to.throw('username no valid')
            expect(() => logic.register('', password)).to.throw('username no valid')
        })

        it('should not accept undefined or empty password', () => {
            expect(() => logic.register(username, undefined)).to.throw('password no valid')
            expect(() => logic.register(username, '')).to.throw('password no valid')
        })

        it('should not accept undefined and empty username and passwords', () => {
            expect(() => logic.register(undefined, undefined)).to.throw('username no valid')
            expect(() => logic.register('', '')).to.throw('username no valid')
            expect(() => logic.register(undefined, '')).to.throw('username no valid')
            expect(() => logic.register('', undefined)).to.throw('username no valid')
        })

        it('should not accept numbers as username and/or passwords', () => {
            expect(() => logic.register(123, password)).to.throw('username no valid')
            expect(() => logic.register(username, 123)).to.throw('password no valid')
            expect(() => logic.register(123, 123)).to.throw('username no valid')
        })
    })

    describe('login', () => {
        beforeEach(() => {
            logic._users[username] = { password, loggedIn: false }
        })

        it('should login correctly the registered user', () => {
            const user = logic._users[username]
            expect(user.loggedIn).to.be.false

            logic.login(username, password)
            expect(user.loggedIn).to.be.true
        })

        it('should throw error on wrong login', () => {
            expect(() => logic.login('maider', 'hernan')).to.throw('user maider does not exist')
        })

        it('should not accept undefined or empty username', () => {
            expect(() => logic.login(undefined, password)).to.throw('wrong username')
            expect(() => logic.login('', password)).to.throw('wrong username')
        })

        it('should not accept undefined or empty password', () => {
            expect(() => logic.login(username, undefined)).to.throw('wrong password')
            expect(() => logic.login(username, '')).to.throw('wrong password')
        })

        it('should not accept undefined and empty username and passwords', () => {
            expect(() => logic.login(undefined, undefined)).to.throw('wrong username')
            expect(() => logic.login('', '')).to.throw('wrong username')
            expect(() => logic.login(undefined, '')).to.throw('wrong username')
            expect(() => logic.login('', undefined)).to.throw('wrong username')
        })
        
        it('should not accept numbers as username and/or passwords', () => {
            expect(() => logic.login(123, password)).to.throw('wrong username')
            expect(() => logic.login(username, 123)).to.throw('wrong password')
            expect(() => logic.login(123, 123)).to.throw('wrong username')
        })
    })

    describe('logout', () => {
        beforeEach(() => {
            logic._users[username] = { password, loggedIn: true }
        })

        it('should logout with correct username', () => {
            const user = logic._user[username]
            expect(user.loggedIn).to.be.true

            logic.logout(username)
            expect(user.loggedIn).to.be.false
        })

        it('should not logout if it doesn´t exist username', () => {
            expect(() => logic.logout('maider')).to.throw('user maider does not exist')
        })
    })

    after(() => {
        logic._users = {}
    })
})