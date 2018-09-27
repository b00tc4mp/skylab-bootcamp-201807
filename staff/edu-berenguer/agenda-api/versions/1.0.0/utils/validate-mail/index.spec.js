'use strict'

const emailValidate = require('.')

const { expect } = require('chai')

describe('Email Validate', () => {

    const username = 'javi'
    let res

    it('should verify a correct mail', () => {
        res = emailValidate(username + '@gmail.com')
        expect(res).to.be.true
    })
    it('should fail on an incorrect mail', () => {
        res = emailValidate(username)
        expect(res).to.be.false
    })
})