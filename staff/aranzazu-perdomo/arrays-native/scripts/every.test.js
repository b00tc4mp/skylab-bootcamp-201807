'use strict';

describe('Array.prototype.every', function () {
    var array1;
    

    beforeEach(function () {
        array1 = ['a', 'b', 'c'];
      
    });

    it(' method tests whether all elements in the array pass the test implemented by the provided function.', function() {
        var iterator1 = array1.entries();
        var result = iterator1.next().value;
        var a= "a";

        

        expect(array1.length).toBe(3);
        expect(result[0]).toBe(0);
        expect(result[1]).toBe(a);
        
        
       
    });
});