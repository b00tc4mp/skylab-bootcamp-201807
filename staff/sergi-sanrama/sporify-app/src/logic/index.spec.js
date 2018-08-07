'use strict';

describe('logic (spotify)', function () {
  logic.token = 'BQATRoziTy4euphdkJKD1dp6H4zj3CV6rC6pIt3e-IGLWuFjJPpNJMB4AhS4a8UFGs81bbFccBg-9VFG0yEa_vIYZpCQX_PJTywKFHJmY7z8rD_9VAeuiMBRFccGRNtd69_PJ4MKKxJpdNNvi3WadqR1NKgFPp-wpUI_nP4tYJdL';
    
    describe('search artists', function () {
        it('should find artists matching criteria', function () {
            return logic.searchArtists('madonna')
                .then(function (artists) {
                    expect(artists).toBeDefined();
                    expect(artists.length).toBe(20);
                    expect(artists[0].name).toBe('Madonna');
                    expect(artists[0].type).toBe('artist');
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
                    expect(albums[0].type).toBe('album');
                });
        });
    });

    describe('retrieve tracks by album id', function () {
        it('should retrieve tracks for given album id', function () {
            return logic.retrieveTracksByAlbumId('7lnYU1xXbEiKPTZk3ltDE2')
                .then(function (tracks) {
                    expect(tracks).toBeDefined();
                    expect(tracks.length).toBe(1);
                    expect(tracks[0].name).toBe('Hunter');
                    expect(tracks[0].type).toBe('track');
                });
        });
    });

    describe('retrieve track by id', function () {
        it('should retrieve track for given id', function () {
            return logic.retrieveTrackById('4QxwXcPUm1VfkHksz6VuFi')
                .then(function (track) {
                    expect(track).toBeDefined();
                    expect(track.name).toBe('Hunter');
                    expect(track.type).toBe('track');
                });
        });
    });
});