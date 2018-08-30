require('isomorphic-fetch')

const logic = require('../.')
const { expect } = require('chai')
const mySessionStorage = require('../../helpers/mySessionStorage')

global.sessionStorage = mySessionStorage

describe('data', () => {
    let username, password, data

    before(() => {
        username = 'juan-test-data' + Math.random()+'@mail.com'
        password = '123',
        data = {
            'test-array': [1, 2, 3],
            'test-string': 'hello',
            'test-object': {a: 'a', b:'b'},
            'test-number': 123
        }
        return logic.registerUser(username, password)
            .then(() => logic.loginUser(username, password))
    })

    after(() => sessionStorage.clear())

    it('should save data', () => {
        return logic.saveData(data)
            .then(res => expect(res).to.be.true)
    })

    it('should retrieve data', () => {
        return logic.saveData(data)
            .then(() => logic.retrieveData())
            .then(res => {
                expect(res).to.be.true
                data.videos = []
                expect(logic._data).to.deep.equal(data)
            })
    })


})