'use strict';

describe('Array.prototype.findIndex()', function () {
    var nums = [5, 12, 8, 130, 44];

    it('Returns the index of the first element in the array that is bogger than 13.', function() {
        var findFirstNumBiggerThanThirteen = function(num) { return num > 13; },
            firstIndexFound = nums.findIndex(findFirstNumBiggerThanThirteen);

            // expected output: 3
            expect(firstIndexFound).toBe(3);
    });

    it('Returns -1 when NO element from the array is bigger than 200.', function() {
        var findFirstNumBiggerThanTwoHundred = function(num) {return num > 200;},
            firstIndexFound = nums.findIndex(findFirstNumBiggerThanTwoHundred);

            // expected output: -1
            expect(firstIndexFound).toBe(-1);
            expect(firstIndexFound).not.toBeUndefined();
            expect(firstIndexFound).not.toBeNull();
    });

});