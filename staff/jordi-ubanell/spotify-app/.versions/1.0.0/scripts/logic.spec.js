'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQBR4LH-AR-LMprdvBtMSSJFudIG_0xOAGeqsdLcehpSrzFeCmHv2ryx8iUQ_-9vgLpXpsrEUIz7XcWxz-yri8nbhhTCNkRS4bhZJokQ0DAm-6ccGLfP-X4g9y0aiu_N9tkYAVf2Rr4';

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
        it('should retrieve tracks for given album id', function () {
            return logic.retrieveTracksByAlbumId('402yUhwU0GxLYcFESBFddN')
                .then(function (tracks) {
                    expect(tracks).toBeDefined();
                    expect(tracks.length).toBe(1);
                    expect(tracks[0].name).toBe('Jungle Love');
                });
        });
    });

    describe('retrieve track by id', function () {
        it('should retrieve a track for given id', function () {
            return logic.retrieveTrackById('0OqRSUAfZSKitnvyNlJNdE')
                .then(function (track) {
                    expect(track).toBeDefined();
                    // expect(track.length).toBe(1);
                });
        });
    }); 
});

