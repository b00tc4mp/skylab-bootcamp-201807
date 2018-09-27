'use strict';

describe('Array.prototype.most-frequent', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should iterate and operate correctly', function() {
        var result = [];
        for (var i = 0; i < array.length; i++) {
            for (var j = i+1; j < array.length; j++) {
                if (array[i] === array[j]) {
                    result.push(array[j]);
                }
            }
        }
        return result;
            
        expect(array.length).toBe(5);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);

        expect(array[1, 3, 4, 3, 2, 4].length).toBe(5);
        expect(result.length).toBe(1);
        expect(result[0]).toBe(3);
        expect(result[1]).toBe(4);
    });

});