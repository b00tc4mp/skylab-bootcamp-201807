'use strict';

describe('String.prototype.index-of', function () {
    var string;

    beforeEach(function () {
        string = ('maider');
    });

    it('return the index of an element', function () {

        expect(string.indexOf('m')).toBe(0);
        expect(string.indexOf('a')).toBe(1);
        expect(string.indexOf('i')).toBe(2);
        expect(string.indexOf('d')).toBe(3);
        expect(string.indexOf('e')).toBe(4);
        expect(string.indexOf('r')).toBe(5);

    });

});