'use strict';

describe('String.prototype.match', function () {
    var string;

    beforeEach(function () {
        string = 'hello world';
    });

    it('should operate correctly', function() {
        
        var result = function(){
            return string.match("h");
        }
        
        expect(result()[0]).toBe("h");

    });
});