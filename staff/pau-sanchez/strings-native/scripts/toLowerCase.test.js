'use strict';

describe('String.prototype.toLowerCase', function () {
    var string;

    beforeEach(function () {
        string = 'HELLO WORLD';
    });

    it('should operate correctly', function() {
        var result = function(){
            return string.toLowerCase();
        }


        expect(result()).toBe("hello world");
        expect(result().charCodeAt(0)).toBe(104);


    });
});