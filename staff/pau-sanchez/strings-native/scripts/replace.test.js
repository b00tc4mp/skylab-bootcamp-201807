'use strict';

describe('String.prototype.replace', function () {
    var string;

    beforeEach(function () {
        string = 'hello world';
    });

    it('should operate correctly', function() {
        var result = function(){
            return string.replace('hello','fuck the')
        }

        expect(result()).toBe("fuck the world");

    });
});