'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQDCJA0ctIHLHE5nlS7bAEPkI_rg2iiTj3NxZwnvw6SrQmbMv9r0RALHzGOwzq8jdihHQnzO01pgQj9YcmofR7SoIVabFayQNx58Dm-y0tahmaImIY2KkiU0AdZPu6fszu6Uk2Xuwqwq0i6xTD7hEu-rzqql7YJjC0TYrKcr7ZQ9BRe_8hy56XDjpedAGNQeeuNrBkXsmf1AMjo5MjNDFJnCnIztRqU64o2eWa6XD3uDF_K6UgOp9eBgzhl0ctYztqmSvWAFhDM';
    
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