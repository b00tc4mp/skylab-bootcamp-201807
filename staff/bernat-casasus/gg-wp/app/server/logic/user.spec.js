require('dotenv').config()

const { logic } = require('./user')
const { expect } = require('chai')
const mongoose = require('mongoose')
const User = require('../data/models/user')

const { env: { MONGO_URL } } = process

describe('logic', () => {

    const email = `test-${Math.random()}@mail.com`
    const password = `123-${Math.random()}`
    const players = ['87654321', '87654322', '87654323']
    const id = '87654321'
    const invalidMail = 'wrongmail.com'
    const nonExistingMail = 'nonexistinguser@mail.com'

    let _connection

    before(() =>
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )

    beforeEach(() =>
        Promise.all([
            User.deleteMany()
        ])
    )

    true && describe('validate fields', () => {

        true && describe('validate string fields', () => {
            it('should succeed on correct value', () => {
                expect(() => logic._validateStringField('email', email).to.equal(email))
                expect(() => logic._validateStringField('password', password).to.equal(password))
            })

            it('should fail on undefined value', () => {
                expect(() => logic._validateStringField('name', undefined)).to.throw(`invalid name`)
            })

            it('should fail on empty value', () => {
                expect(() => logic._validateStringField('name', '')).to.throw(`invalid name`)
            })

            it('should fail on numeric value', () => {
                expect(() => logic._validateStringField('name', 123)).to.throw(`invalid name`)
            })
        })

        true && describe('validate id fields', () => {
            it('should succeed on correct value', () => {
                expect(() => logic._validateId(players[0]).to.equal(players[0]))
            })

            it('should fail on undefined value', () => {
                expect(() => logic._validateId(undefined)).to.throw(`invalid id`)
            })

            it('should fail on empty value', () => {
                expect(() => logic._validateId('')).to.throw(`invalid id`)
            })

            it('should fail on NaN value', () => {
                expect(() => logic._validateId(NaN)).to.throw(`invalid id`)
            })

            it('should fail on trying to add a player with a wrong id', () =>
                logic.addPlayer(email, '8765321ASD')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid id`))
            )
        })

        true && describe('validate email fields', () => {
            it('should succeed on correct value', () => {
                expect(() => logic._validateEmail(email).to.equal(email))
            })

            it('should fail on wrong email syntaxis', () => {
                expect(() => logic._validateEmail(invalidMail)).to.throw(`invalid email`)
            })

            it('should fail on undefined value', () => {
                expect(() => logic._validateEmail(undefined)).to.throw(`invalid email`)
            })

            it('should fail on empty value', () => {
                expect(() => logic._validateEmail('')).to.throw(`invalid email`)
            })

            it('should fail on numeric value', () => {
                expect(() => logic._validateEmail(123)).to.throw(`invalid email`)
            })
        })
    })

    true && describe('register user', () => {
        it('should register correctly', () =>
            User.findOne({ email })
                .then(user => {
                    expect(user).to.be.null

                    return logic.register(email, password)
                })
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)

                    return User.find()
                })
                .then(users => expect(users.length).to.equal(1))
        )

        it('should fail on trying to register an already registered user', () =>
            User.create({ email, password })
                .then(() => logic.register(email, password))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user with ${email} email already exist`))
        )

        it('should fail on trying to register with an wrong email syntaxis', () =>
            logic.register(invalidMail, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with an undefined email', () =>
            logic.register(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with an empty email', () =>
            logic.register('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with a numeric email', () =>
            logic.register(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.register(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.register(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.register(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    true && describe('authenticate user', () => {
        beforeEach(() => User.create({ email, password }))

        it('should login correctly', () =>
            logic.authenticate(email, password)
                .then(res => {
                    expect(res).to.be.true
                })
        )

        it('should fail on trying to login with a wrong email', () =>
            logic.authenticate(nonExistingMail, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user with ${nonExistingMail} email does not exist`))
        )

        it('should fail on trying to login with an wrong email syntaxis', () => {
            return logic.authenticate(invalidMail, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        })

        it('should fail on trying to login with an undefined email', () =>
            logic.authenticate(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to login with an empty email', () =>
            logic.authenticate('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to login with a numeric email', () =>
            logic.authenticate(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to login with an wrong password', () =>
            logic.authenticate(email, '0987654')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`wrong password`))
        )

        it('should fail on trying to login with an undefined password', () =>
            logic.authenticate(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login with an empty password', () =>
            logic.authenticate(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login with a numeric password', () =>
            logic.authenticate(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    true && describe('update user password', () => {
        const newPassword = `${password}-${Math.random()}`

        beforeEach(() => User.create({ email, password }))

        it('should update password correctly', () =>
            logic.updatePassword(email, password, newPassword)
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(newPassword)
                })
        )

        it('should fail on trying to update password with an non existing user email', () =>
            logic.updatePassword(nonExistingMail, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user with ${nonExistingMail} email does not exist`))
        )

        it('should fail on trying to update password with a wrong email syntaxis', () => {
            return logic.updatePassword(invalidMail, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        })

        it('should fail on trying to update password with an undefined email', () =>
            logic.updatePassword(undefined, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update password with an empty email', () =>
            logic.updatePassword('', password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update password with a numeric email', () =>
            logic.updatePassword(123, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update password with a wrong password', () =>
            logic.updatePassword(email, newPassword, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`wrong password`))
        )

        it('should fail on trying to update password with an undefined password', () =>
            logic.updatePassword(email, undefined, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update password with an empty password', () =>
            logic.updatePassword(email, '', newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update password with a numeric password', () =>
            logic.updatePassword(email, 123, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update password with the same password', () =>
            logic.updatePassword(email, password, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`new password must be different to old password`))
        )

        it('should fail on trying to update password with an undefined new password', () =>
            logic.updatePassword(email, password, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on trying to update password with an empty new password', () =>
            logic.updatePassword(email, password, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on trying to update password with a numeric new password', () =>
            logic.updatePassword(email, password, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )
    })

    true && describe('unregister user', () => {
        beforeEach(() => User.create({ email, password }))

        it('should unregister user correctly', () =>
            logic.unregisterUser(email, password)
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user).not.to.exist
                })
        )

        it('should fail on trying to unregister user with a non existing email', () =>
            logic.unregisterUser(nonExistingMail, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user with ${nonExistingMail} email does not exist`))
        )

        it('should fail on trying to unregister user with a wrong email syntaxis', () => {
            return logic.unregisterUser(invalidMail, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        })

        it('should fail on trying to unregister user with an undefined email', () =>
            logic.unregisterUser(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to unregister user with an empty email', () =>
            logic.unregisterUser('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to unregister user with a numeric email', () =>
            logic.unregisterUser(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to unregister user with a wrong password', () => {
            const password = '0987654'
            return logic.unregisterUser(email, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`wrong password`))
        })

        it('should fail on trying to unregister user with an undefined password', () =>
            logic.unregisterUser(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to unregister user with an empty password', () =>
            logic.unregisterUser(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to unregister user with a numeric password', () =>
            logic.unregisterUser(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid password`))
        )
    })

    true && describe('add player', () => {
        beforeEach(() => User.create({ email, password }))

        it('should add player to user correctly', () =>
            logic.addPlayer(email, id)
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user.players[0]).to.equal(id)
                })
        )

        it('should fail on trying to add an already added player', () => {
            return logic.addPlayer(email, id)
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user.players[0]).to.equal(id)
                })
                .then(() => {
                    return logic.addPlayer(email, id)
                        .catch(err => err)
                        .then(({ message }) => expect(message).to.equal(`the player already exist`))
                })
        })

        it('should fail on trying to add a player to user with a non existing email', () =>
            logic.addPlayer(nonExistingMail, id)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user with ${nonExistingMail} email does not exist`))
        )

        it('should fail on trying to add a player to user with a wrong email syntaxis', () => {
            return logic.addPlayer(invalidMail, id)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        })

        it('should fail on trying to add user with an undefined email', () =>
            logic.addPlayer(undefined, id)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add user with an empty email', () =>
            logic.addPlayer('', id)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add user with a numeric email', () =>
            logic.addPlayer(123, id)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to add a player with an undefined id', () =>
            logic.addPlayer(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )

        it('should fail on trying to add a player with an empty id', () =>
            logic.addPlayer(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )

        it('should fail on trying to add a player with a wrong id', () =>
            logic.addPlayer(email, '8765321ASD')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )
    })

    true && describe('list players', () => {
        beforeEach(() => User.create({ email, password, players }))

        it('should list players correctly', () =>
            logic.listPlayers(email)
                .then((playersList) => {
                    expect(playersList[0]).to.equal(players[0])
                    expect(playersList[1]).to.equal(players[1])
                    expect(playersList[2]).to.equal(players[2])
                })
        )

        it('should fail on trying to list players with a non existing email', () =>
            logic.listPlayers(nonExistingMail)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user with ${nonExistingMail} email does not exist`))
        )

        it('should fail on trying to list players with a wrong email syntaxis', () => {
            return logic.listPlayers(invalidMail)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        })

        it('should fail on trying to list players with an undefined email', () =>
            logic.listPlayers(undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to list players with an empty email', () =>
            logic.listPlayers('')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to list players with a numeric email', () =>
            logic.listPlayers(123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )
    })

    true && describe('remove players', () => {
        beforeEach(() => User.create({ email, password, players }))

        it('should remove player correctly', () =>
            logic.removePlayer(email, players[0])
                .then(() => {
                    return User.findOne({ email })
                })
                .then(user => {
                    expect(user.players[0]).to.equal(players[1])
                    expect(user.players[1]).to.equal(players[2])

                })
        )

        it('should fail on trying to remove player that does not exist', () => {
            const nonExistingId = '012836451'
            return logic.removePlayer(email, nonExistingId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`player does not exist`))
        })

        it('should fail on trying to remove player to user with a non existing email', () => 

            logic.removePlayer(nonExistingMail, id)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user with ${nonExistingMail} email does not exist`))
        )

        it('should fail on trying to remove a player to user with a wrong email syntaxis', () => {
            return logic.removePlayer(invalidMail, id)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        })

        it('should fail on trying to remove user with an undefined email', () =>
            logic.removePlayer(undefined, id)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to remove user with an empty email', () =>
            logic.removePlayer('', id)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to remove user with a numeric email', () =>
            logic.removePlayer(123, id)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to remove a player with an undefined id', () =>
            logic.removePlayer(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )

        it('should fail on trying to remove a player with an empty id', () =>
            logic.removePlayer(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )

        it('should fail on trying to remove a player with a wrong id', () =>
            logic.removePlayer(email, '8765321ASD')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid id`))
        )
    })

    after(() =>
        User.deleteMany()
            .then(() => _connection.disconnect())
    )
})