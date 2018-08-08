'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQBOwm_3bY7f2BPx26pny3LvSbv6Dk5AyLRg9Cs1r6__MtmghxtwtiK4FIazmYkHG47xfcV4E9TOoIgg-Xhdzfg8_LgU1VT0NYK5X0vZqWCJAT52wDB0qoDOxSs54vcHglVRaN7CG54';
    
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

    describe('retrieve tracks by track id', function () {
        it('should retrieve tracks for given artist id', function () {
            return logic.retrieveTrackById('5U1tMecqLfOkPDIUK9SVKa')
                .then(function (track) {
                    expect(track).toBeDefined();
                    expect(track.name).toBe('Rebel Heart Tour Intro - Live');
                });
        });
    });
});