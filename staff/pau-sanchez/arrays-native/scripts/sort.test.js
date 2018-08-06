'use strict';

describe('Array.prototype.sort', function () {
    var array;

    beforeEach(function () {
        array = [5, 2, 1, 4, 3];
    });

    it('should operate correctly', function() {
        var result = (function() {
            return array.sort();
        });

        expect(array.length).toBe(5);
        expect(result()[0]).toBe(1);
        expect(result()[1]).toBe(2);
        expect(result()[2]).toBe(3);
        expect(result()[3]).toBe(4);
        expect(result()[4]).toBe(5);

        
    });
});