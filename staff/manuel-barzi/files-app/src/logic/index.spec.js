'use strict'

require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
const fs = require('fs')
const rimraf = require('rimraf')
const FormData = require('form-data')
const Jimp = require('jimp')

global.FormData = FormData

describe('logic', () => {
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

        // TODO test other cases (empty username, ...)
    })

    describe('authenticate user', () => {
        it('should succeed on existing user', () =>
            logic.register(username, password)
                .then(() => logic.authenticate(username, password))
                .then(res => expect(res).to.be.true)
        )

        it('should fail on unregistered user', () =>
            logic.authenticate(username, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`user ${username} does not exist`)
                })
        )

        // TODO test other cases (empty username, ...)
    })

    describe('save file', () => {
        beforeEach(() => {
            fs.writeFileSync('tests/hello-world.txt', 'hola mundo!')
        })

        it('should succeed on correct file', () =>
            logic.register(username, password)
                .then(() => logic.authenticate(username, password))
                .then(() => {
                    const file = fs.createReadStream('tests/hello-world.txt')

                    return logic.saveFile(username, file)
                })
                .catch(res => res)
                .then(res => expect(res).to.be.true)
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
                .then(() => {
                    const file = fs.createReadStream('tests/hello-world.txt')

                    return logic.saveFile(username, file)
                })
                .then(() => logic.retrieveFile(username, 'hello-world.txt'))
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

        afterEach(() => {
            fs.unlinkSync('tests/hello-world.txt')
        })
    })

    describe('retrieve binary file', () => {
        beforeEach(done => {
            new Jimp(256, 256, 0xff0000ff, function(err, image) {
                if (err) return done(err)

                image.write('tests/hello-world.png', done)
            })
        })

        it('should succeed on correct file', () =>
            logic.register(username, password)
                .then(() => logic.authenticate(username, password))
                .then(() => {
                    const file = fs.createReadStream('tests/hello-world.png')

                    return logic.saveFile(username, file)
                })
                .then(() => logic.retrieveFile(username, 'hello-world.png'))
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

    after(() => {
        if (fs.existsSync('tests'))
            rimraf.sync('tests')
    })
})

