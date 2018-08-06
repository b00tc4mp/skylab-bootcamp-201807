'use strict';

describe('Array.prototype.isArray', function () {
    var arrayNumber;

    beforeEach(function () {
        arrayNumber = [1, 2, 3, 4, 5];
    });

    it('should iterate and operate correctly', function() {
        var result = Array.isArray(arrayNumber);

        expect(result).toBe(true);
    });
});