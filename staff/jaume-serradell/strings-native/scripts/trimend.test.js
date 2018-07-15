'use strict';

describe('Strings.prototype.trimEnd', function () {
    var str;

    beforeEach(function () {
        str = '   Hello world!   ';
    });

    it('should trim and operate correctly', function() {
        // Trim ending white spaces and return a an String without ending spaces
        var result = str.trimEnd()
        //result = '   Hello world!';
        
        expect(result).toBe('   Hello world!');

    });
});