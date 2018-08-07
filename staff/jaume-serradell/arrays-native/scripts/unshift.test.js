'use strict';

describe('Array.prototype.unshift', function () {
    var array1;

    beforeEach(function () {
        array1 = [1, 2, 3];
    });

    it('should add and operate correctly', function() {
        //Add to the beginning of the array the params passed
        var result = array1.unshift(4, 5)
        // expected output: 5
        
        expect(result.length).toBe(5)
        expect(result[0]).toBe(4);
        expect(result[1]).toBe(5);
        expect(array1).toBe([4, 5, 1, 2, 3])

    });
});