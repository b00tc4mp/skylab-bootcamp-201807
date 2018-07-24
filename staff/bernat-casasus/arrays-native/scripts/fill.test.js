'use strict';

describe('Array.fill', function () {
    var array1;

    beforeEach(function () {
        array1 = [1, 2, 3, 4];

    });

    it('should modify the number correctly', function() {

        expect(array1).toEqual([1, 2, 3, 4]);
// fill with 0 from position 2 until position 4
        expect(array1.fill(0, 2, 4)).toEqual([1, 2, 0, 0]);

// fill with 5 from position 1
        expect(array1.fill(5, 1)).toEqual([1, 5, 5, 5]);
        
// fill all 6 to all positions
        expect(array1.fill(6)).toEqual([6, 6, 6, 6]);
    });
});