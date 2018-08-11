'use strict';

describe('Array.prototype.of', function () {
    var str;

    beforeEach(function () {
        str = 'hello';
    });

    it('should convert and operate correctly', function() {
        //return a string to an array
        var result = Array.of(str);
        //result = ['hello']

        expect(result).toEqual(['hello'])
        expect(result[0]).toBe('hello');
        expect(result.length).toBe(1);

    });
});