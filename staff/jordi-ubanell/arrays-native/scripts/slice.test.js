'use strict';

describe('Array.prototype.toString', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('slice: take a part of an array and create a new array without modify the original array ', function() {
        var result = array.slice(1,3);
        //console.log(result)

        expect(result).toEqual([2, 3]);
        expect(array).toEqual([1, 2, 3, 4, 5]);
    });
});