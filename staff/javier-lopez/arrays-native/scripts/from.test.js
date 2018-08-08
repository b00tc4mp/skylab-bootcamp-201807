'use strict';

describe('Array.prototype.from', function(){
    var word;

    beforeEach(function (){
        word = {
            message: "Hello!"
        };
    });

    it('should iterate and operate correctly', function(){
        var array = Array.from(word.message);

        expect(array.length).toBe(6);
        expect(array[0]).toBe("H");
        expect(array[1]).toBe("e");
        expect(array[2]).toBe("l");
        expect(array[3]).toBe("l");
        expect(array[4]).toBe("o");
        expect(array[5]).toBe("!");

        expect(word.message).toBe("Hello!");
    });
});