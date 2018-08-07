'use strict';

describe('Array.prototype.indexOf', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should operate correctly', function() {
        var result = (function(item){
            return array.indexOf(item);
        });
        

        expect(array.length).toBe(5);
        expect(result(1)).toBe(0);
        expect(result(2)).toBe(1);
        expect(result(3)).toBe(2);
        expect(result(4)).toBe(3);
        expect(result(5)).toBe(4);

        
    });
});