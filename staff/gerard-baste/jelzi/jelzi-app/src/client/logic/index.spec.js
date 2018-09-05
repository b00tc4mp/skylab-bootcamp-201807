'use strict'

require('dotenv').config()


const fetch = require('isomorphic-fetch')
const { expect } = require('chai')
const {logic, LogicError} = require('.')
const jwt = require('jsonwebtoken')

describe('logic', () => {
    const { JWT_SECRET } = process.env
    let email, username, password, allergens, newAllergens, title, titleDish, recipeId, order, query
    

    beforeEach(() => {
        
        email = `user${Math.random()}@gmail.com`, username = `user${Math.random()}`, 
        password = '123456', allergens = ['egg-free'], newAllergens = ['soy-free'],
        title = "Monday Menu", titleDish = "Breakfast", recipeId = "76850841e0c43087cb56d011602e452e", order = 1 ,
        query = 'cake'
    })

    !!true && describe('register user', () => {
        it('should succeed on new user', () =>
            logic.register(email, username, password, allergens)
                .then(res => expect(res).to.be.true)
        )

        it('should fail on already existing user', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.register(email, username, password, allergens))
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`user with ${email} email already exist`)
                })
        )

        it('should fail on empty email', () =>
            logic.register('', username, password, allergens)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        )

        it('should fail on undefined email', () =>
            logic.register(undefined, username, password, allergens)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        )

        it('should fail on number email', () =>
            logic.register(123, username, password, allergens)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        )

        it('should fail on empty username', () =>
            logic.register(email, '', password, allergens)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid username')
                })
        )

        it('should fail on undefined username', () =>
            logic.register(email, undefined, password, allergens)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid username')
                })
        )

        it('should fail on number username', () =>
            logic.register(email, 123, password, allergens)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid username')
                })
        )

        it('should fail on empty password user', () =>
            logic.register(email, username, '', allergens)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid password')
                })
        )

        it('should fail on undefined password', () =>{
            logic.register(email, username, undefined, allergens)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid password')
                })
        })

        it('should fail on short number password', () =>{
            logic.register(email, username, 123, allergens)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid password')
                })
        })

        it('should fail on undefined allergens', () =>{
            logic.register(email, username, password, undefined)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid allergens')
                })
        })

        it('should fail on empty allergens', () =>{
            logic.register(email, username, password, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid allergens')
                })
        })

        it('should fail on number allergens', () =>{
            logic.register(email, username, password, 123)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid allergens')
                })
        })

        it('should fail on string allergens', () =>{
            logic.register(email, username, password, 'egg-free')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid allergens')
                })
        })
    })

    !!true && describe('authenticate user', () => {
        it('should succeed on existing user', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    expect(token).to.be.a('string')

                    let payload
                    
                    expect(() => payload = jwt.verify(token, JWT_SECRET)).not.to.throw()
                    expect(payload.sub).to.equal(email)
                })
        )

        it('should fail on unregistered user', () =>
            logic.authenticate(email, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`user with ${email} email does not exist`)
                })
        )

        it('should fail on empty email', () =>
            logic.authenticate('', password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid email`)
                })
        )

        it('should fail on undefined email', () =>
            logic.authenticate(undefined, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid email`)
                })
        )

        it('should fail on number email', () =>
            logic.authenticate(123, password)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid email`)
                })
        )

        it('should fail on empty password user', () =>
            logic.authenticate(email, '')
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        )

        it('should fail on undefined password user', () =>
            logic.authenticate(email, undefined)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        )

        it('should fail on number password user', () =>
            logic.authenticate(email, 123)
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal(`invalid password`)
                })
        )

    })

    !!true && describe('retrieve profile user', () => {
        it('should succeed on existing user', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {logic.retrieveProfileUser(email, token)
                    .then(res => {
                        expect(res[0]).to.equal('egg-free')
                    })
                })
        )

        it('should fail on undefined email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {logic.retrieveProfileUser(undefined, token)
                .catch(err => err)
                    .then(( err ) => {
                        expect(err.message).to.equal('invalid email')
                    })
                })
        )

        it('should fail on empty email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {logic.retrieveProfileUser('', token)
                .catch(err => err)
                    .then(( err ) => {
                        expect(err.message).to.equal('invalid email')
                    })
                })
        )

        it('should fail on number email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {logic.retrieveProfileUser(123, token)
                .catch(err => err)
                    .then(( err ) => {
                        expect(err.message).to.equal('invalid email')
                    })
                })
        )
    })

    !!true && describe('update allergens', () => {
        it('should succeed on existing user', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {logic.updateAllergens(email, password, allergens, newAllergens, token)
                    .then(( {message} ) => {
                        expect(message).to.equal('allergens updated')
                    })
                })
        )

        it('should fail on undefined email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {logic.updateAllergens(undefined, password, allergens, newAllergens, token)
                .catch(err => err)
                    .then(( err ) => {
                        expect(err.message).to.equal('invalid email')
                    })
                })
        )

        it('should fail on number email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {logic.updateAllergens(123, password, allergens, newAllergens, token)
                .catch(err => err)
                    .then(( err ) => {
                        expect(err.message).to.equal('invalid email')
                    })
                })
        )

        it('should fail on empty password', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {logic.updateAllergens(email, '', allergens, newAllergens, token)
                .catch(err => err)
                    .then(( err ) => {
                        expect(err.message).to.equal('invalid password')
                    })
                })
        )

        it('should fail on number password', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {logic.updateAllergens(email, 123, allergens, newAllergens, token)
                .catch(err => err)
                    .then(( err ) => {
                        expect(err.message).to.equal('invalid password')
                    })
                })
        )

        it('should fail on undefined password', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {logic.updateAllergens(email, undefined, allergens, newAllergens, token)
                .catch(err => err)
                    .then(( err ) => {
                        expect(err.message).to.equal('invalid password')
                    })
                })
        )

        it('should fail on undefined allergens', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {logic.updateAllergens(email, password, '', newAllergens, token)
                .catch(err => err)
                    .then(( err ) => {
                        expect(err.message).to.equal('invalid allergens')
                    })
                })
        )

        it('should fail on undefined allergens', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {logic.updateAllergens(email, password, undefined, newAllergens, token)
                .catch(err => err)
                    .then(( err ) => {
                        expect(err.message).to.equal('invalid allergens')
                    })
                })
        )

        it('should fail on number allergens', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {logic.updateAllergens(email, password, 123, newAllergens, token)
                .catch(err => err)
                    .then(( err ) => {
                        expect(err.message).to.equal('invalid allergens')
                    })
                })
        )

        it('should fail on empty new allergens', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {logic.updateAllergens(email, password, allergens, '', token)
                .catch(err => err)
                    .then(( err ) => {
                        expect(err.message).to.equal('invalid new allergens')
                    })
                })
        )

        it('should fail on number new allergens', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {logic.updateAllergens(email, password, allergens, 123, token)
                .catch(err => err)
                    .then(( err ) => {
                        expect(err.message).to.equal('invalid new allergens')
                    })
                })
        )

        it('should fail on undefined new allergens', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {logic.updateAllergens(email, password, allergens, undefined, token)
                .catch(err => err)
                    .then(( err ) => {
                        expect(err.message).to.equal('invalid new allergens')
                    })
                })
        )
    })

    !!true && describe('add menu on user', () => {
        it('should succeed on existing user', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                })
                .then(( {message} ) => {
                    expect(message).to.equal('Menu added correctly')
                })
        )

        it('should fail on empty title', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, '', token)
                })
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid title')
                })
        )

        it('should fail on number title', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, 123, token)
                })
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid title')
                })
        )

        it('should fail on undefined title', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, undefined, token)
                })
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid title')
                })
        )

        it('should faild on undefined email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(undefined, title, token)
                })
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        )

        it('should faild on number email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(123, title, token)
                })
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        )

        it('should faild on empty email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu('', title, token)
                })
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        )
    })

    !!true && describe('list menus', () => {
        it('should succeed on existing menu', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(() => {
                        return logic.listMenus(email, token)
                    })
                })
                .then( res  => {
                    expect(res).to.exist
                    expect(res[0].title).to.equal('Monday Menu')
                })
        )

        it('should fail on undefined email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(() => {
                        return logic.listMenus(undefined, token)
                    })
                })
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        )

        it('should fail on empty email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(() => {
                        return logic.listMenus('', token)
                    })
                })
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        )

        it('should fail on number email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(() => {
                        return logic.listMenus(123, token)
                    })
                })
                .catch(err => err)
                .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
        )
    })

    !!true && describe('remove menu', () => {
        it('should succeed on existing menu', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(menu => logic.removeMenu(email, menu.menus[0]._id ,token))
                })
                .then( ({message})  => expect(message).to.equal('Menu deleted correctly'))
        )
    
        it('should fail on undefined email', () =>
        logic.register(email, username, password, allergens)
            .then(() => logic.authenticate(email, password))
            .then(token => {
                return logic.addMenu(email, title, token)
                .then(menu => logic.removeMenu(undefined, menu.menus[0]._id ,token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid email')
            })
        )

        it('should fail on empty email', () =>
        logic.register(email, username, password, allergens)
            .then(() => logic.authenticate(email, password))
            .then(token => {
                return logic.addMenu(email, title, token)
                .then(menu => logic.removeMenu('', menu.menus[0]._id ,token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid email')
            })
        )

        it('should fail on number email', () =>
        logic.register(email, username, password, allergens)
            .then(() => logic.authenticate(email, password))
            .then(token => {
                return logic.addMenu(email, title, token)
                .then(menu => logic.removeMenu(123, menu.menus[0]._id ,token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid email')
            })
        )

        it('should fail on undefined menu ID', () =>
        logic.register(email, username, password, allergens)
            .then(() => logic.authenticate(email, password))
            .then(token => {
                return logic.addMenu(email, title, token)
                .then(menu => logic.removeMenu(email, undefined ,token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid menu ID')
            })
        )

        it('should fail on empty menu ID', () =>
        logic.register(email, username, password, allergens)
            .then(() => logic.authenticate(email, password))
            .then(token => {
                return logic.addMenu(email, title, token)
                .then(menu => logic.removeMenu(email, '',token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid menu ID')
            })
        )

        it('should fail on number menu ID', () =>
        logic.register(email, username, password, allergens)
            .then(() => logic.authenticate(email, password))
            .then(token => {
                return logic.addMenu(email, title, token)
                .then(menu => logic.removeMenu(email, 123,token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid menu ID')
            })
        )
    })

    !!true && describe('add dish on menu', () => {
        it('should succeed on existing menu', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                })
                .then( ({message})  => expect(message).to.equal('Dish added correctly'))
            )

        it('should fail on undefined email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                .then(menu => logic.addDish(undefined, titleDish, recipeId, order, menu.menus[0]._id, token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid email')
            })
        )

        it('should fail on empty email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                .then(menu => logic.addDish('', titleDish, recipeId, order, menu.menus[0]._id, token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid email')
            })
        )

        it('should fail on number email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                .then(menu => logic.addDish(123, titleDish, recipeId, order, menu.menus[0]._id, token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid email')
            })
        )

        it('should fail on empty title dish', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                .then(menu => logic.addDish(email, '', recipeId, order, menu.menus[0]._id, token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid title dish')
            })
        )

        it('should fail on undefined title dish', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                .then(menu => logic.addDish(email, undefined, recipeId, order, menu.menus[0]._id, token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid title dish')
            })
        )

        it('should fail on number title dish', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                .then(menu => logic.addDish(email, 123, recipeId, order, menu.menus[0]._id, token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid title dish')
            })
        )

        it('should fail on empty recipe ID', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                .then(menu => logic.addDish(email, titleDish, '', order, menu.menus[0]._id, token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid recipe ID')
            })
        )

        it('should fail on undefined recipe ID', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                .then(menu => logic.addDish(email, titleDish, undefined, order, menu.menus[0]._id, token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid recipe ID')
            })
        )

        it('should fail on number recipe ID', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                .then(menu => logic.addDish(email, titleDish, 123, order, menu.menus[0]._id, token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid recipe ID')
            })
        )

        it('should fail on empty order', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                .then(menu => logic.addDish(email, titleDish, recipeId, '', menu.menus[0]._id, token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid order')
            })
        )

        it('should fail on undefined order', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                .then(menu => logic.addDish(email, titleDish, recipeId, undefined, menu.menus[0]._id, token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid order')
            })
        )

        it('should fail on empty menu ID', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                .then(menu => logic.addDish(email, titleDish, recipeId, order, '', token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid menu ID')
            })
        )
        it('should fail on number menu ID', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                .then(menu => logic.addDish(email, titleDish, recipeId, order, 123, token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid menu ID')
            })
        )

        it('should fail on undefined menu ID', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                .then(menu => logic.addDish(email, titleDish, recipeId, order, undefined, token))
            })
            .catch(err => err)
            .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid menu ID')
            })
        )
    })

    !!true && describe('list dish on menu', () => {
        it('should succeed on existing menu', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.listDishes(email, menu.id.menus[0]._id, token))
                })
                .then( res  => expect(res[0].recipeId).to.equal('76850841e0c43087cb56d011602e452e'))
        )

        it('should fail on empty email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.listDishes('', menu.id.menus[0]._id, token))
                })
                .catch(err => err)
                .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid email')
            })
        )

        it('should fail on undefined email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.listDishes(undefined, menu.id.menus[0]._id, token))
                })
                .catch(err => err)
                .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid email')
            })
        )

        it('should fail on number email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.listDishes(123, menu.id.menus[0]._id, token))
                })
                .catch(err => err)
                .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid email')
            })
        )

        it('should fail on undefined menu ID', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.listDishes(email, undefined, token))
                })
                .catch(err => err)
                .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid menu ID')
            })
        )

        it('should fail on empty menu ID', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.listDishes(email, '', token))
                })
                .catch(err => err)
                .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid menu ID')
            })
        )

        it('should fail on number menu ID', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.listDishes(email, 123, token))
                })
                .catch(err => err)
                .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid menu ID')
            })
        )
        
    })

    !!true && describe('remove dish on menu', () => {
        it('should succeed on existing menu', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.removeDish(email, menu.id.menus[0]._id, menu.id.menus[0].dishes[0]._id, token))
                })
                .then( ({message})  => expect(message).to.equal('Dish deleted correctly'))
        )

        it('should fail on undefined email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.removeDish(undefined, menu.id.menus[0]._id, menu.id.menus[0].dishes[0]._id, token))
                })
                .catch(err => err)
                .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid email')
            })
        )

        it('should fail on empty email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.removeDish('', menu.id.menus[0]._id, menu.id.menus[0].dishes[0]._id, token))
                })
                .catch(err => err)
                .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid email')
            })
        )

        it('should fail on number email', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.removeDish(123, menu.id.menus[0]._id, menu.id.menus[0].dishes[0]._id, token))
                })
                .catch(err => err)
                .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid email')
            })
        )

        it('should fail on empty menu ID', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.removeDish(email, '', menu.id.menus[0].dishes[0]._id, token))
                })
                .catch(err => err)
                .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid menu ID')
            })
        )

        it('should fail on undefined menu ID', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.removeDish(email, undefined, menu.id.menus[0].dishes[0]._id, token))
                })
                .catch(err => err)
                .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid menu ID')
            })
        )

        it('should fail on number menu ID', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.removeDish(email, 123, menu.id.menus[0].dishes[0]._id, token))
                })
                .catch(err => err)
                .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid menu ID')
            })
        )

        it('should fail on undefined recipe ID', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.removeDish(email, menu.id.menus[0]._id, undefined, token))
                })
                .catch(err => err)
                .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid recipe ID')
            })
        )

        it('should fail on empty recipe ID', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.removeDish(email, menu.id.menus[0]._id, '', token))
                })
                .catch(err => err)
                .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid recipe ID')
            })
        )

        it('should fail on number recipe ID', () =>
            logic.register(email, username, password, allergens)
                .then(() => logic.authenticate(email, password))
                .then(token => {
                    return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.removeDish(email, menu.id.menus[0]._id, 123, token))
                })
                .catch(err => err)
                .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid recipe ID')
            })
        )
    })

    !!true && describe('basic search', () => {
        it('should succeed on existing menu', () =>
            logic.basicSearch(query)
                .then( res  => expect(res.length).to.equal(80))
        )

        it('should fail on empty query', () =>
            logic.basicSearch('')
                .catch(err => err)
                .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid query')
            })
        )

        it('should fail on undefined query', () =>
            logic.basicSearch(undefined)
                .catch(err => err)
                .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid query')
            })
        )

        it('should fail on number query', () =>
            logic.basicSearch(123)
                .catch(err => err)
                .then(err => {
                expect(err).to.exist
                expect(err.message).to.equal('invalid query')
            })
        )
    })

    !!true && describe('search recipe on user loged', () => {
            it('should succeed on existing user', () =>
                logic.register(email, username, password, allergens)
                    .then(() => logic.authenticate(email, password))
                    .then(token => logic.searchRecipeAllergens(query, email, token))
                    .then( res  => expect(res[0].source).to.equal('Martha Stewart'))
        )
        
        it('should fail on empty query', () =>
                logic.register(email, username, password, allergens)
                    .then(() => logic.authenticate(email, password))
                    .then(token => logic.searchRecipeAllergens('', email, token))
                        .catch(err => err)
                            .then(err => {
                            expect(err).to.exist
                            expect(err.message).to.equal('invalid query')
                        })
        )

        it('should fail on undefined query', () =>
                logic.register(email, username, password, allergens)
                    .then(() => logic.authenticate(email, password))
                    .then(token => logic.searchRecipeAllergens(undefined, email, token))
                        .catch(err => err)
                            .then(err => {
                            expect(err).to.exist
                            expect(err.message).to.equal('invalid query')
                        })
        )

        it('should fail on number query', () =>
                logic.register(email, username, password, allergens)
                    .then(() => logic.authenticate(email, password))
                    .then(token => logic.searchRecipeAllergens(123, email, token))
                        .catch(err => err)
                            .then(err => {
                            expect(err).to.exist
                            expect(err.message).to.equal('invalid query')
                        })
        )

        it('should fail on number email', () =>
                logic.register(email, username, password, allergens)
                    .then(() => logic.authenticate(email, password))
                    .then(token => logic.searchRecipeAllergens(query, 123, token))
                        .catch(err => err)
                            .then(err => {
                            expect(err).to.exist
                            expect(err.message).to.equal('invalid email')
                        })
        )

        it('should fail on undefined email', () =>
                logic.register(email, username, password, allergens)
                    .then(() => logic.authenticate(email, password))
                    .then(token => logic.searchRecipeAllergens(query, undefined, token))
                        .catch(err => err)
                            .then(err => {
                            expect(err).to.exist
                            expect(err.message).to.equal('invalid email')
                        })
        )

        it('should fail on empty email', () =>
                logic.register(email, username, password, allergens)
                    .then(() => logic.authenticate(email, password))
                    .then(token => logic.searchRecipeAllergens(query, '', token))
                        .catch(err => err)
                            .then(err => {
                            expect(err).to.exist
                            expect(err.message).to.equal('invalid email')
                        })
        )
    })

    !!true && describe('search recipe by ID on menu', () => {
            it('should succeed on existing menu', () =>
                logic.register(email, username, password, allergens)
                    .then(() => logic.authenticate(email, password))
                    .then(token => {
                        return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.searchRecipeById(email, menu.id.menus[0]._id, token))
                })
                .then( res  => expect(res.length).to.equal(1))
            )

            it('should fail on empty email', () =>
                logic.register(email, username, password, allergens)
                    .then(() => logic.authenticate(email, password))
                    .then(token => {
                        return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.searchRecipeById('', menu.id.menus[0]._id, token))
                })
                .catch(err => err)
                    .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
            )

            it('should fail on undefined email', () =>
                logic.register(email, username, password, allergens)
                    .then(() => logic.authenticate(email, password))
                    .then(token => {
                        return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.searchRecipeById(undefined, menu.id.menus[0]._id, token))
                })
                .catch(err => err)
                    .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
            )

            it('should fail on number email', () =>
                logic.register(email, username, password, allergens)
                    .then(() => logic.authenticate(email, password))
                    .then(token => {
                        return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.searchRecipeById(123, menu.id.menus[0]._id, token))
                })
                .catch(err => err)
                    .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid email')
                })
            )

            it('should fail on empty menu ID', () =>
                logic.register(email, username, password, allergens)
                    .then(() => logic.authenticate(email, password))
                    .then(token => {
                        return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.searchRecipeById(email, '', token))
                })
                .catch(err => err)
                    .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid menu ID')
                })
            )

            it('should fail on undefined menu ID', () =>
                logic.register(email, username, password, allergens)
                    .then(() => logic.authenticate(email, password))
                    .then(token => {
                        return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.searchRecipeById(email, undefined, token))
                })
                .catch(err => err)
                    .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid menu ID')
                })
            )

            it('should fail on number menu ID', () =>
                logic.register(email, username, password, allergens)
                    .then(() => logic.authenticate(email, password))
                    .then(token => {
                        return logic.addMenu(email, title, token)
                    .then(menu => logic.addDish(email, titleDish, recipeId, order, menu.menus[0]._id, token))
                    .then(menu => logic.searchRecipeById(email, 123, token))
                })
                .catch(err => err)
                    .then(err => {
                    expect(err).to.exist
                    expect(err.message).to.equal('invalid menu ID')
                })
            )
        })

})
