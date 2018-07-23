'use strict';

describe('logic (beers)', function () {
    var beersArray;

    beforeEach(function(done) {
        logic.searchBeers('mahou', function(beers) {
             beersArray = beers;
             done();
            });
    });

    it('should results length be 4', function() {
        expect(beersArray.length).toBe(4);
    });
    
});

describe('retrieveBeerById', function(){

    beforeEach(function(done){
        



    })


})