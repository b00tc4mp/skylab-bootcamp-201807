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
    })

})

