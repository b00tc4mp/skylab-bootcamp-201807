'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQCzWFxn6xqlDQWBSs6is1AC3isFgSrl7hdfIGEp28VFQDnDg48_3MO6ACnP7fZ5yY5X3qSo-X2BLL7C4dj3B3zPPWWCWx5VwgJLEGizNKc-PBjXhNTBYIYhvatkYJ6o38SnTcByfTRK0cv7-xkUrI4XRDMna2vY37Jwli9_D09yYJ_5pgeSwmj20INdJNGVB-ktqo7eRoGYLURPtioevrAsilClFkZOacSda2RjSWBn63PsufjH5MPX2JxBE68oyjKdpm2vqwM';
    
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
            return logic.retrieveAlbumsByArtistId('6tbjWDEIzxoDsBA1FuhfPW')
                .then(function (albums) {
                    expect(albums).toBeDefined();
                    expect(albums.length).toBe(20);
                    expect(albums[0].name).toBe('Rebel Heart Tour (Live)');
                });
        });
    });

    describe('retrieve tracks by album id', function () {
        it('should retrieve tracks for given album id', function () {
            return logic.retrieveTracksByAlbumId('4hBA7VgOSxsWOf2N9dJv2X')
                .then(function (tracks) {
                    expect(tracks).toBeDefined();
                    expect(tracks.length).toBe(20);
                    expect(tracks[0].name).toBe('Rebel Heart Tour Intro - Live');
                });
        });
    });

    describe('retrieve tracks by id', function () {
        it('should retrieve tracks for given id', function () {
            return logic.retrieveTrackById('5U1tMecqLfOkPDIUK9SVKa')
                .then(function (track) {
                    expect(track).toBeDefined();
                    expect(track.name).toBe('Rebel Heart Tour Intro - Live');
                });
        });
    });
});