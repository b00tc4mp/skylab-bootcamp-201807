'use strict';

describe('Array.prototype.push', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('push: add a number in last position', function() {
        array.push(6);
        //console.log(result)

        expect(array).toEqual([1,2,3,4,5,6]);
        expect(array[5]).toEqual(6);
    });
});