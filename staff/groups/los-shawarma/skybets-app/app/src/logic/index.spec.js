'use strict'

describe('logic (skybet-app)', () => {

    describe('kiwi Api', () => {
        
        describe('Results from api', () => {
            it('should return data', () => {
                return logic._callKiwiApi('BCN', 'MAD', '08/09/2018', '09/09/2018')
                    .then(flights => {
                        expect(flights).toBeDefined()
                    })
            })
        })

        describe('Results from api', () => {
            it('should return valid price', () => {
                return logic._callKiwiApi('BCN', 'MAD', '08/09/2018', '09/09/2018')
                    .then(flights => {
                        const price = flights[0].price
                        expect(price).toBeDefined()
                        expect(typeof price == 'number').toBeTruthy()
                        expect(price).toBeGreaterThan(0);
                    })
            })
        })

        describe('Results from api', () => {
            it('should return input cities', () => {
                const inputFrom = 'BCN'
                const inputTo = 'IBZ'
                
                return logic._callKiwiApi(inputFrom, inputTo, '10/10/2018', '10/11/2018')
                    .then(flights => {
                        const flyFrom = flights[0].route[0].flyFrom
                        const flyTo = flights[0].route[1].flyFrom
                        expect(flyFrom).toBeDefined()
                        expect(flyTo).toBeDefined()
                        expect(flyFrom).toBe(inputFrom)
                        expect(flyTo).toBe(inputTo)
                    })
            })
        })

        describe('Results from api', () => {
            it('should return input dates', () => {
                const inputDateFrom = '20/8/2018'
                const inputDateTo = '23/9/2018'
                
                const convertFromEpoch = (timestamp) => {
                    const date = new Date(timestamp*1000)

                    const year = date.getFullYear()
                    const month = date.getMonth() + 1
                    const day = date.getDate()

                    return `${day}/${month}/${year}`
                }


                return logic._callKiwiApi('LGW', 'MUC', inputDateFrom, inputDateTo)
                    .then(flights => {
                        const dateFrom = convertFromEpoch(flights[0].route[0].aTimeUTC)
                        const dateTo = convertFromEpoch(flights[0].route[1].aTimeUTC)
                        
                        expect(dateFrom).toBeDefined()
                        expect(dateTo).toBeDefined()
                        expect(dateFrom).toBe(inputDateFrom)
                        expect(dateTo).toBe(inputDateTo)
                    })
            })
        })
    })

    describe('Bets Api', () => {

        describe('Results from api', () => {
            it('should return data', () => {
                return logic._callBetsApi()
                    .then(bets => {
                        expect(bets).toBeDefined()
                    })
            })
        })

        describe('Results from api', () => {
            it('should return competition', () => {
                return logic._callBetsApi()
                    .then(bets => {
                        const competition = bets[0].competition
                        console.log(competition)
                        expect(competition).toBeDefined()
                    })
            })
        })

        describe('Results from api', () => {
            it('should return date match', () => {
                return logic._callBetsApi()
                    .then(bets => {
                        const dates = bets[0].date
                        console.log(dates)
                        expect(dates).toBeDefined()
                    })
            })
        })

        describe('Results from api', () => {
            it('should return time', () => {
                return logic._callBetsApi()
                    .then(bets => {
                        const times = bets[0].time
                        console.log(times)
                        expect(times).toBeDefined()
                    })
            })
        })
        
        describe('Results from api', () => {
            it('should return match', () => {
                return logic._callBetsApi()
                    .then(bets => {
                        const teams = bets[0].team
                        console.log(teams)
                        expect(teams).toBeDefined()
                    })
            })
        })

        describe('Results from api', () => {
            it('should return links', () => {
                return logic._callBetsApi()
                    .then(bets => {
                        const links = bets[0].url
                        console.log(links)
                        expect(links).toBeDefined()
                    })
            })
        })
        
        describe('Results from api', () => {
            it('should return odd', () => {
                return logic._callBetsApi()
                    .then(bets => {
                        const odd = bets[0].odds
                        console.log(odd)
                        expect(odd).toBeDefined()
                    })
            })
        })

        describe('Results from api', () => {
            it('should return results 1 X 2', () => {
                return logic._callBetsApi()
                    .then(bets => {
                        const results1x2 = bets[0].results
                        console.log(results1x2)
                        expect(results1x2).toBeDefined()
                    })
            })
        })

    })

    describe('User Api', () => {

        describe('register user', () => {
            const username = 'los-shawarma-' + Math.random(), password = '123'

            it('should register on correct data', () => {
                return logic.registerUser(username, password)
                    .then(id => {
                        expect(id).toBeDefined()
                    })
            })
        })

        describe('login user', () => {
            const username = 'los-shawarma-' + Math.random(), password = '123'
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
            const username = 'los-shawarma-' + Math.random(), password = '123'

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
            const username = 'los-shawarma-' + Math.random(), password = '123'

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
                username = 'los-shawarma-' + Math.random()

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
    })
})