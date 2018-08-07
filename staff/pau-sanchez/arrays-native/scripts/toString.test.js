'use strict';

describe('Array.prototype.toString', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should operate correctly', function() {
        var result = (function() {
            return array.toString();
        });

        expect(array.length).toBe(5);
        expect(result()).toBe("1,2,3,4,5");
        ;

        expect(result).toBeTruthy();
    });
});