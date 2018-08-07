'use strict'

describe('Array.prototype.filter()', function() {

    it('Creates a new array with all the words with more than six letters.', function() {
        var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'],
            wordsLongerThanSix = function(word) {return word.length > 6;},
            result = words.filter(wordsLongerThanSix);

        // expected output: Array ["exuberant", "destruction", "present"]
        expect(result.length).toBe(3);
        expect(result[0]).toBe('exuberant');
        expect(result[1]).toBe('destruction');
        expect(result[2]).toBe('present');

    });

});