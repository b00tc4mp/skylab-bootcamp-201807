'use strict';

describe('Strings.prototype.toLowerCase', function () {
    var str;

    beforeEach(function () {
        str = 'ALPHABET';
    });

    it('should toLowerCase and operate correctly', function() {
        // Put the string in lowercase
        var result = str.toLowerCase()
        //result = 'alphabet';
        
        expect(result).toBe('alphabet')

    });
});