'use strict'

describe('logic (spotify-app)', () => {
    
    describe('user\'s', () => {
        
        describe('register user', () => {
            const username = 'juan-sensio-1', password = '123'
            it('should register on correct data', () => {
                return logic.registerUser(username, password)
                    .then(id => {
                        expect(id).toBeDefined()
                    })
            })
            afterEach(() => {
                return logic.loginUser(username,password)
                    .then( () => logic.unregisterUser(password)) 
            })
        })

        describe('login user', () => {
            const username = 'juan-sensio-1', password = '123'
            beforeEach(() => {
                return logic.registerUser(username, password)
            })
            it('should login on correct data', () => {
                return logic.loginUser(username, password)
                    .then(res => {
                        expect(res).toBeTruthy()
                    })
            })
            afterEach(() => {
                return logic.unregisterUser(password) 
            })
        })

        describe('unregister user', () => {
            const username = 'juan-sensio-1', password = '123'
            beforeEach(() => {
                return logic.registerUser(username, password)
                    .then(() => logic.loginUser(username,password))
            })
            it('should unregister on correct data', () => {
                return logic.unregisterUser(password)
                    .then(res => {
                        expect(res).toBeTruthy()
                    })
            })
        })

    })

    describe('spotify\'s', () => {
        logic.spotifyToken = 'BQDzAIspNX406qMI5t9WHsdzrZ7_RDNBin2KE4Gd76qDZFHAIhBwSlbM-h1NMsu6fXUMWVx6OaxPO1khCKDtV-SCBCHNMHZT5hwCVdEXIMwnjx9D3vUKkB1n3sLpqtZCjrjUATbNTza47qrYzQ'

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