'use strict'

require('dotenv').config()

const { userLogic, productLogic, validate, cloudinaryLogic, chatLogic } = require('./index.js')
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

    true && describe('validate fields', () => {
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

    true && describe('user logic', () => {
        true && describe('register user', () => {
            it('should register correctly', () =>
                User.findOne({ email })
                    .then(user => {
                        expect(user).to.be.null
    
                        return userLogic.register(email, password)
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
                    .then(() => userLogic.register(email, password))
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`user with ${email} email already exist`))
            )
    
            it('should fail on trying to register with an undefined email', () =>
                userLogic.register(undefined, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to register with an empty email', () =>
                userLogic.register('', password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to register with a numeric email', () =>
                userLogic.register(123, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to register with an undefined password', () =>
                userLogic.register(email, undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to register with an empty password', () =>
                userLogic.register(email, '')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to register with a numeric password', () =>
                userLogic.register(email, 123)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to register with 6 empty spaces as a password', () =>
                userLogic.register(email, '      ')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to register with a password containing empty spaces', () =>
                userLogic.register(email, 'pa ssword')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to register with a password starting and ending with empty spaces', () =>
                userLogic.register(email, ' password ')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to register with a too short password', () =>
                userLogic.register(email, '123')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password length is too short'))
            )
        })
    
        true && describe('authenticate user', () => {
            beforeEach(() => User.create({ email, password }))
    
            it('should login correctly', () =>
                userLogic.authenticate(email, password)
                    .then(user => {
                        expect(user).to.exist
                    })
            )
    
            it('should fail on trying to login with an undefined email', () =>
                userLogic.authenticate(undefined, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to login with an empty email', () =>
                userLogic.authenticate('', password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to login with a numeric email', () =>
                userLogic.authenticate(123, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to login with an undefined password', () =>
                userLogic.authenticate(email, undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to login with an empty password', () =>
                userLogic.authenticate(email, '')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to login with a numeric password', () =>
                userLogic.authenticate(email, 123)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to login with 6 empty spaces as a password', () =>
                userLogic.authenticate(email, '      ')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to login with a password containing empty spaces', () =>
                userLogic.authenticate(email, 'pa ssword')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to login with a password starting and ending with empty spaces', () =>
                userLogic.authenticate(email, ' password ')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to login with a too short password', () =>
                userLogic.authenticate(email, '123')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password length is too short'))
            )
        })
    
        true && describe('update password from user', () => {
            const newPassword = `${password}-${Math.random()}`
            let userId, user
            
    
            beforeEach(() => 
                User.create({ email, password })
                    .then(_user => user = userId = _user.id )
            )
    
            it('should update password correctly', () =>
                userLogic.updatePassword(user, password, newPassword)
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
                userLogic.updatePassword(undefined, password, newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid user`))
            )
    
            it('should fail on trying to update password with an empty user', () =>
                userLogic.updatePassword('', password, newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid user`))
            )
    
            it('should fail on trying to update password with a numeric user', () =>
                userLogic.updatePassword(123, password, newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid user`))
            )
    
            it('should fail on trying to update password with an undefined password', () =>
                userLogic.updatePassword(user, undefined, newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to update password with an empty password', () =>
                userLogic.updatePassword(user, '', newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to update password with a numeric password', () =>
                userLogic.updatePassword(user, 123, newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to update password with 6 empty spaces as a password', () =>
                userLogic.updatePassword(user, '      ', newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to update password with a password containing empty spaces', () =>
                userLogic.updatePassword(user, 'pa ssword', newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to update password with a password starting and ending with empty spaces', () =>
                userLogic.updatePassword(user, ' password ', newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password cannot contain any space'))
            )
    
            it('should fail on trying to update password with a too short password', () =>
                userLogic.updatePassword(user, '123', newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('password length is too short'))
            )
    
            it('should fail on trying to update password with an undefined new password', () =>
                userLogic.updatePassword(user, password, undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid new password`))
            )
    
            it('should fail on trying to update password with an empty new password', () =>
                userLogic.updatePassword(user, password, '')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid new password`))
            )
    
            it('should fail on trying to update password with a numeric new password', () =>
                userLogic.updatePassword(user, password, 123)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid new password`))
            )
    
            it('should fail on trying to update password with the same old value in the new password', () =>
                userLogic.updatePassword(user, password, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`new password must be different from old password`))
            )
    
            it('should fail on trying to update password with 6 empty spaces as the new password', () =>
                userLogic.updatePassword(user, password, '      ')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('new password cannot contain any space'))
            )
    
            it('should fail on trying to update password with a new password containing empty spaces', () =>
                userLogic.updatePassword(user, password, 'pa ssword')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('new password cannot contain any space'))
            )
    
            it('should fail on trying to update password with a new password starting and ending with empty spaces', () =>
                userLogic.updatePassword(user, password, ' password ')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('new password cannot contain any space'))
            )
    
            it('should fail on trying to update password with a too short new password', () =>
                userLogic.updatePassword(user, password, '123')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('new password length is too short'))
            )
        })
    
        true && describe('update email from user', () => {
            const newEmail = `laia-chorro-${Math.random()}@mail.com`
            let userId, user
            
    
            beforeEach(() => 
                User.create({ email, password })
                    .then(_user => user = userId = _user.id )
            )
    
            it('should update email correctly', () =>
                userLogic.updateEmail(user, email, newEmail)
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
                userLogic.updateEmail(undefined, email, newEmail)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid user`))
            )
    
            it('should fail on trying to update email with an empty user', () =>
                userLogic.updateEmail('', email, newEmail)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid user`))
            )
    
            it('should fail on trying to update email with a numeric user', () =>
                userLogic.updateEmail(123, email, newEmail)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid user`))
            )
    
            it('should fail on trying to update email with an undefined email', () =>
                userLogic.updateEmail(user, undefined, newEmail)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to update email with an empty email', () =>
                userLogic.updateEmail(user, '', newEmail)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to update email with a numeric email', () =>
                userLogic.updateEmail(user, 123, newEmail)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to update email with an undefined new email', () =>
                userLogic.updateEmail(user, email, undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to update email with an empty new email', () =>
                userLogic.updateEmail(user, email, '')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to update email with a numeric new email', () =>
                userLogic.updateEmail(user, email, 123)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to update email with the same old value in the new email', () =>
                userLogic.updateEmail(user, email, email)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`new email must be different from old email`))
            )
        })

        true && describe('update info profile from user', () => {
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
    
            /*it('should update profile correctly with all possible fields from data', () =>
                userLogic.updateProfile(userId, completeData)
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
            )*/

            it('should update profile correctly with some but not all fields from data', () =>
                userLogic.updateProfile(userId, partialData)
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
                userLogic.updateProfile(userId, nonExistentFieldInData)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('is not possible to update the user profile with the data provided in made_up_field'))
            )

            it('should fail on trying to update profile with an undefined user', () =>
                userLogic.updateProfile(undefined, completeData)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid user`))
            )
    
            it('should fail on trying to update profile with an empty user', () =>
                userLogic.updateProfile('', completeData)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid user`))
            )
    
            it('should fail on trying to update profile with a numeric user', () =>
                userLogic.updateProfile(123, completeData)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid user`))
            )

            it('should fail on trying to update profile with an undefined data', () =>
                userLogic.updateProfile(userId, undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('data for the profile updating is not defined'))
            )
    
            it('should fail on trying to update profile with an empty data', () =>
                userLogic.updateProfile(userId, '')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('data for the profile updating is not defined'))
            )
    
            it('should fail on trying to update profile with a numeric data', () =>
                userLogic.updateProfile(userId, 123)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid profile info data'))
            )

            it('should fail on trying to update profile with a non valid existent field', () =>
                userLogic.updateProfile(userId, inValidFieldInData)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid name'))
            )
        })
    
        true && describe('unregister user', () => {
            beforeEach(() => User.create({ email, password }))
    
            it('should unregister user correctly', () =>
                userLogic.unregisterUser(email, password)
                    .then(res => {
                        expect(res).to.be.true
    
                        return User.findOne({ email })
                    })
                    .then(user => {
                        expect(user).not.to.exist
                    })
            )
    
            it('should fail on trying to unregister user with an undefined email', () =>
                userLogic.unregisterUser(undefined, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to unregister user with an empty email', () =>
                userLogic.unregisterUser('', password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to unregister user with a numeric email', () =>
                userLogic.unregisterUser(123, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid email`))
            )
    
            it('should fail on trying to unregister user with an undefined password', () =>
                userLogic.unregisterUser(email, undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to unregister user with an empty password', () =>
                userLogic.unregisterUser(email, '')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
    
            it('should fail on trying to unregister user with a numeric password', () =>
                userLogic.unregisterUser(email, 123)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid password`))
            )
        })
    
        true && describe('add review', () => {
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
                userLogic.addReview(idUserFrom, idUserTo, score, idProd, text)
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
                userLogic.addReview(undefined, idUserTo, score, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in userFrom'))
            )
    
            it('should fail on trying to add a review with an empty idUserFrom', () =>
                userLogic.addReview('', idUserTo, score, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in userFrom'))
            )
    
            it('should fail on trying to add a review with an invalid idUserFrom', () =>
                userLogic.addReview('fake userFrom id', idUserTo, score, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in userFrom'))
            )
    
            it('should fail on trying to add a review with an undefined idUserTo', () =>
                userLogic.addReview(idUserFrom, undefined, score, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in userTo'))
            )
    
            it('should fail on trying to add a review with an empty idUserTo', () =>
                userLogic.addReview(idUserFrom, '', score, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in userTo'))
            )
    
            it('should fail on trying to add a review with an invalid idUserTo', () =>
                userLogic.addReview(idUserFrom, 'fake userTo id', score, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in userTo'))
            )
    
            it('should fail on trying to add a review with an undefined score', () =>
                userLogic.addReview(idUserFrom, idUserTo, undefined, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid score'))
            )
    
            it('should fail on trying to add a review with an empty score', () =>
                userLogic.addReview(idUserFrom, idUserTo, '', idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid score'))
            )
    
            it('should fail on trying to add a review with a float score', () =>
                userLogic.addReview(idUserFrom, idUserTo, 2.3, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid score'))
            )
    
            it('should fail on trying to add a review with a too big score', () =>
                userLogic.addReview(idUserFrom, idUserTo, 6, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid score'))
            )
    
            it('should fail on trying to add a review with a too low score', () =>
                userLogic.addReview(idUserFrom, idUserTo, -1, idProd, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid score'))
            )
    
            it('should fail on trying to add a review with an undefined idUserTo', () =>
                userLogic.addReview(idUserFrom, idUserTo, score, undefined, text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in idProd'))
            )
    
            it('should fail on trying to add a review with an empty idUserTo', () =>
                userLogic.addReview(idUserFrom, idUserTo, score, '', text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in idProd'))
            )
    
            it('should fail on trying to add a review with an invalid idUserTo', () =>
                userLogic.addReview(idUserFrom, idUserTo, score, 'fake idProd id', text)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in idProd'))
            )
    
            it('should fail on trying to add a review with an undefined description', () =>
                userLogic.addReview(idUserFrom, idUserTo, score, idProd, undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid description`))
            )
    
            it('should fail on trying to add a review with an empty description', () =>
                userLogic.addReview(idUserFrom, idUserTo, score, idProd, '')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid description`))
            )
    
            it('should fail on trying to add a review with a numeric description', () =>
                userLogic.addReview(idUserFrom, idUserTo, score, idProd, 123)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal(`invalid description`))
            )
    
            it('should fail on trying to add a review with a description longer than the maximum length permited', () => {
                const tooLongDesc = 'Lorem ipsum dolor sit amet, quo ut denique incorrupte, audiam voluptaria no nec, quo maiorum mnesarchum an. Eu pri albucius voluptatum, sed suscipit partiendo at, quando debitis scriptorem eu vim. Vis ex perfecto democritum liberavisse, vel modus ignota graeci ea. Quis suas debet in vis. Ne sed modo elit animal, cu expetendis consectetuer eam, eam possim maiestatis contentiones te. Sea an ignota instructior, cum mentitum laboramus deseruisse id, nam magna discere at. Laudem maiorum sed no, ne sit audiam malorum. Lorem ipsum dolor sit amet, quo ut denique incorrupte, audiam voluptaria no nec, quo maiorum mnesarchum an. Eu pri albucius voluptatum, sed suscipit partiendo at, quan.'
                return userLogic.addReview(idUserFrom, idUserTo, score, idProd, tooLongDesc)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('User validation failed: reviews.0.description: Path `description` (`' + tooLongDesc + '`) is longer than the maximum allowed length (650).'))
            })
        })
    
        true && describe('list public user', () => {
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
    
            /*it('should only list public user info on correct user id', () =>
                userLogic.listPublicUser(idUserTo)
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
            )*/
    
            it('should fail on trying to list public user info with an undefined id user', () =>
                userLogic.listPublicUser(undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in user'))
            )
    
            it('should fail on trying to list public user info with an empty id user', () =>
                userLogic.listPublicUser('')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in user'))
            )
    
            it('should fail on trying to list public user info with an invalid id user', () =>
                userLogic.listPublicUser('fake userId')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in user'))
            )
    
            it('should not list private field password on public user', () =>
                userLogic.listPublicUser(idUserTo)
                    .then(user => {
                        expect(user.password).not.to.exist
                })
            )
        })
    
        true && describe('list private user', () => {
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
                userLogic.listPrivateUser(idUserTo)
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
                userLogic.listPrivateUser(undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in user'))
            )
    
            it('should fail on trying to list private user info with an empty id user', () =>
                userLogic.listPrivateUser('')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in user'))
            )
    
            it('should fail on trying to list private user info with an invalid id user', () =>
                userLogic.listPrivateUser('fake userId')
                    .catch(err => err)
                    .then(({ message }) => expect(message).to.equal('invalid id in user'))
            )
    
            it('should not list private field password on private user', () =>
                userLogic.listPrivateUser(idUserTo)
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
    
                        return userLogic.register(email, password)
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
        })
    })


    !true && describe('chat logic', () => {
        describe('add chat', () => {
            it('should succeed on correct data', ()  => {
                // TODO
            })

            // TODO error cases
        })

        describe('get chat', () => {
            it('should succeed on correct data', ()  => {
                // TODO
            })

            // TODO error cases
        })

        describe('list chats', () => {
            it('should succeed on correct data', ()  => {
                // TODO
            })

            // TODO error cases
        })
    })

    after(() =>
        Promise.all([
            Product.deleteMany(),
            User.deleteMany()
        ])
            .then(() => _connection.disconnect())
    )
})