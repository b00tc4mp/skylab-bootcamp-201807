'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQACNMP6fSLSn19QPkzg1dRVcw8q3elPrHIb9PtzOHkKZKzr-hkgW8r8QilH-TLDjShrx4GHhK6XQGtGDm36z8qsSRQsY5lB6jgj8Mw75drzz8QAY7IyRaiNBI5Z1MtlQrHvIzFtK_8f3BWyarHz5ePAm-l_S3hhd9bCd5swTTo290K67uIqQbvMYh14_n_U094-mIb1N6JoAu8TChRuUChHLQ'
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
            return logic.retrieveTracksByAlbumId('1ZZSvLZfbkBDIFPSMi3Cqk')
                .then(function (tracks) {
                    expect(tracks).toBeDefined();
                    expect(tracks.length).toBe(1);
                    expect(tracks[0].name).toBe("Cut To The Feeling");
                });
        });
    });

    describe('retrieve tracks by id', function () {
        it('should retrieve tracks for given  id', function () {
            return logic.retrieveTrackById("1pG9UBPDateu64y8lfHSOk")
                .then(function (track) {
                    expect(track).toBeDefined();
                    expect(track.name).toBe('Cut To The Feeling');
                });
        });
    });
   
   

});