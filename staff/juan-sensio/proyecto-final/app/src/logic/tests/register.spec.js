require('isomorphic-fetch')

const logic = require('../.')
const { expect } = require('chai')
const mySessionStorage = require('../../helpers/mySessionStorage')
global.sessionStorage = mySessionStorage

describe('register', () => {
    let username, password

    beforeEach(() => {
        username = 'juan-test-register' + Math.random() + '@mail.com'
        password = '123'
    })

    it('should register on valid email', () => {
        return logic.registerUser(username, password)
            .then(res => {
                expect(res).to.be.true
                return logic.loginUser(username, password)
            })
            .then(() => logic.unregisterUser(password))
    })

    it('should fail register on invalid email', () => {
        return logic.registerUser('not-a-mail', password)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('username must be a valid email'))
    })

    it('should fail register on empty email', () => {
        return logic.registerUser('', password)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid username'))
    })

    it('should fail register on numeric email', () => {
        return logic.registerUser(123, password)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid username'))
    })

    it('should fail register on undefined email', () => {
        return logic.registerUser(undefined, password)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid username'))
    })

    it('should fail register on boolean email', () => {
        return logic.registerUser(true, password)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid username'))
    })

    it('should fail register on null email', () => {
        return logic.registerUser(null, password)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid username'))
    })

    it('should fail register on empty password', () => {
        return logic.registerUser(username, '')
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail register on numeric password', () => {
        return logic.registerUser(username, 123)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail register on undefined password', () => {
        return logic.registerUser(username)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail register on null password', () => {
        return logic.registerUser(username, null)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail register on boolean password', () => {
        return logic.registerUser(username, true)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })
})