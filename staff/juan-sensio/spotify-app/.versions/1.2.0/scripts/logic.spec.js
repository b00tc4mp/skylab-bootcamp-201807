'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQBllxW3pJeILDSyYuAJEOfjFR-qbIwGaDlF0YEOIJdQQfPFg8y5mvS3NqMBfYOkk8tsQYlaLBARN6ty2wmD494gwuox2gw02mTVTxyByTYb0XjPZVlPer9TwbO3wlh9-CrHC9jmXX_UtqETeg';
    
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