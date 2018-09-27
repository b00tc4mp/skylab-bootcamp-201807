'use strict';

describe('Array.prototype.reduceRight', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should operate correctly', function() {
        
        var reducer = function(acc, currentValue){
            return acc + currentValue;
        }
        
        var result = (function() {
            return array.reduceRight(reducer);
        });

        expect(array.length).toBe(5);
        expect(result()).toBe(15);
        
    });
});