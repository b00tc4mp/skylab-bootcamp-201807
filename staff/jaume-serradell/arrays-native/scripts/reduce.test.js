'use strict';

describe('Array.prototype.reduce', function () {
    var array1;
    var reducer;

    beforeEach(function () {
        array1 = [1, 2, 3, 4];
        reducer = (accumulator, currentValue) => accumulator + currentValue;
    });

    it('should add and operate correctly', function() {
        //Sum every value in the array 1+2+3+4
        var result = array1.reduce(reducer);
        // expected output: 10

        //Sum every value in the array but add the second param passed to the function to the sum 5+1+2+3+4
        var result2 = array1.reduce(reducer, 5)
        // expected output: 15
        
        expect(result).toBe(10)
        expect(result2).toBe(15)

    });
});