'use strict';

describe('Array.prototype.Arrayof', function () {
    var string;
    var result;

    beforeEach(function () {
        string = '12345'
    });

    it('should iterate and operate correctly', function() {
        result = Array.of(string);
        
        expect(result[0]).toBe('12345');
        // expect(array[0]).toBe(1);
        // expect(array[1]).toBe(2);
        // expect(array[2]).toBe(3);
        // expect(array[3]).toBe(4);
        // expect(array[4]).toBe(5);
    });
    });