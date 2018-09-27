'use strict'

describe('Array.prototype.fill()', function() {



    it('Fills all the elements of an array from a start index to an end index with a static value. The end index is not included.', function() {
        var array = [1, 2, 3, 4];

        // fill with 0 from position 2 until position 4
        var array1 = array.fill(0, 2, 4);
        // expected output: [1, 2, 0, 0]
        expect(array1.length).toBe(4);
        expect(array1[0]).toBe(1);
        expect(array1[1]).toBe(2);
        expect(array1[2]).toBe(0);
        expect(array1[3]).toBe(0);

        // fill with 5 from position 1
        var array2 = array.fill(5, 1);
        // expected output: [1, 5, 5, 5]
        expect(array2.length).toBe(4);
        expect(array2[0]).toBe(1);
        expect(array2[1]).toBe(5);
        expect(array2[2]).toBe(5);
        expect(array2[3]).toBe(5);

        var array3 = array.fill(6);
        // expected output: [6, 6, 6, 6]
        expect(array3.length).toBe(4);
        expect(array3[0]).toBe(6);
        expect(array3[1]).toBe(6);
        expect(array3[2]).toBe(6);
        expect(array3[3]).toBe(6);

        // Original array has been modifyied after aplying fill to it
        expect(array.length).toBe(4);
        expect(array[0]).not.toBe(1);
        expect(array[1]).not.toBe(2);
        expect(array[2]).not.toBe(3);
        expect(array[3]).not.toBe(4);

    });

});