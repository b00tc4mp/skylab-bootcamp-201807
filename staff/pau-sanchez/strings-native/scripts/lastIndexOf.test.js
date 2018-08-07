'use strict';

describe('String.prototype.lastIndexOf', function () {
    var string;

    beforeEach(function () {
        string = 'hello world';
    });

    it('should operate correctly', function() {
        var result = function(){
            return string.lastIndexOf("o");
        }

        expect(result()).toBe(7)
    });
});