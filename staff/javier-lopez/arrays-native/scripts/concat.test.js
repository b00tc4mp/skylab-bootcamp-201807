'use strict';

describe('Array.prototype.concat', function () {
    var firstArray;
    var secondArray;

    beforeEach(function () {
        firstArray = [1, 2, 3, 4];
        secondArray = ["uno", "dos", "tres", "cuatro"];
    });

    it('should iterate and operate correctly', function() {
        var newArray = firstArray.concat(secondArray);

        expect(newArray.length).toBe(8);
        expect(newArray[0]).toBe(1);
        expect(newArray[1]).toBe(2);
        expect(newArray[2]).toBe(3);
        expect(newArray[3]).toBe(4);
        expect(newArray[4]).toBe("uno");
        expect(newArray[5]).toBe("dos");
        expect(newArray[6]).toBe("tres");
        expect(newArray[7]).toBe("cuatro");
        expect(firstArray).toEqual([1, 2, 3, 4]);
    });
});