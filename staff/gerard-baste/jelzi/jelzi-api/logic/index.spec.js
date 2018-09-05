require('dotenv').config()

const {
    logic
} = require('.')
const {
    expect
} = require('chai')
const mongoose = require('mongoose')
const {
    Types: {
        ObjectId
    }
} = mongoose
const {
    User,
    Menu,
    Dish
} = require('../data/models')

const {
    env: {
        MONGO_URL
    }
} = process

describe('logic', () => {
    const email = `gerard-${Math.random()}${Math.random()}@gmail.com`,
        username = `username${Math.random()}`,
        password = `123-${Math.random()}`,
        allergens = ['egg-free', 'gluten-free'],
        title = 'Monday menu'
        menu = {title:'Monday'}
        dishes = [{titleDish:'Breakfast', recipeId:'8c18f1819743bf2c06358d281db79743', order:1}],
        titleDish = 'Dinner',
        recipeId = '76850841e0c43087cb56d011602a444a',
        order = 3

    let _connection

    before(() =>
        mongoose.connect(MONGO_URL, {
            useNewUrlParser: true
        })
        .then(conn => _connection = conn)
    )

    beforeEach(() => {
        Promise.all(
            [User.deleteMany()]
        )
    })

    after(() =>
        Promise.all(
            [User.deleteMany()]
        )
        .then(() => _connection.disconnect())
    )

    !true && describe('validate fields', () => {
        it('should succeed on correct value', () => {
            expect(() => logic._validateStringField('email', email).to.equal(email))
            expect(() => logic._validateStringField('username', username).to.equal(username))
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

    !true && describe('register user', () => {
        it('should register correctly', () =>
            User.findOne({ email })
            .then(user => {
                expect(user).to.be.null

                return logic.register(email, username, password, allergens)
            })
            .then(res => {
                expect(res).to.be.true

                return User.findOne({ email })
            })
            .then(user => {
                expect(user).to.exist
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
                expect(user.allergens.length).to.equal(2)

                return User.find()
            })
            .then(users => expect(users.length).to.equal(1))
        )

        it('should fail on trying to register an already registered user', () =>
            User.create({
                email,
                username,
                password,
                allergens
            })
            .then(() => logic.register(email, username, password, allergens))
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`user with ${email} email already exist`))
        )

        it('should fail on trying to register with an undefined email', () =>
            logic.register(undefined, username, password, allergens)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with an empty email', () =>
            logic.register('', username, password, allergens)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with a numeric email', () =>
            logic.register(123, username, password, allergens)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to register with an undefined username', () =>
            logic.register(email, undefined, password, allergens)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to register with an empty username', () =>
            logic.register(email, '', password, allergens)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to register with an undefined username', () =>
            logic.register(email, 123, password, allergens)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid username`))
        )

        it('should fail on trying to register with an undefined password', () =>
            logic.register(email, username, undefined, allergens)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with an empty password', () =>
            logic.register(email, username, '', allergens)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to register with a numeric password', () =>
            logic.register(email, username, 123, allergens)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid password`))
        )

        it('should register without allergens', () =>
            logic.register(email, username, password)
            .then(users => expect(users.allergens).to.equal(undefined))
        )
    })

    !true && describe('authenticate user', () => {
        beforeEach(() => User.create({
            email,
            username,
            password,
            allergens
        }))

        it('should login correctly', () =>
            logic.authenticate(email, password)
            .then(res => {
                expect(res).to.be.exist
            })
        )

        it('should fail on trying to login with an undefined email', () =>
            logic.authenticate(undefined, password)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to login with an empty email', () =>
            logic.authenticate('', password)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to login with a numeric email', () =>
            logic.authenticate(123, password)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to login with an undefined password', () =>
            logic.authenticate(email, undefined)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login with an empty password', () =>
            logic.authenticate(email, '')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to login with a numeric password', () =>
            logic.authenticate(email, 123)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid password`))
        )
    })

    !true && describe('retrieve allergens', () => {
        beforeEach(() => User.create({
            email,
            username,
            password,
            allergens
        }))

        it('should retrieve allergens correctly', () =>
            logic.retrieveProfileUser(email)
            .then(res => {
                expect(res.length).to.equal(2)
                expect(res[0]).to.deep.equal('egg-free')
                expect(res[1]).to.deep.equal('gluten-free')
            })
        )

        it('should fail on trying to retrieve allergens with an undefined email', () =>
            logic.retrieveProfileUser(undefined)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to retrieve allergens with an empty email', () =>
            logic.retrieveProfileUser('')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to retrieve allergens with a number email', () =>
            logic.retrieveProfileUser(123)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        )
    })

    !true && describe('update allergens', () => {
        const newAllergens = ["soy-free"]

        beforeEach(() => User.create({
            email,
            username,
            password,
            allergens
        }))

        it('should update allergens correctly', () =>
            logic.updateAllergens(email, password, allergens, newAllergens)
            .then(res => {
                expect(res).to.be.true

                return User.findOne({email})
            })
            .then(user => {
                expect(user).to.exist
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
                expect(user.allergens).to.deep.equal(newAllergens)
                expect(user.allergens.length).to.equal(1)
            })
        )

        it('should fail on trying to update allergens with an undefined email', () =>
            logic.updateAllergens(undefined, password, newAllergens)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update allergens with an empty email', () =>
            logic.updateAllergens('', password, newAllergens)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update allergens with a numeric email', () =>
            logic.updateAllergens(123, password, newAllergens)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on trying to update allergens with an undefined password', () =>
            logic.updateAllergens(email, undefined, newAllergens)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update allergens with an empty password', () =>
            logic.updateAllergens(email, '', newAllergens)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update allergens with a numeric password', () =>
            logic.updateAllergens(email, 123, newAllergens)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid password`))
        )

        it('should fail on trying to update allergens with an undefined new allergens', () =>
            logic.updateAllergens(email, password, undefined)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid new allergens`))
        )

        it('should fail on trying to update allergens with an empty new allergens', () =>
            logic.updateAllergens(email, password, '')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid new allergens`))
        )

        it('should fail on trying to update allergens with a numeric new allergens', () =>
            logic.updateAllergens(email, password, 123)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid new allergens`))
        )
    })

    !true && describe('save menu', () => {

        beforeEach(() => User.create({
            email,
            username,
            password,
            allergens
        }))

        it('should create menu', () =>
            logic.addMenu(email, title)
            .then(res => {
                expect(res.length).to.equal(1)
                
                return User.findOne({
                    email
                })
            })
            .then(user => {
                expect(user.menus).to.exist
                expect(user.menus.length).to.equal(1)
                expect(user.menus[0].title).to.equal('Monday menu')
                expect(user.menus[0].dishes.length).to.equal(0)
            })
        )

        it('should fail on add undefined title', () =>
            logic.addMenu(email, undefined)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid title`))
        )

        it('should fail on add number title', () =>
            logic.addMenu(email, 123)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid title`))
        )

        it('should fail on add empty title', () =>
            logic.addMenu(email, '')
                .catch(err => err)
                .then(({
                    message
                }) => expect(message).to.equal(`invalid title`))
        )

        it('should fail on add empty email', () =>
            logic.addMenu('', title)
                .catch(err => err)
                .then(({
                    message
            }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on add number email', () =>
            logic.addMenu(123, title)
                .catch(err => err)
                .then(({
                    message
            }) => expect(message).to.equal(`invalid email`))
        )

        it('should fail on add undefined email', () =>
            logic.addMenu(undefined, title)
                .catch(err => err)
                .then(({
                    message
            }) => expect(message).to.equal(`invalid email`))
        )
    })

    !true && describe('save dish to menu', () => {

        beforeEach(() => User.create({
            email,
            username,
            password,
            allergens
        }))
        it('should add a dish on existing menu', () =>
        User.findOne({
            email
        }).then((user) => {
            const menu = {title, dishes}
            user.menus.push(new Menu(menu))
            return user.save()
            .then(user => {
                const menuId = user.menus[0]._id.toString()
                return logic.addDish(email, titleDish, recipeId, order, menuId)
                    .then((user) => {
                                expect(user.menus[0]).to.exist
                                expect(user.menus.length).to.equal(1)
                                expect(user.menus[0].title).to.equal('Monday menu')
                                expect(user.menus[0].dishes.length).to.equal(2)
                                expect(user.menus[0].dishes[1].titleDish).to.equal('Dinner')
                                expect(user.menus[0].dishes[1].order).to.equal(3)
                    })
            })
            })
            
        )

         it('should fail on add undefined email', () =>{
            return logic.addDish(undefined, titleDish, recipeId, order, '3123123')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        }
        )

        it('should fail on add empty email', () =>{
            return logic.addDish('', titleDish, recipeId, order, '3123123')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        }
        )

        it('should fail on add number email', () =>{
            return logic.addDish(123, titleDish, recipeId, order, '3123123')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        }
        )

        it('should fail on add empty title dish', () =>{
            return logic.addDish(email, '', recipeId, order, '3123123')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid title Dish`))
        }
        )

        it('should fail on add number title dish', () =>{
            return logic.addDish(email, 123, recipeId, order, '3123123')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid title Dish`))
        }
        )

        it('should fail on add undefined title dish', () =>{
            return logic.addDish(email, undefined, recipeId, order, '3123123')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid title Dish`))
        }
        )

        it('should fail on add undefined recipe ID', () =>{
            return logic.addDish(email, titleDish, undefined, order, '3123123')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid recipe Id`))
        }
        )

        it('should fail on add number recipe ID', () =>{
            return logic.addDish(email, titleDish, 123, order, '3123123')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid recipe Id`))
        }
        )

        it('should fail on add empty recipe ID', () =>{
            return logic.addDish(email, titleDish, '', order, '3123123')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid recipe Id`))
        }
        )

        it('should fail on add empty order', () =>{
            return logic.addDish(email, titleDish, recipeId, '', '3123123')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid order`))
        }
        )

        it('should fail on add undefined order', () =>{
            return logic.addDish(email, titleDish, recipeId, undefined, '3123123')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid order`))
        }
        )

        it('should fail on add string order', () =>{
            return logic.addDish(email, titleDish, recipeId, 'undefined', '3123123')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid order`))
        }
        )

        it('should create a dish without menu created ', () =>
            User.create({
                email:email+'a',
                username:username+'a',
                password,
                allergens
            })
            .then(user => {
                return logic.addDish(email, titleDish, recipeId, order,undefined)
                    .catch((err) => err) 
                    .then(({message}) => expect(message).to.equal('invalid menuId'))
            })
        )
    })
   
    !true && describe('remove dish', () => {
        beforeEach(() => User.create({
            email,
            username,
            password,
            allergens
        }))

        it('should delete dish on one menu', () =>
            User.findOne({
                email
            }).then(user => {
                const menu = { title }
                user.menus.push(new Menu(menu))

                let menuId
                let dishId
                return user.save()
                    .then(user => {
                        menuId = user.menus[0]._id.toString()
                        const dish = new Dish(dishes[0])
                        const dish2 = new Dish({titleDish:'Brunch', recipeId:'55450841e0c43087cb56d011602e443z', order:2})

                        dishId = dish.id
                        user.menus.forEach(element => {  
                            if (element._id.toString() === menuId) {
                                element.dishes.push(dish)
                                element.dishes.push(dish2)
                            }
                        })
                        return user.save()
                    })
                    .then(user => {
                        return logic.removeDish(email, menuId, dishId)
                            .then(() => {
                                return User.findOne({
                                    email
                                })
                            })
                            .then(user => {
                                expect (user.menus[0].dishes.length).to.equal(1)
                                expect (user.menus[0].dishes[0].titleDish).to.equal('Brunch')
                            })
                    }
                    )
            })
        )
        it('should fail on delete existing menu with undefined email', () =>{
            return logic.removeDish(undefined, '4342342', '34234234')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        }
        )

        it('should fail on delete existing menu with empty email', () =>{
            return logic.removeDish('', '4342342', '34234234')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        }
        )

        it('should fail on delete existing menu with number email', () =>{
            return logic.removeDish(34234, '4342342', '34234234')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        }
        )

        it('should fail on delete existing menu with undefined menuId', () =>{
            return logic.removeDish(email, undefined, '34234234')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid Menu Id`))
        }
        )

        it('should fail on delete existing menu with empty menuId', () =>{
            return logic.removeDish(email, '', '34234234')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid Menu Id`))
        }
        )

        it('should fail on delete existing menu with number menuId', () =>{
            return logic.removeDish(email, 24324, '34234234')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid Menu Id`))
        }
        )

        it('should fail on delete existing menu with undefined id', () =>{
            return logic.removeDish(email, '24324', undefined)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid Dish Id`))
        }
        )

        it('should fail on delete existing menu with empty id', () =>{
            return logic.removeDish(email, '24324', '')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid Dish Id`))
        }
        )

        it('should fail on delete existing menu with number id', () =>{
            return logic.removeDish(email, '24324', 324)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid Dish Id`))
        }
        )

    })

    !true && describe('remove menu', () => {
        
        beforeEach(() => User.create({
            email,
            username,
            password,
            allergens,
            menus:menu 
        }))
         it('should delete a menu on existing user', () =>
            User.findOne({email})
            .then(user => {
                return menuId = user.menus[0]._id.toString()
            }).then(menuId=>{

                return logic.removeMenu(email, menuId)
                .then(() => {
                    return User.findOne({ email })
                })
                    .then(user => {
                        expect (user.menus.length).to.equal(0)
                                     })
            })
        )

        it('should fail on delete menu with undefined email', () =>{
            return logic.removeMenu(undefined, '4342342')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))})
    
        it('should fail on delete menu with number email', () =>{
            return logic.removeMenu(123, '4342342')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        })
    
        it('should fail on delete menu with empty email', () =>{
            return logic.removeMenu('', '4342342')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))
        }
        )
    
        it('should fail on delete menu with undefined menu ID', () =>{
            return logic.removeMenu(email, undefined)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid Menu ID`))
        }
        )
    
        it('should fail on delete menu with number menu ID', () =>{
            return logic.removeMenu(email, 234)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid Menu ID`))
        }
        )
    
        it('should fail on delete menu with empty menu ID', () =>{
            return logic.removeMenu(email, '')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid Menu ID`))
        }
        )
    })

    !true && describe('List menus', () => {
        
        beforeEach(() => User.create({
            email,
            username,
            password,
            allergens,
            menus:menu 
        }))
        it('should list all user menus', () => {
            debugger
            return logic.listMenus(email)
                .then(menus => {
                    debugger
                    expect(menus.length).to.equal(1)
                    expect(menus[0].title).to.equal('Monday')
            
                })
        })

        it('should fail on list menu with empty email', () =>{
            return logic.listMenus('')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))})

        it('should fail on list menu with undefined email', () =>{
            return logic.listMenus(undefined)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))})

        it('should fail on list menu with number email', () =>{
            return logic.listMenus(123)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))})

    })

    !true && describe('List menu and dish', () => {
        const newMenu = new Menu(menu)
        const menuId = newMenu.id;
        newMenu.dishes.push(new Dish(dishes[0]), new Dish(dishes[0]))

        beforeEach(() => User.create({
            email,
            username,
            password,
            allergens,
            menus: newMenu
        }))

        it('should list all user menus', () => {
            return logic.listDishes(email, menuId)
                .then(dishes => {
                    expect(dishes.length).to.equal(2)
                })
        })

        it('should fail on list menu with empty email', () =>{
            return logic.listDishes('', menuId)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))})

        it('should fail on list menu with undefined email', () =>{
            return logic.listDishes(undefined, menuId)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))})

        it('should fail on list menu with number email', () =>{
            return logic.listDishes(123, menuId)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))})

        it('should fail on list menu with empty menu ID', () =>{
            return logic.listDishes(email, '')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal('invalid menu ID'))})

        it('should fail on list menu with number menu ID', () =>{
            return logic.listDishes(email, 123)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal('invalid menu ID'))})

        it('should fail on list menu with undefined menu ID', () =>{
            return logic.listDishes(email, undefined)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal('invalid menu ID'))})
    })

    !true && describe('Search with allergens', () => {

        beforeEach(() => User.create({
            email,
            username,
            password,
            allergens,
    
        }))
        it('Search', () => {
            return logic.searchRecipeAllergens('ramen', email)
                .then(recipeData => {
                    expect(recipeData.length).to.equal(20)
                })
        })
        it('should fail on search menu with undefined email', () =>{
            return logic.searchRecipeAllergens('ramen', undefined)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))})
            
        it('should fail on search menu with number email', () =>{
            return logic.searchRecipeAllergens('ramen', 123)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))}) 

        it('should fail on search menu with empty email', () =>{
            return logic.searchRecipeAllergens('ramen', '')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))})
            
        it('should fail on search menu with empty query', () =>{
            return logic.searchRecipeAllergens('', email)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid query`))})

        it('should fail on search menu with number query', () =>{
            return logic.searchRecipeAllergens(123, email)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid query`))})

        it('should fail on search menu with undefined query', () =>{
            return logic.searchRecipeAllergens(undefined, email)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid query`))})
    })

    !true && describe('Basic search', () => {

        it('Basic search with query', () => {
            return logic.basicSearch('cake')
                .then(recipeData => {
                    expect(recipeData.length).to.equal(80)
                })
        })

        it('should fail on basic search with undefined query', () =>{
            return logic.basicSearch(undefined)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid query`))})

        it('should fail on basic search with empty query', () =>{
            return logic.basicSearch('')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid query`))})

        it('should fail on basic search with number query', () =>{
            return logic.basicSearch(123)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid query`))})
    })

    !true && describe('Search recipe by Id', () => {
        beforeEach(() => User.create({
            email,
            username,
            password,
            allergens
        }))

        it('should search by recipe Id', () =>
            User.findOne({
                email
            }).then(user => {
                const menu = { title }
                user.menus.push(new Menu(menu))

                let menuId
                let dishId
                return user.save()
            })
                    .then(user => {
                        menuId = user.menus[0]._id.toString()
                        const dish = new Dish(dishes[0])
                        const dish2 = new Dish({titleDish:'Brunch', recipeId:'e22178517a25b7e55626de2f8c6f165a', order:2})
        
                        dishId = dish.id
                        user.menus.forEach(element => {  
                            if (element._id.toString() === menuId) {
                                element.dishes.push(dish)
                                element.dishes.push(dish2)
                            }
                        })
                        return user.save()
                    })
                    .then(user => {
                        return logic.searchRecipeById(email, menuId)
                            .then(recipesData => {
                                debugger
                                expect (recipesData).to.exist
                                expect (recipesData.length).to.equal(2)
                            })
                    }
                )
            
        )

        it('should fail on search recipe by ID with undefined email', () =>{
            return logic.searchRecipeById(undefined, menuId)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))})

        it('should fail on search recipe by ID with empty email', () =>{
            return logic.searchRecipeById('', menuId)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))})

        it('should fail on search recipe by ID with numeric email', () =>{
            return logic.searchRecipeById(123, menuId)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid email`))})

        it('should fail on search recipe by ID with numeric Menu ID', () =>{
            return logic.searchRecipeById(email, 123)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid Menu ID`))})

        it('should fail on search recipe by ID with empty Menu ID', () =>{
            return logic.searchRecipeById(email, '')
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid Menu ID`))})

        it('should fail on search recipe by ID with undefined Menu ID', () =>{
            return logic.searchRecipeById(email, undefined)
            .catch(err => err)
            .then(({
                message
            }) => expect(message).to.equal(`invalid Menu ID`))})

    })

    !!true && describe('Basic search recipe ID', () => {
    it('Basic search with query', () => {
        debugger
        return logic.basicSearchRecipeById('b66666d5c882ca199f43def8f1b8a03f')
            .then(recipesData => {
                debugger
                expect(recipesData).to.exist
            })
    })
})
    
})




