'use strict';

describe('Strings.prototype.concat', function () {
    var str;

    beforeEach(function () {
        str = 'Hello';
    });

    it('should concat and operate correctly', function() {
        // Concat at variable str the passed string
        var result = str.concat(', how are you?')
        //result = 'Hello, how are you?';
        
        expect(result).toBe('Hello, how are you?')

    });
});