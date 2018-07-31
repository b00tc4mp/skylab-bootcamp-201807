'use strict'

// login api testing

describe("register of the user", () => {

    const username = "pepe-" + Math.random(), password = "123"
  
    it("should register the name and password of the user correctly", () => {

        
    return logic.register(username, password) 
        .then (id => {

            expect(id).toBeDefined()
        })
    })

})


describe("login of the user", () => {

    const username = "pepe-" + Math.random(), password = "123"
    let userId

    beforeEach(() => {
        return logic.register(username, password)
        .then(id => userId = id )
    })
  
    it("should compare the id, username & password to be the same as registered", () => {

        return logic.login(username, password) 
        .then((result) => {
            expect(result).toBeTruthy()  
            expect(logic.userUsername).toBe(username)
            expect(logic._userPassword).toBe(password)
            expect(logic._userId).toBe(userId)
            expect(logic._userToken).toBeDefined()
        })
    })
})

describe("modify the login or password of the user, or both", () => {
    let username 
    const password = '123'

    beforeEach (() => {
        username = "pepe" + Math.random()
        return logic.register(username, password)
        .then(() => logic.login(username, password))
    })
    
    it("it should modify the login or the password of the user, or both correctly", () => {
        const newUsername = username + Math.random()
        const newPassword = password + Math.random()
        return logic.update(password, newUsername, newPassword)
        .then(res => {
            expect(res).toBeTruthy()
            return logic.login(newUsername, newPassword)
        } )
        .then(res => expect(res).toBeTruthy())    
    })
    it('should update username correctly', () => {
        const newUsername = username + '-' + Math.random()

        return logic.update(password, newUsername)
            .then(res => {
                expect(res).toBeTruthy()

                return logic.login(newUsername, password)
            })
            .then(res => expect(res).toBeTruthy())
    })

    it('should update password correctly', () => {
        const newPassword = password + '-' + Math.random()

        return logic.update(password, undefined, newPassword)
            .then(res => {
                expect(res).toBeTruthy()

                return logic.login(username, newPassword)
            })
            .then(res => expect(res).toBeTruthy())
    })
})
    

describe("delete of the user", () => {

        const username = "pepe-" + Math.random(), password = "123"
    
        beforeEach (() => {
            return logic.register(username, password)
            .then(() => logic.login(username, password))  
       })
      
        it("should delete the user", () => {
    
            return logic.delete(password) 
            .then ((result) => {
                expect(result).toBeTruthy()  
    
            })
        })

})

describe("logout of the user", () => {

        const username = "pepe-" + Math.random(), password = "123"
     
        beforeEach (() => {
            return logic.register(username, password)
            .then(() => logic.login(username, password))  
       })
        it ("should logout correctly", () => {

            expect(logic.userUsername).toBeDefined()
            expect(logic._userPassword).toBeDefined()
            expect(logic._userId).toBeDefined()
            expect(logic._userToken).toBeDefined()

        expect(logic._userUsername).toBeDefined()
        expect(logic._userPassword).toBeDefined()
        expect(logic._userId).toBeDefined()
        expect(logic._userToken).toBeDefined()

        logic.logout()

        expect(logic._userUsername).toBeNull()
        expect(logic._userPassword).toBeNull()
        expect(logic._userId).toBeNull()
        expect(logic._userToken).toBeNull()
    }) 
})

describe ('CRUD for Api\'s Nutrition', ()=>{

    describe('Search ingredients with a query',()=> {

        const query = 'big mac'
        const path = `search/instant?query=${query}`
        const method = 'get'
        const config = {
            method
        } 
        config.headers = {}
        config.headers['content-type'] = 'application/json'
        config.headers['x-app-id'] = '9a5a7f22'
        config.headers['x-app-key'] = '420560ecc26327c6ca2e1f211054ac48'

        return logic.searchIngredients (path, config)
            .then (result => expect(result).toBeTruthy())

    })

    describe('Look up the nutrition information for any branded food item',()=> {

        const ingredientId = '599e7ab83f4a58a961487b4c'
        const path = `search/item?nix_item_id=${ingredientId}`
        const method = 'get'
        const config = {
            method
        } 
        config.headers = {}
        config.headers['content-type'] = 'application/json'
        config.headers['x-app-id'] = '9a5a7f22'
        config.headers['x-app-key'] = '420560ecc26327c6ca2e1f211054ac48'

        return logic.searchIngredients (path,config)
            .then (result => {
                expect(result).toBeTruthy()
                expect(result.food_name).toBe('Pecan Clusters, Milk Chocolate Caramel')
                
            })

    })


})
