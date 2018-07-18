'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQDa46Ma7fZP0enduT7WEFQrhzUVzW4QITLecmCY5nrofszWd8zCOgkrEVbEjudvbkygfRNsiZNglvUIBYN2aNivte-p6VAI0cQp8pqqXS_FcGN3M1ThU9eiDxmaByzefvlC7Wq0ocDS';
    
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
});