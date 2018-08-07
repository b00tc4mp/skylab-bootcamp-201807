'use strict';

describe('Array.prototype.entries', function () {
    var array1;
    var iterator1;

    beforeEach(function () {
        array1 = ['a', 'b', 'c'];
        iterator1 = array1.entries();
    });

    it('should compare and operate correctly', function() {
        // return a pair of key/value of the array
        var result = iterator1.next().value;
        //result = [0, 'a'];
        
        //we call the everytime to see the iterate
        expect(result).toEqual([0, 'a'])
        expect(iterator1.next().value).toEqual([1, 'b'])
        expect(iterator1.next().value).toEqual([2, 'c'])

    });
});