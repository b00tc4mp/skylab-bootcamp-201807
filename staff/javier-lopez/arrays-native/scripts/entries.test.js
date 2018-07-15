'use strict';

describe('Array.prototype.entries', function () {
    var firstArray;

    beforeEach(function () {
        firstArray = ["uno", "dos", "tres", "cuatro"];
    });

    it('should iterate and operate correctly', function() {
        var iterator1 = firstArray.entries();
        var result = iterator1.next().value;

        expect(Array.isArray(result)).toBeTruthy();
        expect(result[0]).toBe(0);
        expect(result[1]).toBe("uno");

    });
});