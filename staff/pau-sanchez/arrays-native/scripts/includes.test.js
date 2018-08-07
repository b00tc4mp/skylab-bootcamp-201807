'use strict';

describe('Array.prototype.includes', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should operate correctly', function() {
        var result = (function(item){
            return array.includes(item) 
        });

        expect(array.length).toBe(5);
        expect(result(1)).toBe(true);
        expect(result(2)).toBe(true);
        expect(result(3)).toBe(true);
        expect(result(4)).toBe(true);
        expect(result(5)).toBe(true);
        expect(result(6)).toBe(false);
        
    });
});