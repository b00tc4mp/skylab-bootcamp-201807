'use strict';

describe('Array.prototype.some', function () {
    var array;

    beforeEach(function () {
        array = [123456.789];
    });

    it('should iterate and operate correctly', function() {
        var result = (function(item) {
            return array.toLocaleString();
        });

        expect(result().length).toBe(11);
        expect(result()[0]).toBe("1");
        expect(result()[1]).toBe("2");
        expect(result()[2]).toBe("3");
        expect(result()[3]).toBe(".");
        expect(result()[4]).toBe("4");
        expect(result()[5]).toBe("5");
        expect(result()[6]).toBe("6");
        expect(result()[7]).toBe(",");
        expect(result()[8]).toBe("7");
        expect(result()[9]).toBe("8");
        expect(result()[10]).toBe("9");

        
    });
});