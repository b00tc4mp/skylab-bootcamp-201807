'use strict'

require('dotenv').config()

require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
const jwt = require('jsonwebtoken')

describe('logic', () => {
    const { JWT_SECRET } = process.env
    let email, password, name
    const title = 'title', subtitle = 'subtitle', photo = 'http://res.cloudinary.com/locationssky/image/upload/v1536837487/pesd11dkwkv3b5wlxawv.jpg', description = 'description', categories = ['Bathroom'], type = 'Penthouse'

    beforeEach(() => {
        email = `mail-${Math.random()}@gmail.com`, password = '123456', name = 'Jhon Doe'
    })

    !true && describe('register owner', () => {
        it('should succeed on new owner', () => 
            logic.register(name, email, password)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on already existing owner', () => {
            return logic.register(name, email, password)
                .then(() => logic.register(name, email, password))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`owner with ${email} email already exist`)
                })
            }
        )

        it('should fail on empty owner name', () => {
            return logic.register('', email, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid name`)
                })
        })

        it('should fail on undefined owner name', () => {
            return logic.register(undefined, email, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid name`)
                })
        })

        it('should fail on empty owner email', () => {
            return logic.register(name, '', password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid email`)
                })
        })

        it('should fail on undefined owner email', () => {
            return logic.register(name, undefined, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid email`)
                })
        })

        it('should fail on empty owner password', () => {
           return logic.register(name, email, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        })

        it('should fail on undefined owner password', () => {
            return logic.register(name, email, undefined)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        })
    })

    !true && describe('authenticate owner', () => {
        it('should succeed on existing owner', () => {
            return logic.register(name, email, password)
                .then(() => logic.authenticate(email, password))
                .then(res => {
                    expect(res).to.be.an('object')
                    expect(res).to.have.property('token')
                    expect(res).to.have.property('id')
                    expect(res).to.have.property('message')

                    let token = res.token
                    let payload

                    expect(() => payload = jwt.verify(token, JWT_SECRET)).not.to.throw()
                    expect(payload.sub).to.equal(email)
                })
        })

        it('should fail on unregistered owner', () => {
            return logic.authenticate(email, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`owner with ${email} email does not exist`)
                })
        })

        it('should fail on empty email', () => {
            return logic.authenticate('', password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid email`)
                })
        })

        it('should fail on password owner', () => {
           return logic.authenticate(email, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        })
    })

    !true && describe('unregister owner', () => {
        it('should succeed on existing owner', () => {
            return logic.register(name, email, password)
                .then(() => logic.authenticate(email, password))
                .then(res => logic.unregisterOwner(email, password, res.token))
                .then(res => expect(res).to.be.true)
            }
        )
    })

    true && describe('add property', () => {
        it('should add a property correctly', () => {
            return logic.register(name, email, password)
                .then(() => {
                    return logic.authenticate(email, password)
                })
                .then(res => {
                    return logic.addProperty(email, title, subtitle, photo, description, categories, type, res.token)
                        .then(data => {
                            expect(data.message).to.equal('property added')
                            expect(data.id).to.exist
                        })
                })
        })

        it('should add a property correctly', () => {
            return logic.register(name, email, password)
                .then(() => {
                    return logic.authenticate(email, password)
                })
                .then(res => {
                    return logic.addProperty(email, title, subtitle, photo, description, categories, type, res.token)
                        .then(data => {
                            expect(data.message).to.equal('property added')
                            expect(data.id).to.exist
                        })
                })
        })
    })

    !true && describe('delete property', () => {

        it('should delete property', () => {
            return logic.register(name, email, password)
                .then(() => {
                    return logic.authenticate(email, password)
                })
                .then(res => {
                    return logic.addProperty(email, title, subtitle, photo, description, categories, type, res.token)
                        .then(({id}) => {
                            return logic.deletePropertyById(email, id, res.token)
                                .then(({message}) => expect(message).to.equal('property deleted succesfully'))
                        })
                })
        })
    })
})

