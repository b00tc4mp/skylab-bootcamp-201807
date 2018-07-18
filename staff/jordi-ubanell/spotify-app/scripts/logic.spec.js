'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQC0LXjWmhoASEa0nI0nWnOD_LB_Q3smDW6sjxIQFwkY1lWyWLS00Y42RWWUZaiZgLp6U4z9z74TpxxOJ3_gDJaEXyBK4Zmjh8qv6lYX04OB8YLLDidDEonCWpyyU0HGiXb5DiordlA';

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
});n 

