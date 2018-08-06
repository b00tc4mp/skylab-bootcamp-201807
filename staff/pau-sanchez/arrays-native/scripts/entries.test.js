'use strict';

describe('Array.prototype.entries', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should iterate and operate correctly', function() {
        var result = (function() {
            return array.entries();
        });

        
        expect(result().next().value[0]).toBe(0);
        expect(result().next().value[1]).toBe(1);
       
    });
});