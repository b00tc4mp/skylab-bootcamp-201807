'use strict';

describe('Array.prototype.findindex', function () {
    var array1;

    beforeEach(function () {
        array1 = [5, 12, 200, 44, 130];
    });

    it('should find and operate correctly', function() {
        //find the position of the first value that is more than 13
        function findFirstLargeNumber(element) {
            return element > 13;
        }
        
        var result = array1.findIndex(findFirstLargeNumber)
        // expected output: 2      because [200 > 13]
        
        expect(result).toBe(2)

    });
});