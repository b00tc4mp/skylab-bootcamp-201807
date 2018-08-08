'use strict';

describe('String.prototype.to-lower-case', function () {
    var string;

    beforeEach(function () {
        string = 'HELLO WORLD';
    });

    it('should put string in lower case', function() {
        var result;
        result = string.toLowerCase();
        return result;
        
        expect(result()).toBe("hello world");

    });

});