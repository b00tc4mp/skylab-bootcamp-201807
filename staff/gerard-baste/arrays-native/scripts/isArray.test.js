'use strict';

describe('Array.prototype.isArray', function () {
    var array;
    var result;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5]
    });

    it('should iterate and operate correctly', function() {
        result = Array.isArray(array);
        
        expect(result).toBeTruthy();
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);
    });
    });
