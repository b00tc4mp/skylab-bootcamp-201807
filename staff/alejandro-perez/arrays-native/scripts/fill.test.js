'use strict';

describe('Array.prototype.fill', function () {
    var array;
    beforeEach(function () {
        array = [1, 2, 3, 4, 5]
    });

    it('Fills an array with only number', function () {
        var result = array.fill(4);
        expect(result).toEqual([4, 4, 4, 4, 4])

    });

    it('Fills an array', function () {
        var result = array.fill(0,2,3);
        expect(result).toEqual([1, 2, 0, 4, 5])

    });

    
});


// array.fill(5, 1)
