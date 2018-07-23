'use strict';

describe('Array.prototype.join', function () {
    var elements;

    beforeEach(function () {
        elements = ['Fire', 'Wind', 'Rain'];
    });

    it('should join array and operate correctly', function() {
        //return the array in a string separates by comma
        var result = elements.join();
        //expected output: Fire,Wind,Rain

        //return the array in a string with all values together
        var result2 = elements.join('');
        //expected output: FireWindRain

        //return the array in a string with all values separarated by hyphen
        var result3 = elements.join('-');
        // expected output: Fire-Wind-Rain
        
        expect(result).toBe('Fire,Wind,Rain');
        expect(result2).toBe('FireWindRain');
        expect(result3).toBe('Fire-Wind-Rain');

    });
});