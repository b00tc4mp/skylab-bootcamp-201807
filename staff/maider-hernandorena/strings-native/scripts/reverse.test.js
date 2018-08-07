'use strict';

describe('String.prototype.reverse', function () {
    var string;

    beforeEach(function () {
        string = ('hello world');
    });

    it('reverses de order of the string items', function () {
        var result;
        for (var i = string.length -1; i >= 0; i--) {
            result += string[i];
        }
        return result;

        expect(result).toBe('dlrow olleh');

    });

});