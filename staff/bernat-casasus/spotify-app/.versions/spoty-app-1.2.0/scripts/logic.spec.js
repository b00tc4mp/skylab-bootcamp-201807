'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQCqMvNrWJXjOZvKTUk6aqKmb4H15ryp2WXiIfH9ycS1RVuanLpckGFpFB6L0tZ1RBbO78kGyAAMaEb4fwhXcXOVWpl-Ns2MChqZXu6ZTqgdJbmfv1uP68l0y_Xel8Q68nX5D920JoM9n2acfkSj9AwvKMS0ErLAcFQ';
    
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

    describe('retrieve track by album id', function(){
        it('should retrieve tracks from given album id', function(){

            return logic.retrieveTracksByAlbumId('4hBA7VgOSxsWOf2N9dJv2X')
                .then(function(track){
                    expect(track.length).toBe(20);
                    expect(track).toBeDefined();
                    expect(track[0].type).toBe('track');
                    expect(track[0].name).toBe('Rebel Heart Tour Intro - Live');
                });

        });
    });


    describe('retrieve track by track id', function(){
        it('should retrieve track from given track id', function(){

            return logic.retrieveTrackById('5U1tMecqLfOkPDIUK9SVKa')
                .then(function(track){
                    expect(track.popularity).toBe(37);
                    expect(track.type).toBe('track');
                    expect(track.name).toBe('Rebel Heart Tour Intro - Live');
                });

        });
    });
});