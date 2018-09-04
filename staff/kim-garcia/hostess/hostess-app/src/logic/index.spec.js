'use strict'

require('dotenv').config()

require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
const rimraf = require('rimraf')
const FormData = require('form-data')
const Jimp = require('jimp')
const jwt = require('jsonwebtoken')

global.FormData = FormData

describe('logic', () => {
    const { JWT_SECRET } = process.env

    let hostessEmail
    let businessEmail = 'b@mail.com'
    let password = '123456'
    let event

    describe('register hostess', () => {

        beforeEach(() => {
            hostessEmail = `h-${Math.floor((Math.random() * 100) + 1)}@mail.com`
        })

        it('should succeed on new hostess', () =>
            logic.registerHostess(hostessEmail, password)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on already existing user', () =>
            logic.registerHostess(hostessEmail, password)
                .then(() => logic.registerHostess(hostessEmail, password))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`We allready have and acount with this email ${hostessEmail}`)
                })
        )

        it('should fail on password empty', () =>
            logic.registerHostess(hostessEmail, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })

        )
    })

    

})