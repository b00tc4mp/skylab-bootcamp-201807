const { expect } = require('chai')
const logic = require('.')


describe('logic', () => {
    let email, password


    beforeEach(() => {
        email = `user${Math.random()}@gmail.com`
        password = `123${Math.random()}`
    })


    describe('register user', () => {
        it('should succed in correct credentials', () =>
            logic.regiter(email, password)
                .then(res => expect(res).to.be.true)
        )
        it('should fail on already registered user', () =>
            logic.register(email, password)
                .then(() => logic.register(email, password))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`user ${email} already exists`)
                })
        )
        it('should fail on empty email', () =>
            logic.register('', password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        )
        it('should fail on undefined email', () =>
            logic.register(undefined, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        )
        it('should fail on numeric email', () =>
            logic.register(123, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        )
        it('should fail on empty password', () =>
            logic.register(email, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid password')
                })
        )
        it('should fail on undefiend password', () =>
            logic.register(email, undefined)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid password')
                })
        )
        it('should fail on numeric password', () =>
            logic.register(email, 123)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid password')
                })
        )

    })
    describe('login user', () => {

        it('should succeed on existing user', () =>
            logic.register(email, password)
                .then(() => logic.login(email, password))

        )
        it('should fail on unregistered user', () =>
            logic.login(email, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`user ${email} does not exist`)
                }
                )
        )

        it('should fail on empty email', () =>
            logic.login('', password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        )

        it('should fail on empty password user', () =>
            logic.login(email, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid password')
                })
        )
        it('should fail on undefined email', () =>
            logic.login(undefined, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        )

        it('should fail on undefined password user', () =>
            logic.login(email, undefined)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid password')
                })
        )
        it('should fail on numeric email', () =>
            logic.login(123, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        )

        it('should fail on numeric password user', () =>
            logic.login(email, 123)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid password')
                })
        )

    })
})
