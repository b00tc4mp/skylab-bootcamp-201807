

'use strict';

describe('Array.prototype.push', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should add an element at the end of the array and return the length', function() {

        var pushed = array.push(7);

        expect(array.length).toBe(6);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);
        expect(array[5]).toBe(7);

        expect(pushed).toBe(6);
    });
});