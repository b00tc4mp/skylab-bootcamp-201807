'use strict'

require('dotenv').config()

require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
// const rimraf = require('rimraf')
const FormData = require('form-data')
// const Jimp = require('jimp')
const jwt = require('jsonwebtoken')

global.FormData = FormData

describe('logic', () => {
    const { JWT_SECRET } = process.env
    let email, password

    beforeEach(() => {
        email = `mail-${Math.random()}`, password = '123'
    })

    describe('register owner', () => {
        it('should succeed on new owner', () => {
            debugger
            logic.register(email, password, name)
                .then(res => expect(res).to.be.true)
            }
        )

        it('should fail on already existing owner', () =>
            logic.register(email, password, name)
                .then(() => logic.register(email, password, name))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`user ${username} already exist`)
                })
        )

        it('should fail on empty owner', () =>
            logic.register('', password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid username`)
                })
        )

        it('should fail on password owner', () =>
            logic.register(username, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        )
    })






})

