'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQCE-edNeQ3kHBS5b1mBQjNkD_ymVu_wiPWqFO9cVYWgOGd5rZgCEPZQv-FEapsvvvTQzDGp2CJbYqKfdMKmZ5ZIj5D8u0asHWEF_0pcYpNILdKoQraBNqtkZOCYP-A-um8Mn4_OXpYB6prrjEtUVkLJwdBJOryw4GYa62h1K-4TXw5C';
    
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