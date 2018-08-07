
'use strict';

describe('Array.prototype.sort', function () {
    var array;

    beforeEach(function () {
        array = [3, 9, 9, 6];
    });

    it('should return an orderd array', function() {

        array.sort();

        expect(array.length).toBe(4);
        expect(array[0]).toBe(3);
        expect(array[1]).toBe(6);
        expect(array[2]).toBe(9);
        expect(array[3]).toBe(9);

    });
});