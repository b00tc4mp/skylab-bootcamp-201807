'use strict';

describe('Array.prototype.includes()', function () {
    var array1,array2;

    beforeEach(function () {
        array1 = [1, 2, 3];
        array2 = ['cat', 'dog','bat'];
    });

    it('should return true or false depens if the array contains the value', function() {
        expect(array1).toEqual([1, 2, 3]);
        expect(array1.includes(2)).toBeTruthy();
        expect(array1.includes('cat')).toBeFalsy();

    });
});