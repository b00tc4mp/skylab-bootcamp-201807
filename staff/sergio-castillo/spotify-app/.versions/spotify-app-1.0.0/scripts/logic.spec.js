'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQAqoRGb8tOhQP2OZpSkTCovSAuHK-HbK4PszwwnJcwsSlyZGtIKfTf0MJwV8YqavTFtCr0JZgihCoNwJVpz-ee0hPDdI0RpEvlyFiAA6XnQlWEdhuUsflDHYggYpV8Zu4I4ELRa-4iiWg';
    
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
            return logic.retrieveTracksByAlbumId('4hBA7VgOSxsWOf2N9dJv2X')
                .then(function (tracks) {
                    expect(tracks).toBeDefined();
                    expect(tracks.length).toBe(20);
                    expect(tracks[0].name).toBe("Rebel Heart Tour Intro - Live");
                });
        });
    });
    describe('retrieve track id', function () {
        it('should retrieve tracks for given album id', function () {
            return logic.retrieveTrackById('5U1tMecqLfOkPDIUK9SVKa')
                .then(function (track) {
                    expect(track).toBeDefined();
                    expect(track.name).toBe("Rebel Heart Tour Intro - Live");
                });
        });
    });
});