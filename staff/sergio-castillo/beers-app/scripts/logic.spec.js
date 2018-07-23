'use strict';

describe ('logic (beers)', function (){
    describe ('search beers', function(){
        var foundBeers;
        beforeEach(function(done){
            logic.searchBeers('mahou', function(beers){
                foundBeers=beers;
                done();
            });
        });
        it('should find four beers matching criteria "mahou"', function(){
            expect (foundBeers).toBeDefined();
            expect (foundBeers.length).toBe(4);

        });
    });
    describe ('retrieve beer by id', function(){
        it ('should retrieve beer matching the id', function (done){


        });
    });
});