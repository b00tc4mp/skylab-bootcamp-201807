'use strict';

describe('Array.prototype.every', function () {
    var array1;

    beforeEach(function () {
        array1 = [1, 2, 5, 8, 9];
    });

    it('should compare and operate correctly', function() {
        // returns true if the values are less than 10
        function isBelowThreshold(item) {
            return item < 10;
        }

        var result = array1.every(isBelowThreshold)

        expect(result).toBeTruthy();

    });
});