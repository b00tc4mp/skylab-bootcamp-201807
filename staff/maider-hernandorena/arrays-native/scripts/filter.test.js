'use strict';

describe('Array.prototype.filter', function () {
    var array;

    beforeEach(function () {
        array = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
    });

    it('should filter the array', function () {
        var result = array.filter(array => array.length > 6);
               
        expect(array.length).toBe(6);
        expect(result.length).toBe(3);
        expect(result[0]).toBe('exuberant');
        expect(result[1]).toBe('destruction');
        expect(result[2]).toBe('present');

    });
});