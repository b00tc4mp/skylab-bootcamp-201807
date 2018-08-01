'use strict'

describe("Register, Login, Update, Unregister and Logout of the users account", () => {

    describe("register of the user", () => {

        const username = "pepe-" + Math.random(), password = "123"
        
        it("should register the name and password of the user correctly", () => {

            return logic.register(username, password)
                .then(id => {
                    expect(id).toBeDefined()
                    expect(username).toBeDefined()
                    expect(password).toBeDefined()
                    expect(password).toBe('123')
                })
        })
    })

    describe("login of the user", () => {

        const username = "pepe-" + Math.random(), password = "123"
        let userId

        beforeEach(() => {
            return logic.register(username, password)
                .then(id => userId = id)
        })

        it("should login correctly", () => {

            return logic.login(username, password)
                .then((result) => {
                    expect(result).toBeTruthy()
                    expect(logic.userUsername).toBeDefined()
                    expect(logic.userUsername).toBe(username)
                    expect(logic._userPassword).toBeDefined()
                    expect(logic._userPassword).toBe(password)
                    expect(logic._userId).toBeDefined()
                    expect(logic._userId).toBe(userId)
                    expect(logic._userToken).toBeDefined()
                })
        })
    })

    describe("update the login or password of the user", () => {

        let username
        const password = "123"

        beforeEach(() => {
            username = "pepe-" + Math.random()
            return logic.register(username, password)
                .then(() => logic.login(username, password))
        })

        it("should update the users account correctly", () => {
            const newUsername = username + Math.random()
            const newPassword = password + Math.random()
            return logic.update(password, newUsername, newPassword)
                .then(res => {
                    expect(res).toBeTruthy()
                    expect(newUsername).toBeDefined()
                    expect(newPassword).toBeDefined()
                    expect(logic.userUsername).toBe(newUsername)
                    expect(logic._userPassword).toBe(newPassword)
                    return logic.login(newUsername, newPassword)
                })
                .then(res => {
                    expect(res).toBeTruthy()
                    expect(logic.userUsername).toBeDefined()
                    expect(logic.userUsername).toBe(newUsername)
                    expect(logic._userPassword).toBeDefined()
                    expect(logic._userPassword).toBe(newPassword)
                    expect(logic._userId).toBeDefined()
                    expect(logic._userToken).toBeDefined()
                })
        })
        it('should update username correctly, without changing the password', () => {

            const newUsername = username + '-' + Math.random()

            return logic.update(password, newUsername)
                .then(res => {
                    expect(res).toBeTruthy()
                    expect(newUsername).toBeDefined()
                    expect(logic.userUsername).toBe(newUsername)
                    return logic.login(newUsername, password)
                })
                .then(res => {
                    expect(res).toBeTruthy()
                    expect(logic.userUsername).toBeDefined()
                    expect(logic.userUsername).toBe(newUsername)
                    expect(logic._userPassword).toBeDefined()
                    expect(logic._userPassword).toBe(password)
                    expect(logic._userId).toBeDefined()
                    expect(logic._userToken).toBeDefined()
                })
        })

        it('should update password correctly, without changing the username', () => {

            const newPassword = password + '-' + Math.random()

            return logic.update(password, undefined, newPassword)
                .then(res => {
                    expect(res).toBeTruthy()
                    expect(newPassword).toBeDefined()
                    expect(logic._userPassword).toBe(newPassword)
                    return logic.login(username, newPassword)
                })
                .then(res => {
                    expect(res).toBeTruthy()
                    expect(logic.userUsername).toBeDefined()
                    expect(logic.userUsername).toBe(username)
                    expect(logic._userPassword).toBeDefined()
                    expect(logic._userPassword).toBe(newPassword)
                    expect(logic._userId).toBeDefined()
                    expect(logic._userToken).toBeDefined()
                })
        })
    })

    describe("delete the users account, unregister", () => {

        const username = "pepe-" + Math.random(), password = "123"

        beforeEach(() => {
            return logic.register(username, password)
                .then(() => logic.login(username, password))
        })

        it("should delete the users account correctly", () => {

            return logic.delete(password)
                .then((result) => {
                    expect(result).toBeTruthy()
                    expect(logic.userUsername).toBeNull()
                    expect(logic._userPassword).toBeNull()
                    expect(logic._userId).toBeNull()
                    expect(logic._userToken).toBeNull()
                })
        })
    })

    describe("logout of the user", () => {

        const username = "pepe-" + Math.random(), password = "123"

        beforeEach(() => {
            return logic.register(username, password)
                .then(() => logic.login(username, password))
        })
        it("should logout the user correctly", () => {

            expect(logic.userUsername).toBeDefined()
            expect(logic._userPassword).toBeDefined()
            expect(logic._userId).toBeDefined()
            expect(logic._userToken).toBeDefined()

            logic.logout()

            expect(logic.userUsername).toBeNull()
            expect(logic._userPassword).toBeNull()
            expect(logic._userId).toBeNull()
            expect(logic._userToken).toBeNull()
        })
    })
})


