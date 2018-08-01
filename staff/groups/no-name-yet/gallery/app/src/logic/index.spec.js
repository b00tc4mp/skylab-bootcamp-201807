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
        let username = 'galleryapp-test123321'
        const password = '123'
        const canvas = document.createElement('canvas')
        let img = new Image()
        img.src = 'src/pics/landing.jpg'
        canvas.getContext('2d').drawImage(img, 100, 100)
        image = canvas.toDataURL('image/png')

        beforeEach(() => {
            return logic.registerUser(username, password)
                .then(() => logic.loginUser(username, password))
        })

        afterEach(() => {
            return logic.unregisterUser(password)
        })

        it('should add image to gallery', () => {
            return logic.addImage(image)
                .then(res => expect(res).toBeTruthy())
        })

        it('should retrieve images from gallery', () => {
            return logic.addImage(image)
                .then(() => logic.retrieveImages())
                .then(res => {
                    expect(res).toBeTruthy()
                    expect(logic._userImages.length).toBe(1)
                })
        })

        it('should delete image from gallery', () => {
            return logic.addImage(image)
                .then(() => logic._userImages[0].id)
                .then(id => logic.deleteImage(id))
                .then(res => {
                    expect(res).toBeTruthy()
                    expect(logic._userImages.length).toBe(0)
                })
        })

        it('should delete all images from a user gallery', () => {
            return logic.addImage(image)
                .then(() => logic.addImage(image))
                .then(() => logic.deleteAll())
                .then(res => {
                    expect(res).toBeTruthy()
                    expect(logic._userImages.length).toBe(0)
                })
        })

        it('should delete user folder (on unregister)', () => {
            return logic.addImage(image)
                .then(() => logic.addImage(image))
                .then(() => logic.deleteAll())
                .then(() => logic.deleteFolder())

                .then(res => {
                    expect(res).toBeTruthy()
                    expect(logic._userImages.length).toBe(0)
                })

        })
    })
})