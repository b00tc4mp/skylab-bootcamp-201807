'use strict';

describe('Array.prototype.includes', function () {
    var array1;

    beforeEach(function () {
        array1 = [1, 2, 3];
    });

    it(' determines whether an array includes a certain element, returning true or false as appropriate. It uses the sameValueZero algorithm to determine whether the given element is found.', function() {
       
          var results=array1.includes(2);

          expect(results).toBeTruthy();
          
    });
});