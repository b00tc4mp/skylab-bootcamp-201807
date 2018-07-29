'use strict'

// login api testing

describe("register of the user", () => {

    const username = "pepe-" + Math.random(), password = "123"
  
    it("should register the name and password of the user correctly", () => {

        logic.register(username, password) 
        .then ((id) => {

            expect(id).toBeDefined()
        })
    })

})


describe("login of the user", () => {

    const username = "pepe-" + Math.random(), password = "123"
    let userId

    beforeEach (() => {
        logic.register(username, password)
        .then (function(id){

            userId = id 
        })
    })
  
    it("should compare the id, username & password to be the same as registered", () => {

        logic.login(username, password) 
        .then ((result) => {
            expect(result).toBeTruthy()  
            expect(logic._userUsername).toBe(username)
            expect(logic._userPassword).toBe(password)
            expect(logic._userId).toBe(id)
            expect(logic._userToken).toBeDefined()
        })
    })
})

describe("logout of the user", () => {

    const username = "pepe-" + Math.random(), password = "123"

    beforeEach (() => {
        logic.register(username, password)
        .then(() => logic.login(username, password))  
    })
    it ("should logout correctly", () => {

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
