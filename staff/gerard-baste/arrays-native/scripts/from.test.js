'use strict';

describe('Array.prototype.from', function () {
    var string;
    var result;

    beforeEach(function () {
        string = '12345'
    });

    it('should iterate and operate correctly', function() {
        result = Array.from(string);
        
        expect(result.length).toBe(5);
        expect(result[0]).toBe('1');
        expect(result[1]).toBe('2');
        expect(result[2]).toBe('3');
        expect(result[3]).toBe('4');
        expect(result[4]).toBe('5');
    });
    });
