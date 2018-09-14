'use strict'

describe('logic (gg-wp-App)', () => {

    const validSummonerName = 'imk'
    const validSummonerId = '20917980'
    const validUnrankedId = '49290874'
    const validLeagueId = 'fbfb11b0-0755-11e8-825d-c81f66dd0e0d'

    const unexistentUsername = 'gesztter'
    const unexistentSummonerId = '200000000'
    const invalidLeagueId = 'fbeb11b0-0755-11e8-825d-c81a66dd9e0d'

    const numericType = 123

    true && describe('users api', () => {
        let email
        let password
        const newPassword = '123456'
        const players = ['87654321', '87654322', '87654323']
        const invalidMail = 'wrongmail.com'
        const nonExistingMail = 'nonexistinguser@mail.com'

        beforeEach(() => {
            email = `test-${Math.random()}@mail.com`
            password = `123-${Math.random()}`
        })

        true && describe('register user', () => {

            it('should register a new user on correct data', () => {
                return logic.registerUser(email, password)
                    .then(res => {
                        expect(res).toBeTruthy()
                    })
            })

            it('should fail on trying to register a new user with an invalid mail type', () => {
                return logic.registerUser(numericType, password)
                    .catch(err => err)
                    .then(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe('invalid email')
                    })
            })

            it('should fail on trying to register a new user with an undefined mail type', () => {
                return logic.registerUser(undefined, password)
                    .catch(err => err)
                    .then(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe('invalid email')
                    })
            })

            it('should fail on trying to register a new user with an null mail type', () => {
                return logic.registerUser(null, password)
                    .catch(err => err)
                    .then(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe('invalid email')
                    })
            })

            it('should fail on trying to register a new user with an NaN mail type', () => {
                return logic.registerUser(NaN, password)
                    .catch(err => err)
                    .then(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe('invalid email')
                    })
            })

            it('should fail on trying to register a new user with an invalid password type', () => {
                return logic.registerUser(email, numericType)
                    .catch(err => err)
                    .then(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe('invalid password')
                    })
            })
        })

        !true && describe('login user', () => {

            beforeEach(() => {
                return logic.registerUser(email, password)
            })

            it('should login user on correct data', () => {
                return logic.loginUser(email, password)
                    .then(res => {
                        expect(res).toBeTruthy()
                    })
            })

            it('should fail on trying to login with a wrong mail', () => {
                return logic.loginUser('invalid@invalid.com', password)
                    .catch(err => err)
                    .then(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe('user with invalid@invalid.com email does not exist')
                    })
            })

            it('should fail on trying to login with a wrong password', () => {
                return logic.loginUser(email, 'wrongPasssword')
                    .catch(err => err)
                    .then(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe('wrong password')
                    })
            })

            it('should fail on trying to login with an invalid mail type', () => {
                return logic.loginUser(numericType, password)
                    .catch(err => err)
                    .then(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe('invalid email')
                    })
            })

            it('should fail on trying to login with an invalid password type', () => {
                return logic.loginUser(email, numericType)
                    .catch(err => err)
                    .then(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe('invalid password')
                    })
            })
        })

        !true && describe('update user password', () => {
            beforeEach(() => {
                return logic.registerUser(email, password)
                    .then(() => logic.loginUser(email, password))
            })

            true && it('should update user password on correct data', () => {
                return logic.updateUserPassword(email, password, newPassword)
                    .then(res => {
                        expect(res).toBeTruthy()
                    })
            })

            true && it('should fail on trying update user password with a wrong mail', () => {
                return logic.updateUserPassword('invalid@invalid.com', password, newPassword)
                    .catch(err => err)
                    .then(err => {
                        console.log(err)
                        expect(err).toBeDefined()
                        expect(err.message).toBe('invalid token')
                    })
            })

            true && it('should fail on trying update user password with a wrong password', () => {
                return logic.updateUserPassword(email, 'wrongPasssword', newPassword)
                    .catch(err => err)
                    .then(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe('wrong password')
                    })
            })

            true && it('should fail on trying update user password with an invalid mail type', () => {
                return logic.updateUserPassword(numericType, password, newPassword)
                    .catch(err => err)
                    .then(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe('invalid email')
                    })
            })

            true && it('should fail on trying update user password with an invalid password type', () => {
                return logic.updateUserPassword(email, numericType, newPassword)
                    .catch(err => err)
                    .then(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe('invalid password')
                    })
            })

            true && it('should fail on trying update user password with an invalid new password type', () => {
                return logic.updateUserPassword(email, password, numericType)
                    .catch(err => err)
                    .then(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe('invalid new password')
                    })
            })


            true && it('should fail on trying to update password with an undefined email', () =>
                logic.updateUserPassword(undefined, password, newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe(`invalid email`))
            )

            true && it('should fail on trying to update password with an undefined password', () =>
                logic.updateUserPassword(email, undefined, newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe(`invalid password`))
            )

            true && it('should fail on trying to update password with an empty password', () =>
                logic.updateUserPassword(email, '', newPassword)
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe(`invalid password`))
            )

            true && it('should fail on trying to update password with the same password', () =>
                logic.updateUserPassword(email, password, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe(`new password must be different to old password`))
            )

            true && it('should fail on trying to update password with an undefined new password', () =>
                logic.updateUserPassword(email, password, undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe(`invalid new password`))
            )

            true && it('should fail on trying to update password with an empty new password', () =>
                logic.updateUserPassword(email, password, '')
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe(`invalid new password`))
            )

        })

        !true && describe('delte user account', () => {
            beforeEach(() => {
                return logic.registerUser(email, password)
                    .then(() => logic.loginUser(email, password))
            })

            true && it('should delete user account on correct data', () => {
                return logic.deleteUserAccount(email, password)
                    .then(res => {
                        expect(res).toBeTruthy()
                    })
            })

            true && it('should fail on trying to unregister user with a non existing email', () =>
                logic.deleteUserAccount(nonExistingMail, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe(`invalid token`))
            )

            true && it('should fail on trying to unregister user with a wrong email syntaxis', () => {
                return logic.deleteUserAccount(invalidMail, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe(`invalid email`))
            })

            true && it('should fail on trying to unregister user with an undefined email', () =>
                logic.deleteUserAccount(undefined, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe(`invalid email`))
            )

            true && it('should fail on trying to unregister user with a numeric email', () =>
                logic.deleteUserAccount(123, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe(`invalid email`))
            )

            true && it('should fail on trying to unregister user with a wrong password', () => {
                const password = '0987654'
                return logic.deleteUserAccount(email, password)
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe(`wrong password`))
            })

            true && it('should fail on trying to unregister user with an undefined password', () =>
                logic.deleteUserAccount(email, undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe(`invalid password`))
            )

            true && it('should fail on trying to unregister user with an empty password', () =>
                logic.deleteUserAccount(email, '')
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe(`invalid password`))
            )

            true && it('should fail on trying to unregister user with a numeric password', () =>
                logic.deleteUserAccount(email, 123)
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe(`invalid password`))
            )

        })

        !true && describe('follow player', () => {
            beforeEach(() => {
                return logic.registerUser(email, password)
                    .then(() => logic.loginUser(email, password))
            })

            it('should add player to user correctly', () =>
                logic.followPlayer(validSummonerId)
                    .then(res => {
                        expect(res).toBeTruthy()

                    })
            )

            it('should fail on trying to add an already added player', () => {
                return logic.followPlayer(validSummonerId)
                    .then(res => {
                        expect(res).toBeTruthy()

                        return logic.followPlayer(validSummonerId)
                    })
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe(`the player already exist`))

            })

            it('should fail on trying to add a player with an undefined id', () =>
                logic.followPlayer(undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe(`invalid id`))
            )

            it('should fail on trying to add a player with an empty id', () =>
                logic.followPlayer('')
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe(`invalid id`))
            )

            it('should fail on trying to add a player with a wrong id', () =>
                logic.followPlayer('8765321ASD')
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe(`invalid id`))
            )
        })

        true && describe('list players', () => {
            beforeEach(() => {
                return logic.registerUser(email, password)
                    .then(() => logic.loginUser(email, password))
                    .then(() => logic.followPlayer('87654321'))
                    .then(() => logic.followPlayer('87654322'))
                    .then(() => logic.followPlayer('87654323'))
            })

            true && it('should list players correctly', () =>
                logic.listFollows(email)
                    .then((playersList) => {
                        expect(playersList[0]).toBe(players[0])
                        expect(playersList[1]).toBe(players[1])
                        expect(playersList[2]).toBe(players[2])
                    })
            )

            true && it('should fail on trying to list players with a non existing email', () => {
                sessionStorage.setItem('userEmail', nonExistingMail)
                return logic.listFollows()
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe('invalid token'))
            })

            true && it('should fail on trying to list players with a wrong email syntaxis', () => {
                sessionStorage.setItem('userEmail', invalidMail)
                return logic.listFollows(invalidMail)
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe('invalid email'))
            })

            true && it('should fail on trying to list players with a numeric email', () => {
                sessionStorage.setItem('userEmail', 123)
                return logic.listFollows()
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe('invalid email'))
            })
        })

        !true && describe('unfollow player', () => {
            beforeEach(() => {
                return logic.registerUser(email, password)
                    .then(() => logic.loginUser(email, password))
                    .then(() => logic.followPlayer('87654321'))
                    .then(() => logic.followPlayer('87654322'))
                    .then(() => logic.followPlayer('87654323'))
            })

            true && it('should remove player correctly', () =>
                logic.unFollowPlayer(players[0])
                    .then((res) => {
                        expect(res).toBeTruthy()
                    })
            )

            true && it('should fail on trying to remove player that does not exist', () => {
                const nonExistingId = '012836451'
                return logic.unFollowPlayer(nonExistingId)
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe('player does not exist'))
            })

            true && it('should fail on trying to remove player to user with a non existing email', () => {
                sessionStorage.setItem('userEmail', nonExistingMail)
                return logic.unFollowPlayer(players[0])
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe('invalid token'))
            })

            true && it('should fail on trying to remove a player to user with a wrong email syntaxis', () => {
                sessionStorage.setItem('userEmail', invalidMail)
                return logic.unFollowPlayer(invalidMail, players[0])
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe('invalid email'))
            })

            true && it('should fail on trying to remove user with a numeric email', () => {
                sessionStorage.setItem('userEmail', 123)
                return logic.unFollowPlayer(123, players[0])
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe('invalid email'))
            })

            true && it('should fail on trying to remove a player with an undefined id', () =>
                logic.unFollowPlayer(undefined)
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe('invalid id'))
            )

            true && it('should fail on trying to remove a player with a wrong id', () =>
                logic.unFollowPlayer('8765321ASD')
                    .catch(err => err)
                    .then(({ message }) => expect(message).toBe('invalid id'))
            )
        })
    })

    true && describe('GG-WP api', () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999

        !true && describe('retrive summoner summary info', () => {

            true && it('should retrive the data on valid username', () =>
                logic.getSummonerSumaryBySummonerName(validSummonerName)
                    .then(res => expect(res.name).toBe(validSummonerName))
            )

            true && it('shoud fail on unexistent username', () =>
                logic.getSummonerSumaryBySummonerName(unexistentUsername)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).toBe('Data not found')
                    })

            )

            true && it('shoud fail on sending undefined as summonerId', () =>
                logic.getSummonerSumaryBySummonerName(undefined)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).toBe(undefined)
                    })
            )

            true && it('shoud fail on sending null as summonerId', () =>
                logic.getSummonerSumaryBySummonerName(null)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).toBe('Not found')
                    })
            )

            true && ('shoud fail on sending NaN as summonerId', () =>
                logic.getSummonerSumaryBySummonerName(NaN)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).toBe(undefined)
                    })
            )

        })

        !true && describe('retrive summary preview', () => {

            true && it('should retrive summary on correct summonerName', () =>
                logic.getSummaryPreviewBySummonerId(validSummonerId)
                    .then(res => expect(res.id.toString()).toBe(validSummonerId))

            )

            true && it('should not retrive league on a player that does not have any', () =>
                logic.getSummaryPreviewBySummonerId(validUnrankedId)
                    .then(res => {
                        expect(res.id.toString()).toBe(validUnrankedId)
                        expect(res.queueError).toBe('The summoner does not belong to any League yet!')

                    })
            )

            true && it('should fail on unexistent summonerName', () =>
                logic.getSummaryPreviewBySummonerId(unexistentSummonerId)
                    .catch(err => err)
                    .then(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe('Data not found')
                    })
            )

            true && it('shoud fail on sending undefined as summonerName', () =>
                logic.getSummaryPreviewBySummonerId(undefined)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).toBe('Invalid id')
                    })
            )

            true && it('shoud fail on sending null as summonerName', () =>
                logic.getSummaryPreviewBySummonerId(null)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).toBe('Invalid id')
                    })
            )

            true && it('shoud fail on sending NaN as summonerName', () =>
                logic.getSummaryPreviewBySummonerId(NaN)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).toBe('Invalid id')
                    })
            )
        })

        !true && describe('retrive league by league id', () => {

            true && it('should retrive league on correct league id', () =>
                logic.getLeagueByLeagueId(validLeagueId)
                    .then(res => expect(res.ranki).toBeDefined())

            )

            //WARN! do not execute this (it) test too much or will result in a LolAPI blackList
            true && it('should fail on unexistent league', () =>
                logic.getLeagueByLeagueId(invalidLeagueId)
                    .catch(err => err)
                    .then(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe('Not found')
                    })
            )

            true && it('shoud fail on sending undefined as leagueId', () =>
                logic.getLeagueByLeagueId(undefined)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).toBe('Ups! We are having troubles, please try again later!')
                    })
            )

            true && it('shoud fail on sending null as leagueId', () =>
                logic.getLeagueByLeagueId(null)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).toBe('Ups! We are having troubles, please try again later!')
                    })
            )

            true && ('shoud fail on sending NaN as leagueId', () =>
                logic.getLeagueByLeagueId(NaN)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).toBe('Ups! We are having troubles, please try again later!')
                    })
            )
        })

        !true && describe('retrive live game by summoner id', () => {

            //WARN! the id provided should be a real id and the player should be playing to watch succesful results!
            true && it('should retrive game on correct summoner id and live game', () =>
                logic.getLiveGameBySummonerId('20308708')
                    .then(res => {
                        expect(res.length).toBeGreaterThan(9)
                        expect(res[0].summonerName).toBeDefined()
                        expect(res[0].profileIcon).toBeDefined()
                        expect(res[0].championName).toBeDefined()
                        expect(res[0].championIcon).toBeDefined()
                        expect(res[0].teamId).toBe(100)
                        expect(res[0].spell1).toBeDefined()
                        expect(res[0].spell2).toBeDefined()
                    })
            )

            true && it('should fail on unexistent summonerId', () =>
                logic.getLiveGameBySummonerId(unexistentSummonerId)
                    .catch(err => err)
                    .then(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe('The summoner is not in an active game.')
                    })
            )

            true && it('shoud fail on sending undefined as summonerId', () =>
                logic.getLiveGameBySummonerId(undefined)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).toBe('Invalid id')
                    })
            )

            true && it('shoud fail on sending null as summonerId', () =>
                logic.getLiveGameBySummonerId(null)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).toBe('Invalid id')
                    })
            )

            true && ('shoud fail on sending NaN as summonerId', () =>
                logic.getLiveGameBySummonerId(NaN)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).toBe('Invalid id')
                    })
            )
        })

    })
})