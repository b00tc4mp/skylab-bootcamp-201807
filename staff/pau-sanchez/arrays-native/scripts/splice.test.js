'use strict';

describe('Array.prototype.splice', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should operate correctly', function() {
        var newArray;
        var result = (function(i) {
            return array.splice(2, 1, "three");
          
        });

        result();

        expect(array.length).toBe(5);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe("three");
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);
        
        //expect(array[2]).toBe(3);
        //expect(array[3]).toBe(4);
        //expect(array[4]).toBe(5);

        
    });
});