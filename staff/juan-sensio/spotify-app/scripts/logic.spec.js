'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQBav_A_1tg22VthmrdiqcxPz_-bpksOYgnia87DPxyiUK2qpmRklT0eNCGQNtgvmGBFWiLJdBJ1v-o2PmHw1U_potL5lfrSrSz_qTaXoJjP1_ahxjYwhNF-zryA0FkJfvGHnOsITGsjc7HJdw';
    
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