'use strict';

describe('Array.prototype.fill', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should operate correctly', function() {
            var result = (function(){
            return array.fill(0, 2, 4);
            });
        

        expect(result().length).toBe(5);
        expect(result()[0]).toBe(1);
        expect(result()[1]).toBe(2);
        expect(result()[2]).toBe(0);
        expect(result()[3]).toBe(0);
        expect(result()[4]).toBe(5);

    });
});


