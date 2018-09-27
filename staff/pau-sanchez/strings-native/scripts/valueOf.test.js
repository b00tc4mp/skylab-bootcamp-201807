'use strict';

describe('String.prototype.valueOf', function () {
    var string;

    beforeEach(function () {
        string = 'hello world';
    });

    it('should operate correctly', function() {
        var result = function (){
            return string.valueOf();
        }

        expect(result()).toBe("hello world");
    });
});