require('isomorphic-fetch')

const logic = require('../.')
const { expect } = require('chai')
const mySessionStorage = require('../../helpers/mySessionStorage')
global.sessionStorage = mySessionStorage

describe('update-username', () => {
    let username, newUsername, password

    beforeEach( () => {
        username = 'juan-test-update-username'+Math.random()+'@mail.com'
        newUsername = 'juan-test-delete'+Math.random()+'@mail.com' 
        password = '123'
    })

    it('should update username on valid credentials', () => {
        return logic.registerUser(username, password)
            .then(() => logic.loginUser(username, password))
            .then(() => logic.updateUsername(password, newUsername))
            .then(res => expect(res).to.be.true)
            .then(() => logic.unregisterUser(password))
    })

    it('should fail update username on empty password', () => {
        return logic.updateUsername('', newUsername)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail update username on numeric password', () => {
        return logic.updateUsername(123, newUsername)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail update username on undefined password', () => {
        return logic.updateUsername(undefined, newUsername)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail update username on null password', () => {
        return logic.updateUsername(null, newUsername)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail update username on boolean password', () => {
        return logic.updateUsername(true, newUsername)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail update username on not email new username', () => {
        return logic.updateUsername(password, 'not-an-email')
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('username must be a valid email'))
    })

    it('should fail update username on empty new username', () => {
        return logic.updateUsername(password, '')
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid new username'))
    })

    it('should fail update username on numeric new username', () => {
        return logic.updateUsername(password, 123)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid new username'))
    })

    it('should fail update username on undefined new username', () => {
        return logic.updateUsername(password)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid new username'))
    })

    it('should fail update username on null new username', () => {
        return logic.updateUsername(password, null)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid new username'))
    })

    it('should fail update username on boolean new username', () => {
        return logic.updateUsername(password, false)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid new username'))
    })
    
})