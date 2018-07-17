'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQBJQ5mU9frVfjPJJ6cXm7pAUkAov0UUhYVF9fUo2z8xds0iDkrbF1m6FIsmRCHP7uZbFoO29QZIdxNc75KDcjVyeOM0aHWlhn02Vr2Yv-kjIJk3ab2SaIBBNDi8zsULrH0koYahEawqfHMZ6T29d38iWK6swHuD5xVE6wneUqBYkSN4T9HDCJjk9ZtG0tM7vc4VoOiHXQyhU9SvGk-6Z3z8kg';
    
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