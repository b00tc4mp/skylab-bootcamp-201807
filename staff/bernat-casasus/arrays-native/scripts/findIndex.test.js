'use strict';

describe('Array.prototype.findIndex', function () {
    var array;

    beforeEach(function () {
        array = [5, 12, 8, 130, 44];
    });

    it('should returns the value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned.', function() {
        function findFirstLargeNumber(element) {
            return element > 13;
          }

        expect(array).toEqual([5, 12, 8, 130, 44]);
        expect(array.findIndex(findFirstLargeNumber)).toBe(3);
    });
});