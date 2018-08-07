'use strict';

describe('Array.prototype.indexOf', function () {
        var beasts;
    beforeEach(function () {
        beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
    });

    it('returns the first index at which a given element can be found in the array, or -1 if it is not present.' , function() {
       
          var results= beasts.indexOf('bison');
          expect(results).toBe(1);
          
    });
});