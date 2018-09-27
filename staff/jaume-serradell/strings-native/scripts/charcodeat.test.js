'use strict';

describe('Strings.prototype.charCodeAt', function () {
    var anyString;

    beforeEach(function () {
        anyString = 'Brave new world';
    });

    it('should show and operate correctly', function() {
        // Show the unicode code of position 0
        var result = anyString.charCodeAt(0)
        //result = 66;
        
        expect(result).toBe(66)

    });
});