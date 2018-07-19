'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQBqoxnXlfSc53fsgqxpyasOnIN7QLnEKMSqZkxXzXlTj5Dsfs8xpqp3-vSXqN8a7MDDHa8pF5Y3yKte9sepcC-B1aLAgqmGAWZttsIKctVhR1pbzRcBEaAldzzrc1IPrF7GVrCdUF9yC9zZSw';

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
            return logic.retrieveTracksByAlbumId('1ZZSvLZfbkBDIFPSMi3Cqk')
                .then(function (tracks) {
                    expect(tracks).toBeDefined();
                    expect(tracks.length).toBe(20);
                    expect(tracks[0].name).toBe('Virgin Mary (Intro) - MDNA World Tour / Live 2012');
                });
        });
    });

    describe('retrieve one track by album id', function () {
        it('should retrieve one track for given album id', function () {
            return logic.retrieveTrackById('1pG9UBPDateu64y8lfHSOk')
                .then(function (track) {
                    expect(track).toBeDefined();
                    expect(track.popularity).toBe(28);
                    expect(track.duration_ms).toBe(346160)
                    expect(track.external_urls.spotify).toBe("https://open.spotify.com/track/1pG9UBPDateu64y8lfHSOk")
                });
        });
    });

});