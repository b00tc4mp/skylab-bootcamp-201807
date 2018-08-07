'use strict';

describe('Array.prototype.fill', function () {
    var firstArray;

    beforeEach(function () {
        firstArray = [1, 30, 39, 29, 10, 13];
    });

    it('should iterate and operate correctly', function() {         
        var result = firstArray.fill(1, 3);

        expect(result).toEqual([1, 30, 39, 1, 1, 1]);
        expect(result.length).toBe(6);
    });
});