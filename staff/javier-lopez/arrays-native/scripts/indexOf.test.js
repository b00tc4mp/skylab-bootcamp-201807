'use strict';

describe('Array.prototype.includes', function () {
    var firstArray;

    beforeEach(function () {
        firstArray = ["Mordor", "La comarca", "Rivendel", "Isengard"];
    });

    it('should iterate and operate correctly', function() {  
          
        var result = firstArray.indexOf("Rivendel");       

        expect(result).toBe(2);
        expect(firstArray).toEqual(["Mordor", "La comarca", "Rivendel", "Isengard"]);
    });
});