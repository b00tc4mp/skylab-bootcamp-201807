require('isomorphic-fetch')

const logic = require('../.')
const { expect } = require('chai')

describe('unregister', () => {
    let username, password

    beforeEach( () => {
        username = 'juan-test-delete'+Math.random()+'@mail.com'
        password = '123'
    })

    it('should register on valid credentials', () => {
        return logic.registerUser(username, password)
            .then( () => logic.loginUser(username, password))
            .then( () => logic.unregisterUser(password))
            .then( res => {
                expect(res).to.be.true
                expect(logic._userId).to.be.undefined
                expect(logic._userToken).to.be.undefined
                expect(logic._userData).to.be.null
            })
            
    })
})