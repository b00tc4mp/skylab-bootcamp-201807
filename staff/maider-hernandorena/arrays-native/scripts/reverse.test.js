'use strict';

describe('Array.prototype.reverse', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('reverses de order of the array items', function () {
        var result = array.reverse();

        expect(result.length).toBe(5);
        expect(result).toEqual([5, 4, 3, 2, 1]);

    });

});