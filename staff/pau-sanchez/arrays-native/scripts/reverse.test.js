'use strict';

describe('Array.prototype.reverse', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should operate correctly', function() {
        var result = (function(){
            return array.reverse()
        });

        expect(array.length).toBe(5);
        expect(result().length).toBe(5);
        expect(result()[0]).toBe(1);
        expect(result()[1]).toBe(4);
        expect(result()[2]).toBe(3);
        expect(result()[3]).toBe(2);
        expect(result()[4]).toBe(5);

        
    });
});