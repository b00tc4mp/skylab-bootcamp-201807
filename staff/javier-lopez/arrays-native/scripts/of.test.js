'use strict';

describe('Array.prototype.of', function () {
    var numbers;

    beforeEach(function () {
        numbers = 2;
    });

    it('should iterate and operate correctly', function() {
        var result = Array.of(numbers);

        expect(result.length).toBe(1);
        expect(result[0]).toBe(2);
        expect(numbers).toBe(2);
    });
});