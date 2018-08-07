'use strict';

describe('Array.prototype.join', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('join: add all elements of an array in one string', function() {
        var result = array.join('/');

        expect(result).toEqual('1/2/3/4/5');
        expect(result[1]).toEqual('/');
        expect(result[2]).toEqual('2');

    });
});