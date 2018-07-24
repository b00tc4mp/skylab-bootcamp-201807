'use strict';

describe('Array.prototype.find', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should returns the value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned.', function() {
        var result = array.find(function(item) {
            return item > 2;
        });

        expect(array.length).toBe(5);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);

        expect(result).toBe(3);
    });
});