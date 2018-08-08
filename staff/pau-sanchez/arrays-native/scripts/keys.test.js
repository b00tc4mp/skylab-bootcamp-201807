'use strict';

describe('Array.prototype.keys', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should iterate and operate correctly', function() {
        var iterator = array.keys();        
        var result = (function() {
            return iterator.next();
        });

        expect(array.length).toBe(5);
        expect(result().value).toBe(0);
        expect(result().value).toBe(1);
        expect(result().value).toBe(2);

        });
});
