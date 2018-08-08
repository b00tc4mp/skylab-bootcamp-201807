'use strict';

describe('Array.prototype.pop', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should operate correctly', function() {
        var result = (function(){
            return array.pop();
        });
        
        expect(array.length).toBe(5);
        expect(result()).toBe(5);
        expect(result()).toBe(4);
        expect(result()).toBe(3);
        expect(result()).toBe(2);
        expect(result()).toBe(1);
        expect(result()).toBe(undefined);
        
    });
});