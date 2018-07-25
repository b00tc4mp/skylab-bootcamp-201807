'use strict'

describe('logic (spotify-app)', () => {
    describe('user\'s', () => {

        describe('register user', () => {
            const username = 'jaume-serradell-' + Math.random(), password = '123'

            it('should register on correct data', () => {
                return logic.registerUser(username, password)
                    .then(id => {
                        expect(id).toBeDefined()
                    })
            })
        })

        describe('login user', () => {
            const username = 'jaume-serradell-' + Math.random(), password = '123'
            let userId

            beforeEach(() => {
                return logic.registerUser(username, password)
                    .then(id => userId = id)
            })

            it('should login on correct data', () => {
                return logic.loginUser(username, password)
                    .then(res => {
                        expect(res).toBeTruthy()

                        expect(logic.userId).toBe(userId)
                        expect(logic.userToken).toBeDefined()
                        expect(logic.userUsername).toBe(username)
                    })
            })
        })

        describe('unregister user', () => {
            const username = 'jaume-serradell-' + Math.random(), password = '123'

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
            const username = 'jaume-serradell-' + Math.random(), password = '123'

            beforeEach(() => {
                return logic.registerUser(username, password)
                    .then(() => logic.loginUser(username, password))
            })

            it('should logout correctly', () => {
                expect(logic.userId).toBeDefined()
                expect(logic.userToken).toBeDefined()
                expect(logic.userUsername).toBeDefined()

                logic.logout()

                expect(logic.userId).toBeNull()
                expect(logic.userToken).toBeNull()
                expect(logic.userUsername).toBeNull()
            })
        })

        describe('update user', () => {
            const username = 'jaume-serradell-' + Math.random(), password = '123'

            beforeEach(() => {
                return logic.registerUser(username, password)
                    .then(() => logic.loginUser(username, password))
            })

            it('should update correctly', () => {
                expect(logic.updateUser).toBeDefined()
            })
        })
    })

    describe('spotify\'s', () => {
        logic.spotifyToken = 'BQAVncRRu7inRjoMt8XdL_Tq5gjvgEmOkNqdyIfE5rsorgP47LWy4XnuNs4awoOtmu9j19z-9-V4oCiRyXhwAW8wWEk27YhJ9DnGCaOYYHmAPp8nLfogSuWldM5DFkjhkmorbQQSA8JJ9nlLOTQTTF075NcKc_qfpV91rDcMIMgHFuLLmji3nSJZvaxnnFFpNsFHQTFftFF6QUoU2ZfgXzI2e1QPzQ2g8LyJhGcQ6UdC3bYPb_HhHAPEHvdb8XCApXwWd4i8QJg'

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