'use strict';

describe('Array.prototype.push', function () {
    var animals;
   
   
    beforeEach(function () {
         animals = ['pigs', 'goats', 'sheep'];
    });

    it('Adds one or more elements to the end of an array and returns the new length of the array. ', function() {
      
       var result=animals.push('cows');

        
        expect(animals.length).toBe(4);
        expect(animals[0]).toBe("pigs");
        expect(animals[1]).toBe("goats");
        expect(animals[2]).toBe("sheep");
        expect(animals[3]).toBe("cows");
       
    });
});


