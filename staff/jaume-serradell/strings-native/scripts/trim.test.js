'use strict';

describe('Strings.prototype.toUpperCase', function () {
    var str;

    beforeEach(function () {
        str = '   Hello world!   ';
    });

    it('should trim and operate correctly', function() {
        // Trim white spaces and return a an String without spaces
        var result = str.trim()
        //result = 'Hello world!';
        
        expect(result).toBe('Hello world!')

    });
});