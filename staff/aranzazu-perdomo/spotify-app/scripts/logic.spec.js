'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQDEETB0sRUe7s0LIEVeXLUJZPJiQEBcvUCserd3Q67BDVcSGKPed7F5TtRUc8302bghMJMasFc3cfXdtMOPdquJkn_FF0iSiFnzlV14kyumk9DA08S2_qnMoSkZG4oQIY1o0k7wZEkgPspmNhaqzljTAgjox9AN1G9xcgnqkau1uMNgq6JESi_Khyh73w3djyG2FM2Oaoy6Bt1CGlNTzoAHAw'
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