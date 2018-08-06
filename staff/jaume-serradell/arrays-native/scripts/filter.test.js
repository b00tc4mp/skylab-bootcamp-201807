'use strict';

describe('Array.prototype.filter', function () {
    var words;

    beforeEach(function () {
        words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
    });

    it('should filter and operate correctly', function() {
        //filter array of words according the condition
        var result = words.filter(word => word.length > 6);
        // expected output: Array ["exuberant", "destruction", "present"]
        
        expect(result).toEqual(["exuberant", "destruction", "present"])

    });
});