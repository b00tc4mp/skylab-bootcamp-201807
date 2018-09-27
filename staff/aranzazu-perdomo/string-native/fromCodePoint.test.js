'use strict';

describe('String.prototype.fromCodePoint', function () {
    

    beforeEach(function () {
        
    });

    it('Returns a string created by using the specified sequence of code points.', function() {
        
        var result=String.fromCodePoint(65, 90);

        expect(result).toBe("AZ");




    });
});