'use strict';

describe('search beers', function() {
    var searchBeers;

    beforeEach(function(done) {
        logic.searchBeers('mahou', function(beers) {
            searchBeers = beers;
            done();
        })
    });

    it('should give a list of searched beers', function() {
    
        expect(searchBeers).toBeDefined();
        expect(searchBeers.length).toBe(4);
    });

    it('should return beer "Mahou Maestra" with id "80ucfG" in first place', function() {
        var beer = searchBeers[0];

        expect(beer.name).toBe('Mahou Maestra');
        expect(beer.id).toBe('8OucfG');
    });

});

describe('retrieves a beer by id', function() {
    var retrieveBeer;

    beforeEach(function(done) {
        logic.retrieveBeerById('8OucfG', function(beer) {
            retrieveBeer = beer;
            done();
        })
    });

    it('should retrieve a beer by id', function() {

        expect(retrieveBeer).toBeDefined();
        expect(retrieveBeer.name).toBe('Mahou Maestra');
        expect(retrieveBeer.id).toBe('8OucfG');
    });

});