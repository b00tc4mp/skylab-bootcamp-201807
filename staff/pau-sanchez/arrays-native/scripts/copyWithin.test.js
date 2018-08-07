'use strict';

describe('Array.prototype.copyWithin', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5, 6];
    });

    it('should operate correctly', function() {
        var result = (function() {
            return array.copyWithin(2,0);
        });

        expect(result().length).toBe(6);
        expect(result()[0]).toBe(1);
        expect(result()[1]).toBe(2);
        expect(result()[2]).toBe(1);
        expect(result()[3]).toBe(2);
        expect(result()[4]).toBe(3);
        expect(result()[5]).toBe(4);

        
    });
});