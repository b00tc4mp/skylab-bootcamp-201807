'use strict'

describe('Test logic beers-app', function() {

    describe('Test searchBeers AJAX logic', function() {
        var beersArray;
    
        beforeEach(function(done) {
            logic.searchBeers('Mahou', function(beers){
                beersArray = beers;
                done();
            });
        });
    
        it('There are 4 Mahou beers in the API', function() {
                expect(beersArray.length).toBe(4);
        });
    });
    
});
