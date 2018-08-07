'use strict';

describe('String.prototype.split', function () {
    var string;

    beforeEach(function () {
        string = 'hello world';
    });

    it('should operate correctly', function() {
        var result = function(){
            return string.substr(1,4);
        }

        expect(result()).toBe("ello")

    });
});