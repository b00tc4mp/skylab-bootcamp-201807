'use strict';

describe('String.prototype.charCodeAt', function () {
    var string;

    beforeEach(function () {
        string = 'hello world';
    });

    it('should operate correctly', function() {
        var result = function(){
            return string.charCodeAt(0)
        }

        expect(result()).toBe(104)
    });
});