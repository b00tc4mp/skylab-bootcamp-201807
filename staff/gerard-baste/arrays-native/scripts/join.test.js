'use strict';

describe('Array.prototype.concat', function () {
    var elements;
    var result;
    
    beforeEach(function () {
        elements = ['Fire', 'Wind', 'Rain'];
    });

    it('should iterate and operate correctly', function() {
            
        result = elements.join(" ");

        expect(result).toBe("Fire Wind Rain");

    });
});