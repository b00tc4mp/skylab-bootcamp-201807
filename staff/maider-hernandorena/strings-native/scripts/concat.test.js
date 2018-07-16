'use strict';

describe('String.prototype.concat', function () {
    var string;

    beforeEach(function () {
        string = 'hello world';
    });

    it('should operate correctly', function() {
        var result = string.concat('! I am Maider!');

        expect(result).toBe('hello world! I am Maider!');
    });

});