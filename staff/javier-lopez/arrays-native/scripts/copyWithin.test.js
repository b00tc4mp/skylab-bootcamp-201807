'use strict';

describe('Array.prototype.copyWithin', function () {
    var firstArray;

    beforeEach(function () {
        firstArray = [1, 2, 3, 4];
    });

    it('should iterate and operate correctly', function() {
        firstArray.copyWithin(0,3);

        expect(firstArray.length).toBe(4);
        expect(firstArray[0]).toBe(4);
        expect(firstArray[1]).toBe(2);
        expect(firstArray[2]).toBe(3);
        expect(firstArray[3]).toBe(4);


    });
});