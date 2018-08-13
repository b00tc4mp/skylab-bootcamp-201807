'use strict'

require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')

describe('logic', () => {
    const username = `user-${Math.random()}`, password = '123'

    describe('register', () => {
        it('should register', () =>
            logic.register(username, password)
                .then(res => expect(res).to.be.true)
        )
    })
})

