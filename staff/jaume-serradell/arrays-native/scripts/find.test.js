'use strict';

describe('Array.prototype.find', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should find and operate correctly', function() {
        //find the first item that follows the condition
        var result = array.find(function(item) {
            return item > 2;
        });
        //return only the first item

        expect(array.length).toBe(5);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);

        expect(result).toBe(3);
    });
});