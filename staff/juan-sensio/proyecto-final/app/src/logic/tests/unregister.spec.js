require('isomorphic-fetch')

const logic = require('../.')
const { expect } = require('chai')
const mySessionStorage = require('../../helpers/mySessionStorage')
global.sessionStorage = mySessionStorage

describe('unregister', () => {
    let username, password

    beforeEach( () => {
        username = 'juan-test-delete'+Math.random()+'@mail.com'
        password = '123'
    })

    it('should unregister on valid credentials', () => {
        return logic.registerUser(username, password)
            .then(() => logic.loginUser(username, password))
            .then(() => logic.unregisterUser(password))
            .then(res => {
                expect(res).to.be.true
                expect(logic._userId).to.be.undefined
                expect(logic._userToken).to.be.undefined
            })
    })

    it('should fail unregister on empty password', () => {
        return logic.unregisterUser('')
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail unregister on numeric password', () => {
        return logic.unregisterUser(123)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail unregister on undefined password', () => {
        return logic.unregisterUser()
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail unregister on null password', () => {
        return logic.unregisterUser(null)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })

    it('should fail unregister on boolean password', () => {
        return logic.unregisterUser(true)
            .catch(({ message }) => message)
            .then(message => expect(message).to.equal('invalid password'))
    })
})