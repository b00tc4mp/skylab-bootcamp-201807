'use strict';

describe('Strings.prototype.toString', function () {
    var x;

    beforeEach(function () {
        x = new String('Hello world');
    });

    it('should toLowerCase and operate correctly', function() {
        // Converts a string to a new String
        var result = x.toString()
        //result = Hello world';
        
        expect(result).toBe('Hello world')

    });
});