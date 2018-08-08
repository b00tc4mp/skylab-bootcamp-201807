'use strict';

describe('Array.prototype.concat', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('concat: add an array to an existent one', function() {
        var secondPart = [6,7,8,9,10];
        var result = array.concat(secondPart);
        //console.log(result)

        expect(result).toEqual([1,2,3,4,5,6,7,8,9,10]);
        expect(result[0]).toEqual(1);
        expect(result[9]).toEqual(10);
    });
});