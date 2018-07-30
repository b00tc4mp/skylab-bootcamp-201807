'use strict'

describe('logic (Museum-App)', () => {
    describe('user\'s', () => {

        describe('register user', () => {
            const username = 'someone-' + Math.random(), password = '123'

            it('should register on correct data', () => {
                return logic.registerUser(username, password)
                    .then(id => {
                        expect(id).toBeDefined()
                    })
            })
        })

        describe('login user', () => {
            const username = 'someone-' + Math.random(), password = '123'
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
            const username = 'someone-' + Math.random(), password = '123'

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
            const username = 'someone-' + Math.random(), password = '123'

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
                username = 'someone-' + Math.random()

                return logic.registerUser(username, password)
                    .then(() => logic.loginUser(username, password))
            })

            it('should update username and password correctly', () => {
                const newUsername = username + '-' + Math.random()
                const newPassword = password + '-' + Math.random()

                return logic.updateUser(password, newUsername, newPassword)
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

        // describe('retrieve user', () => {
        //     const username = 'manuel-barzi-' + Math.random(), password = '123'

        //     beforeEach(() => {
        //         return logic.registerUser(username, password)
        //             .then(() => logic.loginUser(username, password))
        //     })

        //     it('should retrieve user data', () => {
        //         return logic.retrieveUser()
        //             .then(data => {
        //                 expect(data.username).toBe(logic.userUsername)
        //             })
        //     })
        // })

        // describe('favorites', () => {
        //     let username
        //     const password = '123'

        //     beforeEach(() => {
        //         username = 'manuel-barzi-' + Math.random()

        //         return logic.registerUser(username, password)
        //             .then(() => logic.loginUser(username, password))
        //     })

        //     it('should toggle track to favorites', () => {
        //         const trackId = '4QxwXcPUm1VfkHksz6VuFi'

        //         return logic.toggleTrackFavorite(trackId)
        //             .then(res => {
        //                 expect(res).toBeTruthy()
        //                 expect(logic._userFavorites.includes(trackId)).toBeTruthy()

        //                 return logic.toggleTrackFavorite(trackId)
        //             })
        //             .then(res => {
        //                 expect(res).toBeTruthy()
        //                 expect(logic._userFavorites.includes(trackId)).toBeFalsy()
        //             })
        //     })

        //     it('should check is favorite', () => {
        //         const trackId = '6ozp33PI3p9AdddB6ZL3xQ'

        //         return logic.toggleTrackFavorite(trackId)
        //             .then(() => {
        //                 expect(logic.isFavorite(trackId)).toBeTruthy()

        //                 return logic.toggleTrackFavorite(trackId)
        //             })
        //             .then(() => {
        //                 expect(logic.isFavorite(trackId)).toBeFalsy()
        //             })
        //     })
        // })

        describe('store user data', () => {
            let username = 'someone-' + Math.random()
            const password = '123'
            const dataArray = [{a:"b",c:"d",obj:{something:"else"}}]
            const dataObj = {something:{is:"different"}}
            const dataFieldName = "favorites"
        
            beforeEach(() => {
              username = 'someone-' + Math.random()
              return logic.registerUser(username, password)
                .then(() => logic.loginUser(username, password))
                .catch(console.error)
            })
        
            it('should store an array of data correctly', () => {
              expect(logic._userId).toBeDefined()
              expect(logic._userToken).toBeDefined()
              expect(logic.userUsername).toBeDefined()
              return logic.storeUserData(dataFieldName,dataArray)
                .then((res) => {
                  expect(res).toBeTruthy();
                }).then(()=> {
                  return logic.retrieveUserData(dataFieldName)
                    .then((res) => {
                      expect(res).toEqual(dataArray)
                    });
                }).catch(console.error)
        
            })
        
            it('should store object data correctly', () => {
              expect(logic._userId).toBeDefined()
              expect(logic._userToken).toBeDefined()
              expect(logic.userUsername).toBeDefined()
              return logic.storeUserData(dataFieldName,dataObj)
                .then((res) => {
                  expect(res).toBeTruthy();
                }).then(()=> {
                  return logic.retrieveUserData(dataFieldName)
                    .then((res) => {
                      expect(res).toEqual(dataObj)
                    });
                }).catch(console.error)
        
            })
          })

    })

    describe('Museum', () => {
        logic.museumkey = 'ROQio02r'

        let username = 'someone-' + Math.random()
        const password = '123'
       
    
        beforeEach(() => {
          username = 'someone-' + Math.random()
          return logic.registerUser(username, password)
            .then(() => logic.loginUser(username, password))
            .catch(console.error)
        })
    


        describe('general filtered query search', () => {
            it('should find results matching criteria', () => {
                return logic._callRijksmuseumApiQuery('Rembrandt&principalMaker=Rembrandt+van+Rijn')
                    .then(results => {
                   const     ourObject = results.artObjects[0];

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
              console.log(results)

              expect(results.colors).toEqual([
                "#65563B",
                " #77705A",
                " #898D83",
                " #231E12",
                " #3C3828",
                " #A7A58F",
                " #988561"
              ])
              expect(results.principalMaker).toBe("Jacob Isaacksz. van Ruisdael")
              expect(results.materials).toEqual([
                "canvas",
                "oil paint (paint)"
              ])
            })
            .catch(console.error)
        })

      })

        // describe('retrieve albums by artist id', () => {
        //     it('should retrieve albums for given artist id', () => {
        //         return logic.retrieveAlbumsByArtistId('4BH2S4t8fh9YqRIXnEEDEN')
        //             .then(albums => {
        //                 expect(albums).toBeDefined()
        //                 expect(albums.length).toBe(3)
        //                 expect(albums[0].name).toBe('Hunter')
        //                 expect(albums[0].type).toBe('album')
        //             })
        //     })
        // })

        // describe('retrieve tracks by album id', () => {
        //     it('should retrieve tracks for given album id', () => {
        //         return logic.retrieveTracksByAlbumId('7lnYU1xXbEiKPTZk3ltDE2')
        //             .then(tracks => {
        //                 expect(tracks).toBeDefined()
        //                 expect(tracks.length).toBe(1)
        //                 expect(tracks[0].name).toBe('Hunter')
        //                 expect(tracks[0].type).toBe('track')
        //             })
        //     })
        // })

        // describe('retrieve track by id', () => {
        //     it('should retrieve track for given id', () => {
        //         return logic.retrieveTrackById('4QxwXcPUm1VfkHksz6VuFi')
        //             .then(track => {
        //                 expect(track).toBeDefined()
        //                 expect(track.name).toBe('Hunter')
        //                 expect(track.type).toBe('track')
        //             })
        //     })
        // })
    })
})