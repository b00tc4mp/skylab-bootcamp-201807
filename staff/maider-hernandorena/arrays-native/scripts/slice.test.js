'use strict';

describe('Array.prototype.slice', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('selects a slice of an array', function () {

        expect(array.slice(0,2)).toEqual([1, 2]);
        expect(array.slice(3,5)).toEqual([4, 5]);
        expect(array.slice(1,4)).toEqual([2, 3, 4]);
        expect(array.slice(2)).toEqual([3, 4, 5]);

    });

});