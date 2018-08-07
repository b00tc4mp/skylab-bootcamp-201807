'use strict';

describe('Strings.prototype.includes', function () {
    var str;

    beforeEach(function () {
        str = 'Blue Whale';
    });

    it('should compare and operate correctly', function() {
        // Compare the string passed by param with the original string and return true or false if there are or not coincidence
        var result = str.includes('Blue')
        //result = true;
        
        expect(result).toBe(true)

    });
});