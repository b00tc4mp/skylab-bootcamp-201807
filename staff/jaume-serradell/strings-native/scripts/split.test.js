'use strict';

describe('Strings.prototype.split', function () {
    var str1;

    beforeEach(function () {
        str1 = 'Hello'
    });

    it('should split and operate correctly', function() {
        // Convert string to an array separeted every character by comma
        var result = str1.split('');
        
        expect(result).toEqual(['H', 'e', 'l', 'l', 'o'])

    });
});