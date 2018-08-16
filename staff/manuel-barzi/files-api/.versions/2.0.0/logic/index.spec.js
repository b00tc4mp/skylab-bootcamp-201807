'use strict'

const logic = require('.')
const { expect } = require('chai')
const rmDirRecursiveSync = require('../utils/rm-dir-recursive-sync')
const fs = require('fs')

describe('logic', () => {
    const username = 'jack', password = '123'

    function clean() {
        if (fs.existsSync('data'))
            rmDirRecursiveSync('data')

        fs.mkdirSync('data')

        fs.writeFileSync('data/users.json', '{}')
    }

    beforeEach(() => {
        logic._users = {}

        clean()
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

            expect(fs.lstatSync(`data/${username}`).isDirectory()).to.be.true
            expect(fs.lstatSync(`data/${username}/files`).isDirectory()).to.be.true
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

    describe('authenticate', () => {
        beforeEach(() => {
            logic._users[username] = { password }
        })

        it('should authenticate on correct credentials', () => {
            expect(() => logic.authenticate(username, password)).not.to.throw()
        })

        it('should fail on wrong credentials', () => {
            expect(() => logic.authenticate('pepito', 'grillo')).to.throw('user pepito does not exist')
        })

        it('should fail on wrong password', () => {
            expect(() => logic.authenticate(username, '456')).to.throw('wrong credentials')
        })

        it('should fail on trying to authenticate with an undefined username', () => {
            expect(() => logic.authenticate(undefined, password)).to.throw(`invalid username`)
        })

        it('should fail on trying to authenticate with an empty username', () => {
            expect(() => logic.authenticate('', password)).to.throw(`invalid username`)
        })

        it('should fail on trying to authenticate with a numeric username', () => {
            expect(() => logic.authenticate(123, password)).to.throw(`invalid username`)
        })

        it('should fail on trying to authenticate with an undefined password', () => {
            expect(() => logic.authenticate(username, undefined)).to.throw(`invalid password`)
        })

        it('should fail on trying to authenticate with an empty password', () => {
            expect(() => logic.authenticate(username, '')).to.throw(`invalid password`)
        })

        it('should fail on trying to authenticate with a numeric password', () => {
            expect(() => logic.authenticate(username, 123)).to.throw(`invalid password`)
        })
    })

    describe('list files', () => {
        beforeEach(() => {
            logic._users[username] = { password }

            fs.mkdirSync(`data/${username}`)
            fs.mkdirSync(`data/${username}/files`)
            fs.writeFileSync(`data/${username}/files/README.md`, '# documentation')
            fs.writeFileSync(`data/${username}/files/hello-world.txt`, 'hello world!')
            fs.mkdirSync(`data/${username}/files/folder`)
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
        // logic._users = {}
        // logic._persist() // TODO: test it!

        clean()
    })
})