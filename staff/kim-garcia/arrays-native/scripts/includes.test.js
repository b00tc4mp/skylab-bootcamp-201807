

'use strict';

describe('Array.prototype.includes', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should return true if the element is included on the array', function() {
        
    var result = array.includes(3)

    expect(result).toBeTruthy();

    });
});

