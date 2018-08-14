'use strict'
require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')


describe('logic', () =>{
    let username, password

    describe('logic', () => {
        const username = `sergi-${Math.random()}`, password = '123'

        describe('register', () => {
            
            it('should register Ok', () =>{
            return logic.register(username, password)
            .then(res => expect(res).to.be.true)
            })
        debugger
            it('status == 201', () =>{
                logic.register(username, password)
                    .then(res => expect(res.status == 201))
                
                }
            )
        })
    })
})