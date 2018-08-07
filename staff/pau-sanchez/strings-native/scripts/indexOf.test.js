'use strict';

describe('String.prototype.indexOf', function () {
    var string;

    beforeEach(function () {
        string = 'hello world';
    });

    it('should operate correctly', function() {
        var result = function(){
            return string.indexOf("h")
        }

        expect(result()).toBe(0)

    });
});