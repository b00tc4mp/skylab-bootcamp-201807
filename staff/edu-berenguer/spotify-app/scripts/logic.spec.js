'use strict';

describe('logic (spotify)', function () {
    logic.token = "BQD0x1u9tKy90poOMSZFBPm8P_LQDMB_JvG2Jk_TxrZEqk8w0s9jZGTmBQc8tZ0fuO_QpUGD4IESRPFA3zA9XXHXHUlbbk7AznRmML7iJOtAV-LKPiJXDgrCxyooO1gsfvHpdRC4gFOwUZLeJUI";
    
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
            return logic.retrieveTracksByAlbumId('7lnYU1xXbEiKPTZk3ltDE2')
                .then(function (tracks) {
                    expect(tracks).toBeDefined();
                    expect(tracks[0].name).toBe('Hunter');
                    expect(tracks.length).toBe(1);
                });
        });
    });

    describe('retrieve tracks by track id', function () {
        it('should retrieve tracks for given tracks id', function () {
            return logic.retrieveTrackById('0e1kOIgSd8S7t2GMDvi8Lr')
                .then(function (track) {
                    expect(track).toBeDefined();
                    expect(track.name).toBe("Hello And Goodbye");
                    expect(track.album.name).toBe("Evita: The Complete Motion Picture Music Soundtrack");
                });
        });
    });
});