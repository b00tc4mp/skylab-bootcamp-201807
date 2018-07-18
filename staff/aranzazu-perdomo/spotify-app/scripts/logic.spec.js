'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQDV5GwFQsSPsh22gtCs-trR4DxhBauswKm9mcamVUiL2D_JTGnrbUU7Mna_b5eVo_ehhat0MKM8xWt879-yrtVUmSPSMGBsEF747pmnaebSZ6p3F98MAPZKGPRaFBIjkpuSzPw45FJumZaSspX3B8wY-q864g1iVZYahdD6lP2wvYokKu6_wJR5A79Zm1JPBEhH1HOo_BCv9woH5ngmwUvMZA'
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