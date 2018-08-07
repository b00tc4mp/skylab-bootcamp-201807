'use strict';

describe('Array.prototype.join', function () {
    var elements;

    beforeEach(function () {
         elements = ['Fire', 'Wind', 'Rain'];
    });

    it('joins all elements of an array into a string and returns this string.', function() {
       
          var results=elements.join('-');

          expect(results).toBe("Fire-Wind-Rain");
          
    });
});