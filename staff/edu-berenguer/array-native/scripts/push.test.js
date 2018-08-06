'use strict';

describe('Array.prototype.push', function () {
    var animals;

    beforeEach(function () {
        animals = ['pigs', 'goats', 'sheep'];
    });

    it('should add and operate correctly', function() {
        //Add item passed by param in the array at last position and return the index of this value when is pushed
        var result = animals.push('cows');
        // expected output: 4
        
        expect(result).toBe(4)
        expect(animals.length).toBe(4)

    });
});