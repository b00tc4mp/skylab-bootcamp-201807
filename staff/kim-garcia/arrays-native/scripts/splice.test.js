'use strict';

describe('Array.prototype.splice', function () {

    var array;

    beforeEach(function () {

        array = ["Estoy", "Cortando", "El array", "En dos"];
    });

    it('should return a new array wit the elements selected', function() {

        var removed = array.splice(1, 1, "Substituyendo un elemento");

        expect(array.length).toBe(4);
        expect(array[0]).toBe("Estoy");
        expect(array[1]).toBe("Substituyendo un elemento");
        expect(array[2]).toBe("El array");
        expect(array[3]).toBe("En dos");


        expect(removed[0]).toBe("Cortando");

    });
});