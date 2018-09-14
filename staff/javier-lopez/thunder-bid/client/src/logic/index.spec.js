require('dotenv').config()

const fetch  = require('isomorphic-fetch')
const { expect } = require('chai')
const logic = require('.')
const jwt = require('jsonwebtoken')

describe('logic', () => {
    const { JWT_SECRET } = process.env

    let email, password

    beforeEach(() => {
        email = `user${Math.random()}@gmail.com`, password = '123', name = `javi-${Math.random()}`, surname = `lopez-${Math.random()}`
    })

    !true && describe('register user', () => {
        it('should register a user correctly', () => 
            logic.register(email, password, name, surname)
                .then(res => expect(res).to.be.true)
        )

        it('should fail at register with an existing user', () =>
            logic.register(email, password, name, surname)
                .then(() => logic.register(email, password, name, surname))               
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal(`${email} already exists`))
        )

        it('should fail on register with an invalid user', () =>
            logic.register('javi', password, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid email'))
        )

        it('should fail on register with an empty user', () =>
            logic.register('', password, name, surname)
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('invalid email'))
        )

        it('should fail on register with a number as a password', () => 
            logic.register(email, 123, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).equal('invalid password'))
        )

        it('should fail on register with a space as a password', () =>
            logic.register(email, ' ', name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).equal('invalid password'))
        )

        it('should fail on register with a password starting with space', () =>
            logic.register(email, ' '+password, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).equal('invalid password'))
        )

        it('should fail on register with a password ending with space', () =>
            logic.register(email, password+' ', name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).equal('invalid password'))
        )

                it('should fail on register with a space as a password', () =>
            logic.register(email, ' ', name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).equal('invalid password'))
        )

        it('should fail on register with a password starting with space', () =>
            logic.register(email, ' '+password, name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).equal('invalid password'))
        )

        it('should fail on register with a password ending with space', () =>
            logic.register(email, password+' ', name, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).equal('invalid password'))
        )

        it('should fail on register with an empty name', () =>
            logic.register(email, password, '', surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid name'))
        )

        it('should fail on register with a space as a number', () =>
            logic.register(email, password, ' ', surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid name'))
        )

        it('should fail on register with a number as a number', () =>
            logic.register(email, password, 456, surname)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid name'))
        )

        it('should fail on register with an empty surname', () => 
            logic.register(email, password, name, '')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid surname'))
        )

        it('should fail on register with a space as a surname', () =>
            logic.register(email, password, name, ' ')
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid surname'))
        )

        it('should fail on register with a number as a surname', () =>
            logic.register(email, password, name, 456)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('invalid surname'))
        )
    })

    !true && describe('login user', () => {
        it('should login a user correctly', () =>
            logic.register(email, password, name, surname)
                .then(() => logic.login(email, password))
                .then(res => {
                    expect(res.token).to.be.a('string')
                    
                    let payload
                    expect(() => payload = jwt.verify(res.token, JWT_SECRET)).not.to.throw()
                    expect(payload.sub).to.equal(res.id)
                })
        )

        it('should fail on login with a not existing user', () =>
            logic.login(email, password)
                .catch(res => res)
                .then(({ message }) => expect(message).to.equal(`${email} does not exists`))
        )

        it('should fail on login with a user that is not an email', () =>
            logic.login('email', password)
                .catch(res => res)
                .then(({ message }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail with incorrect password', () =>
            logic.register(email, password, name, surname)
                .then(() => logic.login(email, '4565464'))
                .catch(res => res)
                .then(({ message }) => {expect(message).to.equal('wrong password')})
        )

        it('should fail with an empty password', () =>
        logic.register(email, password, name, surname)
            .then(() => logic.login(email, ''))
            .catch(res => res)
            .then(({ message }) => {expect(message).to.equal('invalid password')})
        )

        it('should fail with a password starting with space', () =>
        logic.register(email, password, name, surname)
            .then(() => logic.login(email, ' '+password))
            .catch(res => res)
            .then(({ message }) => {expect(message).to.equal('invalid password')})
        )

        it('should fail with a password ending with space', () =>
        logic.register(email, password, name, surname)
            .then(() => logic.login(email, password+' '))
            .catch(res => res)
            .then(({ message }) => {expect(message).to.equal('invalid password')})
        )

        it('should fail with a email ending with space', () =>
        logic.register(email, password, name, surname)
            .then(() => logic.login(email+' ', password))
            .catch(res => res)
            .then(({ message }) => {expect(message).to.equal('invalid email')})
        )

        it('should fail with a email starting with space', () =>
        logic.register(email, password, name, surname)
            .then(() => logic.login(' '+email, password))
            .catch(res => res)
            .then(({ message }) => {expect(message).to.equal('invalid email')})
        )
    })

    !true && describe('list user bids', () => {
        it('should list all user bids correctly', () =>
            logic.register(email, password, name, surname)
                .then(() => logic.login(email, password))
                .then(user => {
                    return logic.addBid('5b8e477d0e80404ccc9c4e7e', user.id, 164500257, user.token)
                    .then(() => logic.listUserBiddedProducts(user.id, user.token))
                })
                .then(bids => {
                    expect(bids.data[0].title).to.equal('Thanos infinity gauntlet')
                    expect(bids.data[0].initialPrice).to.equal(800)
                    expect(bids.data[0].category).to.equal('Marvel')
                })
        )

        it('should fail on showing the list all user bids if the user does not have any ', () =>
            logic.register(email, password, name, surname)
                .then(() => logic.login(email, password))
                .then(res => logic.listUserBiddedProducts(res.id, res.token))
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('this user did not make any bid'))
        )
    })

    !true && describe('list user wishes', () => {
        it('should list user wishes correctly', () => 
            logic.register(email, password, name, surname)
                .then(() => logic.login(email, password))
                .then(data => {
                    return logic.addWish('5b8e477d0e80404ccc9c4e7e', data.id, data.token)
                        .then(() => logic.listUserWishes(data.id, data.token))
                        .then(({data}) => {
                            expect(data[0].title).to.equal('Thanos infinity gauntlet')
                            expect(data[0].description).to.equal('Original gauntlet used on the movie infinity war, with all the infinite stones')
                            expect(data[0].initialPrice).to.equal(800)
                        })
                })
        )

        it('should fail if the user does not have any wish', () => 
            logic.register(email, password, name, surname)
                .then(() => logic.login(email, password))
                .then(data => logic.listUserWishes(data.id, data.token))
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('this user did not add any wish'))
        )

        it('should fail if the wish already exists', () => 
            logic.register(email, password, name, surname)
                .then(() => logic.login(email, password))
                .then(data => {
                    return logic.addWish('5b8e477d0e80404ccc9c4e7e', data.id, data.token)
                        .then(() => logic.addWish('5b8e477d0e80404ccc9c4e7e', data.id, data.token))
                        .then(({message}) => expect(message).to.be('you cannot add a wish twice'))
                })
        )
    })

    !true && describe('retrieve user', () => {
        it('should show user details', () => 
            logic.register(email, password, name, surname)
                .then(() => logic.login(email, password))
                .then(data => 
                    logic.retrieveUser(data.id, data.token))
                .then(user => {
                    expect(user.data.name).to.equal(name)
                    expect(user.data.surname).to.equal(surname)
                    expect(user.data.email).to.equal(email)
                    expect(user.data.password).to.equal(password)
                    expect(user.data.wishes.length).to.equal(0)
                    expect(user.data.bidded.length).to.equal(0)
                })
       )
    })


    !true && describe('add bid', () => {
        it('should add a bid correctly', () =>
            logic.register(email, password, name, surname)
                .then(() => logic.login(email, password))
                .then(user => {

                    return logic.addBid('5b8e477d0e80404ccc9c4e7e', user.id, 164500258, user.token)
                })
                .then(({message}) => expect(message).to.equal('Bid added correctly'))               
        )


        it('should fail on adding a bid with a lower price', () => 
            logic.register(email, password, name, surname)
                .then(() => logic.login(email, password))
                .then(user => {
                    return logic.addBid('5b8e477d0e80404ccc9c4e7e', user.id, 5, user.token)
                })
                .catch(err => err)
                .then(({message}) => expect(message).to.equal('the price of the bid should be higher than the current price'))    
        )
    })
    
    !true && describe('add wish', () => {
        it('should add a wish correctly', () =>
            logic.register(email, password, name, surname)
                .then(() => logic.login(email, password))
                .then(data => logic.addWish('5b8e477d0e80404ccc9c4e7e', data.id, data.token))
                .then(({message}) => expect(message).to.equal('Wish added correctly'))                             
        )


        it('should fail at adding a wish twice', () => 
            logic.register(email, password, name, surname)
                .then(() => 
                    logic.login(email, password)
                        .then(data => {
                            return logic.addWish('5b8e477d0e80404ccc9c4e7e', data.id, data.token)
                                .then(() => logic.addWish('5b8e477d0e80404ccc9c4e7e', data.id, data.token))
                                .catch(err => err)
                                .then(({ message }) => expect(message).to.equal('you cannot add a product twice to de wish list'))      
                        })
                )
        )
    })


    !true && describe('delete wish', () => {
        it('should delete a wish correctly', () =>  
            logic.register(email, password, name, surname)
                .then(() => logic.login(email, password))
                .then(data => {
                    return logic.addWish('5b8e477d0e80404ccc9c4e7e', data.id, data.token)
                        .then(() => logic.deleteWish('5b8e477d0e80404ccc9c4e7e', data.id, data.token))
                        .then(({ message }) => expect(message).to.equal('Wish deleted correctly'))
                }))
 
                
        it('should fail on deleting a not existing wish', () =>  
            logic.register(email, password, name, surname)
                .then(() => logic.login(email, password))
                .then(data => {
                    return logic.addWish('5b8e477d0e80404ccc9c4e7e', data.id, data.token)
                        .then(() => logic.deleteWish('5b8e477d0e80404ccc9c4e7e', data.id, data.token))
                        .then(() => logic.deleteWish('5b8e477d0e80404ccc9c4e7e', data.id, data.token))
                        .catch(err => err)
                        .then(({ message }) => expect(message).to.equal('you cannot delete a product that is not in your wish list'))
                }))
    })

    !true && describe('list products', () => {
        const query = 'Thanos', category='Marvel', incorrectQuery = 'asdf' 
        it('should list all products correctly', () => 
            logic.listProducts(query, category)
                .then(({data}) => {
                    expect(data[0].title).to.equal('Thanos infinity gauntlet')
                    expect(data[0].description).to.equal('Original gauntlet used on the movie infinity war, with all the infinite stones')
                    expect(data[0].initialPrice).to.equal(800)
                }))


        it('should list all products that has the category', () =>
            logic.listProducts(undefined, category)
            .then(data => {
                
                expect(data[0].title).to.equal('Thanos infinity gauntlet')
                expect(data[0].description).to.equal('Original gauntlet used on the movie infinity war, with all the infinite stones')
                expect(data[0].initialPrice).to.equal(800)
            }))


        it('should fail to list products if the category starts with space', () =>
            logic.listProducts(incorrectQuery, ' '+category)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('products not found'))
        )      
        

        it('should fail to list products if the category ends with space', () =>
        logic.listProducts(incorrectQuery, category+' ')
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('products not found'))
        )   


        it('should fail to list products if there is no products with the query', () =>
            logic.listProducts(incorrectQuery, category)
                .catch(err => err)
                .then(({ message }) => expect(message).to.equal('products not found'))
        )

        it('should fail to list products if there is no products with the category', () =>
        logic.listProducts(query, 'Songs')
            .catch(err => err)
            .then(({ message }) => expect(message).to.equal('products not found'))
        )
    })
})