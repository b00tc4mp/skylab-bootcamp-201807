'use strict';

describe('Array.prototype.concat', function () {
    var array;
    var array1;

    beforeEach(function () {
        array = ['a','b','c']
        array1 = ['d','e','f']
    });

    it('Joins 2 arrays', function() {
        var result = array.concat(array1);


        expect(result.length).toBe(6);
        expect(result[0]).toBe('a');
        expect(result[1]).toBe('b');
        expect(result[2]).toBe('c');
        expect(result[3]).toBe('d');
        expect(result[4]).toBe('e');
        expect(result[5]).toBe('f');
    });
});