'use strict';

describe('Strings.prototype.lastIndexOf', function () {
    var str;

    beforeEach(function () {
        str = 'Blue White Whale';
    });

    it('should compare and operate correctly', function() {
        // Compare the string passed by param with the original string and return the position when they match
        var result = str.lastIndexOf('e'); 
        //result = 15

        var result2 = str.lastIndexOf('W');
        //result = 11
        
        expect(result).toBe(15)
        expect(result2).toBe(11)

    });
});