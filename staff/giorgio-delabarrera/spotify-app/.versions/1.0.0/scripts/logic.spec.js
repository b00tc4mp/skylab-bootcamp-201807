'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQD8x1_hfL4x0KKf6k2oYhfHf_qJF3Ez3xyyEv_QisvWzUJX7F-hH3Q25quolmcZyz6X85BWdUBkT9b9xDg';
    
    describe('search artists', function () {
        it('should find artists matching criteria', function () {
            return logic.searchArtists('madonna')
                .then(function (artists) {
                    expect(artists).toBeDefined();
                    expect(artists.length).toBe(20);
                    expect(artists[0].name).toBe('Madonna');
                });
        });
    });

    describe('retrieve albums by artist id', function () {
        it('should retrieve albums for given artist id', function () {
            return logic.retrieveAlbumsByArtistId('4BH2S4t8fh9YqRIXnEEDEN')
                .then(function (albums) {
                    expect(albums).toBeDefined();
                    expect(albums.length).toBe(3);
                    expect(albums[0].name).toBe('Hunter');
                });
        });
    });

    describe('retrieve tracks by album id', function () {
        it('should retrieve tracks by album id', function () {
            return logic.retrieveTracksByAlbumId('6ozp33PI3p9AdddB6ZL3xQ')
                .then(function (tracks) {
                    expect(tracks).toBeDefined();
                    expect(tracks.length).toBe(20);
                    expect(tracks[0].name).toBe('Hello - Remastered');
                });
        });
    });

    describe('retrieve track by id', function () {
        it('should retrieve track by id', function () {
            return logic.retrieveTrackById('5wj4E6IsrVtn8IBJQOd0Cl')
                .then(function (track) {
                    expect(track).toBeDefined();
                    expect(track.name).toBe('Wonderwall - Remastered');
                });
        });
    });
});