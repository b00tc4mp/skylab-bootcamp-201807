'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQAya_Dq37WAdcFH7sfpT5A-rKMa8BdHc_O9tD77NtCgv4Ffc6zZuBObWP4xho8tbDKbYM0XfR9HJzG5JO9GxSNhMj7w0KtYTkvLUkA3TXXb_ooOK53-PQiu9Nv3O8Gbiooop5mw1-jKDn3vkA';
    
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

    describe('retrieve tracks by album id', function() {
        it('should retrieve tracks for given album id', function () {
            return logic.retrieveTracksByAlbumId('0tGPJ0bkWOUmH7MEOR77qc')
                .then(function (tracks) {
                    expect(tracks).toBeDefined();
                    expect(tracks.length).toBe(1);
                    expect(tracks[0].name).toBe('Cut To The Feeling');
                });
        });
    });

    describe('retrieve tracks by id', function() {
        it('should retrieve track for given id', function () {
            return logic.retrieveTrackById('11dFghVXANMlKmJXsNCbNl')
                .then(function (tracks) {
                   expect(tracks).toBeDefined();
                   // expect(tracks.length).toBe(3);
                    expect(tracks.name).toBe('Cut To The Feeling');
                });
        });
    });

});