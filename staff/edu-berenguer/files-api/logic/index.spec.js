'use strict'

require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const rmDirRecursiveSync = require('../utils/rm-dir-recursive-sync')
const fs = require('fs')
const { MongoClient } = require('mongodb')

const { MONGO_URL } = process.env

describe('logic', () => {
    const username = 'jack', password = '123'
    let _conn, _db, _users

    before(done => {
        MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, conn) => {
            if (err) return done(err)

            _conn = conn

            const db = _db = conn.db()

            logic._users = _users = db.collection('users')

            done()
        })
    })

    function clean() {
        if (fs.existsSync('data'))
            rmDirRecursiveSync('data')

        fs.mkdirSync('data')
    }

    beforeEach(() => {
        clean()

        return _users.deleteMany()
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
            return _users.findOne({ username })
                .then(user => {
                    expect(user).to.be.null

                    return logic.register(username, password)
                })
                .then(() =>
                    _users.findOne({ username })
                )
                .then(user => {
                    expect(user).to.exist

                    expect(user.username).to.equal(username)
                    expect(user.password).to.equal(password)

                    expect(fs.lstatSync(`data/${username}`).isDirectory()).to.be.true
                    expect(fs.lstatSync(`data/${username}/files`).isDirectory()).to.be.true
                })
        })

        it('should fail on trying to register an already registered user', () => {
            return _users.insertOne({ username, password })
                .then(() => logic.register(username, password))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user ${username} already exists`))
        })

        it('should fail on trying to register with an undefined username', () => {
            logic.register(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on trying to register with an empty username', () => {
            logic.register('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on trying to register with a numeric username', () => {
            logic.register(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on trying to register with an undefined password', () => {
            logic.register(username)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        })

        it('should fail on trying to register with an empty password', () => {
            logic.register(username, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        })

        it('should fail on trying to register with a numeric password', () => {
            logic.register(username, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        })
    })

    describe('authenticate', () => {
        beforeEach(() => 
            _users.insertOne({ username, password })
        )

        it('should authenticate on correct credentials', () => {
            return logic.authenticate(username, password)
                .then((res) => expect(res).to.be.true)
        })

        it('should fail user not found', () => {
            return logic.authenticate('edu', '456')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user edu not found`))
        })

        it('should fail on wrong credentials', () => {
            return logic.authenticate(username, '456')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`wrong password`))
        })
    })

    describe('list files', () => {
        beforeEach(() => {
            return _users.insertOne({ username, password })
                .then(() => {
                    fs.mkdirSync(`data/${username}`)
                    fs.mkdirSync(`data/${username}/files`)
                    fs.writeFileSync(`data/${username}/files/README.md`, '# documentation')
                    fs.writeFileSync(`data/${username}/files/hello-world.txt`, 'hello world!')
                    fs.mkdirSync(`data/${username}/files/folder`)
                })
        })

        it('should list files if they exist', () => {
              return logic.listFiles(username)
                .then(files => {
                        expect(files).to.exist
                        expect(files.length).to.equal(3)
            
                        expect(files.includes('README.md')).to.be.true
                        expect(files.includes('hello-world.txt')).to.be.true
                        expect(files.includes('folder')).to.be.true
                    })
                })
    })

    describe('update password', () => {
        let newPassword

        beforeEach(() => {
            _users.insertOne({
                username,
                password
            })

            newPassword = `${password}-${Math.random()}`
        })

        it('should succeed on correct passwords', () => {
            return logic.updatePassword(username, password, newPassword)
                .then(res => {
                    expect(res).to.equal(1)
                    expect(() => _users.findOne({
                        username
                    }).password.to.equal(newPassword))
                })
        })
        it('should fail on empty password', () => {
            return logic.updatePassword(username, '', newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password')) 
        })

        it('should fail on empty New Password', () => {
            return logic.updatePassword(username, password, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid new password'))
        })
    })

    describe('remove folders', () => {  
        let file = 'README.md'
        beforeEach(() => {
            return _users.insertOne({ username, password })
                .then(() => {
                    fs.mkdirSync(`data/${username}`)
                    fs.mkdirSync(`data/${username}/files`)
                    fs.writeFileSync(`data/${username}/files/${file}`, '# documentation')
                })
        })

        it('should remove folders' ,() => {
                return logic.removeFile(username,file)
        })
    })

    after(() => {
        clean()

        _users.deleteMany({})

        return _conn.close()
    })
})