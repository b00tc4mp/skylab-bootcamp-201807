'use strict';

describe('Array.prototype.pop', function () {
    var myFish;
   
   
    beforeEach(function () {
         myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
    });

    it('Removes the last element from an array and returns that element. ', function() {
      
       var result=myFish.pop();

        
        expect(myFish.length).toBe(3);
        expect(myFish[0]).toBe("angel");
        expect(myFish[1]).toBe("clown");
        expect(myFish[2]).toBe("mandarin");
       
    });
});


