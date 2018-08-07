'use strict';

describe('Array.prototype.filter', function () {
   var words;
    
    beforeEach(function () {
        
         words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

    });

    it('creates a new array with all elements that pass the test implemented by the provided function', function() {
        
       function wordsFilters(word){

            return word.length > 6;
       };

       var result= words.filter(wordsFilters);
       
        expect(result).toEqual(["exuberant", "destruction", "present"]);
        expect(result.length).toBe(3);

    });
});