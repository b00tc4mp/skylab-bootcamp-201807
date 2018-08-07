'use strict';

describe('Array.prototype.concat', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should iterate and operate correctly', function() {
        var array2 = [6, 7, 8, 9, 10]
        var result = (function() {
            return array.concat(array2);
        });

        expect(result().length).toBe(10);
        expect(result()[0]).toBe(1);
        expect(result()[1]).toBe(2);
        expect(result()[2]).toBe(3);
        expect(result()[3]).toBe(4);
        expect(result()[4]).toBe(5);
        expect(result()[5]).toBe(6);
        expect(result()[6]).toBe(7);
        expect(result()[7]).toBe(8);
        expect(result()[8]).toBe(9);
        expect(result()[9]).toBe(10);
        

        
    });
});