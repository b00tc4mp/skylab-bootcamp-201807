'use strict';

describe('Array.prototype.lastIndexOf', function () {
    var animals;
   
   
    beforeEach(function () {
        animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];
    });

    it('Returns the last index at which a given element can be found in the array.', function() {
      
       var result=animals.lastIndexOf('Dodo');

        
        expect(result).toBe(3);
        
    });
});


