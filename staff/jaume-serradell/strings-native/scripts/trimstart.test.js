'use strict';

describe('Strings.prototype.trimStart', function () {
    var str;

    beforeEach(function () {
        str = '   Hello world!   ';
    });

    it('should trim and operate correctly', function() {
        // Trim starting white spaces and return a an String without starting spaces
        var result = str.trimStart()
        //result = 'Hello world!   ';
        
        expect(result).toBe('Hello world!   ');

    });
});