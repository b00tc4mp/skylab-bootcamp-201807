'use strict'

describe('Array.prototype.every()', function() {

    it('Tests that all elements in the array are below forty.', function() {
        function isBelowThreshold(currentValue) {
            return currentValue < 40;
        }
          
        var array = [1, 30, 39, 29, 10, 13];
        expect(array.every(isBelowThreshold)).toBeTruthy();
    });

});