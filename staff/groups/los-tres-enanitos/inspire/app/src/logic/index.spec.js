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

        describe('unregister user', () => {
            const username = 'unsplash-user-' + Math.random(), password = '123'

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

        describe('likes', () => {
            let username
            const password = '123'

            beforeEach(() => {
                username = 'unsplash-user-' + Math.random()

                return logic.registerUser(username, password)
                    .then(() => logic.loginUser(username, password))
            })

            it('should toggle photo to likes', () => {
                const photoId = 'U6nlG0Y5sfs'

                return logic.togglePhotoLike(photoId)
                    .then(res => {
                        expect(res).toBeTruthy()
                        expect(logic._userLikes.includes(photoId)).toBeTruthy()

                        return logic.togglePhotoLike(photoId)
                    })
                    .then(res => {
                        expect(res).toBeTruthy()
                        expect(logic._userLikes.includes(photoId)).toBeFalsy()
                    })
            })

            it('should check is favorite', () => {
                const photoId = 'U6nlG0Y5sfs'

                return logic.togglePhotoLike(photoId)
                    .then(() => {
                        expect(logic.isLiked(photoId)).toBeTruthy()

                        return logic.togglePhotoLike(photoId)
                    })
                    .then(() => {
                        expect(logic.isLiked(photoId)).toBeFalsy()
                    })
            })
        })

        describe('generate random Id', () => {
            let text

            it('should random id', () => {
                text = logic._generateRandomId()

                expect(text).toBeDefined()
                expect(text.length).toBe(11)
                
            })
        })

        describe('generate new collection Id', () => {
            let result

            it('should new collection id', () => {
                result = logic._generateNewCollectionId()

                expect(result).toBeDefined()
                expect(result.length).toBe(11)
            })
        })
    
        describe('collections', () => {
            let username
            const password = '123'

            beforeEach(() => {
                username = 'unsplash-user-' + Math.random()

                return logic.registerUser(username, password)
                    .then(() => logic.loginUser(username, password))
            })

            it('should create new collection', () => {
                
                const name = 'Animals'
                const description = 'My favorite animals'

                return logic.createNewCollection(name, description)
                    .then(collectionId => {
                        expect(collectionId).toBeDefined()

                        expect(logic._userCollections).toBeDefined()
                        expect(logic._userCollections.length).toBe(1)

                        expect(logic._userCollections[0].name).toBe(name)
                        expect(logic._userCollections[0].description).toBe(description)
                    })
            })

            it('should edit a collection', () => {
                
                const name = 'Animals'
                const description = 'My favorite animals'
                const newName = 'Cars'
                const newDescription = 'My favorite cars'

                return logic.createNewCollection(name, description)  
                    .then(collectionId => logic.editCollection(collectionId, { name: newName, description:newDescription }))
                    .then(res => {
                        expect(res).toBeTruthy()

                        expect(logic._userCollections[0].name).toBe(newName)
                        expect(logic._userCollections[0].description).toBe(newDescription)
                    })
            })

            it('should delete a collection', () => {
                
                const name = 'Animals'
                const description = 'My favorite animals'

                return logic.createNewCollection(name, description)  
                    .then(collectionId => logic.deleteCollection(collectionId))
                    .then(res => {
                        expect(res).toBeTruthy()

                        expect(logic._userCollections.length).toBe(0)
                    })
            })
        })

        describe('photos collection', () => {
            let username
            const password = '123'
            const collectionName = 'Animals'
            const collectionDescription = 'My favorite animals'
            let collectionId

            beforeEach(() => {
                username = 'unsplash-user-' + Math.random()

                return logic.registerUser(username, password)
                    .then(() => logic.loginUser(username, password))
                    .then(() => logic.createNewCollection(collectionName, collectionDescription))
                    .then(id => collectionId = id)
            })

            it('should toggle photo to collections', () => {
                const photoId = 'U6nlG0Y5sfs'

                return logic.togglePhotoCollection(photoId, collectionId)
                    .then(res => {
                        expect(res).toBeTruthy()

                        expect(logic._userCollections[0].photos.includes(photoId)).toBeTruthy()

                        return logic.togglePhotoCollection(photoId, collectionId)
                    })
                    .then(res => {
                        expect(res).toBeTruthy()

                        expect(logic._userCollections[0].photos.includes(photoId)).toBeFalsy()
                    })
            })

            it('should check if photo is in collection', () => {
                const photoId = 'U6nlG0Y5sfs'

                return logic.togglePhotoCollection(photoId, collectionId)
                    .then(() => {
                        expect(logic.isInCollection(photoId, collectionId)).toBeTruthy()

                        return logic.togglePhotoCollection(photoId, collectionId)
                    })
                    .then(() => {
                        expect(logic.isInCollection(photoId, collectionId)).toBeFalsy()
                    })
            })
        })

    })

    describe('unsplash\'s', () => {
        logic.unsplashAccessKey = 'f054c8ab6f6003082f765a95a875c1fa31770d47f951f23c7bb85c8865559406'

        describe('search', () => {
            it('should find results matching criteria', () => {
                return logic.searchPhotos('tiger')
                    .then(res => {
                        expect(res).toBeDefined()
                        expect(res.total).toBeGreaterThan(0)
                        expect(res.results.length).toBeGreaterThan(0)
                    })
            })

            it('should find results matching criteria and page', () => {
                return logic.searchPhotos('tiger', 2)
                    .then(res => {
                        expect(res.results.length).toBe(30)
                    })
            })
        })

        describe('retrieve photo by id', () => {
            it('should retrieve photo for given id', () => {
                return logic.retrievePhotoById('U6nlG0Y5sfs')
                    .then(photo => {
                        expect(photo).toBeDefined()
                        expect(photo.user).toBeDefined()
                        expect(photo.user.id).toBe('QtJK-x-mbY0')
                        expect(photo.user.username).toBe('hannah15198')
                    })
            })
        })

        describe('related photos', () => {
            const tags = ['lion', 'yawn', 'mouth', 'tongue', 'dark']

            it('should find related photos by photo tags', () => {
                return logic.retrieveRelatedPhotosByPhotoTags(tags)
                    .then(res => {
                        expect(res).toBeDefined()
                        expect(res.total).toBeGreaterThan(0)
                        expect(res.results.length).toBeGreaterThan(0)
                        
                        const photo = res.results[0]
                        expect(photo.photo_tags).toBeDefined()
                    })
            })
        })

        describe('popular photos', () => {
            
            it('should retrieve popular photos', () => {
                return logic.retrievePopularPhotos()
                    .then(res => {
                        expect(res).toBeDefined()
                        expect(res.length).toBeGreaterThan(0)
                    })
            })

            it('should find results matching criteria and page', () => {
                return logic.retrievePopularPhotos(2)
                    .then(res => {
                        expect(res.length).toBe(30)
                    })
            })
        })
    })
})