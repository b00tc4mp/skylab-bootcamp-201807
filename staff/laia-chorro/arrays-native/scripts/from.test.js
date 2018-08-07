'use strict'

describe('Array.from', function() {

    it ('Should iterate and create an array copy from the chars contained in the string', function() {
        var string = 'foo';
        var arrayOfChars = Array.from(string);

        expect(arrayOfChars.length).toBe(3);
        expect(arrayOfChars[0]).toBe('f');
        expect(arrayOfChars[1]).toBe('o');
        expect(arrayOfChars[2]).toBe('o');
    });

    it ('Should return an empty array from a number', function() {
        var singleNum = 1,
            emptyArray = Array.from(singleNum);

        expect(emptyArray.length).toBe(0);
        expect(emptyArray.constructor === Array).toBe(true);
    });
});
