'use strict'

require('dotenv').config()

require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
const rimraf = require('rimraf')
const FormData = require('form-data')
const Jimp = require('jimp')
const jwt = require('jsonwebtoken')

global.FormData = FormData

describe('logic', () => {
    const { JWT_SECRET } = process.env

    let hostessEmail 
    let businessEmail 
    let password = '123456'
    let event

    beforeEach(() => {
        hostessEmail = `h-${Math.random()}@mail.com`, businessEmail = `b-${Math.random()}@mail.com`
    })

    
    describe('retrieve hostess', () => {

        it('should retrieve hostess', () =>
            logic.registerHostess(hostessEmail, password)
                .then(() => logic.authenticateHostess(hostessEmail, password))
                .then(token => logic.retrieveHostess(hostessEmail, token))
                .then(hostess => {
                    expect(hostess).to.exist
                    expect(hostess.email).to.equal(hostessEmail)
                })
        )
    })

    describe('retrieve business', () => {

        it('should retrieve business', () =>
            logic.registerBusiness(businessEmail, password)
                .then(() => logic.authenticateBusiness(businessEmail, password))
                .then(token => logic.retrieveBusiness(businessEmail, token))
                .then(business => {
                    expect(business).to.exist
                    expect(business.email).to.equal(businessEmail)
                })
        )
    })


    describe('register hostess', () => {

        it('should succeed on new hostess', () =>
            logic.registerHostess(hostessEmail, password)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on already existing hostess', () =>
            logic.registerHostess(hostessEmail, password)
                .then(() => logic.registerHostess(hostessEmail, password))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`We allready have and acount with this email ${hostessEmail}`)
                })
        )

        it('should fail on password empty', () =>
            logic.registerHostess(hostessEmail, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })

        )
    })

    describe('register business', () => {

        it('should succeed on new business', () =>
            logic.registerBusiness(businessEmail, password)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on already existing business', () =>
            logic.registerBusiness(businessEmail, password)
                .then(() => logic.registerBusiness(businessEmail, password))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`We allready have and acount with this email ${businessEmail}`)
                })
        )
    })

    describe('authenticate hostess', () => {

        it('should authenticate the hostess', () =>
            logic.registerHostess(hostessEmail, password)
                .then(() => logic.authenticateHostess(hostessEmail, password))
                .then(token => {
                    expect(token).to.be.a('string')

                    let payload

                    expect(() => payload = jwt.verify(token, JWT_SECRET)).not.to.throw()
                    expect(payload.sub).to.equal(hostessEmail)
                })

        )

        it('should fail on unregistered hostess', () =>
            logic.authenticateHostess(hostessEmail, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`Does not exist a hostess with this email: ${hostessEmail}`)
                })
        )
    })

    describe('authenticate business', () => {

        it('should authenticate the business', () =>
            logic.registerBusiness(businessEmail, password)
                .then(() => logic.authenticateBusiness(businessEmail, password))
                .then(token => {
                    expect(token).to.be.a('string')

                    let payload

                    expect(() => payload = jwt.verify(token, JWT_SECRET)).not.to.throw()
                    expect(payload.sub).to.equal(businessEmail)
                })

        )

        it('should fail on unregistered business', () =>
            logic.authenticateBusiness(businessEmail, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`Does not exist a company with this email: ${businessEmail}`)
                })
        )
    })

    describe('update hostess password', () => {

        it('should update the hostess password', () =>
            logic.registerHostess(hostessEmail, password)
                .then(() => logic.authenticateHostess(hostessEmail, password))
                .then((token) =>
                    logic.updatePasswordHostess(hostessEmail, password, '654321', token)
                        .then((res) =>
                            expect(res.message).to.equal('password updated')
                        )
                )
        )

        it('should fail with same new password', () =>
            logic.registerHostess(hostessEmail, password)
                .then(() => logic.authenticateHostess(hostessEmail, password))
                .then(token =>
                    logic.updatePasswordHostess(hostessEmail, password, password, token)
                        .catch(err => err)
                        .then(err => {
                            expect(err).to.exist
                            expect(err.message).to.equal('Same old password, be more creative')
                        })

                )

        )
    })

    describe('update business password', () => {

        it('should update the business password', () =>
            logic.registerBusiness(businessEmail, password)
                .then(() => logic.authenticateBusiness(businessEmail, password))
                .then((token) =>
                    logic.updatePasswordBusiness(businessEmail, password, '654321', token)
                        .then((res) =>
                            expect(res.message).to.equal('password updated')
                        )
                )
        )

        it('should fail with same new password', () =>
            logic.registerBusiness(businessEmail, password)
                .then(() => logic.authenticateBusiness(businessEmail, password))
                .then(token =>
                    logic.updatePasswordBusiness(businessEmail, password, password, token)
                        .catch(err => err)
                        .then(err => {
                            expect(err).to.exist
                            expect(err.message).to.equal('Same old password, be more creative')
                        })

                )

        )
    })

    describe('edit hostess profile', () => {

        it('should edit the hostess profile', () =>
            logic.registerHostess(hostessEmail, password)
                .then(() => logic.authenticateHostess(hostessEmail, password))
                .then(token =>
                    logic.editHostessProfile(hostessEmail, 'name', '07/10/1991', 'origin', 'gender', 'phone', ['languages'], 'jobType', 140, 'myself', ['skills'], 'photo', token))
                .then(res => {
                    expect(res.message).to.equal('hostess profile updated')
                })
        )
    })

    describe('edit business profile', () => {

        it('should edit the business profile', () =>
            logic.registerBusiness(businessEmail, password)
                .then(() => logic.authenticateBusiness(businessEmail, password))
                .then(token =>
                    logic.editBusinessProfile(businessEmail, 'name', 'web', 'boss name', 'phone num', 'philosophy', token))
                .then(res => {
                    expect(res.message).to.equal('company profile updated')
                })
        )
    })

    describe('unregister hostess', () => {

        it('should unregister the hostess', () =>
            logic.registerHostess(hostessEmail, password)
                .then(() => logic.authenticateHostess(hostessEmail, password))
                .then(token => logic.unregisterHostess(hostessEmail, password, token))
                .then(res => {
                    expect(res.message).to.equal('hostess deleted succesfully')
                })
        )
    })

    describe('unregister business', () => {

        it('should unregister the business', () =>
            logic.registerBusiness(businessEmail, password)
                .then(() => logic.authenticateBusiness(businessEmail, password))
                .then(token => logic.unregisterBusiness(businessEmail, password, token))
                .then(res => {
                    expect(res.message).to.equal('company deleted succesfully')
                })
        )
    })

    describe('search', () => {

        it('should search', () =>
            logic.registerHostess(hostessEmail, password)
                .then(() => logic.authenticateHostess(hostessEmail, password))
                .then(token => logic.editHostessProfile(hostessEmail, 'kim', '07/10/1991', 'Barcelona', 'W', '657946204', ['catalan', 'spanish', 'english'], 'info', 180, 'talking about me', ['skills'], 'photo', token))
                .then(() =>
                    logic.registerBusiness(businessEmail, password)
                        .then(() => logic.authenticateBusiness(businessEmail, password))
                        .then(token => logic.searchWorkers(businessEmail, 'W', 'info', 150, ['catalan'], token))
                        .then(hostesses => {
                            expect(hostesses[0].name).to.equal('kim')

                        })
                )
        )
    })



    describe('add hostess to favorites', () => {

        it('should add the hostess to the favorites of the company', () =>
            logic.registerBusiness(businessEmail, password)
                .then(() => logic.registerHostess(hostessEmail, password))
                .then(() => logic.authenticateBusiness(businessEmail, password))
                .then(token =>
                    logic.addFavs(hostessEmail, businessEmail, token)
                )
                .then(res => expect(res.status).to.equal('OK'))

        )
    })

    describe('add hostess to selected ones', () => {

        it('should select a hostes for the event', () =>
            logic.registerBusiness(businessEmail, password)
                .then(() => logic.registerHostess(hostessEmail, password))
                .then(() => logic.authenticateBusiness(businessEmail, password))
                .then(token =>
                    logic.addHostess(hostessEmail, businessEmail, token)
                )
                .then(res => expect(res.status).to.equal('OK'))
        )
    })

})


