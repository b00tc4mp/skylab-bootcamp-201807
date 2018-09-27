'use strict';

describe('Array.prototype.findindex', function () {
    var array1;

    beforeEach(function () {
         array1 = [5, 12, 8, 130, 44];
    });

    it('returns the index of the first element in the array that satisfies the provided testing function', function() {
        function findFirstLargeNumber(element) {
            return element > 13;
          }
          var results=array1.findIndex(findFirstLargeNumber);

          expect(results).toBe(3);
          
    });
});