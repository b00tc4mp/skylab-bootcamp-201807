'use strict';

describe('logic (spotify)', function () {
<<<<<<< HEAD:staff/kim-garcia/spotify-app/scripts/logic.spec.js
    logic.token = 'BQDeTDrIuN2_hLvFc7PSP-mrt8OIayeRozCIoE1NXbiTXem-Apma1ofetOT7kuqRpjmtebHVcTi-jEW_JktPXp6WpB2lWpaTkvpGuq7RLoWSmORgZE-P7n1GTyXJ9xmhp3i7uRAt97UheEZDqEa1qmrwdjQ';
=======
    logic.token = 'BQB5E-cSm2NXdDZZckNZJ20CU-2dfMT-7cXoNMP6BCUNFOfpcPsmAvnVpQt0ZqBILy36KRvEaiQivqONg8JlvbY6QPlWjIBsy17MVZZZUQqnQBq3Zjum__N121LTgO_lgDlDi0VFSWzp';
>>>>>>> upstream/develop:staff/manuel-barzi/spotify-app/scripts/logic.spec.js
    
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

    describe("Retrieve tracks by album id", function (){
        it('should retrieve tracks for given albums id', function () {
           return logic.retrieveTracksByAlbumId('48duP4hfEqa6b3B9VeYfkI')
           .then(function(tracks){
               expect(tracks).toBeDefined();
               expect(tracks.length).toBe(1);
               expect(tracks[0].name).toBe("Jerusalem Is A Mountain - Original Mix");

           })

        })
    })



});