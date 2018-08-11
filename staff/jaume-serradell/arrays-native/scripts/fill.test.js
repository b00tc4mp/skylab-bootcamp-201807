'use strict';

describe('Array.prototype.fill', function () {
    var array1;

    beforeEach(function () {
        array1 = [1, 2, 3, 4];
    });

    it('should fill and operate correctly', function() {
        //put first value from second value to third value
        // fill with 0 from position 2 until position 4
        var result = array1.fill(0, 2, 4);
        // expected output: [1, 2, 0, 0]
        
        expect(result).toEqual([1, 2, 0, 0]);
        expect(result.length).toBe(4)

    });
});