'use strict';

describe('Strings.prototype.substring', function () {
    var str;

    beforeEach(function () {
        str = 'Mozilla';
    });

    it('should substract and operate correctly', function() {
        // Display the 0 position to 6 position
        var result = str.substring(0, 6)
        //result = 'Mozill';

        // Display between position 3 to the end
        var result2 = str.substr(3)
        //result = 'illa';
        
        expect(result).toBe('Mozill')
        expect(result2).toBe('illa')

    });
});