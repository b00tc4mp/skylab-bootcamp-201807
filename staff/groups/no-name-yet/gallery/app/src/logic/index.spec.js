describe('logic (gallery-app)', () => {
    
    describe('user\'s', () => {

        describe('register user', () => {
            const username = 'galleryapp-' + Math.random(), password = '123'

            it('should register on correct data', () => {
                return logic.registerUser(username, password)
                    .then(id => {
                        expect(id).toBeDefined()
                    })
            })
        })

        describe('login user', () => {
            const username = 'galleryapp-' + Math.random(), password = '123'
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

        describe('unregister user', () => {
            const username = 'galleryapp-' + Math.random(), password = '123'

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

        describe('logout user', () => {
            const username = 'galleryapp-' + Math.random(), password = '123'

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
                username = 'galleryapp-' + Math.random()

                return logic.registerUser(username, password)
                    .then(() => logic.loginUser(username, password))
            })

            it('should update username and password correctly', () => {
                const newUsername = username + '-' + Math.random()
                const newPassword = password + '-' + Math.random()

                return logic.updateUser(password, newUsername, newPassword)
                    .then(res => {
                        expect(res).toBeTruthy()

                        return logic.loginUser(newUsername, newPassword)
                    })
                    .then(res => expect(res).toBeTruthy())
            })

            it('should update username correctly', () => {
                const newUsername = username + '-' + Math.random()

                return logic.updateUser(password, newUsername)
                    .then(res => {
                        expect(res).toBeTruthy()

                        return logic.loginUser(newUsername, password)
                    })
                    .then(res => expect(res).toBeTruthy())
            })

            it('should update password correctly', () => {
                const newPassword = password + '-' + Math.random()

                return logic.updateUser(password, undefined, newPassword)
                    .then(res => {
                        expect(res).toBeTruthy()

                        return logic.loginUser(username, newPassword)
                    })
                    .then(res => expect(res).toBeTruthy())
            })
        })

    })

    describe('gallery', () => {
        let username = 'galleryapp-test/' + Math.random()
        const password = '123'
        const canvas = document.createElement('canvas')
        let img = new Image()
        img.src = 'src/pics/landing.jpg'
        canvas.getContext('2d').drawImage(img, 100, 100)
        canvas.toBlob(blob => {
            image = new File([blob], 'webcam.png', { type: 'image/png', lastModified: Date.now() });
        })

        beforeEach(() => {
            return logic.registerUser(username, password)
                .then(() => logic.loginUser(username, password))
        })

        afterEach(() => {
            return logic.unregisterUser(password)
        })

        describe('add image to gallery', () => {

            it('should add image to cloudinary', () => {
                return logic.addImage(image)
                    .then(res => expect(res).toBeTruthy())
            })

            it('should add image to session storage', () => {
                return logic.addImage(image)
                    .then(() => expect(logic._userImages.length).not.toBe(0))
            })

        })

        describe('retrieve user\'s images', () => {

            it('should retrieve images from cloudinary', () => {
                return logic.addImage(image)
                    .then(() => logic.retrieveImages())
                    .then(res => expect(res).toBeTruthy())
            })

            it('should add retrieved images to session storage', () => {
                return logic.addImage(image)
                    .then(() => logic.retrieveImages())
                    .then(() => expect(logic._userImages.length).toBe(1))
            })

        })

        describe('delete an image', () => {

            it('should delete an image from cloudinary', () => {
                return logic.addImage(image)
                    .then(() => logic._userImages[0].id)
                    .then(id => logic.deleteImage(id))
                    .then(res => expect(res).toBeTruthy())
            })

            it('should delete an image from session sotrage', () => {
                return logic.addImage(image)
                    .then(() => logic._userImages[0].id)
                    .then(id => logic.deleteImage(id))
                    .then(() => expect(logic._userImages.length).toBe(0))
            })

        })

        describe('delete all user\'s images', () => {
            it('should delete all images from cloudinary user\'s folder', () => {
                return logic.addImage(image)
                    .then(() => logic.addImage(image))
                    .then(() => logic.deleteAll())
                    .then(res => expect(res).toBeTruthy())
            })
            it('should delete all images from session storage', () => {
                return logic.addImage(image)
                    .then(() => logic.addImage(image))
                    .then(() => logic.deleteAll())
                    .then(() => expect(logic._userImages.length).toBe(0))
            })
        })

        it('should delete cloudinary user\'s folder', () => {
            return logic.addImage(image)
                .then(() => logic.addImage(image))
                .then(() => logic.deleteAll())
                .then(() => logic.deleteFolder())
                .then(res => expect(res).toBeTruthy())
        })

    })

    describe('cloudmersive api', () => {
        let username = 'galleryapp-test/' + Math.random()
        const password = '123'
        const style = "modernist"
        const canvas = document.createElement('canvas')
        let img = new Image()
        img.src = 'src/pics/landing.jpg'
        canvas.getContext('2d').drawImage(img, 100, 100)
        canvas.toBlob(blob => {
            image = new File([blob], 'test.png', { type: 'image/png', lastModified: Date.now() });
        })

        beforeEach(() => {
            return logic.registerUser(username, password)
                .then(() => logic.loginUser(username, password))
        })

        afterEach(() => {
            return logic.unregisterUser(password)
        })

        it('should receive transformed image', () => {
            return logic.transfer(image, style)
                .then(res => {
                    expect(res).toBeDefined()
                })
        })
    })

})