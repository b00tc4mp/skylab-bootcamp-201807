'use strict'

// We are going to test the logic for our application called NutriLab

describe ('This is the logic for the NutriLab app', ()=>{

    // We want to control de User's Management (Registration a new user, Authentification it, Retrieve data info from this user and/or Update, and Delete this user)

    describe('User\'s Management', ()=>{

        describe ('User\'s Registration Validation', ()=>{
            const username = 'koldo' + Math.random()
            const password = '123'

            it ('Should register the user on correct data',()=>{
                return logic.registerUser(username, password)
                .then(id => {
                    expect(id).toBeDefined()
                })

            })
        })
        describe ('User\'s Authentification: Log In', ()=>{
            const username = 'koldo' + Math.random()
            const password = '123'
            let userId

            beforeEach(()=>{
                return logic.registerUSer (username, password)
                .then (id=> userId = id)
            })

            it ('Should get authentification from this new user',()=>{
                return logic.loginUser(username, password)
                .then(res => {
                    expect(res).toBeTruthy()
                    expect(logic._userId).toBe(userId)
                    expect(logic._userToken).toBeDefined()
                    expect(logic._userUsername).toBe(username)
                })

            })
        })

        describe ('Updating Data User Information', ()=> {
            const username = 'koldo' + Math.random() 
            const password='123'

            beforeEach (()=> {
                return logic.registerUser(username, password)
                    .then (()=> logic.loginUser (username, password))
            })
            it ('should update username and password correctly', () => {
                const newUsername = username + '-' + Math.random()
                const newPassword = password + '-' + Math.random()
                return logic.updateUser(password, newUsername, newPassword)
                    .then (res => {
                        expect(res).toBeTruthy()
                        return logic.loginUser(newUsername, newPassword)
                    })
                    .then (res => expect (res).toBeTruthy())
            })
            it ('should update password correctly', () => {
                const newPassword = password + '-' + Math.random()
                return logic.updateUser(password, undefined, newPassword)
                    .then (res => {
                        expect(res).toBeTruthy()
                        return logic.loginUser(username, newPassword)
                    })
                    .then (res => expect (res).toBeTruthy())
            })
        })

        describe('Logout user', () => {
            const username = 'koldo' + Math.random(), password = '123'

            beforeEach(() => {
                return logic.registerUser(username, password)
                    .then(() => logic.loginUser(username, password))
            })

            it('should logout correctly', () => {
                expect(logic._userId).toBeDefined()
                expect(logic._userToken).toBeDefined()
                expect(logic._userUsername).toBeDefined()
                logic.logout()
                expect(logic._userId).toBeNull()
                expect(logic._userToken).toBeNull()
                expect(logic._userUsername).toBeNull()
            })
        })
        
        describe('Deleting User', () => {
            const username = 'koldo' + Math.random(), password = '123'

            beforeEach(() => {
                return logic.registerUser(username, password)
                    .then(() => logic.loginUser(username, password))
            })

            it('should unregister on correct data', () => {
                return logic.unregisterUser(password)
                    .then(res => {
                        expect(res).toBeTruthy()
                    })
            })
        })

    })

    describe ('CRUD for Api\'s Nutrition', ()=>{

        describe('Search ingredients with a query',()=> {

            const query = 'big mac'
            const path = '/search'

            return logic.searchIngredients (path, 'get', query, body)
                .then (result => expect(result).toBeTruthy())

        })

        describe('Look up the nutrition information for any branded food item',()=> {

            const query = 'big mac'
            const path = 'search'

            return logic.searchIngredients (path, method, query, body)
                .then (result => expect(result).toBeTruthy())

        })


    })

})