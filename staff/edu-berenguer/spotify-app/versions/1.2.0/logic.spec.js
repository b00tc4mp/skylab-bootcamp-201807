'use strict';

describe('logic (spotify)', function () {
    logic.token = "BQBCqt-fBKY1U80-xWs2gbJ7THSp0Cpx2RVu8s2I-od8U9VLxGpd6J4gIzsEUS1huKMCmCpThYVxMWyCckdKg9dkj-NO-GckM6KmzBX-hE3bCD4ko5mk4tvDIHjD2K-L_PfkGHrDB-tI1VMeOyU";
    
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