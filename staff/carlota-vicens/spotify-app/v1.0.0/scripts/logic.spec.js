'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQBD_K99z9ntWatVkKyHHdZjmhYqCjD2WUPwrrHEr4toWI2O_HYVSn8rg60TvbmcC2I7JqFWsCMq0vXsnG9uu0x-rBvXgjFT5Idlcx61T2JRqK1zJr00wY3RfqblIs7Cru3OumccXQA';
    
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
            return logic.retrieveAlbumsByArtistId('6tbjWDEIzxoDsBA1FuhfPW')
                .then(function (albums) {
                    expect(albums).toBeDefined();
                    expect(albums.length).toBe(20);
                    expect(albums[0].name).toBe('Rebel Heart Tour (Live)');
                });
        });
    });

    describe('retrieve tracks by album id', function(){
        it ('should retrive tracks for given album id', function(){
            return logic.retrieveTracksByAlbumId('4hBA7VgOSxsWOf2N9dJv2X')
                .then (function(tracks){
                    expect(tracks).toBeDefined();
                    expect(tracks.length).toBe(20);
                    expect(tracks[0].name).toBe('Rebel Heart Tour Intro - Live');
                });
        });
    });

    describe('retrive tracks by id', function(){
        it('should retrive tracks for given id', function(){
            return logic.retrieveTrackById('7Jc83a7lyYaG5SGZtBBhRd')
                .then(function(track){
                    expect(track).toBeDefined();
                    expect(track.name).toBe('Like A Virgin - Live');
                });
        });
    });

    
});
