'use strict'

require('dotenv').config()

// require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
// const FormData = require('form-data')
const jwt = require('jsonwebtoken')

// global.FormData = FormData

describe('logic', () => {
    const { JWT_SECRET } = process.env
    let email, password, name, propertyId
    const title = 'title', subtitle = 'subtitle', photo = 'http://photo.com', description = 'description', dimentions = 200, categories = ['Bathroom', 'Balcony'], type = 'Penthouse'

    beforeEach(() => {
        email = `mail-${Math.random()}`, password = '123456', name = 'Jhon Doe'
    })

    !true && describe('register owner', () => {
        it('should succeed on new owner', () => {
            logic.register(email, password, name)
                .then(res => expect(res).to.be.true)
        }
        )

        it('should fail on already existing owner', () => {
            logic.register(email, password, name)
                .then(() => logic.register(email, password, name))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`owner ${name} already exist`)
                })
        })

        it('should fail on empty owner email', () => {
            logic.register('', password, name)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid email`)
                })
        })

        it('should fail on undefined owner email', () => {
            logic.register(undefined, password, name)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid email`)
                })
        })

        it('should fail on empty owner password', () => {
            logic.register(email, '', name)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        })

        it('should fail on undefined owner password', () => {
            logic.register(email, undefined, name)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        })

        it('should fail on empty owner name', () => {
            logic.register(email, password, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid name`)
                })
        })

        it('should fail on undefined owner name', () => {
            logic.register(email, password, undefined)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid name`)
                })
        })
    })

    !true && describe('authenticate owner', () => {
        it('should succeed on existing owner', () => {
            logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    expect(token).to.be.a('string')

                    let payload

                    expect(() => payload = jwt.verify(token, JWT_SECRET)).not.to.throw()
                    expect(payload.sub).to.equal(usermail)
                })
        })

        it('should fail on unregistered owner', () => {
            logic.authenticate(email, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`user ${email} does not exist`)
                })
        })

        it('should fail on empty email', () => {
            logic.authenticate('', password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid email`)
                })
        })

        it('should fail on password owner', () => {
            logic.authenticate(email, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        })
    })

    !true && describe('delete property', () => {

        it('should delete property', () => {
            return logic.register(email, password, name)
                .then(() => logic.authenticate(email, password))
                .then(token => logic.addProperty(email, title, subtitle, photo, description, dimentions, categories, type, token)
                    .then(({ propertyId }) => {
                        return logic.deletePropertyById(email, propertyId, token)
                            .then(({ message }) => expect(message).to.equal('Property deleted succesfully'))
                    })
                )
        })
        // it('should fail deleting a non-existing note', () => {
        //     let id = 'pepito'
        //     return logic.register(usermail, password)
        //         .then(() => logic.login(usermail, password))
        //         .then((token) => {
        //             return logic.deleteNote(usermail, id, token)
        //                 .catch(({ message }) => message)
        //                 .then((message) => expect(message).to.equal(`note ${id} does not exist`))
        //         })
        // })
    })






})

