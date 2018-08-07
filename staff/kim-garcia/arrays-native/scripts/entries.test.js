'use strict';

describe('Array.prototype.entries', function () {

    var array;
    var iterator;

    beforeEach(function () {

        array = ['a', 'b', 'c'];
        iterator = array.entries();
        
    });

    it('should compare and operate correctly', function() {

        var result = iterator.next().value;
    
        expect(result).toEqual([0, 'a'])
        expect(iterator.next().value).toEqual([1, 'b'])
        expect(iterator.next().value).toEqual([2, 'c'])

    });
});

