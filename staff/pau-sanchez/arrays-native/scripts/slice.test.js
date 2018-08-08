'use strict';

describe('Array.prototype.slice', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should iterate and operate correctly', function() {
        var result = (function(){
            return array.slice(1)
        });

        expect(array.length).toBe(5);
        expect(result()[3]).toBe(5);
        expect(result()[2]).toBe(4);
        expect(result()[1]).toBe(3);
        
        
        
    });
});