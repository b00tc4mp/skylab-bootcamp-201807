'use strict';

describe('Strings.prototype.startsWith', function () {
    var str;

    beforeEach(function () {
        str = 'To be, or not to be, that is the question.';
    });

    it('should compare and operate correctly', function() {
        // Compare the string passed by param with the first word of the string. Return true or false
        var result = str.startsWith('To be')
        //result = true;
        
        expect(result).toBe(true)

    });
});