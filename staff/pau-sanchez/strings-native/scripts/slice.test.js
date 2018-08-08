'use strict';

describe('String.prototype.slice', function () {
    var string;

    beforeEach(function () {
        string = 'hello world';
    });

    it('should operate correctly', function() {
        var result = function(){
            return string.slice(1,5)
        }

        expect(result()).toBe("ello")

    });
});