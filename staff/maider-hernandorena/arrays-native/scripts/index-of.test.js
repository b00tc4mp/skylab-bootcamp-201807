'use strict';

describe('Array.prototype.index-of', function () {
    var array;

    beforeEach(function () {
        array =  ['maider', 'leire', 'alaitz', 'izaro', 'haizea'];
    });

    it('return the index of an element', function () {

        expect(array.indexOf('maider')).toBe(0);
        expect(array.indexOf('leire')).toBe(1);
        expect(array.indexOf('alaitz')).toBe(2);
        expect(array.indexOf('izaro')).toBe(3);
        expect(array.indexOf('haizea')).toBe(4);

    });

});