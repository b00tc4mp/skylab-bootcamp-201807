'use strict';

describe('String.prototype.concat', function () {
    var string;

    beforeEach(function () {
        string = 'hello world';
    });

    it('Concatenates the string arguments to the calling string and returns a new string.', function() {
        
        var result=string.concat("!");

        expect(result).toBe("hello world!");




    });
});