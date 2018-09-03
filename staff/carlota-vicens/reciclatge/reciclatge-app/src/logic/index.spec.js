const logic = require('./index.js')
const axios = require('axios')
const { expect } = require('chai')



describe('logic', () => {
    /*function mockStorage() {
        var storage = {};
        return {
            setItem: function(key, value) {
                storage[key] = value || '';
            },
            getItem: function(key) {
                return storage[key];
            },
            removeItem: function(key) {
                delete storage[key];
            },
            get length () {
                return Object.keys(storage).length;
            },
            key: function(i) {
                var keys = Object.keys(storage);
                return keys[i] || null;
            }
        };
    }

    global['localStorage'] = mockStorage();
    global['sessionStorage'] = mockStorage();*/

    let email, password

    beforeEach(() => {
        email = `user${Math.random()}@gmail.com`, password = `123${Math.random()}`

    })

    describe('register user', () => {
        it('should succed on new user', () =>
            logic.register(email, password)
                .then(res => expect(res).to.be.true)
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

        it('should fail on undefined password', () =>
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

    describe('login', () => {

        it('should login on correct data', () =>
            logic.login(email, password)
                .then(res => {
                    expect(logic._userId).to.exist
                    expect(logic._userToken).to.exist
                    expect(logic._userEmail).to.equal(email)
                })
        )

        it('should fail on unregistered user', () =>
            logic.login(email, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`user ${email} does not exist`)
                })
        )

        it('should fail on empty email', () =>
            logic.login('', password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid email`)
                })
        )

        it('should fail on empty password', () =>
            logic.login(email, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        )

    })
/*
    describe('logout user', () => {
        beforeEach(() => {
            return logic.register(email, password)
                .then(() => logic.login(email, password))
        })

        it('should logout correctly', () => {
            expect(logic._userId).to.exist
            expect(logic._userToken).to.exist
            expect(logic._userEmail).to.exist

            logic.logout()

            expect(logic._userId).not.to.exist
            expect(logic._userToken).not.to.exist
            expect(logic._userEmail).not.to.exist      })
    })


    describe('update user', () => {
        beforeEach(() => {
            return logic.register(email, password)
                .then(() => logic.login(email, password))
        })

        it('should update email and password correctly', () => {
            const newEmail = email + '-' + Math.random()
            const newPassword = password + '-' + Math.random()

            return logic.update(password, newEmail, newPassword)
                .then(res => {
                    expect(res).to.be.true

                    return logic.login(newEmail, newPassword)
                })
                .then(res => expect(res).to.be.true)
        })

        it('should update email correctly', () => {
            const newEmail = email + '-' + Math.random()

            return logic.update(password, newEmail)
                .then(res => {
                    expect(res).to.be.true

                    return logic.login(newEmail, password)
                })
                .then(res => expect(res).to.be.true)
        })

        it('should update password correctly', () => {
            const newPassword = password + '-' + Math.random()

             logic.update(password, undefined, newPassword)
                .then(res => {
                    expect(res).to.be.true

                    return logic.login(email, newPassword)
                })
                .then(res => expect(res).to.be.true)
        })
    })*/



})
