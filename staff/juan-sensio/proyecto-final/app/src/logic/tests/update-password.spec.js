require('isomorphic-fetch')

const logic = require('../.')
const { expect } = require('chai')
const mySessionStorage = require('../../helpers/mySessionStorage')
global.sessionStorage = mySessionStorage

describe('update-password', () => {
    let username, password, newPassword

    beforeEach( () => {
        username = 'juan-test-update-username'+Math.random()+'@mail.com'
        password = '123'
        newPassword = '456'
    })

    it('should update password on valid credentials', () => {
        return logic.registerUser(username, password)
            .then(() => logic.loginUser(username, password))
            .then(() => logic.updatePassword(password, newPassword))
            .then(res => expect(res).to.be.true)
            .then(() => logic.unregisterUser(newPassword))
    })

    it('should fail update password on empty password', () => {
        return logic.updatePassword('', newPassword)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail update password on numeric password', () => {
        return logic.updatePassword(123, newPassword)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail update password on undefined password', () => {
        return logic.updatePassword(undefined, newPassword)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail update password on null password', () => {
        return logic.updatePassword(null, newPassword)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail update password on boolean password', () => {
        return logic.updatePassword(true, newPassword)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail update password on same passwords', () => {
        return logic.updatePassword(password, password)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('passwords must be different'))
    })

    it('should fail update password on empty new password', () => {
        return logic.updatePassword(password, '')
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid new password'))
    })

    it('should fail update password on numeric new password', () => {
        return logic.updatePassword(password, 123)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid new password'))
    })

    it('should fail update password on undefined new password', () => {
        return logic.updatePassword(password)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid new password'))
    })

    it('should fail update password on null new password', () => {
        return logic.updatePassword(password, null)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid new password'))
    })

    it('should fail update password on boolean new password', () => {
        return logic.updatePassword(password, false)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid new password'))
    })
    
})