
'use strict';

describe('Array.prototype.pop', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should remove and return the last element of the array', function() {
        var popped = array.pop();

        expect(array.length).toBe(4);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);

        expect(popped).toBe(5);
    });
});