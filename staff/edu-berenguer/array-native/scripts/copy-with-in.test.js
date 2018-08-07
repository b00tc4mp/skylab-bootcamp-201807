'use strict';

describe('Array.prototype.copywhitin', function () {
    var array1;
    var array2;

    beforeEach(function () {
        array1 = [1, 2, 3, 4, 5];
        array2 = [1, 2, 3, 4, 5];
    });

    it('should put index & operate correctly', function() {
        //put at the position 0 the values between position 3 & 4
        var result = array1.copyWithin(0, 3, 4);
        // expected output: [4, 2, 3, 4, 5]

        //put at position 1 the values after position 3
        var result2 = array2.copyWithin(1, 3);
        // expected output: [1, 4, 5, 4, 5]
        
        expect(result).toEqual([4, 2, 3, 4, 5]);
        expect(result.length).toBe(5);

        expect(result2).toEqual([1, 4, 5, 4, 5])

    });
});