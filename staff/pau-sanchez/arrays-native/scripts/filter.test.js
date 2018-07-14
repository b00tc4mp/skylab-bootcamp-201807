'use strict';

describe('Array.prototype.filter', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should operate correctly', function() {
        var biggerThanThree = function (item){return item > 3;};
        
        var result = (function() {
            return array.filter(biggerThanThree);
        });
        
    

        expect(result().length).toBe(2);
        expect(result()[0]).toBe(4);
        expect(result()[1]).toBe(5);
       
    });
});