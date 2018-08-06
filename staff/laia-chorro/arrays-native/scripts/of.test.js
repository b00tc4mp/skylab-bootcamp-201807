describe('Array.of', function() {
    it('Creates a new Array instance with only one number as an argument.', function() {
        var arrayFromNum = Array.of(7);

        expect(arrayFromNum.length).toBe(1);
        expect(arrayFromNum[0]).toBe(7);
    });

    it('creates a new Array instance with different numbers as multiple arguments.', function() {
        var arrayFromMultipleNums = Array.of(1, 2, 3);

        expect(arrayFromMultipleNums.length).toBe(3);
        expect(arrayFromMultipleNums[0]).toBe(1);
        expect(arrayFromMultipleNums[1]).toBe(2);
        expect(arrayFromMultipleNums[2]).toBe(3);
    });

    it('creates a new Array instance with a mix of type string and number as multiple arguments.', function() {
        var arrayFromMixTypes = Array.of(1, 'two', 3);

        expect(arrayFromMixTypes.length).toBe(3);
        expect(arrayFromMixTypes[0]).toBe(1);
        expect(arrayFromMixTypes[1]).toBe('two');
        expect(arrayFromMixTypes[2]).toBe(3);
    });


    it('Creates a new Array instance with an undefined as an argument.', function() {
        var arrayFromUndefined = Array.of(undefined);

        expect(arrayFromUndefined).not.toBeUndefined();
        expect(arrayFromUndefined[0]).toBeUndefined();
        expect(arrayFromUndefined).toEqual([undefined]);
    });
});