'use strict';

describe('String.prototype.search', function () {
    var string;

    beforeEach(function () {
        string = 'hello world';
    });

    it('should operate correctly', function() {
        var result = function(){
            return string.search("world");
        }

        expect(result()).toBe(6)

    });
});