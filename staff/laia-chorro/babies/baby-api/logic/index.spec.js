require('dotenv').config()

const { logicUser, logicProduct, validate } = require('./index.js')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose
const { Review, Product, User } = require('../data/models')

const { env: { MONGO_URL } } = process


describe('logic', () => {
    const email = `laia-chorro-${Math.random()}@mail.com`, password = `123-${Math.random()}`
    let _connection
    let usersCount = 0

    before(() =>
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )

    const score = 4, text = 'My review from me to you',
        product1 = {
            title: 'My title product',
            description: 'My description of my product',
            price: 23,
            photos: 'url_photo',
        },
        product2 = {
            title: 'My second title product',
            description: 'My second description of my product',
            price: 232,
            photos: 'second_url_photo',
        }


    beforeEach(() =>
        Promise.all([
            Product.deleteMany(),
            User.deleteMany()
        ])
            .then(() => {
                let count = Math.floor(Math.random() * 100)

                const creations = []

                while (count--) creations.push({ email: `other-${Math.random()}@mail.com`, password: `123-${Math.random()}` })

                if (usersCount = creations.length)
                    return User.create(creations)
            })
    )

    !true && describe('validate fields', () => {
        it('should succeed on correct value', () => {
            expect(() => validate._stringField('email', email).to.equal(email))
            expect(() => validate._stringField('password', password).to.equal(password))
        })

        it('should fail on undefined value', () => {
            expect(() => validate._stringField('name', undefined)).to.throw(`invalid name`)
        })

        it('should fail on empty value', () => {
            expect(() => validate._stringField('name', '')).to.throw(`invalid name`)
        })

        it('should fail on numeric value', () => {
            expect(() => validate._stringField('name', 123)).to.throw(`invalid name`)
        })
    })

    !true && describe('user logic', () => {
        !true && describe('register user', () => {
            it('should register correctly', () =>
                User.findOne({ email })
                    .then(user => {
                        expect(user).to.be.null
    
                        return logicUser.register(email, password)
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
                    .then(() => logicUser.register(email, password))
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`user with ${email} email already exist`))
            )
    
            it('should fail on trying to register with an undefined email', () =>
                logicUser.register(undefined, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to register with an empty email', () =>
                logicUser.register('', password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to register with a numeric email', () =>
                logicUser.register(123, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to register with an undefined password', () =>
                logicUser.register(email, undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to register with an empty password', () =>
                logicUser.register(email, '')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to register with a numeric password', () =>
                logicUser.register(email, 123)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to register with 6 empty spaces as a password', () =>
                logicUser.register(email, '      ')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to register with a password containing empty spaces', () =>
                logicUser.register(email, 'pa ssword')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to register with a password starting and ending with empty spaces', () =>
                logicUser.register(email, ' password ')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to register with a too short password', () =>
                logicUser.register(email, '123')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password length is too short'))
            )
        })
    
        !true && describe('authenticate user', () => {
            beforeEach(() => User.create({ email, password }))
    
            it('should login correctly', () =>
                logicUser.authenticate(email, password)
                    .then(user => {
                        expect(user).to.exist
                    })
            )
    
            it('should fail on trying to login with an undefined email', () =>
                logicUser.authenticate(undefined, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to login with an empty email', () =>
                logicUser.authenticate('', password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to login with a numeric email', () =>
                logicUser.authenticate(123, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to login with an undefined password', () =>
                logicUser.authenticate(email, undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to login with an empty password', () =>
                logicUser.authenticate(email, '')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to login with a numeric password', () =>
                logicUser.authenticate(email, 123)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to login with 6 empty spaces as a password', () =>
                logicUser.authenticate(email, '      ')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to login with a password containing empty spaces', () =>
                logicUser.authenticate(email, 'pa ssword')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to login with a password starting and ending with empty spaces', () =>
                logicUser.authenticate(email, ' password ')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to login with a too short password', () =>
                logicUser.authenticate(email, '123')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password length is too short'))
            )
        })
    
        !true && describe('update password from user', () => {
            const newPassword = `${password}-${Math.random()}`
            let userId, user
            
    
            beforeEach(() => 
                User.create({ email, password })
                    .then(_user => user = userId = _user.id )
            )
    
            it('should update password correctly', () =>
                logicUser.updatePassword(user, password, newPassword)
                    .then(res => {
                        expect(res).to.be.true
    
                        return User.findById(user)
                    })
                    .then(user => {
                        expect(user).to.exist
                        expect(user.id).to.equal(userId)
                        expect(user.password).to.equal(newPassword)
                    })
            )
    
            it('should fail on trying to update password with an undefined user', () =>
                logicUser.updatePassword(undefined, password, newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid user`))
            )
    
            it('should fail on trying to update password with an empty user', () =>
                logicUser.updatePassword('', password, newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid user`))
            )
    
            it('should fail on trying to update password with a numeric user', () =>
                logicUser.updatePassword(123, password, newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid user`))
            )
    
            it('should fail on trying to update password with an undefined password', () =>
                logicUser.updatePassword(user, undefined, newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to update password with an empty password', () =>
                logicUser.updatePassword(user, '', newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to update password with a numeric password', () =>
                logicUser.updatePassword(user, 123, newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to update password with 6 empty spaces as a password', () =>
                logicUser.updatePassword(user, '      ', newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to update password with a password containing empty spaces', () =>
                logicUser.updatePassword(user, 'pa ssword', newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to update password with a password starting and ending with empty spaces', () =>
                logicUser.updatePassword(user, ' password ', newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to update password with a too short password', () =>
                logicUser.updatePassword(user, '123', newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password length is too short'))
            )
    
            it('should fail on trying to update password with an undefined new password', () =>
                logicUser.updatePassword(user, password, undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid new password`))
            )
    
            it('should fail on trying to update password with an empty new password', () =>
                logicUser.updatePassword(user, password, '')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid new password`))
            )
    
            it('should fail on trying to update password with a numeric new password', () =>
                logicUser.updatePassword(user, password, 123)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid new password`))
            )
    
            it('should fail on trying to update password with the same old value in the new password', () =>
                logicUser.updatePassword(user, password, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`new password must be different from old password`))
            )
    
            it('should fail on trying to update password with 6 empty spaces as the new password', () =>
                logicUser.updatePassword(user, password, '      ')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('new password cannot contain any space'))
            )
    
            it('should fail on trying to update password with a new password containing empty spaces', () =>
                logicUser.updatePassword(user, password, 'pa ssword')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('new password cannot contain any space'))
            )
    
            it('should fail on trying to update password with a new password starting and ending with empty spaces', () =>
                logicUser.updatePassword(user, password, ' password ')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('new password cannot contain any space'))
            )
    
            it('should fail on trying to update password with a too short new password', () =>
                logicUser.updatePassword(user, password, '123')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('new password length is too short'))
            )
        })
    
        !true && describe('update email from user', () => {
            const newEmail = `laia-chorro-${Math.random()}@mail.com`
            let userId, user
            
    
            beforeEach(() => 
                User.create({ email, password })
                    .then(_user => user = userId = _user.id )
            )
    
            it('should update email correctly', () =>
                logicUser.updateEmail(user, email, newEmail)
                    .then(res => {
                        expect(res).to.be.true
    
                        return User.findById(user)
                    })
                    .then(user => {
                        expect(user).to.exist
                        expect(user.id).to.equal(userId)
                        expect(user.email).to.equal(newEmail)
                    })
            )
    
            it('should fail on trying to update email with an undefined user', () =>
                logicUser.updateEmail(undefined, email, newEmail)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid user`))
            )
    
            it('should fail on trying to update email with an empty user', () =>
                logicUser.updateEmail('', email, newEmail)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid user`))
            )
    
            it('should fail on trying to update email with a numeric user', () =>
                logicUser.updateEmail(123, email, newEmail)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid user`))
            )
    
            it('should fail on trying to update email with an undefined email', () =>
                logicUser.updateEmail(user, undefined, newEmail)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to update email with an empty email', () =>
                logicUser.updateEmail(user, '', newEmail)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to update email with a numeric email', () =>
                logicUser.updateEmail(user, 123, newEmail)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to update email with an undefined new email', () =>
                logicUser.updateEmail(user, email, undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to update email with an empty new email', () =>
                logicUser.updateEmail(user, email, '')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to update email with a numeric new email', () =>
                logicUser.updateEmail(user, email, 123)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to update email with the same old value in the new email', () =>
                logicUser.updateEmail(user, email, email)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`new email must be different from old email`))
            )
        })

        !true && describe('update info profile from user', () => {
            const Barcelona = [2.168365, 41.346176] //[Long, Lat]
            const name = 'Laia', surname = 'Chorro', birth = new Date('1989-03-27'), gender = 'female', location = Barcelona
            const completeData = {name, surname, birth, gender, location},
                partialData = {name, surname, birth},
                nonExistentFieldInData = {made_up_field: 'does not exists'},
                inValidFieldInData = {name: 123}
            let userId, user
            
    
            beforeEach(() => 
                User.create({ email, password })
                    .then(_user => user = userId = _user.id )
            )
    
            it('should update profile correctly with all possible fields from data', () =>
                logicUser.updateProfile(userId, completeData)
                    .then(res => {
                        expect(res).to.be.true
    
                        return User.findById(userId)
                    })
                    .then(user => {
                        expect(user).to.exist
                        expect(user.id).to.equal(userId)
                        expect(user.name).to.equal(name)
                        expect(user.surname).to.equal(surname)
                        expect(user.birth).to.deep.equal(birth)
                        expect(user.gender).to.equal(gender)
                        expect(user.location[0]).to.equal(location[0])
                        expect(user.location[1]).to.equal(location[1])
                    })
            )

            it('should update profile correctly with some but not all fields from data', () =>
                logicUser.updateProfile(userId, partialData)
                    .then(res => {
                        expect(res).to.be.true
    
                        return User.findById(userId)
                    })
                    .then(user => {
                        expect(user).to.exist
                        expect(user.id).to.equal(userId)
                        expect(user.name).to.equal(name)
                        expect(user.surname).to.equal(surname)
                        expect(user.birth).to.deep.equal(birth)
                    })
            )

            it('should fail on trying to update profile with a non existent field in data', () =>
                logicUser.updateProfile(userId, nonExistentFieldInData)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('is not possible to update the user profile with the data provided in made_up_field'))
            )

            it('should fail on trying to update profile with an undefined user', () =>
                logicUser.updateProfile(undefined, completeData)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid user`))
            )
    
            it('should fail on trying to update profile with an empty user', () =>
                logicUser.updateProfile('', completeData)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid user`))
            )
    
            it('should fail on trying to update profile with a numeric user', () =>
                logicUser.updateProfile(123, completeData)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid user`))
            )

            it('should fail on trying to update profile with an undefined data', () =>
                logicUser.updateProfile(userId, undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('data for the profile updating is not defined'))
            )
    
            it('should fail on trying to update profile with an empty data', () =>
                logicUser.updateProfile(userId, '')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('data for the profile updating is not defined'))
            )
    
            it('should fail on trying to update profile with a numeric data', () =>
                logicUser.updateProfile(userId, 123)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid profile info data'))
            )

            it('should fail on trying to update profile with a non valid existent field', () =>
                logicUser.updateProfile(userId, inValidFieldInData)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid name'))
            )
        })
    
        !true && describe('unregister user', () => {
            beforeEach(() => User.create({ email, password }))
    
            it('should unregister user correctly', () =>
                logicUser.unregisterUser(email, password)
                    .then(res => {
                        expect(res).to.be.true
    
                        return User.findOne({ email })
                    })
                    .then(user => {
                        expect(user).not.to.exist
                    })
            )
    
            it('should fail on trying to unregister user with an undefined email', () =>
                logicUser.unregisterUser(undefined, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to unregister user with an empty email', () =>
                logicUser.unregisterUser('', password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to unregister user with a numeric email', () =>
                logicUser.unregisterUser(123, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to unregister user with an undefined password', () =>
                logicUser.unregisterUser(email, undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to unregister user with an empty password', () =>
                logicUser.unregisterUser(email, '')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to unregister user with a numeric password', () =>
                logicUser.unregisterUser(email, 123)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
        })
    
        !true && describe('add review', () => {
            const userFrom = { email, password },
                email2 = `laia-chorro2-${Math.random()}@mail.com`,
                userTo = { email: email2, password },
                users = [userFrom, userTo]
            
            let idUserFrom, idUserTo, idProd
    
            beforeEach(() => 
                User.insertMany(users)
                    .then(() => User.findOne({ email }))
                    .then(_userFrom => idUserFrom = _userFrom.id)
                    .then(() => User.findOne({ email: email2 }))
                    .then(_userTo => idUserTo = _userTo.id)
                    .then(() => Product.create({user: idUserTo, ...product1 }))
                    .then(prod => idProd = prod.id)
            )
    
            it('should save review on correct data', () =>
                logicUser.addReview(idUserFrom, idUserTo, score, idProd, text)
                    .then(res => {
                        expect(res).to.be.true
    
                        return User.findById(idUserTo)
                    })
                    .then(user => {
                        expect(user).to.exist
    
                        expect(user.reviews).to.exist
                        expect(user.reviews.length).to.equal(1)
                        expect(user.reviews[0].score).to.equal(score)
                        expect(user.reviews[0].description).to.equal(text)
                    })
            )
    
            it('should fail on trying to add a review with an undefined idUserFrom', () =>
                logicUser.addReview(undefined, idUserTo, score, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in userFrom'))
            )
    
            it('should fail on trying to add a review with an empty idUserFrom', () =>
                logicUser.addReview('', idUserTo, score, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in userFrom'))
            )
    
            it('should fail on trying to add a review with an invalid idUserFrom', () =>
                logicUser.addReview('fake userFrom id', idUserTo, score, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in userFrom'))
            )
    
            it('should fail on trying to add a review with an undefined idUserTo', () =>
                logicUser.addReview(idUserFrom, undefined, score, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in userTo'))
            )
    
            it('should fail on trying to add a review with an empty idUserTo', () =>
                logicUser.addReview(idUserFrom, '', score, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in userTo'))
            )
    
            it('should fail on trying to add a review with an invalid idUserTo', () =>
                logicUser.addReview(idUserFrom, 'fake userTo id', score, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in userTo'))
            )
    
            it('should fail on trying to add a review with an undefined score', () =>
                logicUser.addReview(idUserFrom, idUserTo, undefined, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid score'))
            )
    
            it('should fail on trying to add a review with an empty score', () =>
                logicUser.addReview(idUserFrom, idUserTo, '', idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid score'))
            )
    
            it('should fail on trying to add a review with a float score', () =>
                logicUser.addReview(idUserFrom, idUserTo, 2.3, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid score'))
            )
    
            it('should fail on trying to add a review with a too big score', () =>
                logicUser.addReview(idUserFrom, idUserTo, 6, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid score'))
            )
    
            it('should fail on trying to add a review with a too low score', () =>
                logicUser.addReview(idUserFrom, idUserTo, -1, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid score'))
            )
    
            it('should fail on trying to add a review with an undefined idUserTo', () =>
                logicUser.addReview(idUserFrom, idUserTo, score, undefined, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in idProd'))
            )
    
            it('should fail on trying to add a review with an empty idUserTo', () =>
                logicUser.addReview(idUserFrom, idUserTo, score, '', text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in idProd'))
            )
    
            it('should fail on trying to add a review with an invalid idUserTo', () =>
                logicUser.addReview(idUserFrom, idUserTo, score, 'fake idProd id', text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in idProd'))
            )
    
            it('should fail on trying to add a review with an undefined description', () =>
                logicUser.addReview(idUserFrom, idUserTo, score, idProd, undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid description`))
            )
    
            it('should fail on trying to add a review with an empty description', () =>
                logicUser.addReview(idUserFrom, idUserTo, score, idProd, '')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid description`))
            )
    
            it('should fail on trying to add a review with a numeric description', () =>
                logicUser.addReview(idUserFrom, idUserTo, score, idProd, 123)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid description`))
            )
    
            it('should fail on trying to add a review with a description longer than the maximum length permited', () => {
                const tooLongDesc = 'Lorem ipsum dolor sit amet, quo ut denique incorrupte, audiam voluptaria no nec, quo maiorum mnesarchum an. Eu pri albucius voluptatum, sed suscipit partiendo at, quando debitis scriptorem eu vim. Vis ex perfecto democritum liberavisse, vel modus ignota graeci ea. Quis suas debet in vis. Ne sed modo elit animal, cu expetendis consectetuer eam, eam possim maiestatis contentiones te. Sea an ignota instructior, cum mentitum laboramus deseruisse id, nam magna discere at. Laudem maiorum sed no, ne sit audiam malorum. Lorem ipsum dolor sit amet, quo ut denique incorrupte, audiam voluptaria no nec, quo maiorum mnesarchum an. Eu pri albucius voluptatum, sed suscipit partiendo at, quan.'
                return logicUser.addReview(idUserFrom, idUserTo, score, idProd, tooLongDesc)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('User validation failed: reviews.0.description: Path `description` (`' + tooLongDesc + '`) is longer than the maximum allowed length (650).'))
            })
        })
    
        !true && describe('list public user', () => {
            const userFrom = { email, password, name: 'Laia', surname: 'Chorro' },
                email2 = `laia-chorro2-${Math.random()}@mail.com`,
                userTo = { email: email2, password, name: 'Fulanito', surname: 'Mengano' },
                users = [userFrom, userTo]
            
            let idUserFrom, idUserTo, idProd1, idProd2, reviews
    
            beforeEach(() => 
                User.insertMany(users)
                    .then(() => User.findOne({ email }))
                    .then(_userFrom => {
                        idUserFrom = _userFrom.id
                        return User.findOne({ email: email2 })
                    })
                    .then(_userTo => {
                        idUserTo = _userTo.id
                        return Product.create({user: idUserTo, ...product1 })
                    })
                    .then(prod => {
                        idProd1 = prod.id
                        return Product.create({user: idUserTo, ...product2 })
                    })
                    .then(prod2 => {
                        idProd2 = prod2.id
                        return User.findById(idUserTo)
                    })
                    .then(_userTo => {
    
                        _userTo.products.push(idProd1, idProd2)
    
                        reviews = [
                            { user_from: idUserFrom, score, product: idProd1, description: text,  },
                            { user_from: idUserFrom, score: 5, product: idProd2, description: 'Second review',  },
                        ]
    
                        reviews.map(review => new Review(review)).forEach(review => _userTo.reviews.push(review))
    
                        return _userTo.save()
                    })
            )
    
            it('should only list public user info on correct user id', () =>
                logicUser.listPublicUser(idUserTo)
                    .then(user => {
                        expect(user).to.exist
    
                        expect(user.reviews).to.exist
                        expect(user.reviews.length).to.equal(2)
                        expect(user.reviews[0].score).to.equal(score)
                        expect(user.reviews[0].description).to.equal(text)
    
                        let newerProd = user.products[0]
                        expect(user.products).to.exist
                        expect(user.products.length).to.equal(2)
                        expect(newerProd.id).to.equal(idProd2)
                        expect(newerProd.description).to.equal(product2.description)
    
                        expect(user.location).to.exist
                        expect(user.location.length).to.equal(2)
    
                        expect(user.publicName).to.equal('Fulanito M.')
                        expect(user.avg_score).to.equal(4.5)
                    })
            )
    
            it('should fail on trying to list public user info with an undefined id user', () =>
                logicUser.listPublicUser(undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in user'))
            )
    
            it('should fail on trying to list public user info with an empty id user', () =>
                logicUser.listPublicUser('')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in user'))
            )
    
            it('should fail on trying to list public user info with an invalid id user', () =>
                logicUser.listPublicUser('fake userId')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in user'))
            )
    
            it('should not list private field password on public user', () =>
                logicUser.listPublicUser(idUserTo)
                    .then(user => {
                        expect(user.password).not.to.exist
                })
            )
        })
    
        !true && describe('list private user', () => {
            const userFrom = { email, password },
                email2 = `laia-chorro2-${Math.random()}@mail.com`,
                userTo = { email: email2, password },
                users = [userFrom, userTo]
            
            let idUserFrom, idUserTo, idProd1, idProd2, reviews
    
            beforeEach(() => 
                User.insertMany(users)
                    .then(() => User.findOne({ email }))
                    .then(_userFrom => {
                        idUserFrom = _userFrom.id
                        return User.findOne({ email: email2 })
                    })
                    .then(_userTo => {
                        idUserTo = _userTo.id
                        return Product.create({user: idUserTo, ...product1 })
                    })
                    .then(prod => {
                        idProd1 = prod.id
                        return Product.create({user: idUserTo, ...product2 })
                    })
                    .then(prod2 => {
                        idProd2 = prod2.id
                        return User.findById(idUserTo)
                    })
                    .then(_userTo => {
    
                        _userTo.products.push(idProd1, idProd2)
    
                        reviews = [
                            { user_from: idUserFrom, score, product: idProd1, description: text,  },
                            { user_from: idUserFrom, score: 5, product: idProd2, description: 'Second review',  },
                        ]
    
                        reviews.map(review => new Review(review)).forEach(review => _userTo.reviews.push(review))
    
                        return _userTo.save()
                    })
            )
    
            it('should only list private user info on correct user id', () =>
                logicUser.listPrivateUser(idUserTo)
                    .then(user => {
                        expect(user).to.exist
    
                        expect(user.reviews).to.exist
                        expect(user.reviews.length).to.equal(2)
                        expect(user.reviews[0].score).to.equal(score)
                        expect(user.reviews[0].description).to.equal(text)
    
                        let newerProd = user.products[0]
                        expect(user.products).to.exist
                        expect(user.products.length).to.equal(2)
                        expect(newerProd.id).to.equal(idProd2)
                        expect(newerProd.description).to.equal(product2.description)
    
                        expect(user.location).to.exist
                        expect(user.location.length).to.equal(2)
                    })
            )
    
            it('should fail on trying to list private user info with an undefined id user', () =>
                logicUser.listPrivateUser(undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in user'))
            )
    
            it('should fail on trying to list private user info with an empty id user', () =>
                logicUser.listPrivateUser('')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in user'))
            )
    
            it('should fail on trying to list private user info with an invalid id user', () =>
                logicUser.listPrivateUser('fake userId')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in user'))
            )
    
            it('should not list private field password on private user', () =>
                logicUser.listPrivateUser(idUserTo)
                    .then(user => {
                        expect(user.password).not.to.exist
                })
            )
        })
    })

    true && describe('product logic', () => {
        true && describe('upload a new product', () => {
            it('should upload a product correctly', () =>
                User.findOne({ email })
                    .then(user => {
                        expect(user).to.be.null
    
                        return logicUser.register(email, password)
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
    
            /*it('should fail on trying to register an already registered user', () =>
                User.create({ email, password })
                    .then(() => logicUser.register(email, password))
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`user with ${email} email already exist`))
            )
    
            it('should fail on trying to register with an undefined email', () =>
                logicUser.register(undefined, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to register with an empty email', () =>
                logicUser.register('', password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to register with a numeric email', () =>
                logicUser.register(123, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to register with an undefined password', () =>
                logicUser.register(email, undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to register with an empty password', () =>
                logicUser.register(email, '')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to register with a numeric password', () =>
                logicUser.register(email, 123)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to register with 6 empty spaces as a password', () =>
                logicUser.register(email, '      ')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to register with a password containing empty spaces', () =>
                logicUser.register(email, 'pa ssword')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to register with a password starting and ending with empty spaces', () =>
                logicUser.register(email, ' password ')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to register with a too short password', () =>
                logicUser.register(email, '123')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password length is too short'))
            )*/
        })
    })

    





    ////////////NOTES /////////////////////////////7
    !true && describe('list notes', () => {
        let notes = [
            { date: new Date('2018-08-20T12:10:15.474Z'), text: 'text 1' },
            { date: new Date('2018-08-23T13:00:00.000Z'), text: 'cumple jordi' },
            { date: new Date('2018-08-24T13:15:00.000Z'), text: 'pizza' },
            { date: new Date('2018-08-24T13:19:00.000Z'), text: 'la china' },
            { date: new Date('2018-08-24T13:21:00.000Z'), text: 'party hard' }
        ]

        beforeEach(() =>
            new User({ email, password }).save()
                .then(user => {
                    const userId = user.id

                    notes.forEach(note => note.user = userId)

                    return Note.insertMany(notes)
                })
                .then(_notes => notes = _notes.map(note => note._doc))
        )

        it('should list all user notes', () => {
            return logicUser.listNotes(email, new Date('2018-08-24'))
                .then(_notes => {
                    const expectedNotes = notes.slice(2)

                    expect(_notes.length).to.equal(expectedNotes.length)

                    const normalizedNotes = expectedNotes.map(note => {
                        note.id = note._id.toString()

                        delete note._id

                        delete note.user

                        delete note.__v

                        return note
                    })

                    expect(_notes).to.deep.equal(normalizedNotes)
                })
        })
    })

    !true && describe('remove note', () => {
        let notes = [
            { date: new Date(), text: 'text 1' },
            { date: new Date(), text: 'text 2' },
            { date: new Date(), text: 'text 3' },
            { date: new Date(), text: 'text 4' }
        ]

        let noteId

        beforeEach(() =>
            new User({ email, password }).save()
                .then(user => {
                    const userId = user.id

                    notes.forEach(note => note.user = userId)

                    return Note.insertMany(notes)
                })
                .then(_notes => {
                    notes = _notes.map(note => note._doc)

                    noteId = notes[0]._id.toString()
                })
        )

        it('should succeed on correct note id', () =>
            logicUser.removeNote(email, noteId)
                .then(res => {
                    expect(res).to.be.true

                    return User.findOne({ email })
                })
                .then(user => {
                    return Note.find({ user: user.id }).lean()
                })
                .then(_notes => {
                    const expectedNotes = notes.slice(1)

                    expect(_notes.length).to.equal(expectedNotes.length)

                    expect(_notes).to.deep.equal(expectedNotes)
                })
        )

        it('should fail on non existing note', () => {
            const nonExistingId = ObjectId().toString()

            return logicUser.removeNote(email, nonExistingId)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`note with id ${nonExistingId} does not exist`))
        })
    })


    ////////////////////  CONTACT /////////////////

    !true && describe('list contacts', () => {
        let contacts = [
            new Contact({ name:'Isabel', surname:'López', phone: '658510208', email: 'email@gemail.org' }),
            new Contact({ name:'Ramona', surname:'López', phone: '658510208', email: 'email@gemail.org' }),
            new Contact({ name:'Amor', surname:'Garcia', phone: '658510208', email: 'email@gemail.org' }),
            new Contact({ name: 'Jordi', surname:'López', phone: '658510208', email: 'email@gemail.org' }),
            new Contact({ name:'Jaume', surname:'Garcia', phone: '658510208', email: 'email@gemail.org' })
        ]

        /*let contacts = [
            { name: 'Isabel', surname: 'López', phone: '658510208', email: 'email@gemail.org' },
            { name: 'Ramona', surname: 'López', phone: '658510208', email: 'email@gemail.org' },
            { name: 'Amor', surname: 'Garcia', phone: '658510208', email: 'email@gemail.org' },
            { name: 'Jordi', surname: 'López', phone: '658510208', email: 'email@gemail.org' },
            { name: 'Jaume', surname: 'Garcia', phone: '658510208', email: 'email@gemail.org' }
        ]*/

        beforeEach(() =>
            new User({ email, password }).save()
                .then(user => {
                    //contacts.map(contact => new Contact(contact))

                    user.contacts = contacts
                    
                    return user.save()
                })
        )

        it('should list all contacts that their name starts with a specific letter', () => {
            const startsWith = 'J'

            return logicUser.listContacts(email, startsWith)
                .then(_contacts => {
                    const expectedContacts = contacts.slice(3)

                    expect(_contacts.length).to.equal(expectedContacts.length)

                    const docContacts = expectedContacts.map(contact => contact._doc)

                    const normalizedContacts = docContacts.map(contact => {
                        contact.id = contact._id.toString()

                        delete contact._id

                        return contact
                    })

                    expect(_contacts).to.deep.equal(normalizedContacts)
                })
        })
    })

    //////////////////// END CONTACT /////////////////


    after(() =>
        Promise.all([
            Product.deleteMany(),
            User.deleteMany()
        ])
            .then(() => _connection.disconnect())
    )
})