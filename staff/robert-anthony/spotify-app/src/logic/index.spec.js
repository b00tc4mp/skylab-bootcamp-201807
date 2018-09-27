'use strict'

describe('logic (spotify-app)', () => {
    describe('user\'s', () => {

        describe('register user', () => {
            const username = 'robert-anthony-' + Math.random(), password = '123'

            it('should register on correct data', () => {
                return logic.registerUser(username, password)
                    .then(id => {
                        expect(id).toBeDefined()
                    })
            })
        })

        describe('login user', () => {
            const username = 'robert-anthony-' + Math.random(), password = '123'
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
            const username = 'robert-anthony-' + Math.random(), password = '123'

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
            const username = 'robert-anthony-' + Math.random(), password = '123'

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
        let username,password,newUsername,newPassword;

        beforeEach(() => {
           username = 'robert-anthony-' + Math.random()
           password = '123'
           newUsername = "bubbles-" + Math.random();
           newPassword = "onehundred" + Math.random();
          return logic.registerUser(username, password)
            .then(() => logic.loginUser(username, password))
            .catch(console.error)
        })

        it('should update username and password correctly', () => {
          expect(logic._userId).toBeDefined()
          expect(logic._userToken).toBeDefined()
          expect(logic.userUsername).toBeDefined()
         return logic.updateUser(password,newUsername,newPassword)
           .then((res) => {
             expect(res).toBeTruthy();
            expect(logic.userUsername).toBe(newUsername);
           }).then(()=> {
             return logic.loginUser(newUsername,newPassword)
               .then((res) => {
                 expect(res).toBeTruthy()
               });
           }).catch(console.error)

        })

        it('should update username  correctly', () => {
          expect(logic._userId).toBeDefined()
          expect(logic._userToken).toBeDefined()
          expect(logic.userUsername).toBeDefined()
         return logic.updateUser(password,newUsername,undefined)
           .then((res) => {
             expect(res).toBeTruthy();
            expect(logic.userUsername).toBe(newUsername);
           }).then(()=> {
             return logic.loginUser(newUsername,password)
               .then((res) => {
                 expect(res).toBeTruthy()
               });
           }).catch(console.error)

        })

        it('should update password  correctly', () => {
          expect(logic._userId).toBeDefined()
          expect(logic._userToken).toBeDefined()
          expect(logic.userUsername).toBeDefined()
          return logic.updateUser(password,undefined,newPassword)
            .then((res) => {
              expect(res).toBeTruthy();
              expect(logic.userUsername).toBe(username);
            }).then(()=> {
              return logic.loginUser(username,newPassword)
                .then((res) => {
                  expect(res).toBeTruthy()
                });
            }).catch(console.error)

        })

      })


  describe('store user data', () => {
    let username = 'robert-anthony-' + Math.random()
    const password = '123'
    const dataArray = [{a:"b",c:"d",obj:{something:"else"}}]
    const dataObj = {something:{is:"different"}}
    const dataFieldName = "favorites"

    beforeEach(() => {
      username = 'robert-anthony-' + Math.random()
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

  describe('retrieve user data', () => {
    let username = 'robert-anthony-' + Math.random()
    const password = '123'
    const dataArray = [{a:"b",c:"d"}]
    const dataObj = {something:{is:"different"}}
    const dataFieldNameArray = "favorites"
    const dataFieldNameObject = "favoriteObject"

    beforeEach(() => {
      username = 'robert-anthony-' + Math.random()
      return logic.registerUser(username, password)
        .then(() => logic.loginUser(username, password))
        .then(() => {
          return logic.storeUserData(dataFieldNameArray,dataArray)
        })
        .then(() => {
          return logic.storeUserData(dataFieldNameObject,dataObj)
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

    describe('spotify\'s', () => {
        logic.spotifyToken = 'BQBSUI1IUroORzHMXzOINsKcouhOL7WnY8ReJs6GtkOqAJ67RE9vgTje77gwsITxFurDZXaDG3v0q4JfSQ6McwSNP018PIh0PSjuDyztLh_OsHOMG6o2Brh38MrnxW_Jvsosu38v1CTi'

        describe('search artists', () => {
            it('should find artists matching criteria', () => {
                return logic.searchArtists('madonna')
                    .then(artists => {
                        expect(artists).toBeDefined()
                        expect(artists.length).toBe(20)
                        expect(artists[0].name).toBe('Madonna')
                        expect(artists[0].type).toBe('artist')
                    })
            })
        })

        describe('retrieve albums by artist id', () => {
            it('should retrieve albums for given artist id', () => {
                return logic.retrieveAlbumsByArtistId('4BH2S4t8fh9YqRIXnEEDEN')
                    .then(albums => {
                        expect(albums).toBeDefined()
                        expect(albums.length).toBe(3)
                        expect(albums[0].name).toBe('Hunter')
                        expect(albums[0].type).toBe('album')
                    })
            })
        })

        describe('retrieve tracks by album id', () => {
            it('should retrieve tracks for given album id', () => {
                return logic.retrieveTracksByAlbumId('7lnYU1xXbEiKPTZk3ltDE2')
                    .then(tracks => {
                        expect(tracks).toBeDefined()
                        expect(tracks.length).toBe(1)
                        expect(tracks[0].name).toBe('Hunter')
                        expect(tracks[0].type).toBe('track')
                    })
            })
        })

        describe('retrieve track by id', () => {
            it('should retrieve track for given id', () => {
                return logic.retrieveTrackById('4QxwXcPUm1VfkHksz6VuFi')
                    .then(track => {
                        expect(track).toBeDefined()
                        expect(track.name).toBe('Hunter')
                        expect(track.type).toBe('track')
                    })
            })
        })
    })
})