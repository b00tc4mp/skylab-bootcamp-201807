'use strict';

describe('Array.prototype.push', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should operate correctly', function() {
        var result = (function(item){
            array.push(item);
            return array.length;

        });

        

        expect(array.length).toBe(5);
        expect(result(6)).toBe(6);
        expect(result("a")).toBe(7);
        
    });
});