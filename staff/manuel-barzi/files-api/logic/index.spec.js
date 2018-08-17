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
        it('should register on valid credentials', () =>
            _users.findOne({ username })
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
        )

        it('should fail on trying to register an already registered user', () =>
            _users.insertOne({ username, password })
                .then(() => logic.register(username, password))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user ${username} already exists`))
        )

        it('should fail on trying to register with an undefined username', () =>
            logic.register(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to register with an empty username', () =>
            logic.register('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to register with a numeric username', () =>
            logic.register(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.register(username)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.register(username, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.register(username, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    describe('authenticate', () => {
        beforeEach(() =>
            _users.insertOne({ username, password })
        )

        it('should authenticate on correct credentials', () => {
            return logic.authenticate(username, password)
                .then(res => expect(res).to.be.true)
        })

        it('should fail on wrong credentials', () => {
            return logic.authenticate('pepito', 'grillo')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('user pepito does not exist'))
        })

        it('should fail on wrong password', () => {
            return logic.authenticate(username, '456')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('wrong credentials'))
        })

        it('should fail on trying to authenticate with an undefined username', () => {
            return logic.authenticate(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid username'))
        })

        it('should fail on trying to authenticate with an empty username', () => {
            return logic.authenticate('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid username'))
        })

        it('should fail on trying to authenticate with a numeric username', () => {
            return logic.authenticate(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid username'))
        })

        it('should fail on trying to authenticate with an undefined password', () => {
            return logic.authenticate(username, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        })

        it('should fail on trying to authenticate with an empty password', () => {
            return logic.authenticate(username, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        })

        it('should fail on trying to authenticate with a numeric password', () => {
            return logic.authenticate(username, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        })
    })

    describe('update password', () => {
        const newPassword = `${password}-${Math.random()}`

        beforeEach(() =>
            _users.insertOne({ username, password })
        )

        it('should succeed on correct passwords', () => {
            logic.updatePassword(username, password, newPassword)
                .then(res => {
                    expect(res).to.be.true

                    return _users.findOne({ username })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.username).to.equal(username)
                    expect(user.password).to.equal(newPassword)
                })
        })

        it('should fail on empty username', () => {
            logic.updatePassword('', password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on empty password', () => {
            logic.updatePassword(username, '', newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        })

        it('should fail on empty new password', () =>
            logic.updatePassword(username, password, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on numeric username', () => {
            logic.updatePassword(123, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on numeric password', () => {
            logic.updatePassword(username, 123, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        })

        it('should fail on numeric new password', () =>
            logic.updatePassword(username, password, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on undefined username', () => {
            logic.updatePassword(undefined, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on undefined password', () => {
            logic.updatePassword(username, undefined, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        })

        it('should fail on undefined new password', () =>
            logic.updatePassword(username, password, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on numeric username', () => {
            logic.updatePassword(123, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid username`))
        })

        it('should fail on numeric password', () => {
            logic.updatePassword(username, 123, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        })

        it('should fail on numeric new password', () =>
            logic.updatePassword(username, password, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on new password same as current password', () =>
            logic.updatePassword(username, password, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`new password cannot be same as current password`))
        )
    })

    describe('list files', () => {
        beforeEach(() =>
            _users.insertOne({ username, password })
                .then(() => {
                    fs.mkdirSync(`data/${username}`)
                    fs.mkdirSync(`data/${username}/files`)
                    fs.writeFileSync(`data/${username}/files/README.md`, '# documentation')
                    fs.writeFileSync(`data/${username}/files/hello-world.txt`, 'hello world!')
                    fs.mkdirSync(`data/${username}/files/folder`)
                })
        )

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

        it('should not list files if they do not exist', () => {
            const username = 'pepe'

            return _users.insertOne({ username, password })
                .then(() => {
                    fs.mkdirSync(`data/${username}`)
                    fs.mkdirSync(`data/${username}/files`)

                    return logic.listFiles('pepe')
                        .then(files => {
                            expect(files).to.exist
                            expect(files.length).to.equal(0)
                        })
                })
        })

        it('should fail on trying to authenticate with an undefined username', () => {
            return logic.listFiles(undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid username'))
        })

        it('should fail on trying to authenticate with an empty username', () => {
            return logic.authenticate('')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid username'))
        })

        it('should fail on trying to authenticate with a numeric username', () => {
            return logic.authenticate(123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid username'))
        })

    })

    describe('save file', () => {
        const filename = 'hello-world.txt', content = 'hola mundo!'

        beforeEach(() => {
            return _users.insertOne({ username, password })
                .then(() => {
                    fs.mkdirSync(`data/${username}`)
                    fs.mkdirSync(`data/${username}/files`)

                    fs.mkdirSync('tests')
                    fs.writeFileSync(`tests/${filename}`, content)
                })
        })

        it('should succeed on correct file', () => {
            const buffer = fs.readFileSync(`tests/${filename}`)

            return logic.saveFile(username, filename, buffer)
                .then(res => {
                    expect(res).to.be.true

                    expect(fs.existsSync(`data/${username}/files/${filename}`)).to.be.true

                    expect(fs.readFileSync(`data/${username}/files/${filename}`).toString()).to.equal(content)
                })
        })

        it('should fail on empty username', () =>
            logic.saveFile('', 'whatever')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid username`)
                })
        )

        it('should fail on empty file', () =>
            logic.saveFile(username, undefined)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid filename`)
                })
        )

        afterEach(() => {
            rmDirRecursiveSync('tests')
        })
    })

    describe('remove file', () => {
        const filename = 'test.txt'

        beforeEach(() =>
            _users.insertOne({ username, password })
                .then(() => {
                    fs.mkdirSync(`data/${username}`)
                    fs.mkdirSync(`data/${username}/files`)

                    fs.writeFileSync(`data/${username}/files/${filename}`, 'hola mundo')
                })
        )

        it('should remove files on correct credentials', () =>
            logic.removeFile(username, filename)
                .then(res => {
                    expect(res).to.be.true

                    expect(fs.existsSync(`data/${username}/files/${filename}`)).to.be.false
                })
        )

        it('should fail on empty username', () =>
            logic.removeFile('', 'whatever')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid username`)
                })
        )

        it('should fail on empty file', () =>
            logic.removeFile(username, undefined)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid filename`)
                })
        )
    })

    after(() => {
        clean()

        return _users.deleteMany()
            .then(() => _conn.close())
    })
})