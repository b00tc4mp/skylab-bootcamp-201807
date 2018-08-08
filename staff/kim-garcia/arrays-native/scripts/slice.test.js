
'use strict';

describe('Array.prototype.slice', function () {

    var array;

    beforeEach(function () {

        array = ["Estoy", "Cortando", "El array", "En dos"];
    });

    it('should return a new array wit the elements selected', function() {

        var sliced = array.slice(2, 4);

        expect(array.length).toBe(4);
        expect(array[0]).toBe("Estoy");
        expect(array[1]).toBe("Cortando");
        expect(array[2]).toBe("El array");
        expect(array[3]).toBe("En dos");


        expect(sliced.length).toBe(2);
        expect(sliced[0]).toBe("El array");
        expect(sliced[1]).toBe("En dos");

    });
});