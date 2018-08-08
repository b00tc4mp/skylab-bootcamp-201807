'use strict';

describe('Array.prototype.pop', function () {
    var plants;

    beforeEach(function () {
        plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];
    });

    it('should substract and operate correctly', function() {
        //Save in the variable result the last value of the array and substract the last item of the array 'plants'
        var result = plants.pop();
        // expected output: 'tomato'
        
        expect(plants.length).toBe(4)
        expect(result).toBe('tomato')

    });
});