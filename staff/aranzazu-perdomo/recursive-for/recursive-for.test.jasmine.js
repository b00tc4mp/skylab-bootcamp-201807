'use strict';

describe('Recursive-for', function () {
    var numbers;
    var mul2;

    beforeEach(function () {
        var numbers = [1, 2, 3];
        var mul2 = [];
    });

    it("numbers", function(numbers) {
        mul2.push(numbers * 2);

        

        expect(mul2.length).toBe(3);
        expect(mul2[0]).toBe(2);
        expect(mul2[1]).toBe(4);
        expect(mul2[2]).toBe(6);
        
       
    });
});