'use strict';

describe('Strings.prototype.charAt', function () {
    var anyString;

    beforeEach(function () {
        anyString = 'Brave new world';
    });

    it('should show and operate correctly', function() {
        // Show the letter at index 0
        var result = anyString.charAt(0)
        //result = 'B';
        
        expect(result).toBe('B')

    });
});