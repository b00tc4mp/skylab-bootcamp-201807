'use strict';

describe('String.prototype.fromCharCode', function () {
    

    beforeEach(function () {
        
    });

    it('Returns a string created from the specified sequence of UTF-16 code units.', function() {
        
        var result=String.fromCharCode(65, 66, 67);

        expect(result).toBe("ABC");




    });
});