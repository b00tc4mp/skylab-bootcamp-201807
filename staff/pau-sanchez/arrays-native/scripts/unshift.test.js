'use strict';

describe('Array.prototype.unshift', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should iterate and operate correctly', function() {
        var result = (function(item) {
            return array.unshift(item);
        });

        expect(array.length).toBe(5);
        expect(result(0)).toBe(6);
        expect(array[0]).toBe(0);
        expect(array[5]).toBe(5);
        expect(result("a")).toBe(7);
        expect(array[0]).toBe("a");
    });
});