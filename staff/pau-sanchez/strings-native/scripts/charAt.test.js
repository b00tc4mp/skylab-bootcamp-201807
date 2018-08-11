'use strict';

describe('String.prototype.charAt', function () {
    var string;

    beforeEach(function () {
        string = 'hello world';
    });

    it('should operate correctly', function() {
        var result = function(){
            return string.charAt(0);
        }
    expect(result()).toBe("h");

    });
});