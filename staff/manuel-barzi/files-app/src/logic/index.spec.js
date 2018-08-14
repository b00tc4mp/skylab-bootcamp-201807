'use strict'

require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
const fs = require('fs')
const rimraf = require('rimraf')
const FormData = require('form-data')
const bitmapManipulation = require("bitmap-manipulation")

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
            fs.writeFileSync('tests/helloworld.txt', 'hola mundo!')
        })

        it('should succeed on correct file', () =>
            logic.register(username, password)
                .then(() => logic.authenticate(username, password))
                .then(() => {
                    const file = fs.createReadStream('tests/helloworld.txt')

                    return logic.saveFile(username, file)
                })
                .catch(res => res)
                .then(res => expect(res).to.be.true)
        )

        afterEach(() => {
            fs.unlinkSync('tests/helloworld.txt')
        })
    })

    describe('retrieve text file', () => {
        beforeEach(() => {
            fs.writeFileSync('tests/helloworld.txt', 'hola mundo!')
        })

        it('should succeed on correct file', () =>
            logic.register(username, password)
                .then(() => logic.authenticate(username, password))
                .then(() => {
                    const file = fs.createReadStream('tests/helloworld.txt')

                    return logic.saveFile(username, file)
                })
                .then(() => logic.retrieveFile(username, 'helloworld.txt'))
                .then(res => {
                    expect(res).to.exist

                    return new Promise((resolve, reject) => {
                        const ws = fs.createWriteStream('tests/helloworld.txt-retrieved')

                        res.pipe(ws)

                        ws.on('finish', () => resolve())

                        ws.on('error', () => reject())
                    })
                })
                .then(() => {
                    const from = fs.readFileSync('tests/helloworld.txt')
                    const to = fs.readFileSync('tests/helloworld.txt-retrieved')

                    expect(from.equals(to)).to.be.true
                })
        )

        afterEach(() => {
            fs.unlinkSync('tests/helloworld.txt')
        })
    })

    describe('retrieve binary file', () => {
        beforeEach(() => {
            const bitmap = new bitmapManipulation.Bitmap(400, 300);
 
            // Draw rectangle with border
            bitmap.drawFilledRect(10, 10, 100, 50, 0x00, 0xff)

            fs.writeFileSync('tests/helloworld.bmp', bitmap.data())
        })

        it('should succeed on correct file', () =>
            logic.register(username, password)
                .then(() => logic.authenticate(username, password))
                .then(() => {
                    const file = fs.createReadStream('tests/helloworld.bmp')

                    return logic.saveFile(username, file)
                })
                .then(() => logic.retrieveFile(username, 'helloworld.bmp'))
                .then(res => {
                    expect(res).to.exist

                    return new Promise((resolve, reject) => {
                        const ws = fs.createWriteStream('tests/helloworld.bmp-retrieved')

                        res.pipe(ws)

                        ws.on('finish', () => resolve())

                        ws.on('error', () => reject())
                    })
                })
                .then(() => {
                    const from = fs.readFileSync('tests/helloworld.bmp')
                    const to = fs.readFileSync('tests/helloworld.bmp-retrieved')

                    expect(from.equals(to)).to.be.true
                })
        )

        afterEach(() => {
            fs.unlinkSync('tests/helloworld.bmp')
        })
    })

    after(() => {
        if (fs.existsSync('tests'))
            rimraf.sync('tests')
    })
})

