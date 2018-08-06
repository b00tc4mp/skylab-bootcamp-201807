'use strict';

describe('Array.prototype.join', function () {
    var firstArray;

    beforeEach(function () {
        firstArray = ["Mordor", "La comarca", "Rivendel", "Isengard"];
    });

    it('should iterate and operate correctly', function() {  
          
        var result = firstArray.join(" > ");       

        expect(result).toBe("Mordor > La comarca > Rivendel > Isengard");
        expect(firstArray).toEqual(["Mordor", "La comarca", "Rivendel", "Isengard"]);
    });
});