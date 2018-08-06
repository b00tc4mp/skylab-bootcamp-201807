'use strict';

describe('Strings.prototype.substr', function () {
    var str;

    beforeEach(function () {
        str = 'Mozilla';
    });

    it('should substract and operate correctly', function() {
        // Substract the 0 position to 1 position
        var result = str.substr(0, 1)
        //result = 'M';

        // Subtract between position 2 to the end
        var result2 = str.substr(2)
        //result = 'zilla';
        
        expect(result).toBe('M')
        expect(result2).toBe('zilla')

    });
});