'use strict';

describe('Strings.prototype.indexOf', function () {
    var str;

    beforeEach(function () {
        str = 'Blue Whale';
    });

    it('should compare and operate correctly', function() {
        // Compare the string passed by param with the original string and return 0 if there are coincidence
        var result = str.indexOf('Blue'); 
        //result = 0

        var result2 = str.indexOf('Blute');
        //result = -1
        
        expect(result).toBe(0)
        expect(result2).toBe(-1)

    });
});