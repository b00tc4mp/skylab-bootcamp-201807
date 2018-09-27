'use strict'

describe('logic (Museum-App)', () => {
    describe('user\'s', () => {

        describe('testing derictly from _callUsersApi', () => {
            const name = 'javier', lastname = 'serrapell', username = 'someone-' + Math.random(), email = 'lopezno@gmail.com', password = '123'

            return logic.registerUser(name, lastname, username, email, password)
                .then(() => logic.loginUser(username, password))


            it('should register on correct data', () => {
                username = 'someone-' + Math.random()
                return logic._callUsersApi('/user', 'post', { username, password, name, lastname, email })
                    .then(res => {
                        expect(res.data.id).toBeDefined()
                    })
            })

            it('should login on correct data', () => {
                return logic._callUsersApi('/auth', 'post', { username, password })
                    .then(({ data: { id } }) => {
                        expect(id).toBeDefined()
                    })
            })

            it('should update the user data correctly', () => {
                const newPassword = 143
                const newUsername = 'someone-' + Math.random()
                const email = 'iterariterariterar@test.com'
                const data = {
                    username,
                    password,
                    newUsername,
                    email,
                    newPassword

                }

                return logic._callUsersApi(`/user/${this._userId}`, 'put', data, true)
                    .then(res => {
                        expect(res.status).toBe('OK')
                    })
            })


        })

        describe('register user', () => {
            const name = 'javier', lastname = 'serrapell', username = 'someone-' + Math.random(), email = 'lopezno@gmail.com', password = '123'

            it('should register on correct data', () => {
                return logic.registerUser(name, lastname, username, email, password)
                    .then(id => {
                        expect(id).toBeDefined()
                    })
            })
        })

        describe('login user', () => {
            const name = 'javier', lastname = 'serrapell', username = 'someone-' + Math.random(), email = 'lopezno@gmail.com', password = '123'
            let userId

            beforeEach(() => {
                return logic.registerUser(name, lastname, username, email, password)
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
            const name = 'javier', lastname = 'serrapell', username = 'someone-' + Math.random(), email = 'lopezno@gmail.com', password = '123'


            beforeEach(() => {
                return logic.registerUser(name, lastname, username, email, password)
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
            const name = 'javier', lastname = 'serrapell', username = 'someone-' + Math.random(), email = 'lopezno@gmail.com', password = '123'


            beforeEach(() => {
                return logic.registerUser(name, lastname, username, email, password)
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
            const name = 'javier', lastname = 'serrapell', email = 'lopezno@gmail.com'

            beforeEach(() => {
                username = 'someone-' + Math.random()

                return logic.registerUser(name, lastname, username, email, password)
                    .then(() => logic.loginUser(username, password))
            })

            it('should update username and password correctly', () => {
                const newUsername = username + '-' + Math.random()
                const newPassword = password + '-' + Math.random()

                return logic.updateUser(password, newUsername, newPassword, email)
                    // .then(res => expect(res).toBeTruthy())
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

        describe('favorites', () => {
            let username
            const password = '123'
            const name = 'javier', lastname = 'serrapell', email = 'lopezno@gmail.com'
            beforeEach(() => {
                username = 'someone-' + Math.random()
                return logic.registerUser(name, lastname, username, email, password)
                    .then(() => logic.loginUser(username, password))
            })

            it('should toggle track to favorites', () => {

                const imgData = { objectNumber: '7nkRfBjbHx3A53kip8ulbd' }

                return logic.toggleImageFavorite(imgData)
                    .then(res => {
                        expect(res).toBeTruthy()

                        expect(logic._userFavorites.some(element => element.objectNumber === imgData.objectNumber)).toBeTruthy()

                        return logic.toggleImageFavorite(imgData)
                    })
                    .then(res => {
                        expect(res).toBeTruthy()
                        expect(logic._userFavorites.some(element => element.objectNumber === imgData.objectNumber)).toBeFalsy()
                    })
            })

            it('should check is favorite', () => {
                const imgData = { objectNumber: '7nkRfBjbHx3A53kip8ulbd' }

                return logic.toggleImageFavorite(imgData)
                    .then(() => {
                        expect(logic.isFavorite(imgData.objectNumber)).toBeTruthy()

                        return logic.toggleImageFavorite(imgData)
                    })
                    .then(() => {
                        expect(logic.isFavorite(imgData.objectNumber)).toBeFalsy()
                    })
            })
        })

        describe('store user data', () => {
            let username = 'someone-' + Math.random()
            const password = '123'
            const dataFieldName = "favorites"
            const name = 'javier', lastname = 'serrapell', email = 'lopezno@gmail.com'

            beforeEach(() => {
                username = 'someone-' + Math.random()
                return logic.registerUser(name, lastname, username, email, password)
                    .then(() => logic.loginUser(username, password))
                    .catch(console.error)
            })

            it('should store an array of data correctly', () => {
                const dataArray = [{ a: "b", c: "d", obj: { something: "else" } }]
                expect(logic._userId).toBeDefined()
                expect(logic._userToken).toBeDefined()
                expect(logic.userUsername).toBeDefined()
                return logic.storeUserData(dataFieldName, dataArray)
                    .then((res) => {
                        expect(res).toBeTruthy();
                    }).then(() => {
                        return logic.retrieveUserData(dataFieldName)
                            .then((res) => {
                                expect(res).toEqual(dataArray)
                            });
                    }).catch(console.error)

            })

            it('should store object data correctly', () => {
                const dataObj = { something: { is: "different" } }
                expect(logic._userId).toBeDefined()
                expect(logic._userToken).toBeDefined()
                expect(logic.userUsername).toBeDefined()
                return logic.storeUserData(dataFieldName, dataObj)
                    .then((res) => {
                        expect(res).toBeTruthy();
                    }).then(() => {
                        return logic.retrieveUserData(dataFieldName)
                            .then((res) => {
                                expect(res).toEqual(dataObj)
                            });
                    }).catch(console.error)

            })

            it('should store a number correctly', () => {
                const dataNumber = 23123
                expect(logic._userId).toBeDefined()
                expect(logic._userToken).toBeDefined()
                expect(logic.userUsername).toBeDefined()
                return logic.storeUserData(dataFieldName, dataNumber)
                    .then((res) => {
                        expect(res).toBeTruthy();
                    }).then(() => {
                        return logic.retrieveUserData(dataFieldName)
                            .then((res) => {
                                expect(res).toEqual(dataNumber)
                            });
                    }).catch(console.error)

            })

            it('should reutrn null when we send bad data', () => {
                const dataNull = null
                expect(logic._userId).toBeDefined()
                expect(logic._userToken).toBeDefined()
                expect(logic.userUsername).toBeDefined()
                return logic.storeUserData(dataFieldName, dataNull)
                    .then((res) => {
                        expect(res).toBeTruthy();
                    }).then(() => {
                        return logic.retrieveUserData(dataFieldName)
                            .then((res) => {
                                expect(res).toEqual(dataNull)
                            });
                    }).catch(console.error)

            })
        })

        describe('retrieve user data', () => {
            const name = 'javier', lastname = 'serrapell', email = 'lopezno@gmail.com'
            let username = 'robert-anthony-' + Math.random()
            const password = '123'
            const dataArray = [{ a: "b", c: "d" }]
            const dataObj = { something: { is: "different" } }
            const dataFieldNameArray = "favorites"
            const dataFieldNameObject = "favoriteObject"

            beforeEach(() => {
                username = 'robert-anthony-' + Math.random()
                return logic.registerUser(name, lastname, username, email, password)
                    .then(() => logic.loginUser(username, password))
                    .then(() => {
                        return logic.storeUserData(dataFieldNameArray, dataArray)
                    })
                    .then(() => {
                        return logic.storeUserData(dataFieldNameObject, dataObj)
                    })
                    .catch(console.error)
            })

            it('should retrieve an array of data correctly', () => {
                expect(logic._userId).toBeDefined()
                expect(logic._userToken).toBeDefined()
                expect(logic.userUsername).toBeDefined()
                return logic.retrieveUserData(dataFieldNameArray)
                    .then((res) => {
                        expect(res).toEqual(dataArray);
                    })
                    .catch(console.error)

            })


            it('should retrieve object data correctly', () => {
                expect(logic._userId).toBeDefined()
                expect(logic._userToken).toBeDefined()
                expect(logic.userUsername).toBeDefined()
                return logic.retrieveUserData(dataFieldNameObject)
                    .then((res) => {
                        expect(res).toEqual(dataObj);
                    })
                    .catch(console.error)

            })
        })

    })

    describe('Museum', () => {
        logic.museumkey = 'ROQio02r'

        let username = 'someone-' + Math.random()
        const password = '123'
        const name = 'javier', lastname = 'serrapell', email = 'lopezno@gmail.com'

        beforeEach(() => {
            username = 'someone-' + Math.random()
            return logic.registerUser(name, lastname, username, email, password)
                .then(() => logic.loginUser(username, password))
                .catch(console.error)
        })



        describe('general filtered query search', () => {
            it('should find results matching criteria', () => {
                return logic._callRijksmuseumApiQuery('Rembrandt&principalMaker=Rembrandt+van+Rijn')
                    .then(results => {
                        const ourObject = results.artObjects[0];

                        expect(results).toBeDefined()
                        expect(ourObject.id).toBe("en-SK-A-4691")
                        expect(ourObject.longTitle).toBe('Self-portrait, Rembrandt van Rijn, c. 1628')
                        expect(ourObject.webImage.url).toBe('https://lh3.googleusercontent.com/7qzT0pbclLB7y3fdS1GxzMnV7m3gD3gWnhlquhFaJSn6gNOvMmTUAX3wVlTzhMXIs8kM9IH8AsjHNVTs8em3XQI6uMY')
                    })
            })
        })

        describe('basic query search', () => {
            it('should find query matching criteria with only one word', () => {
                return logic.searchMuseum('Rembrandt')
                    .then(results => {
                        expect(results).toBeDefined()
                        expect(results.length).toBe(100)
                        expect(results[0].id).toBe('en-SK-A-4691')
                    })
            })

            it('should find artists matching criteria with two words', () => {
                return logic.searchMuseum('dog Rembrandt')
                    .then(results => {
                        expect(results).toBeDefined()
                        expect(results.length).toBe(100)
                        expect(results[0].id).toBe('en-SK-C-5')
                    })
            })
        })


        describe('get object details', () => {
            it('should return correct details for objectNumber', () => {
                return logic.getMuseumDetailsForObjectNumber('SK-C-211')
                    .then(results => {

                        expect(results.colors).toEqual([
                            "#65563B",
                            " #77705A",
                            " #898D83",
                            " #231E12",
                            " #3C3828",
                            " #A7A58F",
                            " #988561"
                        ])
                        expect(results.maker).toBe("Jacob Isaacksz. van Ruisdael")
                        expect(results.materials).toEqual([
                            "canvas",
                            "oil paint (paint)"
                        ])
                    })
                    .catch(console.error)
            })

        })

        describe('detailed object search with _callRijksmuseumApiObjectDetail', () => {
            //  https://www.rijksmuseum.nl/api/en/collection/SK-C-211?key=ROQio02r&format=json
            it('should return detailed object results for an object number', () => {
                return logic._callRijksmuseumApiObjectDetail('SK-C-211')
                    .then(results => {
                        expect(results).toBeDefined()
                        expect(results.artObject).toBeDefined();
                        expect(results.artObject.objectNumber).toBe("SK-C-211")
                        expect(results.artObject.title).toBe("The Windmill at Wijk bij Duurstede")
                    })

            })
        })

        describe('get object data with  getMuseumDetailsForObjectNumber', () => {
            //  https://www.rijksmuseum.nl/api/en/collection/SK-C-211?key=ROQio02r&format=json
            it('should return detailed object results for an object number', () => {
                return logic.getMuseumDetailsForObjectNumber('SK-C-211')
                    .then(results => {
                        expect(results).toBeDefined()
                        expect(results.colors).toEqual([
                            "#65563B",
                            " #77705A",
                            " #898D83",
                            " #231E12",
                            " #3C3828",
                            " #A7A58F",
                            " #988561"
                        ]);
                        expect(results.imageurl).toBe("http://lh3.googleusercontent.com/3EDrQy1jW6akN2k8eAeCECHJ1FmvM1f2pb9a-de51ErcQcghh7cbpzFIh-QYdcGfpi3FjxH1AP6C_FvPNR-I9n8I4No=s0")
                        expect(results.materials).toEqual([
                            "canvas",
                            "oil paint (paint)"
                        ])
                    })

            })
        })

        describe('general filtered query search', () => {
            it('should find results matching criteria', () => {
                return logic._callRijksmuseumApiQuery('Rembrandt&principalMaker=Rembrandt+van+Rijn')
                    .then(results => {
                        expect(results).toBeDefined()
                        expect(results.artObjects).toBeDefined();
                        const ourObject = results.artObjects[0];
                        expect(ourObject).toBeDefined();
                        expect(ourObject.id).toBe("en-SK-A-4691")
                        expect(ourObject.longTitle).toBe('Self-portrait, Rembrandt van Rijn, c. 1628')
                        expect(ourObject.webImage.url).toBe('https://lh3.googleusercontent.com/7qzT0pbclLB7y3fdS1GxzMnV7m3gD3gWnhlquhFaJSn6gNOvMmTUAX3wVlTzhMXIs8kM9IH8AsjHNVTs8em3XQI6uMY')
                    })
            })
        })

    })
})