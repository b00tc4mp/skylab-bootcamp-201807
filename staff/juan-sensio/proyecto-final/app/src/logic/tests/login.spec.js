require('isomorphic-fetch')

const logic = require('../.')
const { expect } = require('chai')
const mySessionStorage = require('../../helpers/mySessionStorage')

global.sessionStorage = mySessionStorage

describe('login', () => {
    let username, password

    before(() => {
        username = 'juan-test-login' + Math.random() + '@mail.com'
        password = '123'
        return logic.registerUser(username, password)
    })

    after(() => {
        return logic.loginUser(username, password)
            .then(() => logic.unregisterUser(password))
    })

    afterEach(() => sessionStorage.clear())

    it('should login on valid credentials', () => {
        return logic.loginUser(username, password)
            .then(res => {
                expect(res).to.be.true

                expect(logic._userId).to.exist
                expect(logic._userId).to.be.a('string')
                expect(logic._userId.length > 0).to.be.true

                expect(logic._userToken).to.exist
                expect(logic._userToken).to.be.a('string')
                expect(logic._userToken.length > 0).to.be.true
            })
    })

    it('should keep logged state if logged in correctly', () => {
        return logic.loginUser(username, password)
            .then(res => {
                expect(res).to.be.true
                expect(logic.loggedIn()).to.be.true
            })
    })

    it('should logout correctly', () => {
        return logic.loginUser(username, password)
            .then(() => {
                logic.logout()
                expect(logic._userId).to.be.undefined
                expect(logic._userToken).to.be.undefined
            })
    })

    it('should fail login on invalid email', () => {
        return logic.loginUser('not-a-mail', password)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('username must be a valid email'))
    })

    it('should fail login on empty email', () => {
        return logic.loginUser('', password)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid username'))
    })

    it('should fail login on numeric email', () => {
        return logic.loginUser(123, password)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid username'))
    })

    it('should fail login on undefined email', () => {
        return logic.loginUser(undefined, password)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid username'))
    })

    it('should fail login on boolean email', () => {
        return logic.loginUser(true, password)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid username'))
    })

    it('should fail login on null email', () => {
        return logic.loginUser(null, password)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid username'))
    })

    it('should fail login on empty password', () => {
        return logic.loginUser(username, '')
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail login on numeric password', () => {
        return logic.loginUser(username, 123)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail login on undefined password', () => {
        return logic.loginUser(username)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail login on null password', () => {
        return logic.loginUser(username, null)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail login on boolean password', () => {
        return logic.loginUser(username, true)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

})