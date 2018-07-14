'use strict'

describe('Array.prototype.copyWithin', function() {

    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('Place at position 0 the element between position 3 and 4 in the same array and returns it, without modifying its size.', function() {
        array.copyWithin(0, 3, 4);

        // expected output: Array [4, 2, 3, 4, 5]
        expect(array.length).toBe(5);
        expect(array[0]).toBe(4);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);

    });


    it('Place at position 1 the elements after position 3 in the same array and returns it, without modifying its size.', function() {
        array.copyWithin(1, 3);

        // expected output: Array [1, 4, 5, 4, 5]
        expect(array.length).toBe(5);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(4);
        expect(array[2]).toBe(5);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);
    });

});