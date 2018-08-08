'use strict';

describe('logic', function () {
    
    describe('search beers', function() {
        var foundBeers;

        //El done sirve para que no pase al it hasta que acabe.
        beforeEach(function(done) {
            logic.searchBeers('mahou', function(beers){
                foundBeers = beers;

                done();
            });
        })
        
        it('should find 4 beers matching criteria "mahou"', function() {
            expect(foundBeers).toBeDefined();
            expect(foundBeers.length).toBe(4);
        });
    });

    describe('retrieve beer by id', function () {
        it('should retrieve beer matching the id', function (done) {
            logic.retrieveBeerById('8OucfG', function (beer) {
                expect(beer.name).toBe('Mahou Maestra');
                expect(beer.id).toBe('8OucfG');

                done();
            });
        });
    });
});