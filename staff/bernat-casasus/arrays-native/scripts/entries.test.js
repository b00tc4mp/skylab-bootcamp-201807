'use strict';

describe('Array.entries', function () {
    var array1;

    beforeEach(function () {
        array1 = ['a', 'b', 'c'];

    });

    it('should iterate and operate correctly', function() {

        expect(array1).toEqual(['a', 'b', 'c']);
        var result1 = array1.entries();

        expect(result1.next().value).toEqual([0, "a"]);
        expect(result1.next().value).toEqual([1, "b"]);
    });
});