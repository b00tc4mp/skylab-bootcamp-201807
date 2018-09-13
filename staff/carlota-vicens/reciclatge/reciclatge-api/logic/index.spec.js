require('dotenv').config()

const { logic } = require('.')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose
const User = require('../data/models/user')

const { env: { MONGO_URL } } = process


describe('logic', () => {
    const email = `user-${Math.random()}@mail.com`, password = `123-${Math.random()}`
    let _connection
    let usersCount = 0

    before(() =>
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )

    beforeEach(() =>
        Promise.all([
            User.deleteMany()
        ])
            .then(() => {
                let count = Math.floor(Math.random() * 100)

                const creations = []

                while (count--) creations.push({ email: `user-${Math.random()}@mail.com`, password: `123-${Math.random()}` })

                if (usersCount = creations.length)
                    return User.create(creations)
            })
    )

    describe('validate fields', () => {
        it('should succeed on correct value', () => {
            expect(() => logic._validateStringField('email', email).to.equal(email))
            expect(() => logic._validateStringField('password', password).to.equal(password))
        })

        it('should fail on undefined value', () => {
            expect(() => logic._validateStringField('name', undefined)).to.throw('invalid name')
        })

        it('should fail on empty value', () => {
            expect(() => logic._validateStringField('name', '')).to.throw('invalid name')
        })

        it('should fail on numeric value', () => {
            expect(() => logic._validateStringField('name', 123)).to.throw('invalid name')
        })
    })

    describe('register user', () => {
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
                .then(users => expect(users.length).to.equal(usersCount + 1))
        )

        it('should fail on trying to register an already registered user', () =>
            User.create({ email, password })
                .then(() => logic.register(email, password))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`user with ${email} email already exist`))
        )

        it('should fail on trying to register with an undefined email', () =>
            logic.register(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('User validation failed: email: Path `email` is required.'))
        )

        it('should fail on trying to register with an empty email', () =>
            logic.register('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('User validation failed: email: Path `email` is required.'))
        )

        it('should fail on trying to register with a numeric email', () =>
            logic.register(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('User validation failed: email: Path `email` is invalid (123).'))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.register(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('User validation failed: password: Path `password` is required.'))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.register(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('User validation failed: password: Path `password` is required.'))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.register(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('User validation failed: password: password length is too short'))
        )
    })

    describe('login user', () => {
        beforeEach(() => User.create({ email, password }))

        it('should login correctly', () =>
            logic.login(email, password)
                .then(res => {
                    expect(res).not.empty
                })
        )

        it('should fail on trying to login with an undefined email', () =>
            logic.login(undefined, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('user with undefined email does not exist'))
        )

        it('should fail on trying to login with an empty email', () =>
            logic.login('', password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('user with  email does not exist'))
        )

        it('should fail on trying to login with a numeric email', () =>
            logic.login(123, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('user with 123 email does not exist'))
        )

        it('should fail on trying to login with an undefined password', () =>
            logic.login(email, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('wrong password'))
        )

        it('should fail on trying to login with an empty password', () =>
            logic.login(email, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('wrong password'))
        )

        it('should fail on trying to login with a numeric password', () =>
            logic.login(email, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('wrong password'))
        )
    })

    describe('update password', () => {
        const newPassword = `${password}-${Math.random()}`

        beforeEach(() =>
            User.create({ email, password })
        )

        it('should succeed on correct passwords', () => {
            logic.update(email, password, newPassword)
                .then(res => {
                    expect(res).to.be.true

                    return users.findOne({ email })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.email).to.equal.email
                    expect(user.password).to.equal(newPassword)
                })
        })

        it('should fail on emptr.email', () => {
            logic.update('', password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        })

        it('should fail on empty password', () => {
            logic.update(email, '', newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        })

        it('should fail on empty new password', () =>
            logic.update(email, password, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid new password'))
        )

        it('should fail on numerir.email', () => {
            logic.update(123, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        })

        it('should fail on numeric password', () => {
            logic.update(email, 123, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        })

        it('should fail on numeric new password', () =>
            logic.update(email, password, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on undefiner.email', () => {
            logic.update(undefined, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalir.email`))
        })

        it('should fail on undefined password', () => {
            logic.update(email, undefined, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        })

        it('should fail on undefined new password', () =>
            logic.update(email, password, undefined)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on numerir.email', () => {
            logic.update(123, password, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalir.email`))
        })

        it('should fail on numeric password', () => {
            logic.update(email, 123, newPassword)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid password'))
        })

        it('should fail on numeric new password', () =>
            logic.update(email, password, 123)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`invalid new password`))
        )

        it('should fail on new password same as current password', () =>
            logic.update(email, password, password)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`new password cannot be same as current password`))
        )
    })


    after(() =>
        Promise.all([

            User.deleteMany()
        ])
            .then(() => _connection.disconnect())
    )
})