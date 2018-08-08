'use strict';

describe('Array.prototype.every', function () {
    var firstArray;

    beforeEach(function () {
        firstArray = [1, 30, 39, 29, 10, 13];
    });

    it('should iterate and operate correctly', function() {
        function isBelowThreshold(currentValue) {
            return currentValue < 40;
          }
          
        var result = firstArray.every(isBelowThreshold);


        expect(result).toBe(true);
        expect(firstArray).toEqual([1, 30, 39, 29, 10, 13]);
    });
});