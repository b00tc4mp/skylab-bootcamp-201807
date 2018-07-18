'use strict';

describe ('logic (beers)', function(){
    describe('search beers', function(){
        
        var foundBeers;

        beforeEach(function(done){
            logic.searchBeers('mahou', function(beers){
                foundBeers = beers;

                done();
            });
        });

        it('should find 4 beers matching criteria "mahou"', function(){
            expect(foundBeers).toBeDefined();
            expect(foundBeers.length).toBe(4);
        });

        it ('should return beer "Mahou Maestra" with id...', function (){
            var beer = foundBeers[0];

            expect(beer.name).toBe('Mahou Maestra');
            expect(beer.id).toBe('8OucfG');
        })
    });

describe('retrieve beer by id', function(){

    
    
    it('should find beer matching the id', function(done){
        logic.retrieveBeerById('8OucfG', function(beersid){
            foundBeersById = beersid;
            done()
                })
        expect(foundBeersById).toBeDefined();
        expect(foundBeersById).toBe('Mahou Maestra');
    });

    });    

});