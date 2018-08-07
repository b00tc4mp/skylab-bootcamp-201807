'use strict';

describe('logic (beers)', function () {
    describe('search beers', function () {
        var foundBeers;

        it('should find 4 beers matching criteria', function () {
            return logic.searchBeers('mahou')
                .then(function (beers) {
                    foundBeers = beers;

                    expect(foundBeers).toBeDefined();
                    expect(foundBeers.length).toBe(4);

                    var beer = foundBeers[0];

                    expect(beer.name).toBe('Mahou Maestra');
                    expect(beer.id).toBe('8OucfG');
                });
        });
    });

    describe('retrieve beer by id', function () {
        it('should retrieve beer matching the id', function () {
            return logic.retrieveBeerById('8OucfG')
                .then(function (beer) {
                    expect(beer.name).toBe('Mahou Maestra');
                    expect(beer.id).toBe('8OucfG');
                });
        });
    });
});