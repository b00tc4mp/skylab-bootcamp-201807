'use strict';

describe('Array.prototype.concat', function () {
    var arrayNums;
    var arrayLetters;

    beforeEach(function () {
        arrayNums = [1, 2, 3, 4, 5];
        arrayLetters = ['a', 'b', 'c', 'd', 'e'];
    });

    it('should concatenate both arrays', function () {
    var result = arrayNums.concat(arrayLetters);

    expect(arrayNums.length).toBe(5);
    expect(arrayNums[0]).toBe(1);
    expect(arrayNums[1]).toBe(2);
    expect(arrayNums[2]).toBe(3);
    expect(arrayNums[3]).toBe(4);
    expect(arrayNums[4]).toBe(5);

    expect(arrayLetters.length).toBe(5);
    expect(arrayLetters[0]).toBe('a');
    expect(arrayLetters[1]).toBe('b');
    expect(arrayLetters[2]).toBe('c');
    expect(arrayLetters[3]).toBe('d');
    expect(arrayLetters[4]).toBe('e');


    expect(result).toEqual([1, 2, 3, 4, 5, 'a', 'b', 'c', 'd', 'e']);

  });
});