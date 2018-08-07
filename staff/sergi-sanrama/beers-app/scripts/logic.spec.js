'use strict';

describe('logic (beers)', function(){
    describe('search beers', function(){
        var foundBeers;

        beforeEach(function(done){
            logic.searchBeers('mahou', function(beers){
                foundBeers = beers;

                done();
            });     

        });

        it ('should find 4 beers matching criteria "mahou"', function(){
            expect(foundBeers.length).toBe(4);
        });

        it ('Id are the same', function(){
            expect(foundBeers[0].id).toBe('8OucfG');
        })

    });

});





