'use strict';

describe('Array.prototype.findIndex', function () {
    var firstArray;

    beforeEach(function () {
        firstArray = [1, 30, 39, 29, 10, 13];
    });

    it('should iterate and operate correctly', function() {  
        function findNumber(element) {
            return element > 30;
          }
          
        var result = firstArray.findIndex(findNumber);       

        expect(result).toBe(2);
        expect(firstArray).toEqual([1, 30, 39, 29, 10, 13]);
        expect(Array.isArray(firstArray)).toBeTruthy();
    });
});