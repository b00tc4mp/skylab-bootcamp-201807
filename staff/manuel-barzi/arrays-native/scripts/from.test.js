'use strict';

describe('Array.prototype.from', function () {
    var string;

    beforeEach(function () {
       string="hola";
    });

    it('create new array', function() {
        var result =Array.from(string);


        

        expect(result.length).toBe(4);
        expect(result[0]).toBe("h");
        expect(result[1]).toBe("o");
        expect(result[2]).toBe("l");
        expect(result[3]).toBe("a");
       
    });
});