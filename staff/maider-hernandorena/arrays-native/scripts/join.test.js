'use strict';

describe('Array.prototype.join', function() {
    var array;

    beforeEach(function() {
    array = [1, 2, 3, 4, 5];
    });

    it('Joins arrays element in a string', function() {

        expect(array.join()).toBe('1,2,3,4,5');
        expect(array.join(',')).toBe('1,2,3,4,5');
        expect(array.join('')).toBe('12345');
        expect(array.join(' ')).toBe('1 2 3 4 5');

    });

});