
'use strict';

describe('Array.prototype.reduce', function () {
    var array1;
    
   
   
    beforeEach(function () {
        array1 = [1, 2, 3, 4];
    });

    it('applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.', function() {
        var reducer = (accumulator, currentValue) => accumulator + currentValue;
        var result=array1.reduce(reducer);

        
        expect(result).toBe(10);
       
       
    });
});


