'use strict'

const logic = require('.')
const { expect } = require('chai')

describe('logic', () => {
    beforeEach(() => {
        logic.users = {}
    })

    describe('register', () => {
        const username = 'jack', password = '123'

        it('should register', () => {
            expect(logic.users[username]).not.to.exist

            logic.register(username, password)

            const user = logic.users[username]

            expect(user).to.exist
            expect(user.password).to.equal(password)
        })
    })
})