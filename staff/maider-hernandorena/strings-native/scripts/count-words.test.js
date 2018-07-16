'use strict';

describe('String.prototype.count-words', function () {
    var string;

    beforeEach(function () {
        string = ('maider');
    });

    it('should count letters on a string', function () {

        var count = 0;
        
        for (var i = 0; i < string.length; i++) {
            var count =+ string[i];
        }
        return count;

        expect(count).toBe(6);
        expect(string('')).toBe(0);
        
    });

});
