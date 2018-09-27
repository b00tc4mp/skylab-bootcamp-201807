'use strict';

describe('String.prototype.substring', function () {
    var string;

    beforeEach(function () {
        string = 'hello world';
    });

    it('should operate correctly', function() {
        var result = function (){
            return string.substring(1,4);
        }

        expect(result()).toBe("ell");

    });
});