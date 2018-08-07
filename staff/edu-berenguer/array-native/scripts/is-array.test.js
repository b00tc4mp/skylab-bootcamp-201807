'use strict';

describe('Array.prototype.isArray', function () {
var array ;
var result;
    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should iterate and operate correctly', function() {
        result = Array.isArray(array);

        expect(result).toBeTruthy();

    });
});