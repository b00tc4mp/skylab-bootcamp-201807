'use strict'

const logic = require('.')
const { expect } = require('chai')

describe('logic', () => {
    const username = 'juanita', password = '123'

    beforeEach(() => {
        logic._users = {}
    })

    describe('_ validate field', () => {
        it('it should fail a undefined value', () => {
            expect(() => logic._validateField('lalala', undefined)).to.throw(`invalid lalala`)
        })

        it('it should fail a empty value', () => {
            expect(() => logic._validateField('lalala', '')).to.throw(`invalid lalala`)
        })

        it('it should fail a numeric value', () => {
            expect(() => logic._validateField('lalala', 123)).to.throw(`invalid lalala`)
        })
    })

    describe('register', () => {

        it('should register correctly', () => {
            expect(logic._users[username]).not.to.exist

            logic.register(username, password)

            const user = logic._users[username]
            expect(user).to.exist
            expect(user.password).to.equal(password)
            expect(user.loggedIn).to.be.false
        })

        it('should fail on registering a user which exists', () => {
            logic.register(username, password)
            expect(() => logic.register(username, password)).to.throw(`user ${username} already exists`)
        })

        it('should not accept undefined or empty username', () => {
            expect(() => logic.register(undefined, password)).to.throw('invalid username')
            expect(() => logic.register('', password)).to.throw('invalid username')
        })

        it('should not accept undefined or empty password', () => {
            expect(() => logic.register(username, undefined)).to.throw('invalid password')
            expect(() => logic.register(username, '')).to.throw('invalid password')
        })

        it('should not accept undefined and empty username and passwords', () => {
            expect(() => logic.register(undefined, undefined)).to.throw('invalid username')
            expect(() => logic.register('', '')).to.throw('invalid username')
            expect(() => logic.register(undefined, '')).to.throw('invalid username')
            expect(() => logic.register('', undefined)).to.throw('invalid username')
        })

        it('should not accept numbers as username and/or passwords', () => {
            expect(() => logic.register(123, password)).to.throw('invalid username')
            expect(() => logic.register(username, 123)).to.throw('invalid password')
            expect(() => logic.register(123, 123)).to.throw('invalid username')
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
            expect(() => logic.login(undefined, password)).to.throw('invalid username')
            expect(() => logic.login('', password)).to.throw('invalid username')
        })

        it('should not accept undefined or empty password', () => {
            expect(() => logic.login(username, undefined)).to.throw('invalid password')
            expect(() => logic.login(username, '')).to.throw('invalid password')
        })

        it('should not accept undefined and empty username and passwords', () => {
            expect(() => logic.login(undefined, undefined)).to.throw('invalid username')
            expect(() => logic.login('', '')).to.throw('invalid username')
            expect(() => logic.login(undefined, '')).to.throw('invalid username')
            expect(() => logic.login('', undefined)).to.throw('invalid username')
        })
        
        it('should not accept numbers as username and/or passwords', () => {
            expect(() => logic.login(123, password)).to.throw('invalid username')
            expect(() => logic.login(username, 123)).to.throw('invalid password')
            expect(() => logic.login(123, 123)).to.throw('invalid username')
        })
    })

    describe('is logged in', () => {
        it('should be logged in already', () => {
            logic._users[username] = { password, loggedIn: true }
            expect(logic.isLoggedIn(username)).to.be.true
        })

        it('should not be logged in', () => {
            logic._users[username] = { password, loggedIn: false }
            expect(logic.isLoggedIn(username)).to.be.false
        })

        it('should fail if the user doesn´t exist', () => {
            expect(() => logic.isLoggedIn(username)).to.throw(`user ${username} does not exist`)
        })

        it('should fail if logs out with an undefined username', () => {
            expect(() => logic.isLoggedIn(undefined)).to.throw(`invalid username`)
        })

        it('should fail if logs out with an empty username', () => {
            expect(() => logic.isLoggedIn('')).to.throw(`invalid username`)
        })

        it('should fail if logs out with a numeric username', () => {
            expect(() => logic.isLoggedIn(123)).to.throw(`invalid username`)
        })
    })

    describe('logout', () => {
        beforeEach(() => {
            logic._users[username] = { password, loggedIn: true }
        })

        it('should logout with correct username', () => {
            const user = logic._users[username]
            expect(user.loggedIn).to.be.true

            logic.logout(username)
            expect(user.loggedIn).to.be.false
        })

        it('should not logout if it doesn´t exist username', () => {
            expect(() => logic.logout('maider')).to.throw('user maider does not exist')
        })

        it('should fail on trying to logout with an undefined username', () => {
            expect(() => logic.logout(undefined)).to.throw(`invalid username`)
        })

        it('should fail on trying to logout with an empty username', () => {
            expect(() => logic.logout('')).to.throw(`invalid username`)
        })

        it('should fail on trying to logout with a numeric username', () => {
            expect(() => logic.logout(123)).to.throw(`invalid username`)
        })

    })

    after(() => {
        logic._users = {}
    })
})