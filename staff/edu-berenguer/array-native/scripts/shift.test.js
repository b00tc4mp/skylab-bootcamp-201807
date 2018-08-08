'use strict';

describe('Array.prototype.shift', function () {
    var array1;

    beforeEach(function () {
        array1 = [1, 2, 3];
    });

    it('should substract and operate correctly', function() {
        //Substract the first value of the array
        var result = array1.shift()
        // expected output: 1
        // array1 output: [2,3]
        
        expect(array1).toEqual([2,3])
        expect(result).toBe(1)

    });
});