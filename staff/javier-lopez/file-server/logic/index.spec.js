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
        
        it('should return an error if user exists at registration', () => {
            logic.register(username, password)

            let error

            try{
                logic.register(username,password)
            }catch(err){
                error = err
            }
            expect(error).to.exist
            expect(error.message).to.equal(`user ${username} already exists`)

        })
    })

    describe('login', () => {
        const username = 'jack', password = '123'
        beforeEach(() => {
            logic.register(username, password)
        })

        it('should login', () => {
            logic.login(username, password)

            expect(user).to.exist
            expect(user.password).to.equal(password)
        })
    })
})