'use strict'
require('dotenv').config()

require('isomorphic-fetch')
const { expect } = require('chai')
const { logic, LogicError } = require('.')
const jwt = require('jsonwebtoken')

describe('logic', () => {
    const { JWT_SECRET } = process.env
    let email, name, adress, phone, password, latitude, longitude

    beforeEach(() => {

        email = `user${Math.random()}@gmail.com`,
            password = '123456',
            name = `edu${Math.random()}`,
            adress = `muntaner${Math.random()}`,
            phone = `123456789`,
            latitude = 123.344,
            longitude = 12.3423
    })

    !true && describe('register user', () => {
        it('should succeed on new user', () =>
            logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on already existing user', () =>
            logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.register(email, name, adress, phone, password, latitude, longitude))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`shelter with ${email} email already exist`)
                })
        )

        it('should fail on empty email', () =>
            logic.register('', name, adress, phone, password, latitude, longitude)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        )

        it('should fail on empty name user', () =>
            logic.register(email, '', adress, phone, password, latitude, longitude)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid name')
                })
        )

        it('should fail on undefined name', () => {
            logic.register(email, undefined, adress, phone, password, latitude, longitude)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid name')
                })
        })

        it('should fail on undefined email', () => {
            logic.register(undefined, name, adress, phone, password, latitude, longitude)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        })
    })

    !true && describe('login shelter', () => {
        it('should succeed on existing user', () =>
            logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then(res => {

                    expect(res.token).to.be.a('string')

                    let payload

                    expect(() => payload = jwt.verify(res.token, JWT_SECRET)).not.to.throw()

                    expect(payload.sub).to.equal(res.id)
                })
        )

        it('should fail on unregistered user', () =>
            logic.authenticate(email, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`shelter with ${email} email does not exist`)
                })
        )

        it('should fail on empty usermail', () =>
            logic.authenticate('', password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid email`)
                })
        )

        it('should fail on password user', () =>
            logic.authenticate(email, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        )
    })

    !true && describe('insert dog', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 1
        const weight = 10
        const photo = 'http://res.cloudinary.com/eduberenguer/image/upload/v1535653568/lexgoyjnwrmaoqmo1syw.jpg'
        const description = 'bla bla bla bla'

        it('should add dog', () => {
            return logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then(res => res)
                .then(res => {
                    return logic.insertDog(res.id, name, gender, age, weight, photo, description, res.token)
                        .then(({ message }) => {
                            expect(message).to.equal('Dog added correctly')
                        })

                })
        })

        it('should return an error at insert dog with an empty name', () => {
            return logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then(res => logic.insertDog(res.id, '', gender, age, weight, photo, description, res.token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err).to.throw
                    expect(err.message).to.equal('invalid name')
                })

        })
        it('should return an error at insert dog with an undefined name', () => {
            return logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then(res => logic.insertDog(res.id, undefined, gender, age, weight, photo, description, res.token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err).to.throw
                    expect(err.message).to.equal('invalid name')
                })

        })
        it('should return an error at insert dog with an numeric name', () => {
            return logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then(res => logic.insertDog(res.id, 123, gender, age, weight, photo, description, res.token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err).to.throw
                    expect(err.message).to.equal('invalid name')
                })

        })
        it('should return an error at insert dog with an empty gender', () => {
            return logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then(res => logic.insertDog(res.id, name, '', age, weight, photo, description, res.token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err).to.throw
                    expect(err.message).to.equal('invalid gender')
                })

        })
        it('should return an error at insert dog with an undefined gender', () => {
            return logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then(res => logic.insertDog(res.id, name, undefined, age, weight, photo, description, res.token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err).to.throw
                    expect(err.message).to.equal('invalid gender')
                })

        })
        it('should return an error at insert dog with an numeric gender', () => {
            return logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then(res => logic.insertDog(res.id, name, 123, age, weight, photo, description, res.token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err).to.throw
                    expect(err.message).to.equal('invalid gender')
                })

        })
        it('should return an error at insert dog with an string age', () => {
            return logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then(res => logic.insertDog(res.id, name, gender, '12', weight, photo, description, res.token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err).to.throw
                    expect(err.message).to.equal('invalid age')
                })

        })
        it('should return an error at insert dog with an empty age', () => {
            return logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then(res => logic.insertDog(res.id, name, gender, '', weight, photo, description, res.token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err).to.throw
                    expect(err.message).to.equal('invalid age')
                })

        })
        it('should return an error at insert dog with an undefined age', () => {
            return logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then(res => logic.insertDog(res.id, name, gender, undefined, weight, photo, description, res.token))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err).to.throw
                    expect(err.message).to.equal('invalid age')
                })

        })
    })

    !true && describe('remove dogs', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 1
        const weight = 10
        const photo = 'http://res.cloudinary.com/eduberenguer/image/upload/v1535653568/lexgoyjnwrmaoqmo1syw.jpg'
        const description = 'bla bla bla bla'

        it('should remove dog', () => {
            return logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then(data => logic.insertDog(data.id, name, gender, age, weight, photo, description, data.token)
                    .then(dogId => {
                        return logic.removeDog(data.id, dogId.id, data.token)
                            .then(({ message }) => {
                                expect(message).to.equal('Dog removed')
                            })
                    })
                )
        })
        it('should fail removing a non-existing dog', () => {
            let id = '5b8934eff7ff6f15f94a524f'
            return logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then((data) => {
                    return logic.removeDog(data.id, id, data.token)
                        .catch(({ message }) => message)
                        .then((message) => expect(message).to.equal(`Dog with id ${id} does not exist`))
                })
        })
    })

    !true && describe('dog adopted', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 1
        const weight = 10
        const photo = 'http://res.cloudinary.com/eduberenguer/image/upload/v1535653568/lexgoyjnwrmaoqmo1syw.jpg'
        const description = 'bla bla bla bla'

        it('should dog adopted', () => {
            return logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then(data => logic.insertDog(data.id, name, gender, age, weight, photo, description, data.token)
                    .then(dogId => {
                        return logic.dogAdopted(data.id, dogId.id, data.token)
                            .then(({ message }) => {
                                expect(message).to.equal('Dog adopted!')
                            })
                    })
                )
        })
    })

    !true && describe('list dogs not adopted', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 1
        const weight = 10
        const photo = 'http://res.cloudinary.com/eduberenguer/image/upload/v1535653568/lexgoyjnwrmaoqmo1syw.jpg'
        const description = 'bla bla bla bla'

        it('should list dogs not adopteds', () => {
            return logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then(data => logic.insertDog(data.id, name, gender, age, weight, photo, description, data.token))
                .then(() => {
                    return logic.listDogsNotAdopted()
                })
                .then((res) => {
                    expect(res).to.exist
                    expect(res[0].gender).to.equal('male')
                    expect(res[0].age).to.equal(1)
                    expect(res[0].weight).to.equal(10)
                    expect(res[0].description).to.equal(description)
                })
        })
    })

    !true && describe('list dogs adopted', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 1
        const weight = 10
        const photo = 'http://res.cloudinary.com/eduberenguer/image/upload/v1535653568/lexgoyjnwrmaoqmo1syw.jpg'
        const description = 'bla bla bla bla'

        it('should list dogs adopteds', () => {
            return logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then(data => logic.insertDog(data.id, name, gender, age, weight, photo, description, data.token)
                    .then(res => logic.dogAdopted(data.id, res.id, data.token))
                )
                .then(() => {
                    return logic.listDogsAdopted()
                })
                .then((res) => {
                    expect(res).to.exist
                    expect(res[0].gender).to.equal('male')
                    expect(res[0].age).to.equal(1)
                    expect(res[0].weight).to.equal(10)
                    expect(res[0].description).to.equal(description)
                })
        })
    })

    !true && describe('list dogs by shelter', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 1
        const weight = 10
        const photo = 'http://res.cloudinary.com/eduberenguer/image/upload/v1535653568/lexgoyjnwrmaoqmo1syw.jpg'
        const description = 'bla bla bla bla'

        it('should list dogs by shelter', () => {
            return logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then(data => logic.insertDog(data.id, name, gender, age, weight, photo, description, data.token)
                    .then(() => logic.insertDog(data.id, name, gender, age, weight, photo, description, data.token))
                    .then(() => {
                        return logic.listDogsByShelter(data.id, data.token)
                    })
                )
                .then((res) => {
                    expect(res.length).to.equal(2)
                })
        })

    })

    !true && describe('retrieve dog by id', () => {
        const name = `max-${Math.random()}`
        const gender = 'male'
        const age = 1
        const weight = 10
        const photo = 'http://res.cloudinary.com/eduberenguer/image/upload/v1535653568/lexgoyjnwrmaoqmo1syw.jpg'
        const description = 'bla bla bla bla'

        it('should list dogs by shelter', () => {
            return logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then(data => logic.insertDog(data.id, name, gender, age, weight, photo, description, data.token))
                .then(dog => {
                    return logic.retrieveDog(dog.id)
                })
                .then((res) => {
                    expect(res.name).to.equal(name)
                    expect(res.gender).to.equal('male')
                    expect(res.age).to.equal(1)
                    expect(res.weight).to.equal(weight)
                })
        })
    })

    !true && describe('retrieve shelter by id', () => {

        it('should list dogs by shelter', () => {
            return logic.register(email, name, adress, phone, password, latitude, longitude)
                .then(() => logic.authenticate(email, password))
                .then(data => logic.retrieveShelter(data.id))
                .then((res) => {
                    debugger
                    expect(res.email).to.equal(email)
                    expect(res.name).to.equal(name)
                    expect(res.adress).to.equal(adress)
                    expect(res.phone).to.equal(phone)
                    expect(res.password).to.equal(password)
                })
        })
    })
})
