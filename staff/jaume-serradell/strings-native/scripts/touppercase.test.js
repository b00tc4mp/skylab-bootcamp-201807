'use strict';

describe('Strings.prototype.toUpperCase', function () {
    var str;

    beforeEach(function () {
        str = 'alphabet';
    });

    it('should toUpperCase and operate correctly', function() {
        // Put the string in uppercase
        var result = str.toUpperCase()
        //result = 'ALPHABET';
        
        expect(result).toBe('ALPHABET')

    });
});