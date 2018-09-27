'use strict';

describe('String.prototype.to-upper-case', function () {
    var string;

    beforeEach(function () {
        string = 'hello world';
    });

    it('should put string in upper case', function() {
        var result;
        result = string.toUpperCase();
        return result;
        
        expect(result()).toBe("HELLO WORLD");

    });

});