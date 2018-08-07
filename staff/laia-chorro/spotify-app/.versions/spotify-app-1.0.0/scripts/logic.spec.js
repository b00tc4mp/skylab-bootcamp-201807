'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQAHo6bDIpyJL6Ohc4-nqaI2oyb7NDRuhcSzdnaWIzE8Sxz8kdCsroSDz9oAfmhepiRAI9tSHBl8jNl3vhisDp_Cmil4qc9fRvuDcLbTsP-LfHldg55RV15o7nIr7-1dlMr6COAH-EvlZU5WDdoh3asdFG4vU7g';
    
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
            return logic.retrieveTracksByAlbumId('7lnYU1xXbEiKPTZk3ltDE2') //'402yUhwU0GxLYcFESBFddN', '1kYpI1XFkgPzm25ETHZPbU'
                .then(function (tracks) {
                    expect(tracks).toBeDefined();
                    expect(tracks.length).toBe(1);
                    expect(tracks[0].type).toBe('track');
                    expect(tracks[0].name).toBe('Hunter');
                });
        });
    });

    describe('retrieve a single track by id', function () {
        it('should retrieve a single track for given id', function () {
            return logic.retrieveTrackById('4QxwXcPUm1VfkHksz6VuFi')
                .then(function (track) {
                    expect(track).toBeDefined();
                    expect(track.type).toBe('track');
                    expect(track.name).toBe('Hunter');
                    expect(track.track_number).toBe(1);
                });
        });
    });

});