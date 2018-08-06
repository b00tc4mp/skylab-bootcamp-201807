'use strict';

describe('Array.copyWithin', function () {
    var array1;
    beforeEach(function () {
        array1 = [1, 2, 3, 4, 5];
    });

    it('should place at position 0 the element between position 3 and 4', function() {
        
        expect(array1).toEqual([1, 2, 3, 4, 5]);
        
        var result1 = array1.copyWithin(0, 3, 4);
        expect(result1).toEqual([4, 2, 3, 4, 5]);     
        
        var result2 = array1.copyWithin(1, 3);
        expect(result2).toEqual([4, 4, 5, 4, 5]);
    });

});