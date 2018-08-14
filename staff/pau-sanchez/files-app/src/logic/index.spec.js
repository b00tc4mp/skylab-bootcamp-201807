'use strict'

const logic = require('.')
const { expect } = require('chai')
//const rmDirRecursiveSync = require('../utils/rm-dir-recursive-sync')
const fs = require('fs')

describe('logic', () => {
    const username = 'jack'+Math.random(), password = '123'

    describe('register', () => {
        it('should register on valid credentials', () => 
            
            logic.registerUser(username, password)
            .then(res =>{
                expect(res.data.message).to.exist
                expect(res.data.message).to.equal('user registered')
            })
        )
        
        it('should fail on trying to register an already registered user', () => 
            
            logic.registerUser(username, password)
            .then(res =>{
                expect(res.response.status).to.equal(500)
            })
        )
     })
    
    describe('authenticate', () => {
      
        it('should authenticate on correct credentials', () => 

            logic.loginUser(username, password)
            .then( res => {
                expect(res.data.message).to.equal('user authenticated')
            })
        )
        
        it('should fail on wrong credentials', () => 

            logic.loginUser('pepito', 'grillo')
            .then( res => {
                expect(res.response.data.message).to.equal('user pepito does not exist')
            })
        )

            
        /*
        it('should fail on wrong password', () => {
            expect(() => logic.authenticate(username, '456')).to.throw('wrong credentials')
        })

        it('should fail on trying to authenticate with an undefined username', () => {
            expect(() => logic.authenticate(undefined, password)).to.throw(`invalid username`)
        })

        it('should fail on trying to authenticate with an empty username', () => {
            expect(() => logic.authenticate('', password)).to.throw(`invalid username`)
        })

        it('should fail on trying to authenticate with a numeric username', () => {
            expect(() => logic.authenticate(123, password)).to.throw(`invalid username`)
        })

        it('should fail on trying to authenticate with an undefined password', () => {
            expect(() => logic.authenticate(username, undefined)).to.throw(`invalid password`)
        })

        it('should fail on trying to authenticate with an empty password', () => {
            expect(() => logic.authenticate(username, '')).to.throw(`invalid password`)
        })

        it('should fail on trying to authenticate with a numeric password', () => {
            expect(() => logic.authenticate(username, 123)).to.throw(`invalid password`)
        })*/
    })
    
})