'use strict';

describe('Array.prototype.copyWithin', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('Copy within', function () {
        var result = array.copyWithin(4,3,4);


        expect(result.length === 5).toBeTruthy()
        expect(result[4]).toBe(4)
    });
});