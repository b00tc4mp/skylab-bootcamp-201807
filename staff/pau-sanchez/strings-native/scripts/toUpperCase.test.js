'use strict';

describe('String.prototype.toUpperCase', function () {
    var string;

    beforeEach(function () {
        string = 'hello world';
    });

    it('should operate correctly', function() {
        var result = function(){
            return string.toUpperCase();

        }

        expect(result()).toBe("HELLO WORLD");
        expect(result().charCodeAt(0)).toBe(72);


    });
});