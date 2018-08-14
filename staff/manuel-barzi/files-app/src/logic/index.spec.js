'use strict'

require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')

describe('logic', () => {
    let username, password

    describe('register', () => {
        beforeEach(() => {
            username = `user-${Math.random()}`, password = '123'
        })

        describe('new user', () => {
            let result

            beforeEach(() =>
                logic.register(username, password)
                    .then(res => result = res)
            )

            it('should succeed', () => {
                expect(result).to.be.true
            })
        })

        describe('already existing user', () => {
            let error

            beforeEach(() =>
                logic.register(username, password)
                    .then(() => logic.register(username, password))
                    .catch(err => error = err)
            )

            it('should fail', () => {
                expect(error).to.exist
                expect(error.message).to.equal(`user ${username} already exists`)
            })
        })

    })
})

