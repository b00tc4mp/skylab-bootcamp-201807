'use strict';

describe('Strings.prototype.endsWith', function () {
    var str;

    beforeEach(function () {
        str = 'To be, or not to be, that is the question.';
    });

    it('should compare and operate correctly', function() {
        // Compare the string passed by param with the last word of the string. Return true or false
        var result = str.endsWith('question.')
        //result = true;
        
        expect(result).toBe(true)

    });
});