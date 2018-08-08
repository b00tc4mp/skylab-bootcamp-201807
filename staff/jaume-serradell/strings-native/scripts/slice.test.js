'use strict';

describe('Strings.prototype.slice', function () {
    var str1;

    beforeEach(function () {
        str1 = 'The morning is upon us.'
    });

    it('should slice and operate correctly', function() {
        // It slice from position beginning (1) to position end (8) - Position End is not included
        var result = str1.slice(1, 8)
        //result = 'oranges are round, and oranges are juicy.'

        expect(result).toBe('he morn')

    });
});