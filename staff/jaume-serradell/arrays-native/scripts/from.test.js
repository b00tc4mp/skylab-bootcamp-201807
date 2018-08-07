'use strict';

describe('Array.prototype.from', function () {
    var str;

    beforeEach(function () {
        str = 'hello world';
    });

    it('should return and operate correctly', function() {
        //Pass string as a param and return an array
        var result = Array.from(str);
        //return ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]

        expect(result.length).toBe(11);
        expect(result[0]).toBe('h');
        expect(result[1]).toBe('e');
        expect(result[2]).toBe('l');
        expect(result[3]).toBe('l');
        expect(result[4]).toBe('o');

    });
});