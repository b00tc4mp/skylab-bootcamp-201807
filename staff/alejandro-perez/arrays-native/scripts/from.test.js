'use strict';

describe('Array.prototype.from', function () {
    var string;

    beforeEach(function () {
        string = "HOLA";
    });

    it('Creates new array from an string', function() {
        var result = Array.from(string);

        expect(result.length).toBe(4);
        expect(result[0]).toBe('H');
        expect(result[1]).toBe('O');
        expect(result[2]).toBe('L');
        expect(result[3]).toBe('A');
    });
});