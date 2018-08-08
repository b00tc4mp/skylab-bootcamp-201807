'use strict';

describe('String.prototype.split', function () {
    var string;

    beforeEach(function () {
        string = 'hello world';
    });

    it('should operate correctly', function() {
        var result = function(){
            return string.split(" ");
        }

        expect(result()[0]).toBe("hello");
        expect(result()[1]).toBe("world");

    });
});