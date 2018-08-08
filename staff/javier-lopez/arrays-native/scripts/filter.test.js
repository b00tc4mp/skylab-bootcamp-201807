'use strict';

describe('Array.prototype.filter', function () {
    var firstArray;

    beforeEach(function () {
        firstArray = ["Corred", "Insensatos"];
    });

    it('should iterate and operate correctly', function() {         
        function checkLength(word) {
            return word.length >= 10;
        }
        var result = firstArray.filter(checkLength);

        expect(firstArray).toEqual(["Corred", "Insensatos"]);
        expect(result.length).toBe(1);
    });
});