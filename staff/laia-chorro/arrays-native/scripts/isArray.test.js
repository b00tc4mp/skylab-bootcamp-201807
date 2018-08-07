'use strict'

describe('Array.isArray', function() {
    it('An empty array created with the Array constructor is considered an Array', function() {
        var newArray = new Array(),
            isArray = Array.isArray(newArray);

        expect(newArray.length).toBe(0);
        expect(isArray).toBe(true);
    });

    it('Any string, or numbers array  is considered an Array', function() {
        
        expect(Array.isArray([1, 2, 3])).toBe(true);
        expect(Array.isArray(['a', 'b', 'c'])).toBe(true);
    });

    it('A true/false boolean value is NOT considered an Array', function() {
        var isTrueArray = Array.isArray(true),
            isFalseArray = Array.isArray(false);

        expect(isTrueArray).toBe(false);
        expect(isFalseArray).toBe(false);
    });

    it('A falsy value (undefined, "", null) is NOT considered an Array', function() {
        expect(Array.isArray(undefined)).toBe(false);
        expect(Array.isArray('')).toBe(false);
        expect(Array.isArray(null)).toBe(false);
    });

    it('A falsy value (undefined, "", null) is NOT considered an Array', function() {
        expect(Array.isArray(undefined)).toBe(false);
        expect(Array.isArray('')).toBe(false);
        expect(Array.isArray(null)).toBe(false);
    });

});