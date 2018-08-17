'use strict'

require('dotenv').config()

require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
const fs = require('fs')
const rimraf = require('rimraf')
const FormData = require('form-data')
const Jimp = require('jimp')
const jwt = require('jsonwebtoken')

global.FormData = FormData

describe('logic', () => {
    const { JWT_SECRET } = process.env
    let username, password

    before(() => {
        if (fs.existsSync('tests'))
            rimraf.sync('tests')

        fs.mkdirSync('tests')
    })

    beforeEach(() => {
        username = `user-${Math.random()}`, password = '123'
    })

    describe('register user', () => {
        it('should succeed on new user', () =>
            logic.register(username, password)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on already existing user', () =>
            logic.register(username, password)
                .then(() => logic.register(username, password))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`user ${username} already exists`)
                })
        )

        it('should fail on empty username', () =>
            logic.register('', password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid username`)
                })
        )

        it('should fail on password user', () =>
            logic.register(username, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        )
    })

    describe('authenticate user', () => {
        it('should succeed on existing user', () =>
            logic.register(username, password)
                .then(() => logic.authenticate(username, password))
                .then(token => {
                    expect(token).to.be.a('string')

                    let payload

                    expect(() => payload = jwt.verify(token, JWT_SECRET)).not.to.throw()
                    expect(payload.sub).to.equal(username)
                })
        )

        it('should fail on unregistered user', () =>
            logic.authenticate(username, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`user ${username} does not exist`)
                })
        )

        it('should fail on empty username', () =>
            logic.authenticate('', password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid username`)
                })
        )

        it('should fail on password user', () =>
            logic.authenticate(username, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        )
    })

    describe('save file', () => {
        beforeEach(() => {
            fs.writeFileSync('tests/hello-world.txt', 'hola mundo!')
        })

        it('should succeed on correct file', () =>
            logic.register(username, password)
                .then(() => logic.authenticate(username, password))
                .then(token => {
                    const file = fs.createReadStream('tests/hello-world.txt')

                    return logic.saveFile(username, file, token)
                })
                .catch(res => res)
                .then(res => expect(res).to.be.true)
        )

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
                    expect(err.message).to.equal(`invalid file`)
                })
        )

        afterEach(() => {
            fs.unlinkSync('tests/hello-world.txt')
        })
    })

    describe('retrieve text file', () => {
        beforeEach(() => {
            fs.writeFileSync('tests/hello-world.txt', 'hola mundo!')
        })

        it('should succeed on correct file', () =>
            logic.register(username, password)
                .then(() => logic.authenticate(username, password))
                .then(token => {
                    const file = fs.createReadStream('tests/hello-world.txt')

                    return logic.saveFile(username, file, token)
                        .then(() => logic.retrieveFile(username, 'hello-world.txt', token))
                })
                .then(res => {
                    expect(res).to.exist

                    return new Promise((resolve, reject) => {
                        const ws = fs.createWriteStream('tests/hello-world-retrieved.txt')

                        res.pipe(ws)

                        ws.on('finish', () => resolve())

                        ws.on('error', () => reject())
                    })
                })
                .then(() => {
                    const from = fs.readFileSync('tests/hello-world.txt')
                    const to = fs.readFileSync('tests/hello-world-retrieved.txt')

                    expect(from.equals(to)).to.be.true
                })
        )

        it('should fail on empty username', () =>
            logic.retrieveFile('', 'whatever')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid username`)
                })
        )

        it('should fail on empty file', () =>
            logic.retrieveFile(username)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid file`)
                })
        )

        afterEach(() => {
            fs.unlinkSync('tests/hello-world.txt')
        })
    })

    describe('retrieve binary file', () => {
        beforeEach(done => {
            new Jimp(256, 256, 0xff0000ff, function (err, image) {
                if (err) return done(err)

                image.write('tests/hello-world.png', done)
            })
        })

        it('should succeed on correct file', () =>
            logic.register(username, password)
                .then(() => logic.authenticate(username, password))
                .then(token => {
                    const file = fs.createReadStream('tests/hello-world.png')

                    return logic.saveFile(username, file, token)
                        .then(() => logic.retrieveFile(username, 'hello-world.png', token))
                })
                .then(res => {
                    expect(res).to.exist

                    return new Promise((resolve, reject) => {
                        const ws = fs.createWriteStream('tests/hello-world-retrieved.png')

                        res.pipe(ws)

                        ws.on('finish', () => resolve())

                        ws.on('error', () => reject())
                    })
                })
                .then(() => {
                    debugger
                    const from = fs.readFileSync('tests/hello-world.png')
                    const to = fs.readFileSync('tests/hello-world-retrieved.png')

                    expect(from.equals(to)).to.be.true
                })
        )

        afterEach(() => {
            fs.unlinkSync('tests/hello-world.png')
        })
    })

    describe('list files', () => {
        beforeEach(() => {
            fs.writeFileSync('tests/hello-world.txt', 'hola mundo!')
            fs.writeFileSync('tests/hello-world-2.txt', 'hola mundo!')
            fs.writeFileSync('tests/hello-world-3.txt', 'hola mundo!')
        })

        it('should succeed', () =>
            logic.register(username, password)
                .then(() => logic.authenticate(username, password))
                .then(token => {
                    const file = fs.createReadStream('tests/hello-world.txt')

                    return logic.saveFile(username, file, token)
                        .then(() => {
                            const file = fs.createReadStream('tests/hello-world-2.txt')

                            return logic.saveFile(username, file, token)
                        })
                        .then(() => {
                            const file = fs.createReadStream('tests/hello-world-3.txt')

                            return logic.saveFile(username, file, token)
                        })
                        .then(() => logic.listFiles(username, token))
                })
                .then(files => {
                    expect(files.length).to.equal(3)
                    expect(files.includes('hello-world.txt'))
                    expect(files.includes('hello-world-2.txt'))
                    expect(files.includes('hello-world-3.txt'))
                })
        )

        it('should fail on empty username', () =>
            logic.saveFile('', 'whatever')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid username`)
                })
        )

        it('should fail on empty username', () =>
            logic.listFiles()
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid username`)
                })
        )
    })

    describe('remove file', () => {
        beforeEach(() => {
            fs.writeFileSync('tests/hello-world.txt', 'hola mundo!')
            fs.writeFileSync('tests/hello-world-2.txt', 'hola mundo!')
            fs.writeFileSync('tests/hello-world-3.txt', 'hola mundo!')
        })

        it('should succeed', () =>
            logic.register(username, password)
                .then(() => logic.authenticate(username, password))
                .then(token => {
                    const file = fs.createReadStream('tests/hello-world.txt')

                    return logic.saveFile(username, file, token)
                        .then(() => {
                            const file = fs.createReadStream('tests/hello-world-2.txt')

                            return logic.saveFile(username, file, token)
                        })
                        .then(() => {
                            const file = fs.createReadStream('tests/hello-world-3.txt')

                            return logic.saveFile(username, file, token)
                        })
                        .then(() => logic.removeFile(username, 'hello-world.txt', token))
                        .then(() => logic.listFiles(username, token))
                })
                .then(files => {
                    expect(files.length).to.equal(2)
                    expect(files.includes('hello-world-2.txt'))
                    expect(files.includes('hello-world-3.txt'))
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
            logic.removeFile(username)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid file`)
                })
        )
    })

    after(() => {
        if (fs.existsSync('tests'))
            rimraf.sync('tests')
    })
})

