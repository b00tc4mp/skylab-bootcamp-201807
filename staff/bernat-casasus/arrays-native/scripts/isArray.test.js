'use strict';

describe('Array.isArray', function () {
    var array;
    var obj;
    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
        obj = {foo: 123};
    });

    it('should iterate and operate correctly', function() {
        var result = Array.isArray(array);
        var wrong = Array.isArray(obj);

        expect(array.length).toBe(5);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);

        expect(result).toBeTruthy();
        expect(wrong).toBeFalsy();

    });
});