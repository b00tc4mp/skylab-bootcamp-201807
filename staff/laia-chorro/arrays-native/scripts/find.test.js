'use strict'

describe('Array.prototype.find()', function() {

    var nums = [5, 12, 8, 130, 44];

    it('Returns the value of the first element in the array bigger than 10.', function() {
        var numsBiggerThanTen = function(num) {return num > 10;},
            firstNumFound = nums.find(numsBiggerThanTen);

            // expected output: 12
            expect(firstNumFound).toBe(12);
    });

    it('Returns undefined when NO element from the array is bigger than 200.', function() {
        var numsBiggerThanTwoHundred = function(num) {return num > 200;},
            firstNumFound = nums.find(numsBiggerThanTwoHundred);

            // expected output: 12
            expect(firstNumFound).toBeUndefined();
    });

});