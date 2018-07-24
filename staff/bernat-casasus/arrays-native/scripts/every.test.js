'use strict';

describe('Array.every', function () {
    var array1,array2;
    var isBelowThreshold;
    beforeEach(function () {
        array1 = [1, 30, 39, 29, 10, 13];
        array2 = [1, 30, 39, 29, 41, 13];
        isBelowThreshold = function (currentValue) {
            return currentValue < 40;
          }
    });

    it('should return true or false depens if the array contains numbers > 40 or less', function() {
        expect(array1).toEqual([1, 30, 39, 29, 10, 13]);
        expect(array1.every(isBelowThreshold)).toBeTruthy();
        expect(array2.every(isBelowThreshold)).toBeFalsy();

    });
});