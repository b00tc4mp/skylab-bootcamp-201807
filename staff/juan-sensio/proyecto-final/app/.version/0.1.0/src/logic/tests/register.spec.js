require('isomorphic-fetch')

const logic = require('../.')
const { expect } = require('chai')

describe('register', () => {
    let username, password, notEmail

    beforeEach( () => {
        username = 'juan-test-register'+Math.random()+'@mail.com'
        password = '123'
        notEmail = 'juan-test-regist'+Math.random()
    })

    it('should register on valid email', () => {
        return logic.registerUser(username, password)
            .then(res => expect(res).to.be.true)
    })

    it('should fail register on invalid email', () => {
        return logic.registerUser(notEmail, password)
            .catch(({message}) => message)
            .then(message => expect(message).to.equal('username must be a valid email'))
    })
})