'use strict';

describe('Array.of', function () {
    var array1;
    var array2;
    var num1,num2;
    var result1;
    var result2;
    beforeEach(function () {
        array1 = ['a', 'b', 'c'];
        array2 = ['d', 'e', 'f'];
        num1 = 1;
        num2 = 2;
        result1 = array1.concat(array2);
        result2 = array1.concat(a,b);

    });

    it('should concatenate both arrays correctly', function() {

        expect(num1).toBe(1);
        expect(num2).toBe(2);

        expect(array1).toEqual(['a', 'b', 'c']);
        expect(array2).toEqual(['d', 'e', 'f']);

        expect(result1).toEqual(["a", "b", "c", "d", "e", "f"]);
        expect(result2).toEqual(["a", "b", "c", 1, 2]);

    });
});