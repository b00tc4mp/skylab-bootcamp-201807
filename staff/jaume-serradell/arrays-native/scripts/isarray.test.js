'use strict';

describe('Array.prototype.isArray', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should convert and operate correctly', function() {
        // return true or false is param pass is an array
        var result = Array.isArray(array);
        // result = true

        expect(result).toBe(true);
        expect(result).toBeTruthy();

    });
});