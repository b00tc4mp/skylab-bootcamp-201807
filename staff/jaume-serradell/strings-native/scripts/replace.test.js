'use strict';

describe('Strings.prototype.replace', function () {
    var str;
    var re;

    beforeEach(function () {
        str = 'Apples are round, and apples are juicy.';
        re = /apples/gi;
    });

    it('should replace and operate correctly', function() {
        // It replaces the original string with the last parameter
        var result = str.replace(re, 'oranges');
        //result = 'oranges are round, and oranges are juicy.'

        expect(result).toBe('oranges are round, and oranges are juicy.')

    });
});