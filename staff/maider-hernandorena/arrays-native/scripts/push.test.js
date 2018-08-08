'use strict';

describe('Array.prototype.push', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('pushes a element into the array', function () {
        
        array.push(6);
        expect(array.length).toBe(6);

        array.push(7);
        expect(array.length).toBe(7);

        array.push(8, 9);
        expect(array.length).toBe(9);

    });

});