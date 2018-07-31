'use strict'

describe('logic (unsplash-app)', () => {

    describe('user\'s', () => {

        describe('register user', () => {

            it('should register on correct data', () => {
                const username = 'unsplash-user-' + Math.random(), password = '123'

                return logic.registerUser(username, password)
                    .then(id => {
                        expect(id).toBeDefined()
                    })
            })

            it('should register on correct data with custom fields', () => {

                const username = 'unsplash-user-' + Math.random(), password = '123'
                const fields = {
                    name: 'John',
                    surname: 'Doe',
                    email: 'john@doe.com'
                }

                return logic.registerUser(username, password, fields)
                    .then(() => logic.loginUser(username, password))
                    .then(() => logic.retrieveUserById(logic._userId))
                    .then(data => {
                        expect(data).toBeDefined()
                        expect(data.name).toBe('John')
                        expect(data.surname).toBe('Doe')
                        expect(data.email).toBe('john@doe.com')
                    })
            })
        })

        describe('login user', () => {
            
            const username = 'unsplash-user-' + Math.random(), password = '123'
            let userId

            beforeEach(() => {
                return logic.registerUser(username, password)
                    .then(id => userId = id)
            })

            it('should login on correct data', () => {
                return logic.loginUser(username, password)
                    .then(res => {
                        expect(res).toBeTruthy()

                        expect(logic._userId).toBe(userId)
                        expect(logic._userToken).toBeDefined()
                        expect(logic.userUsername).toBe(username)
                    })
            })
        })

        describe('logout user', () => {
            
            const username = 'unsplash-user-' + Math.random(), password = '123'

            beforeEach(() => {
                return logic.registerUser(username, password)
                    .then(() => logic.loginUser(username, password))
            })

            it('should logout correctly', () => {
                expect(logic._userId).toBeDefined()
                expect(logic._userToken).toBeDefined()
                expect(logic.userUsername).toBeDefined()

                logic.logout()

                expect(logic._userId).toBeNull()
                expect(logic._userToken).toBeNull()
                expect(logic.userUsername).toBeNull()
            })
        })

        describe('update user', () => {
            let username
            const password = '123'

            beforeEach(() => {
                username = 'unsplash-user-' + Math.random()

                return logic.registerUser(username, password)
                    .then(() => logic.loginUser(username, password))
            })

            it('should update username and password correctly', () => {
                const newUsername = username + '-' + Math.random()
                const newPassword = password + '-' + Math.random()

                return logic.updateUser(password, { newUsername, newPassword })
                    // .then(res => expect(res).toBeTruthy())
                    .then(res => {
                        expect(res).toBeTruthy()

                        return logic.loginUser(newUsername, newPassword)
                    })
                    .then(res => expect(res).toBeTruthy())
            })

            it('should update username correctly', () => {
                const newUsername = username + '-' + Math.random()

                return logic.updateUser(password, { newUsername })
                    .then(res => {
                        expect(res).toBeTruthy()

                        return logic.loginUser(newUsername, password)
                    })
                    .then(res => expect(res).toBeTruthy())
            })

            it('should update password correctly', () => {
                const newPassword = password + '-' + Math.random()

                return logic.updateUser(password, { newPassword })
                    .then(res => {
                        expect(res).toBeTruthy()

                        return logic.loginUser(username, newPassword)
                    })
                    .then(res => expect(res).toBeTruthy())
            })
        })

        describe('retrieve user', () => {

            const username = 'unsplash-user-' + Math.random(), password = '123'

            beforeEach(() => {
                return logic.registerUser(username, password)
                    .then(() => logic.loginUser(username, password))
            })

            it('should retrieve user data', () => {
            
                return logic.retrieveUserById(logic._userId)
                    .then(data => {
                        expect(data).toBeDefined()
                        expect(data.id).toBe(logic._userId)
                        expect(data.username).toBe(username)
                    })
            })
        })

    })

    // describe('unsplash\'s', () => {
    //     logic.unsplashAccessKey = '1cb96dfdb0925fb516e37123f0c906d5fbaadf2669fb3b9c5f0f833539476627'

    //     describe('search', () => {
    //         it('should find results matching criteria', () => {
    //             return logic.searchPhotos('tiger')
    //                 .then(res => {
    //                     expect(res).toBeDefined()
    //                     expect(res.total).toBeGreaterThan(0)
    //                     expect(res.results.length).toBeGreaterThan(0)
    //                 })
    //         })

    //         it('should find results matching criteria and page', () => {
    //             return logic.searchPhotos('tiger', 2)
    //                 .then(res => {
    //                     expect(res.results.length).toBe(10)
    //                 })
    //         })
    //     })

    //     describe('retrieve photo by id', () => {
    //         it('should retrieve photo for given id', () => {
    //             return logic.retrievePhotoById('U6nlG0Y5sfs')
    //                 .then(photo => {
    //                     expect(photo).toBeDefined()
    //                     expect(photo.user).toBeDefined()
    //                     expect(photo.user.id).toBe('QtJK-x-mbY0')
    //                     expect(photo.user.username).toBe('hannah15198')
    //                 })
    //         })
    //     })

    //     describe('related photos', () => {
    //         const tags = ['lion', 'yawn', 'mouth', 'tongue', 'dark']

    //         it('should find related photos by photo tags', () => {
    //             return logic.retrieveRelatedPhotosByPhotoTags(tags)
    //                 .then(res => {
    //                     expect(res).toBeDefined()
    //                     expect(res.total).toBeGreaterThan(0)
    //                     expect(res.results.length).toBeGreaterThan(0)
                        
    //                     const photo = res.results[0]
    //                     expect(photo.photo_tags).toBeDefined()
    //                 })
    //         })
    //     })

    //     describe('popular photos', () => {
            
    //         it('should retrieve popular photos', () => {
    //             return logic.retrievePopularPhotos()
    //                 .then(res => {
    //                     expect(res).toBeDefined()
    //                     expect(res.length).toBeGreaterThan(0)
    //                 })
    //         })

    //         it('should find results matching criteria and page', () => {
    //             return logic.retrievePopularPhotos(2)
    //                 .then(res => {
    //                     expect(res.length).toBe(10)
    //                 })
    //         })
    //     })
    // })
})