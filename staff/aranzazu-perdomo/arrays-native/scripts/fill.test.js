'use strict';

describe('Array.prototype.fill', function () {
    var array1;
    

    beforeEach(function () {
         array1 = [1, 2, 3, 4];
      
    });

    it('fills all the elements of an array from a start index to an end index with a static value', function() {
        
        var result = array1.fill(4);
           

       
        expect(result).toEqual([4,4,4,4]);
        
        
       
    });
});