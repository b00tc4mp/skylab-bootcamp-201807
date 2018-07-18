'use strict';

describe('logic (spotify)', function () {
    logic.token = 'BQDeTDrIuN2_hLvFc7PSP-mrt8OIayeRozCIoE1NXbiTXem-Apma1ofetOT7kuqRpjmtebHVcTi-jEW_JktPXp6WpB2lWpaTkvpGuq7RLoWSmORgZE-P7n1GTyXJ9xmhp3i7uRAt97UheEZDqEa1qmrwdjQ';
    
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