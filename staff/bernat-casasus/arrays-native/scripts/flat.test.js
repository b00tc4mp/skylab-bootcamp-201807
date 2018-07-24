'use strict';

describe('Array.prototype.flat', function () {
    var array,array1,array2;

    beforeEach(function () {
        array = [1, 2, [3, 4]];
        array1 = [1, 2, [3, 4, [5, 6]]];
        array2 = [1, 2, [3, 4, [5, 6]]];
    });

    it('should creates a new array with all sub-array elements concatted into it recursively up to the specified depth.', function() {

        expect(array).toEqual([1, 2, [3, 4]]);
        expect(array1).toEqual([1, 2, [3, 4, [5, 6]]]);
        expect(array2).toEqual([1, 2, [3, 4, [5, 6]]]);

        expect(array.flat()).toEqual([1, 2, 3, 4]);
        expect(array1.flat()).toEqual([1, 2, 3, 4, [5, 6]]);
        expect(array2.flat(2)).toEqual([1, 2, 3, 4, 5, 6]);
    });
});