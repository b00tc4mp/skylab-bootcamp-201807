'use strict';

describe('Strings.prototype.repeat', function () {
    var str;

    beforeEach(function () {
        str = 'abc';
    });

    it('should repeat and operate correctly', function() {
        // Repeat the string as many times as parameters
        var result = str.repeat(1); 
        //result = 'abc'

        var result2 = str.repeat(2);
        //result = 'abcabc'
        
        expect(result).toBe('abc')
        expect(result2).toBe('abcabc')

    });
});