'use strict'

const logic = require('.')
const { expect } = require('chai')
const rmDirRecursiveSync = require('../utils/rm-dir-recursive-sync')
const fs = require('fs')

describe('logic', () => {
    const username = 'jack', password = '123'

    beforeEach(() => {
        logic._users = {}

        rmDirRecursiveSync('files')

        fs.mkdirSync('files')
    })

    describe('_ validate string field', () => {
        it('it should fail on undefined value', () => {
            expect(() => logic._validateStringField('whatever', undefined)).to.throw(`invalid whatever`)
        })

        it('it should fail on empty value', () => {
            expect(() => logic._validateStringField('whatever', '')).to.throw(`invalid whatever`)
        })

        it('it should fail on numeric value', () => {
            expect(() => logic._validateStringField('whatever', 123)).to.throw(`invalid whatever`)
        })
    })

    describe('register', () => {
        it('should register on valid credentials', () => {
            expect(logic._users[username]).not.to.exist

            logic.register(username, password)

            const user = logic._users[username]

            expect(user).to.exist
            expect(user.password).to.equal(password)
            expect(user.loggedIn).to.be.false

            expect(fs.lstatSync(`files/${username}`).isDirectory()).to.be.true
        })

        it('should fail on trying to register an already registered user', () => {
            logic.register(username, password)

            // let error

            // try {
            //     logic.register(username, password)
            // } catch(err) {
            //     error = err
            // }

            // expect(error).to.exist
            // expect(error.message).to.equal(`user ${username} already exists`)

            expect(() => logic.register(username, password)).to.throw(`user ${username} already exists`)
        })

        it('should fail on trying to register with an undefined username', () => {
            expect(() => logic.register(undefined, password)).to.throw(`invalid username`)
        })

        it('should fail on trying to register with an empty username', () => {
            expect(() => logic.register('', password)).to.throw(`invalid username`)
        })

        it('should fail on trying to register with a numeric username', () => {
            expect(() => logic.register(123, password)).to.throw(`invalid username`)
        })

        it('should fail on trying to register with an undefined password', () => {
            expect(() => logic.register(username, undefined)).to.throw(`invalid password`)
        })

        it('should fail on trying to register with an empty password', () => {
            expect(() => logic.register(username, '')).to.throw(`invalid password`)
        })

        it('should fail on trying to register with a numeric password', () => {
            expect(() => logic.register(username, 123)).to.throw(`invalid password`)
        })
    })

    describe('login', () => {
        beforeEach(() => {
            logic._users[username] = { password, loggedIn: false }
        })

        it('should login on correct credentials', () => {
            const user = logic._users[username]

            expect(user.loggedIn).to.be.false

            logic.login(username, password)

            expect(user.loggedIn).to.be.true
        })

        it('should fail on wrong credentials', () => {
            expect(() => logic.login('pepito', 'grillo')).to.throw('user pepito does not exist')
        })

        it('should fail on wrong password', () => {
            expect(() => logic.login(username, '456')).to.throw('wrong credentials')
        })

        it('should fail on trying to login with an undefined username', () => {
            expect(() => logic.login(undefined, password)).to.throw(`invalid username`)
        })

        it('should fail on trying to login with an empty username', () => {
            expect(() => logic.login('', password)).to.throw(`invalid username`)
        })

        it('should fail on trying to login with a numeric username', () => {
            expect(() => logic.login(123, password)).to.throw(`invalid username`)
        })

        it('should fail on trying to login with an undefined password', () => {
            expect(() => logic.login(username, undefined)).to.throw(`invalid password`)
        })

        it('should fail on trying to login with an empty password', () => {
            expect(() => logic.login(username, '')).to.throw(`invalid password`)
        })

        it('should fail on trying to login with a numeric password', () => {
            expect(() => logic.login(username, 123)).to.throw(`invalid password`)
        })
    })

    describe('is logged in', () => {
        it('should return true on already logged in', () => {
            logic._users[username] = { password, loggedIn: true }

            expect(logic.isLoggedIn(username)).to.be.true
        })

        it('should return false on non logged in', () => {
            logic._users[username] = { password, loggedIn: false }

            expect(logic.isLoggedIn(username)).to.be.false
        })

        it('should fail on non-existent user', () => {
            expect(() => logic.isLoggedIn(username)).to.throw(`user ${username} does not exist`)
        })

        it('should fail on trying to check logged-in with an undefined username', () => {
            expect(() => logic.isLoggedIn(undefined)).to.throw(`invalid username`)
        })

        it('should fail on trying to check logged-in with an empty username', () => {
            expect(() => logic.isLoggedIn('')).to.throw(`invalid username`)
        })

        it('should fail on trying to check logged-in with a numeric username', () => {
            expect(() => logic.isLoggedIn(123)).to.throw(`invalid username`)
        })
    })

    describe('logout', () => {
        beforeEach(() => {
            logic._users[username] = { password, loggedIn: true }
        })

        it('should logout on correct username', () => {
            const user = logic._users[username]

            expect(user.loggedIn).to.be.true

            logic.logout(username)

            expect(user.loggedIn).to.be.false
        })

        it('should fail on non-existing username', () => {
            expect(() => logic.logout('pepito')).to.throw(`user pepito does not exist`)
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

    describe('list files', () => {
        beforeEach(() => {
            logic._users[username] = { password, loggedIn: true }

            fs.mkdirSync(`files/${username}`)
            fs.writeFileSync(`files/${username}/README.md`, '# documentation')
            fs.writeFileSync(`files/${username}/hello-world.txt`, 'hello world!')
            fs.mkdirSync(`files/${username}/folder`)
        })

        it('should list files if they exist', () => {
            const files = logic.listFiles(username)

            expect(files).to.exist
            expect(files.length).to.equal(3)

            expect(files.includes('README.md')).to.be.true
            expect(files.includes('hello-world.txt')).to.be.true
            expect(files.includes('folder')).to.be.true
        })
    })

    after(() => {
        logic._users = {}
        logic._persist() // TODO: test it!

        rmDirRecursiveSync('files')
        fs.mkdirSync('files')

        fs.writeFileSync('data/users.json', '{}')
    })
})