require('isomorphic-fetch')

const logic = require('../.')
const { expect } = require('chai')
const mySessionStorage = require('../../helpers/mySessionStorage')

global.sessionStorage = mySessionStorage

describe('login', () => {
    let username, password

    before(() => {
        username = 'juan-test-login' + Math.random()+'@mail.com'
        password = '123'
        return logic.registerUser(username, password)
    })

    afterEach(() => sessionStorage.clear())

    it('should login on valid credentials', () => {
        // only email !!!
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
                expect(logic._userData).to.be.null
            })

    })

})