describe('Nutritions API', () => {

    describe('Search ingredients by query', () => {

        const query = 'potato'

        it("should search ingredients by query correctly", () => {

            return logic.searchIngredients(query)
                .then(result => {
                    expect(result).toBeTruthy()
                    expect(result.common[0].food_name).toBe('potato')
                    expect(result.common[0].locale).toBe('en_US')
                    expect(result.common[0].photo.thumb).toBeDefined()
                    expect(result.common[0].photo.thumb).toBe('https://d2xdmhkmkbyw75.cloudfront.net/752_thumb.jpg')
                    expect(result.common[0].serving_unit).toBe('potato medium')
                    expect(result.common[0].serving_qty).toBe(1)
                    expect(result.common[0].tag_id).toBe('752')
                })
        })
    })

    describe('look up the nutrition information of any result', () => {

        const query = 'olive'

        it("should show ingredient info", () => {

            return logic.ingredientInfo(query)
                .then(result => {
                    expect(result).toBeTruthy()
                    expect(result.foods[0].food_name).toBe("olive")
                    expect(result.foods[0].nf_calories).toBe(4.37)
                    expect(result.foods[0].nf_total_fat).toBe(0.41)
                    expect(result.foods[0].nf_cholesterol).toBe(0)
                    expect(result.foods[0].nf_total_carbohydrate).toBe(0.24)
                    expect(result.foods[0].nf_sugars).toBe(0)
                    expect(result.foods[0].nf_protein).toBe(0.03)
                    expect(result.foods[0].nf_saturated_fat).toBe(0.05)
                    expect(result.foods[0].serving_unit).toBe("olive")
                    expect(result.foods[0].serving_qty).toBe(1)
                    expect(result.foods[0].serving_weight_grams).toBe(3.8)
                    expect(result.foods[0].nf_sodium).toBe(27.93)
                    expect(result.foods[0].nf_potassium).toBe(0.3)
                    expect(result.foods[0].nf_dietary_fiber).toBe(0.12)
                    expect(result.foods[0].photo.thumb).toBeDefined()
                    expect(result.foods[0].photo.thumb).toBe('https://d2xdmhkmkbyw75.cloudfront.net/94_thumb.jpg')
                    expect(result.foods[0].photo.highres).toBeDefined()
                    expect(result.foods[0].photo.highres).toBe('https://d2xdmhkmkbyw75.cloudfront.net/94_highres.jpg')
                    expect(result.foods[0].nix_brand_id).toBeNull()
                    expect(result.foods[0].nix_brand_name).toBeNull()
                    expect(result.foods[0].nix_item_id).toBeNull()
                    expect(result.foods[0].nix_item_name).toBeNull()
                    expect(result.foods[0].tags.food_group).toBe(3)
                    expect(result.foods[0].tags.item).toBe("olive")
                    expect(result.foods[0].tags.measure).toBeNull()
                    expect(result.foods[0].tags.quantity).toBe("1.0")
                    expect(result.foods[0].tags.tag_id).toBe(94)
                })
        })
    })
})