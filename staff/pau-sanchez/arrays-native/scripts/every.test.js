'use strict';

describe('Array.prototype.every', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should iterate and operate correctly', function() {
        function under6(item) {
            return item < 6;
        }
        
        var result = (function() {
            return array.every(under6);
        });

        expect(result()).toBe(true);
        
    });
});