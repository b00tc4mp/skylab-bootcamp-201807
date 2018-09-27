'use strict';

describe('logic (beers)', function () {
    describe('search beers', function () {
        var foundBeers;

        // beforeEach(function (done) {
        //     logic.searchBeers('mahou', function (beers) {
        //         foundBeers = beers;

        //         done();
        //     });
        // });

        // it('should find 4 beers matching criteria "mahou"', function () {
        //     expect(foundBeers).toBeDefined();
        //     expect(foundBeers.length).toBe(4);
        // });

        // it('should return beer "Mahou Maestra" with id "8OucfG" in first place', function () {
        //     var beer = foundBeers[0];

        //     expect(beer.name).toBe('Mahou Maestra');
        //     expect(beer.id).toBe('8OucfG');
        // });

        it('should find 4 beers matching criteria', function (done) {
            logic.searchBeers('mahou', function (beers) {
                foundBeers = beers;

                expect(foundBeers).toBeDefined();
                expect(foundBeers.length).toBe(4);

                var beer = foundBeers[0];

                expect(beer.name).toBe('Mahou Maestra');
                expect(beer.id).toBe('8OucfG');

                done();
            });
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