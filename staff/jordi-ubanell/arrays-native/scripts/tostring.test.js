'use strict';

describe('Array.prototype.toString', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('toString: transform an array to an string', function() {
        var result = array.toString(array);
        //console.log(result)

        expect(result).toEqual("1,2,3,4,5");
    });
});