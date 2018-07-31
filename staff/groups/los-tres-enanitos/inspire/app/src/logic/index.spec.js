'use strict'

describe('logic (unsplash-app)', () => {

    // describe('unsplash\'s', () => {
    //     logic.unsplashAccessKey = '1cb96dfdb0925fb516e37123f0c906d5fbaadf2669fb3b9c5f0f833539476627'

    //     describe('search', () => {
    //         it('should find results matching criteria', () => {
    //             return logic.searchPhotos('tiger')
    //                 .then(res => {
    //                     expect(res).toBeDefined()
    //                     expect(res.total).toBeGreaterThan(0)
    //                     expect(res.results.length).toBeGreaterThan(0)
    //                 })
    //         })

    //         it('should find results matching criteria and page', () => {
    //             return logic.searchPhotos('tiger', 2)
    //                 .then(res => {
    //                     expect(res.results.length).toBe(10)
    //                 })
    //         })
    //     })

    //     describe('retrieve photo by id', () => {
    //         it('should retrieve photo for given id', () => {
    //             return logic.retrievePhotoById('U6nlG0Y5sfs')
    //                 .then(photo => {
    //                     expect(photo).toBeDefined()
    //                     expect(photo.user).toBeDefined()
    //                     expect(photo.user.id).toBe('QtJK-x-mbY0')
    //                     expect(photo.user.username).toBe('hannah15198')
    //                 })
    //         })
    //     })

    //     describe('related photos', () => {
    //         const tags = ['lion', 'yawn', 'mouth', 'tongue', 'dark']

    //         it('should find related photos by photo tags', () => {
    //             return logic.retrieveRelatedPhotosByPhotoTags(tags)
    //                 .then(res => {
    //                     expect(res).toBeDefined()
    //                     expect(res.total).toBeGreaterThan(0)
    //                     expect(res.results.length).toBeGreaterThan(0)
                        
    //                     const photo = res.results[0]
    //                     expect(photo.photo_tags).toBeDefined()
    //                 })
    //         })
    //     })

    //     describe('popular photos', () => {
            
    //         it('should retrieve popular photos', () => {
    //             return logic.retrievePopularPhotos()
    //                 .then(res => {
    //                     expect(res).toBeDefined()
    //                     expect(res.length).toBeGreaterThan(0)
    //                 })
    //         })

    //         it('should find results matching criteria and page', () => {
    //             return logic.retrievePopularPhotos(2)
    //                 .then(res => {
    //                     expect(res.length).toBe(10)
    //                 })
    //         })
    //     })
    // })
})