'use strict'

require('dotenv').config()

require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
const jwt = require('jsonwebtoken')

describe('logic', () => {
    const { JWT_SECRET } = process.env
    let email, password, name
    const title = 'title', subtitle = 'subtitle', photo = 'http://res.cloudinary.com/locationssky/image/upload/v1535996939/kzoepp8xhrfb7wwy6iav.jpg', description = 'description', categories = ['Bathroom'], type = 'Penthouse'

    beforeEach(() => {
        email = `mail-${Math.random()}@gmail.com`, password = '123456', name = 'Jhon Doe'
    })

    !true && describe('register owner', () => {
        it('should succeed on new owner', () => 
            logic.register(name, email, password)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on already existing owner', () => {
            logic.register(name, email, password)
                .then(() => logic.register(name, email, password))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`owner ${name} already exist`)
                })

            }
        )

        it('should fail on empty owner name', () => {
            logic.register('', email, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid name`)
                })
        })

        it('should fail on undefined owner name', () => {
            logic.register(undefined, email, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid name`)
                })
        })

        it('should fail on empty owner email', () => {
            logic.register(name, '', password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid email`)
                })
        })

        it('should fail on undefined owner email', () => {
            logic.register(name, undefined, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid email`)
                })
        })

        it('should fail on empty owner password', () => {
            logic.register(name, email, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        })

        it('should fail on undefined owner password', () => {
            logic.register(name, email, undefined)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        })
    })

    !true && describe('authenticate owner', () => {
        it('should succeed on existing owner', () => {
            logic.register(name, email, password)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    expect(token).to.be.a('string')

                    let payload

                    expect(() => payload = jwt.verify(token, JWT_SECRET)).not.to.throw()
                    expect(payload.sub).to.equal(email)
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

    !true && describe('unregister owner', () => {
        it('should succeed on existing owner', () => {
            logic.register(name, email, password)
                .then(() => logic.authenticate(email, password))
                .then(token => logic.unregisterOwner(email, password, token))
                .then(res => expect(res).to.be.true)


            }
        )
    })

    !true && describe('delete property', () => {

        it('should delete property', () => {
            return logic.register(name, email, password)
                .then(() => {
                    return logic.authenticate(email, password)
                })
                .then(token => {
                    return logic.addProperty(email, title, subtitle, photo, description, categories, type, token)
                        .then(propertyId => {
                            return logic.deletePropertyById(email, propertyId, token)
                                .then(({message}) => expect(message).to.equal('property deleted succesfully'))
                        })
                })
        })
    })
})

