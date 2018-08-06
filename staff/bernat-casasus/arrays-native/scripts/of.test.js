'use strict';

describe('Array.of', function () {
    var num1;
    var num2;

    beforeEach(function () {
        num1 = 1;
        num2 = 2;

    });

    it('should iterate and operate correctly', function() {
        var result1 = Array.of(num1);
        var result2 = Array.of(num1, num2);

        expect(num1).toBe(1);
        expect(num2).toBe(2);

        expect(result1).toEqual([1]);
        expect(result2).toEqual([1,2]);
    });
});