'use strict'

describe('users logic', () => {
    describe('user\'s', () => {

        describe('register user', () => {
            const username = 'stim-user-' + Math.random(), password = '123'

            it('should register on correct data', () => {
                return logic.registerUser(username, password)
                    .then(id => {
                        expect(id).toBeDefined()
                    })
            })
        })

        describe('login user', () => {
            const username = 'stim-user-' + Math.random(), password = '123'
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
                        expect(logic._userUsername).toBe(username)
                    })
            })
        })

        describe('unregister user', () => {
            const username = 'stim-user-' + Math.random(), password = '123'

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
            const username = 'stim-user-' + Math.random(), password = '123'

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

        describe('update user', () => {
            let username
            const password = '123'

            beforeEach(() => {
                username = 'stim-user-' + Math.random()

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
        
        describe(' get retrieve name', () => {
            let username
            const password = '123'

           beforeEach(() => {
               username = 'stim-user-' + Math.random()

               return logic.registerUser(username, password)
                   .then(() => logic.loginUser(username, password))
           })
               it('should return an username', () => {
                   
                   return logic.retrieveUser(password)
                   .then(res => {
                       expect(res).toBeTruthy()
                      
                   })
               })
           })
    })

    //Stim tests

    describe('Steam-app logic', () => {
        describe('most played games', () => {
            it('should return an array of most played games', () => {

                return logic.mostPlayedGames()
                    .then(res => {
                        expect(Object.keys(res).length).toBe(100)
                    })
            })
        })

        describe('news games', () => {
            it('should return an array of news', () => {
                return logic.newsForGame(400)
                    .then(res => {
                        expect(Object.keys(res).length).toBe(11)
                    })
            })
        })        
        describe('get all games', () => {
                it('should return an array of all games', () => {
                    
                    return logic.getAllGames()
                    .then(res => {
                        expect(res.length).toBe(3924)
                    })
                })
            })

        describe(' get games by name', () => {
                it('should return an array of games matching the name given', () => {
                    
                    return logic.getGamesByName("Call")
                    .then(res => {
                        expect(res.length).toBe(18)
                       
                    })
                })
            })

       


         describe('get stats for game ', () => {
              
            it('should return a game', () => {
                       
                       return logic.getStatsForGame(10)
                       .then(res => {
                           expect(res).toBeTruthy()
                           expect(res.name).toBe("Counter-Strike")
                           expect(res.developer).toBe("Valve")
                           expect(res.score_rank).toBe(97)
                       })
                   })
               })
              
         describe('is Favorite ', () => {
              
                it('should check favorites', () => {
                           
                    const res= logic.isFavorite(10)
                          
                    expect(res).toBeFalsy()
                               
                         
                       })
                   })


        describe('toggle game favorite', () => {
              
               it('should check favorites', () => {
                               
                 return logic.toggleGameFavorite(10)
                   .then(res => {
                    expect(res).toBeTruthy()
                    
                    })
                  })
                })
    })

    



})