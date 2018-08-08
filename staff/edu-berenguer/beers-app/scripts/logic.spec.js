'use strict';

describe('logic(beers)', function() {

    describe('search beers',function(){
        var foundBeers;

        beforeEach(function(done) {
            logic.searchBeers("mahou", function(beers){
                foundBeers = beers;
                //Con el "done" para la ejecucion para espera el proceso asíncrono
                done();
            });

        });

        it('should find 4 beers matching criteria "mahou"', function(){

            expect(foundBeers).toBeDefined();
            expect(foundBeers.length).toBe(4);
        });

    });


    describe('retrieve beer by id',function(){
        var foundBeer;

        beforeEach(function(done) {
            logic.retrieveBeerById("8OucfG", function(beer){
                foundBeer = beer;
                //Con el "done" para la ejecucion para espera el proceso asíncrono
                done();
            });

        });

        it('should find beer by "id"', function(){
            expect(foundBeer).toBeDefined();
            expect(foundBeer.name).toBe("Mahou Maestra");
            expect(foundBeer.abv).toBe("7.5");
        });
    });

        
});     

