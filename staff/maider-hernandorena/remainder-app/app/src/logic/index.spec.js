'use strict'

require('dotenv').config()

require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
const jwt = require('jsonwebtoken')

describe('logic', () => {
    const { jwt_secret } = process.env
    let code, password

    beforeEach(() => {
        code = `maider-${Math.random()}`, password = '123'
    })


})