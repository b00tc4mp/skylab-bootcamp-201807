'use strict';

describe('String.prototype.split', function () {
    var string;

    beforeEach(function () {
        string = ('hello world');
    });

    it('should split teh words on a string', function () {

        var words = [];
        for (var i = 0; i < string.length; i++) {
            words =+ string[i];
        }
        return words;

        expect(words.length).toBe(2);
        expect(words[0]).toBe('hello');
        expect(words[1]).toBe('world');        
        
    });

});